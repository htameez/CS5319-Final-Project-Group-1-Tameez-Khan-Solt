const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8001'

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

async function askBlackboardChat({ name, profileId, healthGoals, medications, question }) {
  const data = await requestJson(`${apiBaseUrl}/chat`, {
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

export async function askArchitectureChat(_architecture, payload) {
  return askBlackboardChat(payload)
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
  const favorite = await requestJson(`${apiBaseUrl}/favorites`, {
    method: 'POST',
    body: JSON.stringify({
      user_profile_id: profileId,
      chat_message_id: chatMessageId,
    }),
  })

  return mapFavorite(favorite)
}

export const architectureApiMeta = {
  blackboard: {
    label: 'Unselected blackboard backend',
    endpoint: `${apiBaseUrl}/chat`,
    favoritesEndpoint: `${apiBaseUrl}/favorites`,
  },
}
