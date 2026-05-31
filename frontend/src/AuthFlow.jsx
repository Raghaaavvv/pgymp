import { useState } from 'react';


function AuthFlow({ authStep, setAuthStep, setUserId}) {
//storage
  const [matricId, setMatricId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleLoginSubmit = async (e) => {e.preventDefault(); 
    setErrorMessage(""); 

    try {
      // 'fetch' is JavaScript's built-in way to send network requests

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ matricId: matricId, password: password }) 
      });
      const data = await response.json();

          if (data.status) {          // true =success
              setUserId(data.id);
              setAuthStep(2);
          } else {                    // false= failure
              setErrorMessage(data.message);
          }
    
  
    }
    catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };


  if (authStep === 0) {
    return (
      <div className="login-container">
        <button className="login-btn" onClick={() => setAuthStep(2)}>
          Login
        </button>
      </div>
    );
  }

  if (authStep === 1) {
    return (
      <div className="card-container">
        <div className="card1">
          <h2 className="card-title">Sign In</h2>
          
          
          {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
          
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            
            <input 
              type="text" 
              placeholder="NUS Matric ID" 
              value={matricId} 
              onChange={(e) => setMatricId(e.target.value)}
              required 
              style={{ padding: '8px' }} 
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ padding: '8px' }} 
            />
            
            <button type="submit" className="login-btn">Next</button>
          </form>
        </div>
      </div>
    );
  }


  if (authStep === 2) { //logged in alr ig?
    return (
      <div className="card-container">
        <div className="card1" style={{ maxWidth: '300px' }}>
          <h2 className="card-title">Resident Details</h2>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setAuthStep(3); 
            }} 
            style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}
          >
            <select required style={{ padding: '8px' }}>
              <option value="">Select House...</option>
              <option value="lighthouse">LightHouse</option>
              <option value="pioneer">Pioneer House</option>
              <option value="helix">Helix House</option>
              <option value="pgpr">PGPR House</option>
            </select>
            <input type="number" placeholder="Block Number" min="1" required style={{ padding: '8px' }} />
            <input type="text" placeholder="Level (e.g., 4)" pattern="^[Bb]?[0-9]+$" title="Enter a valid floor number (e.g., 4, 12, B1)" required style={{ padding: '8px' }} />
            
            <input type="text" placeholder="Room Number" required style={{ padding: '8px' }} />
            <input type="tel" placeholder="Phone Number" required style={{ padding: '8px' }} />
            <button type="submit" className="login-btn">Confirm & Enter</button>
          </form>
        </div>
      </div>
    );
  }

  // A React component must always return something, even if it's just 'null' (nothing).
  return null; 
}

export default AuthFlow;
