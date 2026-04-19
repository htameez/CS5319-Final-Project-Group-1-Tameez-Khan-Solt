const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

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
  return requestJson(`${apiBaseUrl}/profiles/`, {
    method: 'POST',
    body: JSON.stringify({
      full_name: profile.name.trim(),
      health_goals: profile.healthGoals.trim() || null,
      medications: profile.medications.trim() || null,
    }),
  })
}

async function updateLayeredProfile(profileId, profile) {
  return requestJson(`${apiBaseUrl}/profiles/${profileId}`, {
    method: 'PUT',
    body: JSON.stringify({
      full_name: profile.name.trim(),
      health_goals: profile.healthGoals.trim() || null,
      medications: profile.medications.trim() || null,
    }),
  })
}

async function askLayeredChat({ profileId, question }) {
  const data = await requestJson(`${apiBaseUrl}/chat/`, {
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

export async function askArchitectureChat(_architecture, payload) {
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

export async function getArchitectureFavorites(_architecture, profileId) {
  if (!profileId) {
    return []
  }

  const favorites = await requestJson(`${apiBaseUrl}/favorites/${profileId}`, {
    method: 'GET',
  })

  return favorites.map(mapFavorite)
}

export async function saveArchitectureFavorite(_architecture, { profileId, chatMessageId }) {
  const favorite = await requestJson(`${apiBaseUrl}/favorites/`, {
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
    label: 'Selected layered backend',
    endpoint: `${apiBaseUrl}/chat/`,
    favoritesEndpoint: `${apiBaseUrl}/favorites/`,
  },
}
