export interface User {
  email: string;
  password: string;
}

export const authenticateUser = (email: string, password: string): boolean => {
  if (typeof window === 'undefined') return false;
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.some((user: User) => user.email === email && user.password === password);
};

export const registerUser = (email: string, password: string): void => {
  if (typeof window === 'undefined') return;
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));
};

export const getCurrentUser = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('currentUser');
};

export const setCurrentUser = (email: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('currentUser', email);
};

export const logoutUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentUser');
};

