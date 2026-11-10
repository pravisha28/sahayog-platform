import type {
  AppUser, HelpRequest, CivicIssue, CommunityResource, Challenge,
  Notification, Conversation, Organization, Badge, MapMarker, FeedItem,
} from '@/types';

export const currentUser: AppUser = {
  id: 'u1',
  name: 'Priya Sharma',
  avatar: 'PS',
  rating: 4.9,
  level: 4,
  points: 840,
  verified: true,
  skills: ['Mathematics', 'Digital Assistance', 'Shopping', 'Teaching'],
  availability: 'Weekends',
  bio: 'Passionate about helping my community. Love teaching and supporting elderly neighbors.',
  location: 'Kothrud, Pune',
  joinedDate: 'March 2024',
};

export const users: AppUser[] = [
  currentUser,
  { id: 'u2', name: 'Aarav Patil', avatar: 'AP', rating: 4.9, level: 4, points: 920, verified: true, skills: ['Shopping', 'Transportation'], availability: 'Today', bio: 'Always ready to lend a hand.', location: 'Baner, Pune', joinedDate: 'Jan 2024' },
  { id: 'u3', name: 'Rohan Deshmukh', avatar: 'RD', rating: 4.7, level: 3, points: 560, verified: true, skills: ['Education', 'Teaching'], availability: 'Weekends', bio: 'Teacher by profession, volunteer by passion.', location: 'Aundh, Pune', joinedDate: 'Feb 2024' },
  { id: 'u4', name: 'Sneha Kulkarni', avatar: 'SK', rating: 4.8, level: 4, points: 780, verified: true, skills: ['Medical Assistance', 'Healthcare'], availability: 'Evenings', bio: 'Nurse who volunteers after hours.', location: 'Viman Nagar, Pune', joinedDate: 'Dec 2023' },
  { id: 'u5', name: 'Vikram Joshi', avatar: 'VJ', rating: 4.6, level: 3, points: 480, verified: true, skills: ['Transportation', 'Household Help'], availability: 'Weekends', bio: 'Truck owner, happy to help with moving.', location: 'Wakad, Pune', joinedDate: 'March 2024' },
  { id: 'u6', name: 'Ananya Iyer', avatar: 'AI', rating: 5.0, level: 5, points: 1240, verified: true, skills: ['Education', 'Childcare', 'Digital Help'], availability: 'Flexible', bio: 'Sahayog Hero! Been here since the beginning.', location: 'Koregaon Park, Pune', joinedDate: 'Nov 2023' },
  { id: 'u7', name: 'Karan Mehta', avatar: 'KM', rating: 4.5, level: 2, points: 340, verified: false, skills: ['Animal Assistance'], availability: 'Weekends', bio: 'Animal lover and rescuer.', location: 'Hadapsar, Pune', joinedDate: 'May 2024' },
  { id: 'u8', name: 'Deepa Nair', avatar: 'DN', rating: 4.8, level: 4, points: 710, verified: true, skills: ['Elderly Assistance', 'Shopping', 'Food'], availability: 'Mornings', bio: 'Retired teacher, helping seniors.', location: 'Kothrud, Pune', joinedDate: 'Jan 2024' },
  { id: 'u9', name: 'Arjun Reddy', avatar: 'AR', rating: 4.7, level: 3, points: 520, verified: true, skills: ['Transportation', 'Medical Assistance'], availability: 'Evenings', bio: 'Always available for medical runs.', location: 'Kharadi, Pune', joinedDate: 'Feb 2024' },
  { id: 'u10', name: 'Meera Agarwal', avatar: 'MA', rating: 4.9, level: 4, points: 850, verified: true, skills: ['Teaching', 'Digital Help', 'Education'], availability: 'Weekends', bio: 'Software engineer who loves teaching kids.', location: 'Shivajinagar, Pune', joinedDate: 'Dec 2023' },
  { id: 'u11', name: 'Sahil Khan', avatar: 'SH', rating: 4.4, level: 2, points: 280, verified: false, skills: ['Household Help'], availability: 'Flexible', bio: 'New to the community, eager to help.', location: 'Baner, Pune', joinedDate: 'June 2024' },
  { id: 'u12', name: 'Pooja Shinde', avatar: 'PS', rating: 4.8, level: 3, points: 610, verified: true, skills: ['Food', 'Shopping', 'Elderly Assistance'], availability: 'Weekdays', bio: 'Grocery store owner, helps neighbors.', location: 'FC Road, Pune', joinedDate: 'Jan 2024' },
  { id: 'u13', name: 'Rahul Verma', avatar: 'RV', rating: 4.6, level: 3, points: 490, verified: true, skills: ['Transportation', 'Household Help'], availability: 'Weekends', bio: 'Weekend warrior for community tasks.', location: 'Aundh, Pune', joinedDate: 'March 2024' },
  { id: 'u14', name: 'Sara Dsouza', avatar: 'SD', rating: 4.9, level: 4, points: 800, verified: true, skills: ['Childcare', 'Teaching', 'Digital Help'], availability: 'Flexible', bio: 'Preschool teacher and community advocate.', location: 'Viman Nagar, Pune', joinedDate: 'Nov 2023' },
  { id: 'u15', name: 'Aditya Pawar', avatar: 'AP', rating: 4.5, level: 2, points: 310, verified: false, skills: ['Animal Assistance', 'Transportation'], availability: 'Weekends', bio: 'College student who loves animals.', location: 'Wakad, Pune', joinedDate: 'July 2024' },
];

