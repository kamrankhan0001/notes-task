import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Add state for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await login(form.email, form.password);
      // Check for a successful login (you might check for a 200 status code)
      if (response.status === 200) {
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {
        // Handle other success cases if needed, or if your API returns a 200 with a custom success field
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle login errors, and set the error message.
      setError(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>} {/* Display error message */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 rounded border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
