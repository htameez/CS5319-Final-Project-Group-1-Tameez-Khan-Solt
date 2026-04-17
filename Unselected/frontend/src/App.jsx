import { useState } from 'react'
import './App.css'
import { LayeredDemo } from './components/LayeredDemo.jsx'
import { BlackboardDemo } from './components/BlackboardDemo.jsx'
import { ChatWorkspace } from './components/ChatWorkspace.jsx'
import { architectureMeta } from './architectureMeta.js'

const intakeFields = [
  'Name plus profile context used by both architectures',
  'Health goals stored in the selected backend profile flow',
  'Medications saved and reused in later responses',
]

const capabilities = [
  'Switch between layered and blackboard backends from one shared chat UI',
  'Create or update profile context before generating wellness guidance',
  'Store chat history and saved favorites in the selected architecture',
  'Use OpenAI through the backend rather than exposing the key in the frontend',
  'Keep responses supportive and informational rather than diagnostic',
]

const behaviorFlow = [
  'User selects either the layered or blackboard backend',
  'Shared chat UI sends profile fields and the question to the selected architecture',
  'The backend stores or loads profile context, calls OpenAI, and persists the chat response',
  'The user can favorite any assistant response and see saved items in the same interface',
]

function ArchitectureCard({ option, isActive, onSelect }) {
  return (
    <article
      className={`architecture-card ${option.key === 'layered' ? 'is-implemented' : 'is-secondary'}`}
    >
      <div className="card-top">
        <span className="pill">{option.status}</span>
        <span className="card-name">{option.name}</span>
      </div>
      <h3>{option.title}</h3>
      <p>{option.summary}</p>
      <div className="two-col">
        <div>
          <p className="label">Pros</p>
          <ul>
            {option.pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Cons</p>
          <ul>
            {option.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className={`switch-button ${isActive ? 'active' : ''}`}
        type="button"
        onClick={() => onSelect(option.key)}
      >
        {isActive ? 'Currently selected' : `Open ${option.name} workspace`}
      </button>
    </article>
  )
}

function App() {
  const [activeArchitecture, setActiveArchitecture] = useState('layered')
  const activeMeta = architectureMeta[activeArchitecture]

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">CS 5319 Final Project</p>
          <h1>AI Healthcare Chatbot</h1>
          <p className="hero-text">
            This app compares two working backend architectures for the same AI
            healthcare chatbot. The frontend stays shared, while the selected
            backend controls how profiles, chat generation, and favorites are
            processed and stored.
          </p>
          <div className="tag-row">
            <span>Shared React UI</span>
            <span>Layered + Blackboard backends</span>
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
            <strong>Two live backend implementations</strong>
          </div>
          <div className="summary-card">
            <p className="label">Current status</p>
            <strong>Chat and favorites wired in both modes</strong>
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
          <h2>How the shared UI and backends interact</h2>
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
              medical professionals. That boundary stays shared across both
              architecture implementations.
            </p>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Architecture Switcher</p>
            <h2>Select the backend implementation</h2>
          </div>
          <p className="section-note">
            Both options now support profile-aware chat and saved favorites, but
            they organize responsibility differently under the hood.
          </p>
        </div>
        <div className="grid-two">
          {Object.values(architectureMeta).map((option) => (
            <ArchitectureCard
              key={option.key}
              option={option}
              isActive={activeArchitecture === option.key}
              onSelect={setActiveArchitecture}
            />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Active Implementation</p>
          <h2>{activeMeta.workspaceTitle}</h2>
        </div>
        <ChatWorkspace
          key={activeArchitecture}
          architecture={activeArchitecture}
          meta={activeMeta}
        />
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Architecture Notes</p>
          <h2>How the selected backend is currently organized</h2>
        </div>
        {activeArchitecture === 'layered' ? <LayeredDemo /> : <BlackboardDemo />}
      </section>
    </main>
  )
}

export default App
