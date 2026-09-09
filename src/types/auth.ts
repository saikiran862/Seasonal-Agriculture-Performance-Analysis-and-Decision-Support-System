export type UserRole =
  | 'Lead Researcher'
  | 'Agronomy Specialist'
  | 'Student Analyst'
  | 'Faculty Reviewer'
  | 'Guest Analyst';

export interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  role: UserRole;
  institution: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const DEMO_USERS: User[] = [
  {
    id: 'user-saikiran',
    name: 'GIDDAM SAIKIRAN',
    email: 'saikirangiddam0@gmail.com',
    studentId: 'STU67627f99c8c1f1734508441',
    role: 'Lead Researcher',
    institution: 'KG Reddy College of Engineering & Technology, JNTUH',
    createdAt: '2026-01-15',
  },
  {
    id: 'user-reviewer',
    name: 'Dr. K. Ramesh (Faculty)',
    email: 'reviewer.cse@jntuh.ac.in',
    studentId: 'FAC-JNTUH-9921',
    role: 'Faculty Reviewer',
    institution: 'JNTU Hyderabad (JNTUH)',
    createdAt: '2026-02-10',
  },
  {
    id: 'user-agronomist',
    name: 'P. Sridhar (Ext. Officer)',
    email: 'agronomist@telangana.gov.in',
    role: 'Agronomy Specialist',
    institution: 'Telangana State Agricultural Extension Board',
    createdAt: '2026-03-01',
  },
];
