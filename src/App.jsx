import { useState } from 'react'
import './App.css'
import { LayeredDemo } from './architectures/layered/LayeredDemo.jsx'
import { BlackboardDemo } from './architectures/blackboard/BlackboardDemo.jsx'
import { architectureMeta } from './data/architectureMeta.js'

const intakeFields = [
  'Name, date of birth, sex, and contact information',
  'Health goals and current weight',
  'Current medications and other profile context',
]

const capabilities = [
  'Create and update a user health profile through an intake form',
  'Accept health-related questions through a chatbot interface',
  'Use stored profile data to generate personalized guidance',
  'Provide general wellness support outside clinical settings',
  'Present the system as supportive and informational, not a replacement for medical professionals',
]

const behaviorFlow = [
  'User fills out the health form with personal and health-related information',
  'System validates and stores that information in the user profile database',
  'User submits a health-related question in the chatbot interface',
  'System retrieves profile context and generates a tailored response',
]

const proposalAlignment = [
  'Project title and scope match the submitted proposal: AI Healthcare Chatbot',
  'Capabilities reflect intake, profile creation, chatbot interaction, and personalized responses',
  'Safety positioning stays aligned with the proposal by framing the tool as supportive, not diagnostic',
  'Architecture section still supports the final presentation requirement to compare two candidate architectures',
]

const deliverables = [
  'Show both architecture options in the presentation',
  'Clearly state whether one or both are implemented',
  'Include architecture-specific component and class mappings',
  'Show successful compilation or explain the exact build blocker honestly during the demo',
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
            This project is now structured to host both a layered architecture
            and a blackboard architecture. The shared UI stays in one place,
            while each architecture has its own implementation workspace.
          </p>
          <div className="tag-row">
            <span>Proposal-aligned scope</span>
            <span>Dual-architecture workspace</span>
            <span>Shared demo UI</span>
          </div>
        </div>
        <div className="hero-side">
          <div className="summary-card">
            <p className="label">Current view</p>
            <strong>{activeMeta.title}</strong>
          </div>
          <div className="summary-card">
            <p className="label">Repo setup</p>
            <strong>Supports Layered + Blackboard</strong>
          </div>
          <div className="summary-card">
            <p className="label">Build status</p>
            <strong>Pending toolchain fix</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Proposal Overview</p>
          <h2>Core system idea</h2>
        </div>
        <div className="grid-two">
          <article className="info-card">
            <h3>Major capabilities</h3>
            <ul>
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="info-card">
            <h3>Health intake data</h3>
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
          <p className="eyebrow">Operational Flow</p>
          <h2>User interaction and system behavior</h2>
        </div>
        <div className="grid-two">
          <article className="info-card">
            <h3>Main scenario</h3>
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
            <p className="eyebrow">Architecture Workspace</p>
            <h2>Select the implementation path</h2>
          </div>
          <p className="section-note">
            Each architecture now has its own folder, demo model, and mapping
            notes so the repo can grow both cleanly.
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
        {activeArchitecture === 'layered' ? <LayeredDemo /> : <BlackboardDemo />}
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Requirements Check</p>
          <h2>How this structure matches both PDFs</h2>
        </div>
        <div className="grid-two">
          <article className="info-card">
            <h3>Proposal alignment</h3>
            <ul>
              {proposalAlignment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="info-card">
            <h3>Presentation/demo alignment</h3>
            <ul>
              {deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
