import { useEffect, useState } from 'react'
import {
  architectureApiMeta,
  askArchitectureChat,
  getArchitectureFavorites,
  saveArchitectureFavorite,
} from '../services/api.js'

const architecturePrompts = {
  layered:
    'The layered backend uses a persisted profile, service logic, and repository storage before returning the answer.',
  blackboard:
    'The blackboard backend lets multiple knowledge sources contribute to one shared response trace.',
}

export function ChatWorkspace({ architecture, meta }) {
  const [profile, setProfile] = useState({
    name: '',
    healthGoals: '',
    medications: '',
  })
  const [profileId, setProfileId] = useState(null)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [favorites, setFavorites] = useState([])
  const [savingFavoriteIds, setSavingFavoriteIds] = useState([])
  const [trace, setTrace] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadFavorites() {
      if (!profileId) {
        setFavorites([])
        return
      }

      try {
        const loadedFavorites = await getArchitectureFavorites(architecture, profileId)
        setFavorites(loadedFavorites)
        setMessages((current) =>
          current.map((message) => {
            if (message.role !== 'assistant' || !message.chatMessageId) {
              return message
            }

            const matchedFavorite = loadedFavorites.find(
              (favorite) => favorite.chatMessageId === message.chatMessageId,
            )

            return matchedFavorite
              ? {
                  ...message,
                  isFavorite: true,
                  favoriteId: matchedFavorite.id,
                }
              : message
          }),
        )
      } catch {
        setError('The chat worked, but favorites could not be loaded for this profile.')
      }
    }

    loadFavorites()
  }, [architecture, profileId])

  async function handleFavorite(message) {
    if (!message.chatMessageId || !message.profileId || message.isFavorite) {
      return
    }

    setSavingFavoriteIds((current) => [...current, message.id])
    setError('')

    try {
      const favorite = await saveArchitectureFavorite(architecture, {
        profileId: message.profileId,
        chatMessageId: message.chatMessageId,
      })

      setFavorites((current) => {
        const alreadySaved = current.some((item) => item.id === favorite.id)
        return alreadySaved ? current : [favorite, ...current]
      })
      setMessages((current) =>
        current.map((entry) =>
          entry.id === message.id
            ? {
                ...entry,
                isFavorite: true,
                favoriteId: favorite.id,
              }
            : entry,
        ),
      )
    } catch (favoriteError) {
      setError(
        favoriteError instanceof Error
          ? favoriteError.message
          : 'The message could not be saved to favorites.',
      )
    } finally {
      setSavingFavoriteIds((current) => current.filter((item) => item !== message.id))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!profile.name.trim() || !question.trim()) {
      setError('Add a name and a health question before sending a message.')
      return
    }

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: question.trim(),
    }

    setStatus('loading')
    setError('')
    setMessages((current) => [...current, userMessage])

    try {
      const result = await askArchitectureChat(architecture, {
        ...profile,
        profileId,
        question,
      })

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: result.answer,
          chatMessageId: result.chatMessageId,
          profileId: result.profileId,
          isFavorite: false,
        },
      ])
      setTrace(result.trace)
      if (result.profileId) {
        setProfileId(result.profileId)
      }
      setQuestion('')
      setStatus('success')
    } catch (submitError) {
      setStatus('error')
      setMessages((current) => current.filter((message) => message.id !== userMessage.id))
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong while contacting the backend.',
      )
    }
  }

  return (
    <div className="workspace-grid chatbot-grid">
      <article className="info-card chat-panel">
        <div className="chat-panel-header">
          <div>
            <p className="eyebrow">Shared Chat UI</p>
            <h3>{meta.title}</h3>
          </div>
          <span className="pill">{architectureApiMeta[architecture].label}</span>
        </div>
        <p className="chat-summary">{architecturePrompts[architecture]}</p>
        <form className="chat-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              value={profile.name}
              onChange={(event) =>
                setProfile((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Enter a patient or demo user name"
            />
          </label>
          <label className="field">
            <span>Health goals</span>
            <textarea
              value={profile.healthGoals}
              onChange={(event) =>
                setProfile((current) => ({ ...current, healthGoals: event.target.value }))
              }
              placeholder="Example: better sleep, more energy, hydration"
              rows="3"
            />
          </label>
          <label className="field">
            <span>Medications or notes</span>
            <textarea
              value={profile.medications}
              onChange={(event) =>
                setProfile((current) => ({ ...current, medications: event.target.value }))
              }
              placeholder="Optional profile context for the response"
              rows="3"
            />
          </label>
          <label className="field">
            <span>Question</span>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask a wellness question here"
              rows="4"
            />
          </label>
          <div className="chat-actions">
            <button className="switch-button active" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send to selected architecture'}
            </button>
            <p className="endpoint-note">{architectureApiMeta[architecture].endpoint}</p>
          </div>
          {error ? <p className="status-message error-text">{error}</p> : null}
        </form>
      </article>

      <article className="info-card transcript-panel">
        <div className="chat-panel-header">
          <div>
            <p className="eyebrow">Conversation</p>
            <h3>Response window</h3>
          </div>
          <span className="pill">{messages.length} messages</span>
        </div>
        <div className="message-list">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>No chat yet.</p>
              <p>Send a question and the selected backend will answer here.</p>
            </div>
          ) : (
            messages.map((message) => (
              <article
                key={message.id}
                className={`message-bubble ${message.role === 'assistant' ? 'assistant' : 'user'}`}
              >
                <div className="message-top">
                  <p className="label">{message.role === 'assistant' ? 'CareBot' : 'User'}</p>
                  {message.role === 'assistant' ? (
                    <button
                      type="button"
                      className={`favorite-button ${message.isFavorite ? 'active' : ''}`}
                      onClick={() => handleFavorite(message)}
                      disabled={message.isFavorite || savingFavoriteIds.includes(message.id)}
                      aria-label={message.isFavorite ? 'Saved to favorites' : 'Save to favorites'}
                      title={message.isFavorite ? 'Saved to favorites' : 'Save to favorites'}
                    >
                      {message.isFavorite ? '♥' : '♡'}
                    </button>
                  ) : null}
                </div>
                <p>{message.content}</p>
              </article>
            ))
          )}
        </div>
      </article>

      <article className="info-card">
        <h3>Runtime trace</h3>
        {trace.length === 0 ? (
          <p className="trace-empty">
            The selected architecture will show its processing trace after the first response.
          </p>
        ) : (
          <ol>
            {trace.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )}
      </article>

      <article className="info-card">
        <h3>Saved favorites</h3>
        {favorites.length === 0 ? (
          <p className="trace-empty">
            Tap the heart next to any CareBot response to save it through the selected
            architecture&apos;s favorites flow.
          </p>
        ) : (
          <div className="favorites-list">
            {favorites.map((favorite) => (
              <article key={favorite.id} className="favorite-card">
                <p className="label">Favorite response</p>
                <p>{favorite.content}</p>
              </article>
            ))}
          </div>
        )}
      </article>

      <article className="info-card">
        <h3>Why this toggle matters</h3>
        <p>
          The frontend stays the same, but the selected architecture changes which backend endpoint
          answers the question and how that answer is produced.
        </p>
      </article>
    </div>
  )
}
