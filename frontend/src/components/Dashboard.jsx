import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import NoteCard from './NoteCard';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const { darkMode } = useTheme();

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/api/notes', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post('/api/notes', { content: newNote }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotes(prev => [...prev, res.data]);
      setNewNote('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 p-6">
        <Topbar />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Your Notes</h2>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Write a new note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full md:w-96 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <button onClick={handleAddNote} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, i) => (
            <NoteCard key={note._id} note={note} index={i} onDelete={handleDelete} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
