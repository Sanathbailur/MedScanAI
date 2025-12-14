// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Upload() {
//   const [fileName, setFileName] = useState("No file selected");

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//     } else {
//       setFileName("No file selected");
//     }
//   };

//   return (
//     <section className="upload-section">
//       <div className="upload-box">
//         <h2>Upload Medical Scan</h2>
//         <p>
//           Upload your X-ray, MRI, or CT scan for AI analysis. <br />
//           Click to upload or drag and drop your file below.
//         </p>

//         {/* File Upload */}
//         <label htmlFor="file-upload" className="upload-label">
//           Click to Upload or Drag & Drop
//         </label>
//         <input type="file" id="file-upload" onChange={handleFileChange} />

//         {/* File Name Display */}
//         <p style={{ fontWeight: "500", color: "#374151", marginBottom: "20px" }}>
//           {fileName}
//         </p>

//         {/* Buttons */}
//         <div className="upload-actions">
//           <button className="analyze-btn">Analyze Scan</button>
//           <Link to="/" className="back-btn">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function Upload() {
//   const [fileName, setFileName] = useState("No file selected");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [prediction, setPrediction] = useState("");
//   const [confidence, setConfidence] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       setSelectedFile(file);
//     } else {
//       setFileName("No file selected");
//       setSelectedFile(null);
//     }
//   };

//   // ✅ Function to send file to FastAPI backend
//   const handleAnalyze = async () => {
//     if (!selectedFile) {
//       setError("⚠️ Please select a file first!");
//       return;
//     }

//     setError("");
//     setPrediction("");
//     setConfidence("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setPrediction(response.data.prediction);
//       setConfidence(response.data.confidence);
//     } catch (err) {
//       console.error(err);
//       setError("❌ Prediction failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="upload-section">
//       <div className="upload-box">
//         <h2>Upload Medical Scan</h2>
//         <p>
//           Upload your X-ray, MRI, or CT scan for AI analysis. <br />
//           Click to upload or drag and drop your file below.
//         </p>

//         {/* File Upload */}
//         <label htmlFor="file-upload" className="upload-label">
//           Click to Upload or Drag & Drop
//         </label>
//         <input type="file" id="file-upload" onChange={handleFileChange} />

//         {/* File Name Display */}
//         <p style={{ fontWeight: "500", color: "#374151", marginBottom: "20px" }}>
//           {fileName}
//         </p>

//         {/* Buttons */}
//         <div className="upload-actions">
//           <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
//             {loading ? "🔍 Analyzing..." : "Analyze Scan"}
//           </button>
//           <Link to="/" className="back-btn">
//             Back to Home
//           </Link>
//         </div>

//         {/* Error Message */}
//         {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

//         {/* Prediction Result */}
//         {prediction && (
//           <div className="result-box">
//             <h3>🧠 Diagnosis Result</h3>
//             <p><strong>{prediction}</strong></p>
//             <p>Confidence: {confidence}</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Upload() {
  const [fileName, setFileName] = useState("No file selected");
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setError("");
    } else {
      setFileName("No file selected");
    }
  };

  // ✅ Handle image upload and AI prediction
  const handleAnalyze = async () => {
    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];

    if (!file) {
      setError("⚠️ Please upload a file first!");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setConfidence(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data.error) {
        setError("❌ " + data.error);
      } else {
        setResult(data.prediction);
        setConfidence(data.confidence);
      }
    } catch (err) {
      setError("⚠️ Unable to connect to the AI server. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="upload-section">
      <div className="upload-box">
        <h2>Upload Medical Scan</h2>
        <p>Upload your X-ray, MRI, or CT scan for AI analysis.</p>

        {/* ---------- File Upload ---------- */}
        <label htmlFor="file-upload" className="upload-label">
          Click to Upload or Drag & Drop
        </label>
        <input type="file" id="file-upload" onChange={handleFileChange} />

        {/* ---------- File Name ---------- */}
        <p style={{ fontWeight: "500", color: "#374151", marginBottom: "15px" }}>
          {fileName}
        </p>

        {/* ---------- Buttons ---------- */}
        <div className="upload-actions">
          <button onClick={handleAnalyze} className="analyze-btn">
            Analyze Scan
          </button>
          <Link to="/" className="back-btn">
            Back to Home
          </Link>
        </div>

        {/* ---------- Loading Spinner ---------- */}
        {loading && (
          <div className="analyzing">
            <div className="spinner"></div> Analyzing your scan...
          </div>
        )}

        {/* ---------- Error ---------- */}
        {error && <div className="error-text">{error}</div>}

        {/* ---------- Result ---------- */}
        {result && (
          <div className="result-box">
            <h3>🧠 Diagnosis Result</h3>
            <p>{result}</p>
            {confidence !== null && (
              <p>
                Confidence:{" "}
                <strong>
                  {confidence}%{" "}
                  {confidence < 50
                    ? "⚠️ (Low Confidence)"
                    : confidence < 70
                    ? "⚠️ (Medium Confidence)"
                    : "✅ (High Confidence)"}
                </strong>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
