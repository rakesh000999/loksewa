import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axiosConfig';
import { Book, Download, FileText, Calendar, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        // axios baseURL is http://localhost:8000/api — request relative path without extra /api
        const response = await axios.get('/content/study-materials/');
        setStudyMaterials(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load study materials');
        setLoading(false);
      }
    };

    fetchStudyMaterials();
  }, []);

  const getMaterialTypeIcon = (type) => {
    switch (type) {
      case 'notes':
        return <FileText className="w-5 h-5" />;
      case 'practice':
        return <Book className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-4">Welcome, {user ? user.username : "User"}!</h2>
          <p className="text-blue-100">
            Access your study materials and track your progress
          </p>
        </div>
      </div>

      {/* Study Materials Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading study materials...</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-600 py-8">{error}</div>
          ) : studyMaterials.length === 0 ? (
            <div className="col-span-full text-center py-8">No study materials available yet.</div>
          ) : (
            studyMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-blue-50">
                      {getMaterialTypeIcon(material.material_type)}
                    </div>
                    <span className="text-sm text-gray-500">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(material.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {material.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {material.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">
                      <Download className="w-4 h-4 inline mr-1" />
                      {material.download_count} downloads
                    </span>

                    <a
                      href={getFileUrl(material)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={async () => {
                        // record download only for logged-in users
                        if (user) {
                          try {
                            await axios.post(`/content/study-materials/${material.id}/record_download/`);
                          } catch (e) {
                            // ignore
                          }
                        }
                      }}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      View Material
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

function getFileUrl(material) {
  // prefer serializer supplied absolute url
  if (material.file_url) return material.file_url;
  const file = material.file;
  if (!file) return '#';
  if (file.startsWith('http://') || file.startsWith('https://')) return file;
  // ensure leading slash
  const path = file.startsWith('/') ? file : `/${file}`;
  return `${window.location.origin}${path}`;
}

export default Dashboard;
