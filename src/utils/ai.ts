import type { Urgency, HelpCategory, IssueCategory } from '@/types';

const skillMap: Record<string, string[]> = {
  'Food': ['Shopping', 'Food', 'Elderly Assistance'],
  'Education': ['Teaching', 'Education', 'Mathematics'],
  'Elderly Assistance': ['Elderly Assistance', 'Shopping', 'Household Help'],
  'Medical Assistance': ['Medical Assistance', 'Healthcare', 'Transportation'],
  'Transportation': ['Transportation', 'Household Help'],
  'Digital Help': ['Digital Help', 'Digital Assistance', 'Teaching'],
  'Household Help': ['Household Help', 'Transportation'],
  'Animal Assistance': ['Animal Assistance'],
  'Shopping': ['Shopping', 'Transportation', 'Food'],
  'Childcare': ['Childcare', 'Teaching'],
  'Other': ['Household Help'],
};

const urgencyKeywords: Record<string, Urgency> = {
  'urgent': 'Urgent', 'emergency': 'Urgent', 'immediately': 'Urgent', 'asap': 'Urgent',
  'quick': 'High', 'fast': 'High', 'today': 'High', 'now': 'High',
  'soon': 'Medium', 'this week': 'Medium', 'tomorrow': 'Medium',
  'whenever': 'Low', 'no rush': 'Low', 'flexible': 'Low',
};

export function analyzeHelpRequest(description: string): {
  category: HelpCategory;
  urgency: Urgency;
  skill: string;
} {
  const lower = description.toLowerCase();
  let category: HelpCategory = 'Other';

  const categoryChecks: { cat: HelpCategory; keywords: string[] }[] = [
    { cat: 'Food', keywords: ['food', 'grocery', 'groceries', 'meal', 'hungry', 'cook'] },
    { cat: 'Education', keywords: ['tutor', 'study', 'homework', 'exam', 'student', 'math', 'learn', 'teach'] },
    { cat: 'Elderly Assistance', keywords: ['elderly', 'senior', 'old', 'grandparent', 'aged'] },
    { cat: 'Medical Assistance', keywords: ['medical', 'doctor', 'hospital', 'blood', 'sick', 'appointment', 'medicine'] },
    { cat: 'Transportation', keywords: ['ride', 'transport', 'drive', 'pickup', 'drop', 'vehicle', 'car'] },
    { cat: 'Digital Help', keywords: ['computer', 'internet', 'online', 'email', 'phone', 'app', 'digital', 'banking', 'upi'] },
    { cat: 'Household Help', keywords: ['furniture', 'move', 'clean', 'repair', 'house', 'household'] },
    { cat: 'Animal Assistance', keywords: ['dog', 'cat', 'animal', 'pet', 'walk'] },
    { cat: 'Shopping', keywords: ['shop', 'buy', 'store', 'purchase', 'market'] },
    { cat: 'Childcare', keywords: ['child', 'kid', 'baby', 'toddler', 'childcare', 'babysit'] },
  ];

  for (const check of categoryChecks) {
    if (check.keywords.some(kw => lower.includes(kw))) {
      category = check.cat;
      break;
    }
  }

  let urgency: Urgency = 'Medium';
  for (const [kw, level] of Object.entries(urgencyKeywords)) {
    if (lower.includes(kw)) {
      urgency = level;
      break;
    }
  }

  const skills = skillMap[category] || ['General Help'];

  return { category, urgency, skill: skills[0] };
}

export function analyzeCivicImage(): {
  detection: string;
  confidence: number;
  category: IssueCategory;
  priority: Urgency;
} {
  return {
    detection: 'Possible pothole',
    confidence: 94,
    category: 'Road Damage',
    priority: 'High',
  };
}

