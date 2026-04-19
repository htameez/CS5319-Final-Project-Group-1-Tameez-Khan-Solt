export const architectureMeta = {
  blackboard: {
    key: 'blackboard',
    name: 'Unselected Option',
    title: 'Blackboard Architecture',
    workspaceTitle: 'Blackboard Architecture Workspace',
    status: 'Unselected architecture',
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
