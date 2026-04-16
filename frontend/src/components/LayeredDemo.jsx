import { createLayeredRecommendation, layeredSampleProfile } from './model.js'

export function LayeredDemo() {
  const output = createLayeredRecommendation(layeredSampleProfile)

  return (
    <div className="workspace-grid">
      <article className="info-card highlight">
        <h3>Folder idea</h3>
        <ul>
          <li>`src/architectures/layered/presentation/` for UI adapters</li>
          <li>`src/architectures/layered/services/` for orchestration and validation</li>
          <li>`src/architectures/layered/repositories/` for persistence logic</li>
          <li>`src/architectures/layered/domain/` for profile and recommendation models</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Sample flow</h3>
        <ul>
          <li>{output.intake}</li>
          <li>{output.service}</li>
          <li>{output.repository}</li>
          <li>{output.response}</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Suggested classes</h3>
        <ul>
          <li>`HealthProfileForm`</li>
          <li>`ProfileService`</li>
          <li>`RecommendationService`</li>
          <li>`ProfileRepository`</li>
          <li>`UserProfile`</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Why it fits</h3>
        <p>
          This structure is the safest implementation path for your current
          timeline because it maps directly to form input, storage, and chatbot
          response rendering without extra coordination machinery.
        </p>
      </article>
    </div>
  )
}
