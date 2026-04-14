export const blackboardSampleState = {
  profile: {
    name: 'Taylor Lee',
    goals: ['Weight balance', 'Better hydration'],
    medications: ['Vitamin D'],
  },
  question: 'How can I improve my daily routine this week?',
}

export function runBlackboardCycle(state) {
  const blackboard = []

  blackboard.push('Profile knowledge source adds age, goals, and medication context.')
  blackboard.push('Safety knowledge source adds non-diagnostic guardrails.')
  blackboard.push('Wellness planner knowledge source adds hydration and activity suggestions.')
  blackboard.push(
    `Controller selects a response for ${state.profile.name} using the accumulated blackboard context.`,
  )

  return blackboard
}