export function calculateMatchScore(
  volunteerSkills: string[],
  requiredSkills: string[],
  distance: number,
  availability: string,
  requiredTime: string,
  rating: number,
  points: number,
): { score: number; reason: string } {
  const skillMatch = requiredSkills.filter(s =>
    volunteerSkills.some(vs => vs.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(vs.toLowerCase()))
  ).length;
  const skillScore = requiredSkills.length > 0 ? (skillMatch / requiredSkills.length) * 30 : 15;

  const distanceScore = Math.max(0, 30 - distance * 3);

  const availScore = availability.toLowerCase().includes(requiredTime.toLowerCase()) ||
    availability === 'Flexible' || requiredTime === 'Today' ? 20 : 10;

  const contributionScore = Math.min(10, points / 100);

  const urgencyScore = Math.min(10, rating * 2);

  const total = Math.round(skillScore + distanceScore + availScore + contributionScore + urgencyScore);
  const clamped = Math.min(99, Math.max(50, total));

  const reasons: string[] = [];
  if (distance < 2) reasons.push('you are nearby');
  if (skillMatch > 0) reasons.push('your skills match');
  if (availScore === 20) reasons.push('you are available');
  if (rating >= 4.7) reasons.push('your excellent track record');

  const reason = reasons.length > 0
    ? `Matched because ${reasons.join(', ')}.`
    : 'Matched based on your profile and availability.';

  return { score: clamped, reason };
}

export function generateAIResponse(query: string, context: {
  resources: { name: string; category: string; distance: number; address: string }[];
  requests: { title: string; distance: number; category: string }[];
  issues: { title: string; distance: number; status: string }[];
}): string {
  const lower = query.toLowerCase();

  if (lower.includes('blood')) {
    const bloodBank = context.resources.find(r => r.category === 'Blood Donation');
    if (bloodBank) return `${bloodBank.name} is ${bloodBank.distance} km away at ${bloodBank.address}. They're open 24/7 for blood donation. You can contact them to schedule a donation.`;
  }
  if (lower.includes('volunteer') || lower.includes('opportunity') || lower.includes('help someone')) {
    const nearby = context.requests.filter(r => r.distance < 3).slice(0, 3);
    if (nearby.length > 0) return `There are ${nearby.length} volunteer opportunities near you: ${nearby.map(r => `${r.title} (${r.distance} km, ${r.category})`).join(', ')}. Would you like to help with any of these?`;
  }
  if (lower.includes('pothole') || lower.includes('report') || lower.includes('civic')) {
    return 'To report a civic issue, click the "Report Issue" button in the navigation or on the home page. You can upload a photo and our AI will automatically detect the issue type. The report goes to the civic issues page for community verification.';
  }
  if (lower.includes('education') || lower.includes('learn') || lower.includes('study') || lower.includes('library')) {
    const edu = context.resources.filter(r => r.category === 'Education' || r.category === 'Libraries');
    if (edu.length > 0) return `Educational resources near you: ${edu.map(r => `${r.name} (${r.distance} km)`).join(', ')}. These offer free services for community members.`;
  }
  if (lower.includes('food') || lower.includes('hungry') || lower.includes('meal')) {
    const food = context.resources.find(r => r.category === 'Food');
    if (food) return `${food.name} is ${food.distance} km away. They provide meals to those in need. You can also create a food help request on the platform.`;
  }
  if (lower.includes('medical') || lower.includes('doctor') || lower.includes('hospital') || lower.includes('health')) {
    const health = context.resources.find(r => r.category === 'Healthcare');
    if (health) return `${health.name} is ${health.distance} km away at ${health.address}. They provide 24/7 emergency services.`;
  }
  if (lower.includes('animal') || lower.includes('dog') || lower.includes('pet')) {
    const animal = context.resources.find(r => r.category === 'Animal Care');
    if (animal) return `${animal.name} is ${animal.distance} km away. They provide rescue, adoption, and veterinary services.`;
  }
  if (lower.includes('challenge') || lower.includes('badge') || lower.includes('point')) {
    return 'You can earn points by helping others, completing volunteer tasks, reporting civic issues, and joining community challenges. Check the Challenges page for active challenges and the Impact page to see your contribution.';
  }
  if (lower.includes('issue') || lower.includes('problem')) {
    const openIssues = context.issues.filter(i => i.status !== 'Resolved').slice(0, 3);
    if (openIssues.length > 0) return `There are ${openIssues.length} open civic issues near you: ${openIssues.map(i => `${i.title} (${i.distance} km, ${i.status})`).join(', ')}. You can confirm or add information to help resolve them.`;
  }

  return 'I can help you find volunteer opportunities, locate community resources, report civic issues, or answer questions about Sahayog. Try asking about nearby help requests, blood donation centers, educational resources, or how to report a problem in your area.';
}