export const helpRequests: HelpRequest[] = [
  {
    id: 'hr1', title: 'Grocery Assistance Needed', description: 'An elderly resident nearby needs assistance collecting groceries from the nearby store. Unable to carry heavy bags due to arthritis.', category: 'Elderly Assistance', urgency: 'Medium', status: 'Posted', location: 'Kothrud', distance: 1.4, estimatedTime: '45 minutes', requiredDate: 'Today', postedBy: users[7], postedAt: '1 hour ago', points: 50,
    matchedVolunteers: [
      { volunteer: users[1], score: 92, reason: 'Nearby, available today, and has grocery assistance experience.', distance: 1.1 },
      { volunteer: users[11], score: 87, reason: 'Skilled in shopping and elderly assistance, close by.', distance: 1.6 },
      { volunteer: users[7], score: 83, reason: 'Experienced with elderly care and available this morning.', distance: 0.8 },
      { volunteer: users[4], score: 71, reason: 'Available weekends with transportation skills.', distance: 2.1 },
      { volunteer: users[12], score: 68, reason: 'Nearby with household help experience.', distance: 1.9 },
    ],
  },
  {
    id: 'hr2', title: 'Mathematics Tutoring Needed', description: 'A 10th-grade student living 1.8 km away needs help with algebra and geometry for upcoming board exams. 2-hour sessions.', category: 'Education', urgency: 'Medium', status: 'Posted', location: 'Shivajinagar', distance: 1.8, estimatedTime: '2 hours', requiredDate: 'Tomorrow', postedBy: users[9], postedAt: '3 hours ago', points: 100,
    matchedVolunteers: [
      { volunteer: users[5], score: 94, reason: 'Expert educator, nearby, and available this weekend.', distance: 1.5 },
      { volunteer: users[2], score: 89, reason: 'Teaching professional with math skills.', distance: 2.0 },
      { volunteer: users[9], score: 91, reason: 'Software engineer who loves teaching, highly rated.', distance: 1.2 },
    ],
  },
  {
    id: 'hr3', title: 'Ride to Medical Appointment', description: 'Need transportation to a doctor\'s appointment at Ruby Hall Clinic. No personal vehicle available.', category: 'Medical Assistance', urgency: 'High', status: 'Posted', location: 'Viman Nagar', distance: 3.2, estimatedTime: '1.5 hours', requiredDate: 'Today', postedBy: users[3], postedAt: '30 minutes ago', points: 150,
    matchedVolunteers: [
      { volunteer: users[8], score: 90, reason: 'Medical transportation experience, available evenings.', distance: 2.8 },
      { volunteer: users[4], score: 78, reason: 'Has transportation, available weekends.', distance: 3.5 },
    ],
  },
  {
    id: 'hr4', title: 'Help with Digital Forms', description: 'Senior citizen needs help filling out online government forms for pension scheme.', category: 'Digital Help', urgency: 'Low', status: 'Posted', location: 'Aundh', distance: 2.5, estimatedTime: '1 hour', requiredDate: 'This week', postedBy: users[2], postedAt: '5 hours ago', points: 50,
    matchedVolunteers: [
      { volunteer: users[9], score: 88, reason: 'Digital help expert, available weekends.', distance: 2.2 },
      { volunteer: users[5], score: 85, reason: 'Digital assistance skills, flexible availability.', distance: 3.0 },
    ],
  },
  {
    id: 'hr5', title: 'Childcare for Working Parent', description: 'Single mother needs someone to watch her 5-year-old for 3 hours during a job interview.', category: 'Childcare', urgency: 'High', status: 'Posted', location: 'Koregaon Park', distance: 4.1, estimatedTime: '3 hours', requiredDate: 'Thursday', postedBy: users[5], postedAt: '2 hours ago', points: 150,
    matchedVolunteers: [
      { volunteer: users[13], score: 93, reason: 'Preschool teacher with childcare expertise.', distance: 3.8 },
    ],
  },
  {
    id: 'hr6', title: 'Help Moving Furniture', description: 'Need help moving a few pieces of furniture within the apartment. 2 people needed.', category: 'Household Help', urgency: 'Low', status: 'Posted', location: 'Baner', distance: 2.8, estimatedTime: '2 hours', requiredDate: 'Saturday', postedBy: users[1], postedAt: '6 hours ago', points: 100,
    matchedVolunteers: [
      { volunteer: users[4], score: 82, reason: 'Household help experience, available weekends.', distance: 2.5 },
      { volunteer: users[12], score: 75, reason: 'Nearby with transportation and household skills.', distance: 3.0 },
    ],
  },
  {
    id: 'hr7', title: 'Dog Walking Assistance', description: 'Elderly resident with mobility issues needs someone to walk their Labrador daily for a week.', category: 'Animal Assistance', urgency: 'Low', status: 'Posted', location: 'Hadapsar', distance: 5.2, estimatedTime: '45 min daily', requiredDate: 'This week', postedBy: users[6], postedAt: '8 hours ago', points: 50,
    matchedVolunteers: [
      { volunteer: users[14], score: 86, reason: 'Animal assistance experience, available weekends.', distance: 4.8 },
    ],
  },
  {
    id: 'hr8', title: 'Food Delivery for Sick Neighbor', description: 'Neighbor down with flu. Need someone to deliver home-cooked meals for 3 days.', category: 'Food', urgency: 'Medium', status: 'Accepted', location: 'FC Road', distance: 1.9, estimatedTime: '30 min daily', requiredDate: 'Today', postedBy: users[11], postedAt: '1 day ago', acceptedBy: 'u8', points: 50 },
  {
    id: 'hr9', title: 'Teach Basic Computer Skills', description: 'Help a 65-year-old learn basic email and video calling to stay in touch with family abroad.', category: 'Digital Help', urgency: 'Low', status: 'Completed', location: 'Wakad', distance: 3.5, estimatedTime: '4 sessions', requiredDate: 'Completed', postedBy: users[4], postedAt: '2 weeks ago', acceptedBy: 'u1', points: 100 },
  {
    id: 'hr10', title: 'Emergency Blood Donation', description: 'B+ blood needed urgently at Sahyadri Hospital for a surgery patient.', category: 'Medical Assistance', urgency: 'Urgent', status: 'Completed', location: 'Kharadi', distance: 6.1, estimatedTime: '1 hour', requiredDate: 'Completed', postedBy: users[8], postedAt: '3 days ago', acceptedBy: 'u3', points: 150 },
  {
    id: 'hr11', title: 'School Supply Shopping', description: 'Need help buying and delivering school supplies for underprivileged kids in the area.', category: 'Shopping', urgency: 'Medium', status: 'Posted', location: 'Shivajinagar', distance: 2.2, estimatedTime: '2 hours', requiredDate: 'This weekend', postedBy: users[2], postedAt: '4 hours ago', points: 100 },
  {
    id: 'hr12', title: 'Accompany Elderly to Bank', description: 'Need someone to accompany my elderly father to the bank for account-related work.', category: 'Elderly Assistance', urgency: 'Medium', status: 'Posted', location: 'Aundh', distance: 2.0, estimatedTime: '1.5 hours', requiredDate: 'Tomorrow', postedBy: users[2], postedAt: '7 hours ago', points: 50 },
  {
    id: 'hr13', title: 'Help Set Up Online Banking', description: 'Need help setting up UPI and mobile banking. Not tech-savvy.', category: 'Digital Help', urgency: 'Low', status: 'Completed', location: 'Kothrud', distance: 0.9, estimatedTime: '1 hour', requiredDate: 'Completed', postedBy: users[7], postedAt: '1 week ago', acceptedBy: 'u1', points: 50 },
  { id: 'hr14', title: 'Transport to Railway Station', description: 'Need a ride to Pune Junction with 2 large suitcases. Early morning at 5 AM.', category: 'Transportation', urgency: 'Medium', status: 'Completed', location: 'Viman Nagar', distance: 3.8, estimatedTime: '45 minutes', requiredDate: 'Completed', postedBy: users[3], postedAt: '2 weeks ago', acceptedBy: 'u4', points: 100 },
  { id: 'hr15', title: 'Read Aloud for Visually Impaired', description: 'Need a volunteer to read study material for a visually impaired college student.', category: 'Education', urgency: 'Medium', status: 'In Progress', location: 'Koregaon Park', distance: 4.5, estimatedTime: '2 hours weekly', requiredDate: 'Ongoing', postedBy: users[5], postedAt: '5 days ago', acceptedBy: 'u9', points: 100 },
];

