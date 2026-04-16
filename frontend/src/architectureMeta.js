export const architectureMeta = {
  layered: {
    key: 'layered',
    name: 'Option 1',
    title: 'Layered Architecture',
    workspaceTitle: 'Layered Architecture Workspace',
    status: 'Implemented path',
    summary:
      'Presentation layer, service layer, repository layer, and domain models organized as a single application.',
    pros: [
      'Simple to understand and present.',
      'Good fit for a course demo and one deployable app.',
      'Easy to map UI, service, and data responsibilities.',
    ],
    cons: [
      'Less flexible for distributed scaling.',
      'Cross-layer changes can still create coupling.',
    ],
  },
  blackboard: {
    key: 'blackboard',
    name: 'Option 2',
    title: 'Blackboard Architecture',
    workspaceTitle: 'Blackboard Architecture Workspace',
    status: 'Alternative path',
    summary:
      'Knowledge sources contribute partial reasoning to a shared blackboard state, coordinated by a controller.',
    pros: [
      'Strong fit for AI-style incremental reasoning.',
      'Lets multiple knowledge sources contribute to one answer.',
      'Useful for comparing different response-generation strategies.',
    ],
    cons: [
      'Harder to explain and implement correctly.',
      'More moving parts for a short classroom demo.',
    ],
  },
}
