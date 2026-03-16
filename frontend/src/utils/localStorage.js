const CONTENT_KEY = 'checklist_content';
const USER_KEY = 'checklist_user';

// Initialize with empty array - users start with no content
const sampleData = [];

export const getStoredContent = () => {
  const stored = localStorage.getItem(CONTENT_KEY);
  if (!stored) {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(sampleData));
    return sampleData;
  }
  return JSON.parse(stored);
};

export const saveContent = (contents) => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(contents));
};

export const getUser = () => {
  return localStorage.getItem(USER_KEY);
};

export const saveUser = (username) => {
  localStorage.setItem(USER_KEY, username);
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};
