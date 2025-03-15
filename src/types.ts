export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  nextInterview?: string;
}

export interface Progress {
  completedChallenges: number;
  totalChallenges: number;
  streak: number;
  badges: string[];
}