import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = async () => {
    if (!user?.token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await axios.get('https://notes-task-2njq.vercel.app/api/notes', {
        headers: { Authorization: `Bearer ${user.token}` },
       
      });

      console.log('Fetched notes:', res.data);

      const fetchedNotes = Array.isArray(res.data.notes) ? res.data.notes : [];
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error.response?.data?.message || error.message);
      setNotes([]); // Prevent .map crash
    }
  };

  const handleAddNote = async () => {
    

    if (!newNote.trim()) return;

    try {
      const res = await axios.post(
        'https://notes-task-2njq.vercel.app/api/notes',
        { content: newNote },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNotes((prev) => [...prev, res.data]); // Add new note to state
      setNewNote(''); // Clear input after adding note
    } catch (error) {
      console.error('Error adding note:', error.response?.data?.message || error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`https://notes-task-2njq.vercel.app/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== id)); // Filter out deleted note
    } catch (error) {
      console.error('Error deleting note:', error.response?.data?.message || error.message);
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (user?.token) {
      fetchNotes();
    } else {
      console.error('User is not authenticated');
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 space-y-4 hidden md:block">
        <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 rounded"
          onClick={toggleTheme}
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white w-full py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-semibold">Your Notes</h1>
          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write a new note..."
              className="w-full md:w-96 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={handleAddNote}
            >
              Add Notes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note, index) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow relative"
              >
                <p>{note.content}</p>
                <button
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteNote(note._id)}
                >
                  &times;
                </button>
              </motion.div>
            ))
          ) : (
            <p>No notes available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;


