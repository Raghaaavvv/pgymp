import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Gymequipment from "./Gymequipment.jsx";
import Card from "./card.jsx";
import Student from "./student.jsx";
//import PropTypes from "prop-types";
import LoginButton from "./loginbutton.jsx";
import Counter from "./counter.jsx";
import ToDoList from "./todo.jsx";
import DynamicWindow from "./DynamicWindow.jsx";
import DigitalClock from "./digitalclock.jsx";
import AuthFlow from "./AuthFlow.jsx";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import GymCapacityBox from './GymCapacityBox'

function App() {

  const qrCodeData = "test123";
  const [authStep, setAuthStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [currentCapacity, setCurrentCapacity] = useState(15);
  const maxCapacity = 30;

  const fetchCapacity = async () => {
      try {
          const response = await fetch("http://localhost:8080/api/auth/capacity");
          const data = await response.json();
          setCurrentCapacity(data.currentCount);
          }
      catch (error) {
          console.error("Error fetching capacity", error);
      }
  }

  useEffect(() => {
      fetchCapacity();
      const interval = setInterval(fetchCapacity, 10000);
      return () => clearInterval(interval);
  }, []);

  const handleCheckout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/checkOut", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId})
                });

            const data = await response.json();
            if (data.status) {
                setUserId(null);
                setAuthStep(1);
                fetchCapacity();
                } else {
                    alert(data.message);
             }
         } catch (error) {
             console.error("Checkout error:", error);
             alert("An error occurred during checkout.");
         }
     };





  return(
    <>
      <Header/>
      
      <div className= "card-container">
          <Card />
      </div>
      <div className= "login-container">

{/* if statment of jsx*/}
      {authStep < 3 ? 
      (<AuthFlow authStep={authStep} setAuthStep={setAuthStep} setUserId={setUserId} fetchCapacity={fetchCapacity} />) :
      (
        <div className="card1 success-card">
            <h2 className="card-title">Welcome to PGymP!</h2>
            <p className="card-text">Scan this at the security desk.</p>
            
            <div className="qr-wrapper">
              <QRCodeCanvas value={qrCodeData} size={160} level="H" /> 
            </div>

            <button onClick={handleCheckout} className="checkout-btn">
              Check Out (Log Out)
            </button>
        </div>
      )}

      </div>
      <GymCapacityBox currentCapacity={currentCapacity} maxCapacity={maxCapacity} />
      <Gymequipment />
      <Footer />








      {/*<Student name = "soma" block={30} isResident={true} />
      <Student/> 
      <Counter />
      <ToDoList />
      <DynamicWindow /> 
       <DigitalClock/> */}

      
  
      </>
  
  );
  
}
/*Student.propTypes = {
  name: PropTypes.string.isRequired,
  block: PropTypes.number.isRequired,
  isResident: PropTypes.bool.isRequired
};

Student.defaultProps = {
  name: "Admin",
  block: 67,
  isResident: true
}; */ //these not working???

export default App


