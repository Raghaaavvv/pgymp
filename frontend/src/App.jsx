import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Gymequipment from "./Gymequipment.jsx";
import Card from "./card.jsx";
import Student from "./student.jsx";
import LoginButton from "./loginbutton.jsx";
import Counter from "./counter.jsx";
import ToDoList from "./todo.jsx";
import DynamicWindow from "./DynamicWindow.jsx";
import DigitalClock from "./digitalclock.jsx";
import AuthFlow from "./AuthFlow.jsx";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import GymCapacityBox from './GymCapacityBox'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import FeedbackPage from './Pages/FeedbackPage'
import backMachineImg from './assets/back_machine.png'
import barbellImg from './assets/barbell.png'
import benchImg from './assets/benchpress.png'
import dumbellImg from './assets/dumbell.png'
import ellipticalImg from './assets/elliptical.png'
import legPressImg from './assets/leg_press.png'
import treadmillImg from './assets/treadmill.png'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function App() {

  const [token, setToken] = useState(null);
  const qrCodeData = token ? token : "";
  const [authStep, setAuthStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [currentCapacity, setCurrentCapacity] = useState(null);
  const maxCapacity = 30;
  const [currentPage, setCurrentPage] = useState("home");
  const [equipmentData, setEquipmentData] = useState([
      {"name": "Benches", "total": 2, "inUse": 1, "image": benchImg},
      {"name": "Dumbbells", "total": 10, "inUse": 3, "image": dumbellImg},
      {"name": "Barbells", "total": 2, "inUse": 1, "image": barbellImg},
      {"name": "Back Machines", "total": 1, "inUse": 0, "image": backMachineImg},
      {"name": "Treadmills", "total": 3, "inUse": 2, "image": treadmillImg},
      {"name": "Ellipticals", "total": 1, "inUse": 0, "image": ellipticalImg},
      {"name": "Leg Presses", "total": 1, "inUse": 1, "image": legPressImg}
      ]);



  const fetchCapacity = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/api/auth/capacity`);
          if (!response.ok) {
              throw new Error(`Capacity request failed: ${response.status}`);
          }
          const data = await response.json();
          setCurrentCapacity(data.currentCount);
          }
      catch (error) {
          console.error("Error fetching capacity", error);
      }
  }

  const fetchEquipment = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/equipment`);
            if (!response.ok) {
                throw new Error(`Equipment request failed: ${response.status}`);
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setEquipmentData(data);
            }
            }
        catch(error) {
            console.error("Error fetching data", error);
            }
        }

  useEffect(() => {
      fetchCapacity();
      fetchEquipment();
      const interval = setInterval(() => {fetchEquipment(); fetchCapacity();}, 10000);
      return () => clearInterval(interval);
  }, []);

  const handleCheckout = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/checkOut`, {
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


    if (currentPage === "feedback") {
            return (
                <>
                    <Header setCurrentPage={setCurrentPage} />
                    <FeedbackPage setCurrentPage={setCurrentPage} />
                    <Footer />
                </>

                );
            }



    if (currentPage === "about") {
        return (
            <>
                <Header setCurrentPage={setCurrentPage} />
                <AboutPage setCurrentPage={setCurrentPage}/>
                <Footer />
            </>
            );
        }

    if (currentPage === "contact") {
        return (
            <>
                <Header setCurrentPage={setCurrentPage} />
                <ContactPage />
                <Footer />

            </>
            );
        }

    if ( currentPage === "home" ) {
          return(
            <>
              <Header setCurrentPage={setCurrentPage} />

              <div className= "card-container">
                  <Card />
              </div>
              <div className= "login-container">

        {/* if statment of jsx*/}
              {authStep < 4 ?
              (<AuthFlow authStep={authStep} setAuthStep={setAuthStep} setUserId={setUserId} fetchCapacity={fetchCapacity}
                    setToken={setToken} equipmentData={equipmentData} />) :
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
