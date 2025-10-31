import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">Welcome, {user ? user.username : "User"}!</h2>
      <p className="text-gray-600">You can now access Loksewa content even offline thanks to PWA caching.</p>
    </div>
  );
};

export default Dashboard;