export const civicIssues: CivicIssue[] = [
  { id: 'ci1', title: 'Large Pothole', description: 'Large pothole on the main road causing traffic congestion and vehicle damage. Gets worse with rain.', category: 'Potholes', status: 'In Progress', priority: 'High', location: 'Shivajinagar', distance: 1.2, reportedAt: '2 hours ago', reportedBy: users[0], affectedCount: 12, confirmedBy: ['u2', 'u3', 'u5', 'u8', 'u10', 'u12', 'u14'] },
  { id: 'ci2', title: 'Streetlight Not Working', description: 'Streetlight near the park has been non-functional for a week, making the area unsafe at night.', category: 'Streetlights', status: 'Resolved', priority: 'Medium', location: 'FC Road', distance: 2.4, reportedAt: '1 week ago', reportedBy: users[11], affectedCount: 8, confirmedBy: ['u1', 'u3', 'u7'] },
  { id: 'ci3', title: 'Garbage Not Collected', description: 'Garbage has not been collected from our area for 5 days. Pile is growing and causing odor.', category: 'Garbage', status: 'Assigned', priority: 'High', location: 'Kothrud', distance: 0.8, reportedAt: '1 day ago', reportedBy: users[7], affectedCount: 25, confirmedBy: ['u1', 'u2', 'u5', 'u8', 'u11', 'u12'] },
  { id: 'ci4', title: 'Water Pipeline Leakage', description: 'Continuous water leakage from underground pipe near housing society. Wasting water daily.', category: 'Water Leakage', status: 'Verified', priority: 'High', location: 'Baner', distance: 2.9, reportedAt: '3 days ago', reportedBy: users[1], affectedCount: 15, confirmedBy: ['u4', 'u11', 'u13'] },
  { id: 'ci5', title: 'Traffic Signal Malfunction', description: 'Traffic signal at main intersection is stuck on red, causing massive jams during peak hours.', category: 'Traffic', status: 'Reported', priority: 'Urgent', location: 'Viman Nagar', distance: 3.5, reportedAt: '3 hours ago', reportedBy: users[3], affectedCount: 40, confirmedBy: ['u8', 'u9'] },
  { id: 'ci6', title: 'Fallen Tree Blocking Road', description: 'Large tree branch has fallen and is blocking half the road after yesterday\'s storm.', category: 'Trees', status: 'Assigned', priority: 'Medium', location: 'Aundh', distance: 2.5, reportedAt: '1 day ago', reportedBy: users[2], affectedCount: 6, confirmedBy: ['u5', 'u12'] },
  { id: 'ci7', title: 'Road Crack Near School', description: 'Wide crack in the road right outside the school gate. Dangerous for children crossing.', category: 'Road Damage', status: 'In Progress', priority: 'High', location: 'Wakad', distance: 4.2, reportedAt: '4 days ago', reportedBy: users[4], affectedCount: 18, confirmedBy: ['u7', 'u14', 'u15'] },
  { id: 'ci8', title: 'Stray Dog Menace', description: 'Group of aggressive stray dogs near the bus stop. Has bitten two people this week.', category: 'Animal Issues', status: 'Verified', priority: 'Medium', location: 'Hadapsar', distance: 5.1, reportedAt: '2 days ago', reportedBy: users[6], affectedCount: 9, confirmedBy: ['u15'] },
  { id: 'ci9', title: 'Broken Public Bench', description: 'Public bench at the bus stop is broken with sharp edges. Risk of injury.', category: 'Public Infrastructure', status: 'Reported', priority: 'Low', location: 'Koregaon Park', distance: 4.8, reportedAt: '5 hours ago', reportedBy: users[5], affectedCount: 3, confirmedBy: [] },
  { id: 'ci10', title: 'No Streetlight in Alley', description: 'Entire alley behind the market has no streetlights. Multiple incidents reported.', category: 'Streetlights', status: 'Assigned', priority: 'Medium', location: 'Kharadi', distance: 6.0, reportedAt: '6 days ago', reportedBy: users[8], affectedCount: 14, confirmedBy: ['u9', 'u13'] },
  { id: 'ci11', title: 'Overflowing Drain', description: 'Drain is overflowing near the vegetable market, creating unhygienic conditions.', category: 'Garbage', status: 'In Progress', priority: 'High', location: 'FC Road', distance: 2.1, reportedAt: '3 days ago', reportedBy: users[11], affectedCount: 22, confirmedBy: ['u1', 'u2', 'u7', 'u10'] },
  { id: 'ci12', title: 'Damaged Footpath', description: 'Footpath tiles are broken and uneven. Elderly pedestrians have tripped multiple times.', category: 'Road Damage', status: 'Resolved', priority: 'Medium', location: 'Shivajinagar', distance: 1.5, reportedAt: '2 weeks ago', reportedBy: users[9], affectedCount: 7, confirmedBy: ['u1', 'u3', 'u6'] },
  { id: 'ci13', title: 'Illegal Hoarding on Road', description: 'Large illegal advertising hoarding blocking view at the junction. Safety hazard.', category: 'Public Infrastructure', status: 'Reported', priority: 'Low', location: 'Baner', distance: 2.7, reportedAt: '8 hours ago', reportedBy: users[1], affectedCount: 2, confirmedBy: [] },
  { id: 'ci14', title: 'Dead Streetlight Near Park', description: 'Streetlight near children\'s park entrance not working for 2 weeks.', category: 'Streetlights', status: 'Verified', priority: 'Medium', location: 'Aundh', distance: 2.3, reportedAt: '4 days ago', reportedBy: users[2], affectedCount: 11, confirmedBy: ['u5', 'u13'] },
  { id: 'ci15', title: 'Open Manhole', description: 'Manhole cover missing on the sidewalk. Extremely dangerous, especially at night.', category: 'Public Infrastructure', status: 'In Progress', priority: 'Urgent', location: 'Viman Nagar', distance: 3.6, reportedAt: '1 day ago', reportedBy: users[3], affectedCount: 30, confirmedBy: ['u4', 'u8', 'u9', 'u14'] },
];

