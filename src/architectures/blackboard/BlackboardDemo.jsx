import { blackboardSampleState, runBlackboardCycle } from './model.js'

export function BlackboardDemo() {
  const cycle = runBlackboardCycle(blackboardSampleState)

  return (
    <div className="workspace-grid">
      <article className="info-card highlight">
        <h3>Folder idea</h3>
        <ul>
          <li>`src/architectures/blackboard/core/` for blackboard state and controller</li>
          <li>`src/architectures/blackboard/knowledgeSources/` for independent reasoning modules</li>
          <li>`src/architectures/blackboard/models/` for shared message and profile objects</li>
          <li>`src/architectures/blackboard/adapters/` for UI and storage bridges</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Sample flow</h3>
        <ul>
          {cycle.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <article className="info-card">
        <h3>Suggested classes</h3>
        <ul>
          <li>`BlackboardState`</li>
          <li>`BlackboardController`</li>
          <li>`ProfileKnowledgeSource`</li>
          <li>`SafetyKnowledgeSource`</li>
          <li>`WellnessPlannerKnowledgeSource`</li>
        </ul>
      </article>
      <article className="info-card">
        <h3>Why it fits</h3>
        <p>
          This alternative is useful if you want to emphasize AI reasoning and
          multiple contributors to one answer, which makes it a strong
          comparison candidate for the final presentation.
        </p>
      </article>
    </div>
  )
}
