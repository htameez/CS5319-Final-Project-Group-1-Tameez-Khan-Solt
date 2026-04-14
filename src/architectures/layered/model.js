export const layeredSampleProfile = {
  name: 'Taylor Lee',
  ageGroup: 'Adult',
  goals: ['Weight balance', 'Better hydration'],
  medications: ['Vitamin D'],
  question: 'How can I improve my daily routine this week?',
}

export function createLayeredRecommendation(profile) {
  const hydrationNote = profile.goals.includes('Better hydration')
    ? 'Aim for consistent water intake across the day.'
    : 'Track fluid intake regularly.'

  return {
    intake: 'Presentation layer collects and displays user profile data.',
    service: 'Service layer validates profile information and prepares AI context.',
    repository: 'Repository layer stores profile data for later retrieval.',
    response: `For ${profile.name}, suggest short walks, regular meals, and a gentle weekly routine. ${hydrationNote}`,
  }
}
