export function BlackboardDemo() {
  return (
    <div className="workspace-grid">
      <article className="info-card highlight">
        <h3>Backend structure</h3>
        <ul>
          <li>`backend/blackboard/app/api/` is the FastAPI entry layer for chat, profiles, and favorites</li>
          <li>`backend/blackboard/app/core/` contains the controller that drives the blackboard cycle</li>
          <li>`backend/blackboard/app/services/knowledge_sources.py` holds the profile loader, context analyzer, AI generator, and response composer</li>
          <li>`backend/blackboard/app/repositories/` and `db/` persist profiles, chats, and favorites</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Blackboard flow</h3>
        <ul>
          <li>The shared UI writes the profile fields and question into a blackboard chat request.</li>
          <li>The controller triggers knowledge sources to normalize input, load the profile, analyze context, and generate the response.</li>
          <li>The shared knowledge space carries profile context forward into the OpenAI prompt.</li>
          <li>The favorites manager saves chosen assistant messages through the blackboard favorites API.</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Key components</h3>
        <ul>
          <li>`BlackboardState`</li>
          <li>`BlackboardController`</li>
          <li>`Profile Loader` knowledge source</li>
          <li>`AI Response Generator` knowledge source</li>
          <li>`FavoritesManager`</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Why it fits now</h3>
        <p>
          This backend highlights how one request can move through a shared
          state and multiple specialized knowledge sources before the controller
          finalizes the response and persistence steps.
        </p>
      </article>
    </div>
  )
}
