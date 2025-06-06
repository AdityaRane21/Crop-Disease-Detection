// src/components/reports/ReportGenerator.jsx
import { useState } from 'react';
import axios from 'axios';

const ReportGenerator = ({ analysisId, analysisData }) => {
  const [generating, setGenerating] = useState(false);
  const [reportUrl, setReportUrl] = useState(null);
  const [format, setFormat] = useState('pdf');

  const generateReport = async () => {
    setGenerating(true);
    
    try {
      const response = await axios.post(/api/reports/generate, {
        analysisId,
        format
      });
      
      setReportUrl(response.data.reportUrl);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Report Format</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-green-600"
              name="report-format"
              value="pdf"
              checked={format === 'pdf'}
              onChange={() => setFormat('pdf')}
            />
            <span className="ml-2">PDF Report</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-green-600"
              name="report-format"
              value="csv"
              checked={format === 'csv'}
              onChange={() => setFormat('csv')}
            />
            <span className="ml-2">CSV Data</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Generate a detailed report containing all disease analysis data, treatment recommendations, 
          and visual maps of affected areas.
        </p>
        
        <button
          onClick={generateReport}
          disabled={generating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          {generating ? 'Generating...' : 'Generate Report'}
        </button>
      </div>
      
      {reportUrl && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 font-medium mb-2">Report Generated!</p>
          <a
            href={reportUrl}
            download
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download {format.toUpperCase()} Report
          </a>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;