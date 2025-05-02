import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');



  
  // It prevents the default form submission behavior and calls the signup function from the AuthContext
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the signup function from AuthContext with the form data
      // If the signup is successful, set success to true and clear any error messages
      await signup(form.username, form.email, form.password);
      setSuccess(true);
      setError('');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }
      , 2000);
    
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
      setSuccess(false);
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Signup</h2>

        {success && (
          <p className="text-green-600 bg-green-100 dark:bg-purple-900 dark:text-white px-3 py-2 rounded mb-4 text-center">
            Signup successful! Redirecting to login...
          </p>
        )}

        {error && (
          <p className="text-red-600 bg-red-100 dark:bg-red-700 dark:text-white px-3 py-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 rounded border dark:bg-gray-700 dark:text-white"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded border dark:bg-gray-700 dark:text-white"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 rounded border dark:bg-gray-700 dark:text-white"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-900 text-white py-2 rounded"
        >
          Signup
        </button>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          // This will navigate to the login page when clicked
          
          >
          

            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;




