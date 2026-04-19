export function LayeredDemo() {
  return (
    <div className="workspace-grid">
      <article className="info-card highlight">
        <h3>Backend structure</h3>
        <ul>
          <li>`selected/backend/app/api/` exposes REST routes for profiles, chat, and favorites</li>
          <li>`selected/backend/app/services/` contains `ProfileService`, `ChatService`, and `FavoriteService`</li>
          <li>`selected/backend/app/repositories/` isolates SQL persistence logic</li>
          <li>`selected/backend/app/models/` defines the domain entities and request schemas</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Layered flow</h3>
        <ul>
          <li>The selected frontend sends profile fields to the layered profile endpoints before chat.</li>
          <li>`ChatService` loads the stored profile and asks `OpenAIService` for a response.</li>
          <li>Repositories persist chat history and favorites in the layered database.</li>
          <li>The frontend can favorite any assistant message through the layered favorites service.</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Key components</h3>
        <ul>
          <li>`ProfileService`</li>
          <li>`ChatService`</li>
          <li>`OpenAIService`</li>
          <li>`FavoriteService`</li>
          <li>`ProfileRepository`</li>
          <li>`UserProfile`</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Why it fits now</h3>
        <p>
          This backend is the more direct implementation path: API routes call
          focused services, services coordinate repositories and OpenAI, and the
          request flow is easy to trace from UI event to database write.
        </p>
      </article>
    </div>
  )
}
