'use client'

import { useState, useEffect } from 'react';

const ComplianceChecker = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [reportType, setReportType] = useState('backups');
  const [report, setReport] = useState<any[]>([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleSubmit = async () => {
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`csv${index + 1}`, file);
    });

    formData.append('reportType', reportType)

    // URL changes depending on the selected report type
    const url = reportType === "backups" ? 'http://127.0.0.1:5000/upload' : 'http://127.0.0.1:5000/other_report';

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    const contentType = response.headers.get("Content-Type");

    // Check if the response is a file
    if (contentType && contentType.startsWith("text/csv")) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "non_compliant_computers.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (contentType && contentType.startsWith("application/json")) {
        // If not a file, assume it's a JSON error message
        const data = await response.json();
        console.error(data.error);  // Log the error or show it to the user
    } else {
        console.error("Unknown response type:", contentType);
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
        multiple
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
