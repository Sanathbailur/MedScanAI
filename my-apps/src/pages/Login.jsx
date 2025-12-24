// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email:", email);
//     console.log("Password:", password);
//     alert("Login functionality coming soon!");
//   };

//   return (
//     <section className="login-section">
//       <div className="login-box">
//         <h2>Welcome Back</h2>
//         <p>Sign in to access MediScan AI</p>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>

//         <Link to="/" className="back-home">
//           Back to Home
//         </Link>
//       </div>
//     </section>
//   );
// }