export const resources: CommunityResource[] = [
  { id: 'r1', name: 'Pune Community Library', category: 'Libraries', address: 'FC Road, Shivajinagar', distance: 2.3, contact: '+91 98765 43210', hours: 'Open until 7 PM', rating: 4.7, description: 'Free library with over 10,000 books and study spaces.', verified: true },
  { id: 'r2', name: 'Ruby Hall Medical Center', category: 'Healthcare', address: 'Sassoon Road, Pune', distance: 3.8, contact: '+91 98220 12345', hours: '24/7 Emergency', rating: 4.5, description: 'Multi-specialty hospital with emergency services.', verified: true },
  { id: 'r3', name: 'Annadata Food Bank', category: 'Food', address: 'Kothrud, Pune', distance: 1.1, contact: '+91 99230 11223', hours: '9 AM - 8 PM', rating: 4.8, description: 'Community food bank providing meals to those in need.', verified: true },
  { id: 'r4', name: 'Pune Skill Development Center', category: 'Education', address: 'Aundh, Pune', distance: 2.6, contact: '+91 98765 67890', hours: '10 AM - 6 PM', rating: 4.4, description: 'Free vocational training and skill development courses.', verified: true },
  { id: 'r5', name: 'Jeevan Blood Bank', category: 'Blood Donation', address: 'Kharadi, Pune', distance: 5.5, contact: '+91 98220 99887', hours: '24/7', rating: 4.9, description: 'Blood bank with all blood groups. Donors always welcome.', verified: true },
  { id: 'r6', name: 'Pune Employment Exchange', category: 'Employment', address: 'Shivajinagar, Pune', distance: 1.8, contact: '+91 99230 55667', hours: '10 AM - 5 PM (Mon-Fri)', rating: 3.9, description: 'Government employment registration and job assistance.', verified: true },
  { id: 'r7', name: 'PMC Citizen Service Center', category: 'Government Services', address: 'Main Office, Shivajinagar', distance: 2.0, contact: '+91 98765 11122', hours: '9 AM - 5 PM (Mon-Sat)', rating: 4.0, description: 'Property tax, water bill, and all civic services.', verified: true },
  { id: 'r8', name: 'Safe Haven Shelter', category: 'Shelters', address: 'Hadapsar, Pune', distance: 5.2, contact: '+91 98220 77665', hours: '24/7', rating: 4.6, description: 'Temporary shelter for those in need. Meals provided.', verified: true },
  { id: 'r9', name: 'Paws Animal Rescue', category: 'Animal Care', address: 'Baner, Pune', distance: 2.9, contact: '+91 99230 88990', hours: '8 AM - 7 PM', rating: 4.8, description: 'Animal rescue, adoption, and veterinary services.', verified: true },
  { id: 'r10', name: 'Community Study Hall', category: 'Libraries', address: 'Wakad, Pune', distance: 3.4, contact: '+91 98765 33445', hours: '7 AM - 10 PM', rating: 4.5, description: 'Free study space for students with WiFi and AC.', verified: false },
];

