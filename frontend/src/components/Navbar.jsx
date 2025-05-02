import DarkModeToggle from './DarkModeToggle';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo or App Name */}
      <Link to="/dashboard">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">
          Notes Dashboard
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        {/* Optional: Replace with actual user name */}
        <p className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
          Welcome, User!
        </p>

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;
