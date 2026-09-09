import { User, DEMO_USERS } from '../types/auth';

const STORAGE_KEY_CURRENT_USER = 'agri_dss_auth_user';
const STORAGE_KEY_REGISTERED_USERS = 'agri_dss_all_users';

export function getStoredUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to read user from storage', e);
  }
  // Default to Lead Researcher GIDDAM SAIKIRAN for immediate viva showcasing, or null if logged out
  return DEMO_USERS[0];
}

export function setStoredUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  } catch (e) {
    console.error('Failed to save user to storage', e);
  }
}

export function getAllUsers(): User[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_REGISTERED_USERS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read all users from storage', e);
  }
  return DEMO_USERS;
}

export function saveNewUser(newUser: User): void {
  try {
    const existing = getAllUsers();
    const updated = [newUser, ...existing.filter((u) => u.email !== newUser.email)];
    localStorage.setItem(STORAGE_KEY_REGISTERED_USERS, JSON.stringify(updated));
    setStoredUser(newUser);
  } catch (e) {
    console.error('Failed to save new user to storage', e);
  }
}
