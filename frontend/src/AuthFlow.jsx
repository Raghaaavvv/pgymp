import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function AuthFlow({ authStep, setAuthStep, userId, setUserId, fetchCapacity, fetchEquipment, setToken, equipmentData }) {
    const [matricId, setMatricId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const availableEquipment = Array.isArray(equipmentData) ? equipmentData : [];
    const [queuePosition, setQueuePosition] = useState(null);
    const [inQueue, setInQueue] = useState(false);

    useEffect(() => {
        if (!inQueue) return; //

        const interval = setInterval(async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/queueStatus?matricId=${matricId}`);
                const data = await response.json();

                if (data.checkedIn) {
                    setInQueue(false);
                    setAuthStep(2);
                } else {

                    setQueuePosition(data.position);
                }
            } catch (error) {
                console.error("Error checking queue status:", error);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [inQueue, matricId]);



    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matricId: matricId, password: password })
            });

            const data = await response.json();

            if (data.status) {
                setUserId(data.id);
                setToken(data.token);
                setAuthStep(2);
                fetchCapacity();
            } else if (data.message.includes("queue")) {

                const position = data.message.match(/\d+/)[0];
                setQueuePosition(parseInt(position));
                setInQueue(true);
                setAuthStep(5);
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    const handleLeaveQueue = async () => {
        try {
            await fetch("http://localhost:8080/api/queue/leave", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matricId: matricId })
            });
            setInQueue(false);
            setQueuePosition(null);
            setAuthStep(1);
        } catch (error) {
            console.error("Error leaving queue:", error);
        }
    };

    const handleEquipmentSelect = (itemName) => {
        if (selectedEquipment.includes(itemName)) {
            setSelectedEquipment(selectedEquipment.filter(e => e !== itemName));
        } else {
            setSelectedEquipment([...selectedEquipment, itemName]);
        }
    }

    const handleEquipmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/equipment/checkIn`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId, equipmentNames: selectedEquipment })
            });

            if (!response.ok) {
                throw new Error(`Equipment check-in failed: ${response.status}`);
            }

            await response.json();
            fetchEquipment();
            setAuthStep(4);
        } catch (error) {
            console.error("Equipment check-in error:", error);
            setErrorMessage("Could not submit equipment selection. Please try again.");
        }
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

    if (authStep === 2) {
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
                        <input type="text" placeholder="Level (e.g., 4)" required style={{ padding: '8px' }} />
                        <input type="text" placeholder="Room Number" required style={{ padding: '8px' }} />
                        <input type="tel" placeholder="Phone Number" required style={{ padding: '8px' }} />
                        <button type="submit" className="login-btn">Confirm & Enter</button>
                    </form>
                </div>
            </div>
        );
    }

    if (authStep === 3) {
        return (
            <div className="card-container">
                <div className="card1" style={{ maxWidth: '300px' }}>
                    <h2 className="card-title">Workout Plan</h2>
                    <p>Select equipment you plan to use:</p>
                    {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
                    <form
                        onSubmit={handleEquipmentSubmit}
                        style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}
                    >
                        {availableEquipment.map((item) => (
                            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    id={item.name}
                                    checked={selectedEquipment.includes(item.name)}
                                    onChange={() => handleEquipmentSelect(item.name)}
                                    style={{ fontFamily: 'sans-serif' }}
                                />
                                <label htmlFor={item.name}>{item.name} ({item.total - item.inUse} available)</label>
                            </div>
                        ))}
                        <button type="submit" className="login-btn">Check In</button>
                    </form>
                </div>
            </div>
        );
    }

    if (authStep === 5) {
        return (
            <div className="card-container">
                <div className="card1" style={{ maxWidth: '300px', textAlign: 'center' }}>
                    <h2 className="card-title">Gym is Full!</h2>
                    <p>You are currently</p>
                    <h1 style={{ fontSize: '60px', color: 'rgb(181, 68, 68)' }}>
                        #{queuePosition}
                    </h1>
                    <p>in the waitlist</p>
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
                        You will be automatically checked in when a spot opens up!
                        This page updates every 10 seconds.
                    </p>
                    <button
                        onClick={handleLeaveQueue}
                        style={{ marginTop: '20px' }}
                        className="checkout-btn"
                    >
                        Leave Queue
                    </button>
                </div>
            </div>
        );
    }

    return null;
}

export default AuthFlow;
