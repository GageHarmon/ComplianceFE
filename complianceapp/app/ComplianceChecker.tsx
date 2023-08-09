import { useState } from 'react';

const ComplianceChecker = () => {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('csv', file);

    const response = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setReport(data);
  }

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        className="border-2 border-gray-300 p-2 rounded-lg"
      />
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Generate Report
      </button>

      {report && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Report:</h3>
          {/* Display the report (modify this based on your report structure) */}
          {report.map((item, index) => (
            <div key={index}>
              {/* Display some properties from the report for demonstration */}
              Device Name: {item.DeviceName}, Days Since Last Backup: {item.DaysSinceLastBackup}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ComplianceChecker;