export const challenges: Challenge[] = [
  { id: 'ch1', title: 'Green Weekend', description: 'Help make your neighborhood cleaner. Join a local cleanup drive or organize one!', emoji: '🌱', goal: 100, participants: 67, reward: 'Green Guardian Badge', rewardPoints: 100, joined: false, endsIn: '3 days' },
  { id: 'ch2', title: 'Teach One', description: 'Help a student for at least 2 hours this week. Any subject, any level.', emoji: '📚', goal: 50, participants: 48, reward: '+100 Points + Knowledge Sharer Badge', rewardPoints: 100, joined: true, endsIn: '5 days' },
  { id: 'ch3', title: 'Clean Our Community', description: 'Organize or join a local cleanup. Report before and after photos!', emoji: '🧹', goal: 80, participants: 52, reward: 'Clean Community Badge', rewardPoints: 80, joined: false, endsIn: '1 week' },
  { id: 'ch4', title: 'Civic Sentinel', description: 'Report and verify 3 civic issues in your area this month.', emoji: '🚨', goal: 200, participants: 134, reward: 'Civic Watcher Badge + 150 Points', rewardPoints: 150, joined: false, endsIn: '2 weeks' },
  { id: 'ch5', title: 'Helping Hand Marathon', description: 'Complete 5 help requests this month to earn the Helping Hand Badge.', emoji: '🤝', goal: 500, participants: 287, reward: 'Helping Hand Badge + 200 Points', rewardPoints: 200, joined: true, endsIn: '12 days' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'match', title: 'New 94% Match', body: 'A help request matching your skills is nearby.', timestamp: '5 min ago', read: false, icon: '🎯', action: 'View Request' },
  { id: 'n2', type: 'completed', title: 'Task Completed', body: 'Your grocery assistance request was completed successfully.', timestamp: '1 hour ago', read: false, icon: '🎉', action: 'View Details' },
  { id: 'n3', type: 'badge', title: 'New Badge Earned', body: 'You earned the Helping Hand badge!', timestamp: '3 hours ago', read: false, icon: '🏆', action: 'View Profile' },
  { id: 'n4', type: 'issue', title: 'Issue Update', body: 'Your reported pothole on FC Road is now under repair.', timestamp: '5 hours ago', read: true, icon: '🚨', action: 'View Issue' },
  { id: 'n5', type: 'message', title: 'New Message', body: 'Aarav sent you a message about the grocery request.', timestamp: '6 hours ago', read: true, icon: '💬', action: 'Open Chat' },
  { id: 'n6', type: 'challenge', title: 'Challenge Progress', body: 'Teach One challenge is 96% complete. You\'re so close!', timestamp: '8 hours ago', read: true, icon: '📚', action: 'View Challenge' },
  { id: 'n7', type: 'match', title: 'New 88% Match', body: 'A nearby elderly resident needs digital help.', timestamp: '12 hours ago', read: true, icon: '🎯', action: 'View Request' },
  { id: 'n8', type: 'completed', title: 'Task Completed', body: 'Digital banking setup task completed. +50 points awarded.', timestamp: '1 day ago', read: true, icon: '🎉' },
  { id: 'n9', type: 'issue', title: 'Issue Verified', body: 'Your garbage collection issue was verified by 6 community members.', timestamp: '1 day ago', read: true, icon: '✅' },
  { id: 'n10', type: 'badge', title: 'Badge Progress', body: 'You\'re 2 tasks away from earning the Trusted Volunteer badge.', timestamp: '2 days ago', read: true, icon: '⭐' },
  { id: 'n11', type: 'challenge', title: 'New Challenge Available', body: 'Green Weekend challenge needs 33 more volunteers.', timestamp: '2 days ago', read: true, icon: '🌱' },
  { id: 'n12', type: 'match', title: 'Urgent Help Needed', body: 'Blood donation request nearby. You can make a difference.', timestamp: '3 days ago', read: true, icon: '🩸' },
  { id: 'n13', type: 'completed', title: 'Points Earned', body: 'You earned +100 points for completing a tutoring session.', timestamp: '3 days ago', read: true, icon: '⭐' },
  { id: 'n14', type: 'message', title: 'New Message', body: 'Sneha: Thank you so much for the help yesterday!', timestamp: '4 days ago', read: true, icon: '💬' },
  { id: 'n15', type: 'issue', title: 'Issue Resolved', body: 'Streetlight issue on FC Road has been resolved.', timestamp: '1 week ago', read: true, icon: '✅' },
  { id: 'n16', type: 'completed', title: 'Level Up!', body: 'You reached Level 4: Community Champion!', timestamp: '1 week ago', read: true, icon: '🎊' },
  { id: 'n17', type: 'challenge', title: 'Challenge Joined', body: 'You joined the Helping Hand Marathon. Complete 5 tasks!', timestamp: '1 week ago', read: true, icon: '🤝' },
  { id: 'n18', type: 'match', title: 'New 85% Match', body: 'A student needs mathematics tutoring nearby.', timestamp: '1 week ago', read: true, icon: '🎯' },
  { id: 'n19', type: 'badge', title: 'Badge Earned', body: 'You earned the Knowledge Sharer badge for teaching!', timestamp: '2 weeks ago', read: true, icon: '📚' },
  { id: 'n20', type: 'completed', title: 'First Contribution', body: 'You completed your first task. Welcome to Sahayog!', timestamp: '6 months ago', read: true, icon: '🎉' },
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participant: users[1],
    taskTitle: 'Grocery Assistance Needed',
    messages: [
      { id: 'm1', senderId: 'u2', text: 'Hi! I can help you with the grocery request.', timestamp: '10:30 AM' },
      { id: 'm2', senderId: 'u1', text: 'Thank you so much! Can you come around 5 PM?', timestamp: '10:32 AM' },
      { id: 'm3', senderId: 'u2', text: 'Yes, 5 PM works perfectly. I\'ll be there.', timestamp: '10:33 AM' },
      { id: 'm4', senderId: 'u1', text: 'Great! The store is just around the corner. I\'ll share the list.', timestamp: '10:35 AM' },
      { id: 'm5', senderId: 'u2', text: 'Perfect, see you at 5!', timestamp: '10:36 AM' },
    ],
  },
  {
    id: 'conv2',
    participant: users[3],
    taskTitle: 'Ride to Medical Appointment',
    messages: [
      { id: 'm6', senderId: 'u4', text: 'I can take you to Ruby Hall Clinic. What time?', timestamp: '2:15 PM' },
      { id: 'm7', senderId: 'u1', text: 'Appointment is at 4 PM. Need to leave by 3.', timestamp: '2:20 PM' },
      { id: 'm8', senderId: 'u4', text: 'I\'ll pick you up at 3. Sending my vehicle details.', timestamp: '2:22 PM' },
    ],
  },
  {
    id: 'conv3',
    participant: users[5],
    taskTitle: 'Mathematics Tutoring',
    messages: [
      { id: 'm9', senderId: 'u6', text: 'I\'d love to help with math tutoring! I have 10 years of teaching experience.', timestamp: 'Yesterday' },
      { id: 'm10', senderId: 'u1', text: 'That\'s wonderful! The student needs help with algebra.', timestamp: 'Yesterday' },
      { id: 'm11', senderId: 'u6', text: 'No problem. I can start this Saturday if that works.', timestamp: 'Yesterday' },
    ],
  },
];

