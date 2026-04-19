export const architectureMeta = {
  layered: {
    key: 'layered',
    name: 'Selected Option',
    title: 'Layered Architecture',
    workspaceTitle: 'Layered Architecture Workspace',
    status: 'Selected architecture',
    summary:
      'API routes call focused services, services coordinate repositories and OpenAI, and profile-aware favorites flow through the selected layered backend.',
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
}
