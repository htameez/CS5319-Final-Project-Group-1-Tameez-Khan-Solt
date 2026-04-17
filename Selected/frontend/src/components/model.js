export const layeredSampleProfile = {
  name: 'Taylor Lee',
  goals: ['Weight balance', 'Better hydration'],
  medications: ['Vitamin D'],
  question: 'How can I improve my daily routine this week?',
}

export function createLayeredRecommendation(profile) {
  return {
    intake: `Presentation layer captures ${profile.name}'s goals and question through the intake form.`,
    service: `Service layer validates profile data and prepares wellness guidance for goals like ${profile.goals.join(', ')}.`,
    repository: `Repository layer stores profile details, including medications such as ${profile.medications.join(', ')}.`,
    response: `Presentation layer returns a supportive response to: "${profile.question}"`,
  }
}

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
