export const architectureMeta = {
  layered: {
    key: 'layered',
    name: 'Option 1',
    title: 'Layered Architecture',
    workspaceTitle: 'Layered Architecture Workspace',
    status: 'Working backend',
    summary:
      'API routes call focused services, services coordinate repositories and OpenAI, and profile-aware favorites flow through the layered backend.',
    pros: [
      'Clear separation between API, service, repository, and domain layers.',
      'Profiles, chat history, and favorites follow a direct request path.',
      'Easy to trace from frontend action to stored database record.',
    ],
    cons: [
      'More centralized orchestration inside service classes.',
      'Less expressive for multi-step reasoning than the blackboard flow.',
    ],
  },
  blackboard: {
    key: 'blackboard',
    name: 'Option 2',
    title: 'Blackboard Architecture',
    workspaceTitle: 'Blackboard Architecture Workspace',
    status: 'Working backend',
    summary:
      'A controller coordinates knowledge sources over a shared blackboard state, including profile loading, context analysis, response generation, and favorites management.',
    pros: [
      'Shows how profile context moves through a shared knowledge space.',
      'Lets specialized knowledge sources contribute to one final answer.',
      'Makes the architecture comparison more distinctive in the demo.',
    ],
    cons: [
      'Requires more coordination between controller, state, and knowledge sources.',
      'The request path is less direct than the layered implementation.',
    ],
  },
}
