import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Notes Dashboard</h1>
      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">Login</Link>
        <Link to="/signup" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700">Signup</Link>
      </div>
    </div>
  );
};

export default Home;
