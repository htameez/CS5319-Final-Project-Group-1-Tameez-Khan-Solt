import './App.css'
import { BlackboardDemo } from './components/BlackboardDemo.jsx'
import { ChatWorkspace } from './components/ChatWorkspace.jsx'
import { architectureMeta } from './architectureMeta.js'

const intakeFields = [
  'Name plus profile context used by the blackboard frontend bundle',
  'Health goals stored in the unselected backend profile flow',
  'Medications saved and reused in later responses',
]

const capabilities = [
  'Provide a dedicated UI for the unselected blackboard architecture',
  'Create or update profile context before generating wellness guidance',
  'Store chat history and saved favorites in the unselected blackboard backend',
  'Use OpenAI through the backend rather than exposing the key in the frontend',
  'Keep responses supportive and informational rather than diagnostic',
]

const behaviorFlow = [
  'User opens the unselected architecture bundle',
  'The blackboard frontend sends profile fields and the question into the blackboard workflow',
  'The backend stores or loads profile context, calls OpenAI, and persists the chat response',
  'The user can favorite any assistant response and see saved items in the same interface',
]

function App() {
  const activeMeta = architectureMeta.blackboard

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">CS 5319 Final Project</p>
          <h1>AI Healthcare Chatbot</h1>
          <p className="hero-text">
            This bundle contains the unselected blackboard architecture for the
            AI healthcare chatbot. The frontend and backend are grouped together
            so the alternative option can be run and demonstrated as one
            complete architectural package.
          </p>
          <div className="tag-row">
            <span>Dedicated React UI</span>
            <span>Blackboard frontend + backend</span>
            <span>Profiles, chat, and favorites</span>
          </div>
        </div>
        <div className="hero-side">
          <div className="summary-card">
            <p className="label">Current view</p>
            <strong>{activeMeta.title}</strong>
          </div>
          <div className="summary-card">
            <p className="label">Repo setup</p>
            <strong>Unselected architecture bundle</strong>
          </div>
          <div className="summary-card">
            <p className="label">Current status</p>
            <strong>Chat and favorites wired in this bundle</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Current Scope</p>
          <h2>What this version of the project does</h2>
        </div>
        <div className="grid-two">
          <article className="info-card">
            <h3>Implemented capabilities</h3>
            <ul>
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="info-card">
            <h3>Profile inputs used at runtime</h3>
            <ul>
              {intakeFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Runtime Flow</p>
          <h2>How this unselected bundle works</h2>
        </div>
        <div className="grid-two">
          <article className="info-card">
            <h3>Main user journey</h3>
            <ol>
              {behaviorFlow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>
          <article className="info-card">
            <h3>Safety boundary</h3>
            <p>
              The chatbot should complement healthcare support, not replace
              medical professionals. That boundary still applies to this
              unselected architecture bundle.
            </p>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Unselected Architecture</p>
          <h2>{activeMeta.workspaceTitle}</h2>
        </div>
        <ChatWorkspace architecture={activeMeta.key} meta={activeMeta} />
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Architecture Notes</p>
          <h2>How the unselected backend is currently organized</h2>
        </div>
        <BlackboardDemo />
      </section>
    </main>
  )
}

export default App
