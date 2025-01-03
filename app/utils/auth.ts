export interface User {
    email: string;
    password: string;
  }
  
  export const authenticateUser = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((user: User) => user.email === email && user.password === password);
  };
  
  export const registerUser = (email: string, password: string): void => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  export const getCurrentUser = (): string | null => {
    return localStorage.getItem('currentUser');
  };
  
  export const setCurrentUser = (email: string): void => {
    localStorage.setItem('currentUser', email);
  };
  
  export const logoutUser = (): void => {
    localStorage.removeItem('currentUser');
  };
  
  