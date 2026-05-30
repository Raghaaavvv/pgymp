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
import GymChart from "./GymChart.jsx";
import AuthFlow from "./AuthFlow.jsx";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {

  const qrCodeData = "test123";
  const [authStep, setAuthStep] = useState(1);



  return(
    <>
      <Header/>
      
      <div className= "card-container">
          <Card />
      </div>
      <div className= "login-container">

{/* if statment of jsx*/}
      {authStep < 3 ? 
      (<AuthFlow authStep={authStep} setAuthStep={setAuthStep} />) : 
      (
        <div className="card1 success-card">
            <h2 className="card-title">Welcome to PGymP!</h2>
            <p className="card-text">Scan this at the security desk.</p>
            
            <div className="qr-wrapper">
              <QRCodeCanvas value={qrCodeData} size={160} level="H" /> 
            </div>

            <button onClick={() => setAuthStep(0)} className="checkout-btn">
              Check Out (Log Out)
            </button>
        </div>
      )}

      </div>
      <GymChart />
      
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


