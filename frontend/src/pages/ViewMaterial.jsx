import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axiosConfig';
import { Book, Download, FileText, Calendar, ArrowLeft } from 'lucide-react';

const ViewMaterial = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                // First fetch the material details
                const response = await axios.get(`/content/study-materials/${id}/`);
                setMaterial(response.data);
                setLoading(false);

                // Record download first
                try {
                    await axios.post(`/content/study-materials/${id}/record_download/`);
                } catch (e) {
                    console.warn('Failed to record download:', e);
                }

                // Then open the material and navigate back
                const fileUrl = getFileUrl(response.data);
                const newWindow = window.open(fileUrl, '_blank');

                // Only navigate back if the file was opened successfully
                if (newWindow) {
                    navigate('/dashboard');
                } else {
                    setError('Failed to open the material. Please check your popup blocker.');
                }
            } catch (err) {
                console.error('Error loading material:', err);
                setError('Failed to load study material');
                setLoading(false);
            }
        };

        fetchMaterial();
    }, [id, navigate]);

    const getFileUrl = (material) => {
        if (material.file_url) return material.file_url;
        const file = material.file;
        if (!file) return '#';
        if (file.startsWith('http://') || file.startsWith('https://')) return file;
        const path = file.startsWith('/') ? file : `/${file}`;
        return `${window.location.origin}${path}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">Opening study material...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-red-600 py-12">
                        {error}
                        <div className="mt-4">
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null; // The component will redirect to dashboard after opening the material
};

export default ViewMaterial;