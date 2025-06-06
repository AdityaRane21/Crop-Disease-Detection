import React, { useState } from 'react';
import axios from 'axios';

export default function DiseaseDetectionPage() {
  const [zipFile, setZipFile] = useState(null);
  const [results, setResults] = useState([]);
  const [mapImage, setMapImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!zipFile) return;
    const formData = new FormData();
    formData.append('file', zipFile);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResults(res.data.results);
      setMapImage(res.data.map_image);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to get prediction results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Plant Disease Detection</h1>

      <input
        type="file"
        accept=".zip"
        onChange={(e) => setZipFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload & Analyze
      </button>

      {loading && <p className="mt-4">Processing...</p>}

      {mapImage && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Map Visualization</h2>
          <img
            src={`data:image/png;base64,${mapImage}`}
            alt="Prediction Map"
            className="rounded shadow-lg"
          />
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Prediction Results</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Filename</th>
                <th className="border px-4 py-2">Latitude</th>
                <th className="border px-4 py-2">Longitude</th>
                <th className="border px-4 py-2">Label</th>
                <th className="border px-4 py-2">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, idx) => (
                <tr key={idx} className={res.label === 'Diseased' ? 'bg-red-50' : 'bg-green-50'}>
                  <td className="border px-4 py-2">{res.filename}</td>
                  <td className="border px-4 py-2">{res.latitude.toFixed(5)}</td>
                  <td className="border px-4 py-2">{res.longitude.toFixed(5)}</td>
                  <td className="border px-4 py-2 font-semibold">{res.label}</td>
                  <td className="border px-4 py-2">{(res.confidence * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
