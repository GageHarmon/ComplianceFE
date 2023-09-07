'use client'

import ComplianceChecker from './ComplianceChecker';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <img src="/charteredlogo.png" alt="Chartered Logo" className="rounded-lg" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Welcome to Chartered Compliance Checker!
        </h1>
        <p className="text-2xl text-center">
          This is a simple app to check if a company has compliance issues or not.
        </p>
      </div>
      <ComplianceChecker />
    </main>
  );
}




// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="flex flex-col items-center justify-center">
//         <h1 className="text-6xl font-bold text-center">
//           Welcome to Chartered Compliance Checker!
//         </h1>
//         <p className="text-2xl text-center">
//           This is a simple app to check if a company has compliance issues or not.
//         </p>
//       </div>
//       <div className="flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold text-center">
//           Please choose a file here
//         </h2>
//         <input
//           type="file"
//           className="border-2 border-gray-300 p-2 rounded-lg"
//         />
//       </div>
//     </main>
//   )
// }
