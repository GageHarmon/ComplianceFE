// 'use client'
import { useState } from 'react';

const ComplianceChecker = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [reportType, setReportType] = useState('backups');
  const [report, setReport] = useState<any[]>([]);

  const addFile = (file: File) => {
    setSelectedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      addFile(file);
    }
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`csv${index + 1}`, file);
    });

    formData.append('reportType', reportType);

    const url =
      reportType === 'backups'
        ? 'http://127.0.0.1:5000/upload'
        : 'http://127.0.0.1:5000/other_report';

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.startsWith('text/csv')) {
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'non_compliant_computers.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (contentType && contentType.startsWith('application/json')) {
      const data = await response.json();
      console.error(data.error);
    } else {
      console.error('Unknown response type:', contentType);
    }
  };

  return (
    <div>
      <select onChange={handleReportTypeChange}>
        <option value="backups">Backups Audit</option>
        <option value="sentinel">SentinelOne Audit</option>
      </select>
      <input
        type="file"
        onChange={handleFileChange}
        className="border-2 border-gray-300 p-2 rounded-lg"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Generate Report
      </button>
      <div className="mt-4">
        <h3>Selected Files:</h3>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      {report && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Report:</h3>
          {report.map((item, index) => (
            <div key={index}>
              Device Name: {item.DeviceName}, Days Since Last Backup:{' '}
              {item.DaysSinceLastBackup}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplianceChecker;


// import { useState } from 'react';

// const ComplianceChecker = () => {
//   const [file, setFile] = useState(null);
//   const [report, setReport] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   }

//   const handleSubmit = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('csv', file);

//     const response = await fetch('http://127.0.0.1:5000/upload', {
//       method: 'POST',
//       body: formData
//     });

//     const contentType = response.headers.get("Content-Type");

//     // Check if the response is a file
//     if (contentType && contentType.startsWith("text/csv")) {
//         const blob = await response.blob();
//         const link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = "non_compliant_computers.csv";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     } else if (contentType && contentType.startsWith("application/json")) {
//         // If not a file, assume it's a JSON error message
//         const data = await response.json();
//         console.error(data.error);  // Log the error or show it to the user
//     } else {
//         console.error("Unknown response type:", contentType);
//     }
// }

//   return (
//     <div>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         className="border-2 border-gray-300 p-2 rounded-lg"
//       />
//       <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
//         Generate Report
//       </button>

//       {report && (
//         <div className="mt-8">
//           <h3 className="text-xl font-bold mb-4">Report:</h3>
//           {/* Display the report (modify this based on your report structure) */}
//           {report.map((item, index) => (
//             <div key={index}>
//               {/* Display some properties from the report for demonstration */}
//               Device Name: {item.DeviceName}, Days Since Last Backup: {item.DaysSinceLastBackup}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default ComplianceChecker;