export const organizations: Organization[] = [
  { id: 'o1', name: 'Helping Hands Pune', verified: true, description: 'A community-driven NGO dedicated to supporting Pune\'s most vulnerable residents through food, education, and clothing drives.', activities: ['🍲 Food Distribution', '📚 Education Drive', '👕 Clothing Donation'], volunteerCount: 27, location: 'Shivajinagar, Pune', avatar: 'HH' },
  { id: 'o2', name: 'Green Pune Initiative', verified: true, description: 'Environmental NGO focused on tree plantation, waste management, and making Pune a cleaner, greener city.', activities: ['🌱 Tree Plantation', '🧹 Cleanliness Drives', '♻️ Waste Management'], volunteerCount: 42, location: 'Aundh, Pune', avatar: 'GP' },
  { id: 'o3', name: 'Care for Seniors', verified: true, description: 'Dedicated to supporting elderly residents with daily tasks, medical assistance, and companionship.', activities: ['🤝 Elderly Care', '🏥 Medical Support', '🏠 Home Visits'], volunteerCount: 18, location: 'Kothrud, Pune', avatar: 'CS' },
  { id: 'o4', name: 'Pune Animal Welfare', verified: false, description: 'Animal rescue and welfare organization. Adoption drives, sterilization programs, and emergency rescue.', activities: ['🐕 Animal Rescue', '🩺 Vet Camps', '📋 Adoption Drives'], volunteerCount: 33, location: 'Baner, Pune', avatar: 'PA' },
  { id: 'o5', name: 'Bright Future Education', verified: true, description: 'Providing free education to underprivileged children. After-school programs and scholarship support.', activities: ['📖 Free Tutoring', '🎒 School Supplies', '💰 Scholarships'], volunteerCount: 51, location: 'Wakad, Pune', avatar: 'BF' },
];

