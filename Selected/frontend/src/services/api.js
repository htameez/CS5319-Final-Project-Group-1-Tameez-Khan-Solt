const layeredBaseUrl =
  import.meta.env.VITE_LAYERED_API_URL ?? 'http://127.0.0.1:8000/api'

const blackboardBaseUrl =
  import.meta.env.VITE_BLACKBOARD_API_URL ?? 'http://127.0.0.1:8001'

async function requestJson(url, options) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    let message = 'Request failed.'

    try {
      const errorBody = await response.json()
      message = errorBody.detail ?? errorBody.message ?? message
    } catch {
      message = `${message} Status ${response.status}.`
    }

    throw new Error(message)
  }

  return response.json()
}

function mapFavorite(favorite) {
  return {
    id: favorite.id,
    profileId: favorite.user_profile_id,
    chatMessageId: favorite.chat_message_id,
    content: favorite.ai_response,
  }
}

async function createLayeredProfile(profile) {
  return requestJson(`${layeredBaseUrl}/profiles/`, {
    method: 'POST',
    body: JSON.stringify({
      full_name: profile.name.trim(),
      health_goals: profile.healthGoals.trim() || null,
      medications: profile.medications.trim() || null,
    }),
  })
}

async function updateLayeredProfile(profileId, profile) {
  return requestJson(`${layeredBaseUrl}/profiles/${profileId}`, {
    method: 'PUT',
    body: JSON.stringify({
      full_name: profile.name.trim(),
      health_goals: profile.healthGoals.trim() || null,
      medications: profile.medications.trim() || null,
    }),
  })
}

async function askLayeredChat({ profileId, question }) {
  const data = await requestJson(`${layeredBaseUrl}/chat/`, {
    method: 'POST',
    body: JSON.stringify({
      user_profile_id: profileId,
      question: question.trim(),
    }),
  })

  return {
    answer: data.answer,
    trace: [
      `Presentation layer sent the question for profile #${profileId}.`,
      'Service layer validated the request and orchestrated the response.',
      'Repository layer stored the chat message in SQLite.',
    ],
    chatMessageId: data.chat_message_id,
  }
}

async function askBlackboardChat({ name, profileId, healthGoals, medications, question }) {
  const data = await requestJson(`${blackboardBaseUrl}/chat`, {
    method: 'POST',
    body: JSON.stringify({
      name: name.trim(),
      user_profile_id: profileId,
      health_goals: healthGoals.trim() || null,
      medications: medications.trim() || null,
      question: question.trim(),
    }),
  })

  return {
    answer: data.response,
    trace: data.trace ?? [],
    chatMessageId: data.chat_message_id,
    profileId: data.user_profile_id,
  }
}

export async function askArchitectureChat(architecture, payload) {
  if (architecture === 'layered') {
    const profile = payload.profileId
      ? await updateLayeredProfile(payload.profileId, payload)
      : await createLayeredProfile(payload)
    const response = await askLayeredChat({
      profileId: profile.id,
      question: payload.question,
    })

    return {
      ...response,
      profileId: profile.id,
    }
  }

  return askBlackboardChat(payload)
}

export async function getArchitectureFavorites(architecture, profileId) {
  if (!profileId) {
    return []
  }

  const url =
    architecture === 'layered'
      ? `${layeredBaseUrl}/favorites/${profileId}`
      : `${blackboardBaseUrl}/favorites/${profileId}`

  const favorites = await requestJson(url, {
    method: 'GET',
  })

  return favorites.map(mapFavorite)
}

export async function saveArchitectureFavorite(architecture, { profileId, chatMessageId }) {
  const url =
    architecture === 'layered'
      ? `${layeredBaseUrl}/favorites/`
      : `${blackboardBaseUrl}/favorites`

  const favorite = await requestJson(url, {
    method: 'POST',
    body: JSON.stringify({
      user_profile_id: profileId,
      chat_message_id: chatMessageId,
    }),
  })

  return mapFavorite(favorite)
}

export const architectureApiMeta = {
  layered: {
    label: 'Layered backend',
    endpoint: `${layeredBaseUrl}/chat/`,
    favoritesEndpoint: `${layeredBaseUrl}/favorites/`,
  },
  blackboard: {
    label: 'Blackboard backend',
    endpoint: `${blackboardBaseUrl}/chat`,
    favoritesEndpoint: `${blackboardBaseUrl}/favorites`,
  },
}
