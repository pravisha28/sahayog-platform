export type Urgency = 'Low' | 'Medium' | 'High' | 'Urgent';
export type RequestStatus = 'Posted' | 'Matched' | 'Accepted' | 'In Progress' | 'Completed' | 'Rated';
export type IssueStatus = 'Reported' | 'Verified' | 'Assigned' | 'In Progress' | 'Resolved';
export type IssueCategory = 'Potholes' | 'Streetlights' | 'Garbage' | 'Water Leakage' | 'Traffic' | 'Trees' | 'Road Damage' | 'Animal Issues' | 'Public Infrastructure';
export type HelpCategory = 'Food' | 'Education' | 'Elderly Assistance' | 'Medical Assistance' | 'Transportation' | 'Digital Help' | 'Household Help' | 'Animal Assistance' | 'Shopping' | 'Childcare' | 'Other';
export type ResourceCategory = 'Healthcare' | 'Education' | 'Food' | 'Employment' | 'Government Services' | 'Blood Donation' | 'Shelters' | 'Animal Care' | 'Libraries';
export type UserLevel = 1 | 2 | 3 | 4 | 5;

export interface AppUser {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  level: UserLevel;
  points: number;
  verified: boolean;
  skills: string[];
  availability: string;
  bio: string;
  location: string;
  joinedDate: string;
  isOrg?: boolean;
}

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: HelpCategory;
  urgency: Urgency;
  status: RequestStatus;
  location: string;
  distance: number;
  estimatedTime: string;
  requiredDate: string;
  postedBy: AppUser;
  postedAt: string;
  matchedVolunteers?: VolunteerMatch[];
  acceptedBy?: string;
  points: number;
}

export interface VolunteerMatch {
  volunteer: AppUser;
  score: number;
  reason: string;
  distance: number;
}

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  priority: Urgency;
  location: string;
  distance: number;
  reportedAt: string;
  reportedBy: AppUser;
  affectedCount: number;
  confirmedBy: string[];
  aiConfidence?: number;
  aiCategory?: string;
  aiPriority?: Urgency;
}

export interface CommunityResource {
  id: string;
  name: string;
  category: ResourceCategory;
  address: string;
  distance: number;
  contact: string;
  hours: string;
  rating: number;
  description: string;
  verified: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  goal: number;
  participants: number;
  reward: string;
  rewardPoints: number;
  joined: boolean;
  endsIn: string;
}

export interface Notification {
  id: string;
  type: 'match' | 'completed' | 'badge' | 'issue' | 'challenge' | 'message';
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  icon: string;
  action?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participant: AppUser;
  messages: Message[];
  taskTitle: string;
}

export interface Organization {
  id: string;
  name: string;
  verified: boolean;
  description: string;
  activities: string[];
  volunteerCount: number;
  location: string;
  avatar: string;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
}

export interface MapMarker {
  id: string;
  type: 'issue' | 'request' | 'resource' | 'activity';
  title: string;
  subtitle: string;
  distance: number;
  priority?: Urgency;
  category?: string;
  x: number;
  y: number;
}

export interface FeedItem {
  id: string;
  type: 'help_completed' | 'civic_update' | 'achievement' | 'new_request' | 'new_volunteer' | 'challenge_update';
  title: string;
  description: string;
  distance: string;
  timestamp: string;
  status?: string;
  statusColor?: string;
}

export type PageId =
  | 'home'
  | 'help'
  | 'help-detail'
  | 'create-request'
  | 'volunteer'
  | 'civic'
  | 'civic-detail'
  | 'report-issue'
  | 'map'
  | 'resources'
  | 'challenges'
  | 'profile'
  | 'dashboard'
  | 'notifications'
  | 'messages'
  | 'impact'
  | 'admin'
  | 'organizations';