export const allBadges: Badge[] = [
  { id: 'b1', name: 'First Contribution', emoji: '🏅', description: 'Complete your first help request', earned: true, earnedDate: '6 months ago' },
  { id: 'b2', name: 'Helping Hand', emoji: '🤝', description: 'Complete 5 help requests', earned: true, earnedDate: '2 months ago' },
  { id: 'b3', name: 'Community Champion', emoji: '🏆', description: 'Reach Level 4', earned: true, earnedDate: '1 month ago' },
  { id: 'b4', name: 'Emergency Responder', emoji: '🚨', description: 'Complete an urgent task', earned: true, earnedDate: '3 months ago' },
  { id: 'b5', name: 'Green Guardian', emoji: '🌱', description: 'Join a Green Weekend challenge', earned: false },
  { id: 'b6', name: 'Civic Watcher', emoji: '🏙', description: 'Report 5 verified civic issues', earned: true, earnedDate: '2 weeks ago' },
  { id: 'b7', name: 'Knowledge Sharer', emoji: '📚', description: 'Complete 3 education-related tasks', earned: true, earnedDate: '3 weeks ago' },
  { id: 'b8', name: 'Trusted Volunteer', emoji: '⭐', description: 'Maintain 4.5+ rating with 20+ tasks', earned: false },
];

export const mapMarkers: MapMarker[] = [
  { id: 'm1', type: 'issue', title: 'Large Pothole', subtitle: 'Shivajinagar', distance: 1.2, priority: 'High', category: 'Potholes', x: 35, y: 40 },
  { id: 'm2', type: 'request', title: 'Grocery Assistance Needed', subtitle: 'Kothrud', distance: 1.4, priority: 'Medium', category: 'Elderly Assistance', x: 55, y: 55 },
  { id: 'm3', type: 'resource', title: 'Annadata Food Bank', subtitle: 'Kothrud', distance: 1.1, category: 'Food', x: 48, y: 62 },
  { id: 'm4', type: 'issue', title: 'Garbage Not Collected', subtitle: 'Kothrud', distance: 0.8, priority: 'High', category: 'Garbage', x: 50, y: 48 },
  { id: 'm5', type: 'request', title: 'Mathematics Tutoring', subtitle: 'Shivajinagar', distance: 1.8, priority: 'Medium', category: 'Education', x: 30, y: 30 },
  { id: 'm6', type: 'issue', title: 'Traffic Signal Malfunction', subtitle: 'Viman Nagar', distance: 3.5, priority: 'Urgent', category: 'Traffic', x: 75, y: 25 },
  { id: 'm7', type: 'resource', title: 'Pune Community Library', subtitle: 'FC Road', distance: 2.3, category: 'Libraries', x: 40, y: 35 },
  { id: 'm8', type: 'activity', title: 'Green Weekend Cleanup', subtitle: 'Aundh', distance: 2.5, category: 'Challenge', x: 20, y: 60 },
  { id: 'm9', type: 'request', title: 'Ride to Medical Appointment', subtitle: 'Viman Nagar', distance: 3.2, priority: 'High', category: 'Medical', x: 70, y: 30 },
  { id: 'm10', type: 'issue', title: 'Streetlight Not Working', subtitle: 'FC Road', distance: 2.4, priority: 'Medium', category: 'Streetlights', x: 38, y: 28 },
  { id: 'm11', type: 'resource', title: 'Ruby Hall Medical Center', subtitle: 'Sassoon Road', distance: 3.8, category: 'Healthcare', x: 60, y: 20 },
  { id: 'm12', type: 'activity', title: 'Teach One Session', subtitle: 'Koregaon Park', distance: 4.5, category: 'Challenge', x: 82, y: 50 },
  { id: 'm13', type: 'issue', title: 'Water Pipeline Leakage', subtitle: 'Baner', distance: 2.9, priority: 'High', category: 'Water', x: 15, y: 35 },
  { id: 'm14', type: 'request', title: 'Dog Walking Assistance', subtitle: 'Hadapsar', distance: 5.2, priority: 'Low', category: 'Animal', x: 85, y: 72 },
  { id: 'm15', type: 'resource', title: 'Paws Animal Rescue', subtitle: 'Baner', distance: 2.9, category: 'Animal Care', x: 18, y: 25 },
  { id: 'm16', type: 'issue', title: 'Open Manhole', subtitle: 'Viman Nagar', distance: 3.6, priority: 'Urgent', category: 'Infrastructure', x: 72, y: 22 },
];

export const feedItems: FeedItem[] = [
  { id: 'f1', type: 'help_completed', title: 'A grocery request was successfully completed', description: 'An elderly resident received grocery assistance from a nearby volunteer.', distance: '1.2 km away', timestamp: '15 min ago', status: 'Completed', statusColor: 'green' },
  { id: 'f2', type: 'civic_update', title: 'Streetlight issue resolved', description: 'Streetlight reported on FC Road has been repaired by the municipal corporation.', distance: '2.4 km away', timestamp: '1 hour ago', status: 'Resolved', statusColor: 'green' },
  { id: 'f3', type: 'achievement', title: '100 civic issues resolved this month!', description: 'Our community has crossed 100 resolved civic issues in October.', distance: 'Community-wide', timestamp: '2 hours ago', status: '87% of monthly goal', statusColor: 'blue' },
  { id: 'f4', type: 'new_request', title: 'New help request nearby', description: 'Mathematics tutoring needed for a 10th-grade student.', distance: '1.8 km away', timestamp: '3 hours ago', status: 'Open', statusColor: 'orange' },
  { id: 'f5', type: 'new_volunteer', title: 'New volunteer joined your area', description: 'Sahil Khan from Baner joined Sahayog and is ready to help.', distance: '2.8 km away', timestamp: '5 hours ago', status: 'New Member', statusColor: 'gray' },
  { id: 'f6', type: 'challenge_update', title: 'Green Weekend challenge is 67% complete', description: '33 more volunteers needed to reach the goal this weekend.', distance: 'Community-wide', timestamp: '6 hours ago', status: '67 / 100', statusColor: 'blue' },
  { id: 'f7', type: 'help_completed', title: 'Digital banking setup completed', description: 'A senior citizen successfully learned to use UPI and mobile banking.', distance: '0.9 km away', timestamp: '1 day ago', status: 'Completed', statusColor: 'green' },
  { id: 'f8', type: 'civic_update', title: 'Garbage collection issue verified', description: '6 community members confirmed the garbage collection issue in Kothrud.', distance: '0.8 km away', timestamp: '1 day ago', status: 'Verified', statusColor: 'blue' },
];

