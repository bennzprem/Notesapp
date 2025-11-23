// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'USERS_DATA';

// --- AUTHENTICATION ---

export const registerUser = async (username, password) => {
  const usersJson = await AsyncStorage.getItem(USERS_KEY);
  const users = usersJson ? JSON.parse(usersJson) : {};

  if (users[username]) {
    return { success: false, message: 'User already exists' };
  }

  users[username] = password; // In a real app, hash this!
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const loginUser = async (username, password) => {
  const usersJson = await AsyncStorage.getItem(USERS_KEY);
  const users = usersJson ? JSON.parse(usersJson) : {};

  if (users[username] && users[username] === password) {
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
};

// --- NOTES MANAGEMENT ---
// We use a unique key per user: "NOTES_username"

export const getNotes = async (username) => {
  const json = await AsyncStorage.getItem(`NOTES_${username}`);
  return json ? JSON.parse(json) : [];
};

export const saveNote = async (username, note) => {
  const currentNotes = await getNotes(username);
  let updatedNotes = [];

  if (note.id) {
    // Edit existing
    updatedNotes = currentNotes.map((n) => 
      n.id === note.id ? { ...note, updatedAt: Date.now() } : n
    );
  } else {
    // Create new
    const newNote = { ...note, id: Date.now().toString(), updatedAt: Date.now() };
    updatedNotes = [newNote, ...currentNotes];
  }

  await AsyncStorage.setItem(`NOTES_${username}`, JSON.stringify(updatedNotes));
};

export const deleteNote = async (username, noteId) => {
  const currentNotes = await getNotes(username);
  const updatedNotes = currentNotes.filter((n) => n.id !== noteId);
  await AsyncStorage.setItem(`NOTES_${username}`, JSON.stringify(updatedNotes));
};