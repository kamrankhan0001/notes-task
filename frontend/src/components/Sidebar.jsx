import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white dark:bg-gray-800 h-full p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Hi, {user.username}</h2>
      <button
        className="w-full mb-3 bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <button
        className="w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