export const helpCategories = ['Food', 'Education', 'Elderly Assistance', 'Medical Assistance', 'Transportation', 'Digital Help', 'Household Help', 'Animal Assistance', 'Shopping', 'Childcare', 'Other'];

export const issueCategories = ['Potholes', 'Streetlights', 'Garbage', 'Water Leakage', 'Traffic', 'Trees', 'Road Damage', 'Animal Issues', 'Public Infrastructure'];

export const resourceCategories = ['Healthcare', 'Education', 'Food', 'Employment', 'Government Services', 'Blood Donation', 'Shelters', 'Animal Care', 'Libraries'];

export const urgencyLevels = ['Low', 'Medium', 'High', 'Urgent'];

export const puneLocations = ['Shivajinagar', 'Kothrud', 'Baner', 'Aundh', 'Viman Nagar', 'Wakad', 'Hadapsar', 'Kharadi', 'Koregaon Park', 'FC Road'];

export const levelNames: Record<number, string> = {
  1: 'New Member',
  2: 'Helpful Neighbor',
  3: 'Active Volunteer',
  4: 'Community Champion',
  5: 'Sahayog Hero',
};

export const levelThresholds: Record<number, number> = {
  1: 0,
  2: 100,
  3: 300,
  4: 700,
  5: 1500,
};

export const categoryEmoji: Record<string, string> = {
  'Food': '🍲', 'Education': '📚', 'Elderly Assistance': '🤝', 'Medical Assistance': '🏥',
  'Transportation': '🚗', 'Digital Help': '💻', 'Household Help': '🏠', 'Animal Assistance': '🐕',
  'Shopping': '🛒', 'Childcare': '👶', 'Other': '❓',
  'Potholes': '🕳', 'Streetlights': '💡', 'Garbage': '🗑', 'Water Leakage': '🚰',
  'Traffic': '🚦', 'Trees': '🌳', 'Road Damage': '🚧', 'Animal Issues': '🐕',
  'Public Infrastructure': '🏚',
  'Healthcare': '🏥', 'Libraries': '📖', 'Employment': '💼', 'Government Services': '🏛',
  'Blood Donation': '🩸', 'Shelters': '🏠', 'Animal Care': '🐕',
};

export const issueCategoryEmoji: Record<string, string> = {
  'Potholes': '🕳', 'Streetlights': '💡', 'Garbage': '🗑', 'Water Leakage': '🚰',
  'Traffic': '🚦', 'Trees': '🌳', 'Road Damage': '🚧', 'Animal Issues': '🐕',
  'Public Infrastructure': '🏚',
};

export const aiInsights = [
  { id: 'ai1', type: 'increasing', icon: '📈', title: 'Increasing Issue', body: 'Garbage-related complaints increased by 28% this month.', color: 'orange' },
  { id: 'ai2', type: 'high-need', icon: '📍', title: 'High-Need Area', body: 'Zone A (Shivajinagar) currently has the highest number of unresolved civic issues.', color: 'red' },
  { id: 'ai3', type: 'volunteer-gap', icon: '🤝', title: 'Volunteer Gap', body: 'There is a shortage of volunteers with transportation skills in your area.', color: 'blue' },
  { id: 'ai4', type: 'peak-demand', icon: '⏰', title: 'Peak Demand', body: 'Most help requests are posted between 6 PM and 9 PM. Consider being available during these hours.', color: 'green' },
];

export const contributionActivity = [
  { month: 'May', value: 12 },
  { month: 'Jun', value: 18 },
  { month: 'Jul', value: 22 },
  { month: 'Aug', value: 15 },
  { month: 'Sep', value: 28 },
  { month: 'Oct', value: 32 },
];

export const helpByCategory = [
  { name: 'Elderly Care', value: 35, color: '#22c55e' },
  { name: 'Education', value: 25, color: '#3b82f6' },
  { name: 'Food', value: 15, color: '#f97316' },
  { name: 'Medical', value: 12, color: '#ef4444' },
  { name: 'Digital', value: 8, color: '#8b5cf6' },
  { name: 'Other', value: 5, color: '#a3a3a3' },
];

export const issuesByCategory = [
  { name: 'Garbage', value: 28, color: '#f97316' },
  { name: 'Potholes', value: 22, color: '#ef4444' },
  { name: 'Streetlights', value: 18, color: '#fbbf24' },
  { name: 'Water', value: 12, color: '#3b82f6' },
  { name: 'Traffic', value: 10, color: '#8b5cf6' },
  { name: 'Other', value: 10, color: '#a3a3a3' },
];

export const monthlyVolunteerActivity = [
  { month: 'May', hours: 320 },
  { month: 'Jun', hours: 410 },
  { month: 'Jul', hours: 380 },
  { month: 'Aug', hours: 520 },
  { month: 'Sep', hours: 610 },
  { month: 'Oct', hours: 840 },
];
