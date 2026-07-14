import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const inputStyle = {
    padding: '11px 12px',
    borderRadius: '10px',
    border: '2px solid #e5e5e5',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
};

function FocusableInput(props) {
    return (
        <input
            {...props}
            style={{ ...inputStyle, ...(props.style || {}) }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgb(60, 153, 128)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(60, 153, 128, 0.15)';
            }}
            onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.boxShadow = 'none';
            }}
        />
    );
}

function FocusableSelect(props) {
    return (
        <select
            {...props}
            style={{ ...inputStyle, ...(props.style || {}), cursor: 'pointer' }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgb(60, 153, 128)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(60, 153, 128, 0.15)';
            }}
            onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {props.children}
        </select>
    );
}

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

    const stepAnim = {
        animation: 'authStepIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
    };

    const errorStyle = {
        color: 'rgb(181, 68, 68)',
        fontSize: '13px',
        fontWeight: 600,
        background: '#fce8e8',
        border: '1px solid #f5c0c0',
        borderRadius: '8px',
        padding: '8px 12px',
        animation: 'authErrorIn 0.25s ease both',
    };

    if (authStep === 1) {
        return (
            <div className="card-container">
                <div className="card1" style={stepAnim}>
                    <h2 className="card-title">Sign In</h2>
                    {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                    <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                        <FocusableInput
                            type="text"
                            placeholder="NUS Matric ID"
                            value={matricId}
                            onChange={(e) => setMatricId(e.target.value)}
                            required
                        />
                        <FocusableInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-btn">Next</button>
                    </form>
                </div>
                <style>{`
                    @keyframes authStepIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes authErrorIn {
                        from { opacity: 0; transform: translateY(-4px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        );
    }

    if (authStep === 2) {
        return (
            <div className="card-container">
                <div className="card1" style={{ maxWidth: '300px', ...stepAnim }}>
                    <h2 className="card-title">Resident Details</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setAuthStep(3);
                        }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}
                    >
                        <FocusableSelect required defaultValue="">
                            <option value="" disabled>Select House...</option>
                            <option value="lighthouse">LightHouse</option>
                            <option value="pioneer">Pioneer House</option>
                            <option value="helix">Helix House</option>
                            <option value="pgpr">PGPR House</option>
                        </FocusableSelect>
                        <FocusableInput type="number" placeholder="Block Number" min="1" required />
                        <FocusableInput type="text" placeholder="Level (e.g., 4)" required />
                        <FocusableInput type="text" placeholder="Room Number" required />
                        <FocusableInput type="tel" placeholder="Phone Number" required />
                        <button type="submit" className="login-btn">Confirm & Enter</button>
                    </form>
                </div>
                <style>{`
                    @keyframes authStepIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        );
    }

    if (authStep === 3) {
        return (
            <div className="card-container">
                <div className="card1" style={{ maxWidth: '300px', ...stepAnim }}>
                    <h2 className="card-title">Workout Plan</h2>
                    <p style={{ color: '#777', fontSize: '14px' }}>Select equipment you plan to use:</p>
                    {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                    <form
                        onSubmit={handleEquipmentSubmit}
                        style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}
                    >
                        {availableEquipment.map((item, index) => {
                            const checked = selectedEquipment.includes(item.name);
                            return (
                                <label
                                    key={item.name}
                                    htmlFor={item.name}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '10px 12px',
                                        borderRadius: '10px',
                                        border: `2px solid ${checked ? 'rgb(60, 153, 128)' : '#eee'}`,
                                        backgroundColor: checked ? 'rgba(60, 153, 128, 0.06)' : '#fff',
                                        cursor: 'pointer',
                                        transition: 'border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease',
                                        textAlign: 'left',
                                        animation: `authRowIn 0.3s ease both`,
                                        animationDelay: `${index * 0.04}s`,
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        id={item.name}
                                        checked={checked}
                                        onChange={() => handleEquipmentSelect(item.name)}
                                        style={{ accentColor: 'rgb(60, 153, 128)', width: '16px', height: '16px', cursor: 'pointer' }}
                                    />
                                    <span style={{ fontSize: '14px', color: '#333' }}>
                                        {item.name} <span style={{ color: '#999' }}>({item.total - item.inUse} available)</span>
                                    </span>
                                </label>
                            );
                        })}
                        <button type="submit" className="login-btn" style={{ marginTop: '6px' }}>Check In</button>
                    </form>
                </div>
                <style>{`
                    @keyframes authStepIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes authRowIn {
                        from { opacity: 0; transform: translateX(-6px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                `}</style>
            </div>
        );
    }

    if (authStep === 5) {
        return (
            <div className="card-container">
                <div className="card1" style={{ maxWidth: '300px', textAlign: 'center', ...stepAnim }}>
                    <h2 className="card-title">Gym is Full!</h2>
                    <p style={{ color: '#777', fontSize: '14px' }}>You are currently</p>
                    <h1 style={{
                        fontSize: '60px',
                        color: 'rgb(181, 68, 68)',
                        margin: '8px 0',
                        animation: 'queuePulse 2s ease-in-out infinite',
                    }}>
                        #{queuePosition}
                    </h1>
                    <p style={{ color: '#777', fontSize: '14px' }}>in the waitlist</p>
                    <p style={{ fontSize: '12px', color: '#999', marginTop: '10px', lineHeight: 1.5 }}>
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
                <style>{`
                    @keyframes authStepIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes queuePulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                `}</style>
            </div>
        );
    }

    return null;
}

export default AuthFlow;