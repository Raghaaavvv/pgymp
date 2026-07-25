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
        <div style={{ position: 'relative', width: '100%' }}>
            <select
                {...props}
                style={{
                    ...inputStyle,
                    ...(props.style || {}),
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    paddingRight: '36px',
                }}
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
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(60, 153, 128)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                }}
            >
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
    );
}

function AuthFlow({ authStep, setAuthStep, userId, setUserId, fetchCapacity, fetchEquipment, setToken, equipmentData }) {
    const [matricId, setMatricId] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerMatricId, setRegisterMatricId] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const availableEquipment = Array.isArray(equipmentData) ? equipmentData : [];
    const [queuePosition, setQueuePosition] = useState(null);
    const [inQueue, setInQueue] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [blockNumber, setBlockNumber] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [blockError, setBlockError] = useState("");
    const [roomError, setRoomError] = useState("");

    const SG_PHONE_REGEX = /^[689]\d{7}$/;
    const BLOCK_REGEX = /^\d{2}$/;
    const ROOM_REGEX = /^[A-Za-z]$/;

    const validatePhoneNumber = (value) => {
        if (!SG_PHONE_REGEX.test(value)) {
            setPhoneError("Please enter a valid SG phone number (8 digits, starting with 6, 8, or 9).");
            return false;
        }
        setPhoneError("");
        return true;
    };

    const validateBlockNumber = (value) => {
        if (!BLOCK_REGEX.test(value)) {
            setBlockError("Block number must be exactly 2 digits.");
            return false;
        }
        setBlockError("");
        return true;
    };

    const validateRoomNumber = (value) => {
        if (!ROOM_REGEX.test(value)) {
            setRoomError("Room number must be a single letter.");
            return false;
        }
        setRoomError("");
        return true;
    };

    const handlePhoneChange = (e) => {
        // keep digits only, cap at 8 digits as the user types
        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 8);
        setPhoneNumber(digitsOnly);
        if (phoneError) {
            setPhoneError("");
        }
    };

    const handleBlockChange = (e) => {
        // keep digits only, cap at 2 digits as the user types
        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 2);
        setBlockNumber(digitsOnly);
        if (blockError) {
            setBlockError("");
        }
    };

    const handleRoomChange = (e) => {
        // keep a single letter only as the user types
        const letterOnly = e.target.value.replace(/[^A-Za-z]/g, '').slice(0, 1).toUpperCase();
        setRoomNumber(letterOnly);
        if (roomError) {
            setRoomError("");
        }
    };

    useEffect(() => {
        if (!inQueue) return; //

        const interval = setInterval(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/queueStatus?matricId=${matricId}`);
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
    }, [inQueue, matricId, setAuthStep]);



    const handleAuthResult = (data, activeMatricId) => {
        if (data.status) {
            setUserId(data.id);
            setToken(data.token);
            setAuthStep(2);
            fetchCapacity();
            return;
        }

        if (data.message.includes("queue")) {
            const position = data.message.match(/\d+/)?.[0];
            setQueuePosition(position ? parseInt(position) : null);
            setInQueue(true);
            setMatricId(activeMatricId);
            setAuthStep(5);
            return;
        }

        setErrorMessage(data.message);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const nextMatricId = matricId.trim();

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matricId: nextMatricId, password: password })
            });

            const data = await response.json();
            handleAuthResult(data, nextMatricId);
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const nextMatricId = registerMatricId.trim();
        if (registerPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matricId: nextMatricId, password: registerPassword })
            });

            const data = await response.json();
            if (data.status) {
                setMatricId(nextMatricId);
                setPassword(registerPassword);
            }
            handleAuthResult(data, nextMatricId);
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    const handleLeaveQueue = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/queue/leave`, {
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
                    <h2 className="card-title">{isRegistering ? "Register" : "Sign In"}</h2>
                    {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                    {isRegistering ? (
                        <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                            <FocusableInput
                                type="text"
                                placeholder="NUS Matric ID"
                                value={registerMatricId}
                                onChange={(e) => setRegisterMatricId(e.target.value)}
                                required
                            />
                            <FocusableInput
                                type="password"
                                placeholder="Password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                required
                            />
                            <FocusableInput
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="login-btn">Register & Enter</button>
                            <button
                                type="button"
                                className="auth-link-btn"
                                onClick={() => {
                                    setIsRegistering(false);
                                    setErrorMessage("");
                                }}
                            >
                                Already registered? Sign in
                            </button>
                        </form>
                    ) : (
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
                            <button
                                type="button"
                                className="auth-link-btn"
                                onClick={() => {
                                    setIsRegistering(true);
                                    setErrorMessage("");
                                }}
                            >
                                New? Register here
                            </button>
                        </form>
                    )}
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
                            const isBlockValid = validateBlockNumber(blockNumber);
                            const isRoomValid = validateRoomNumber(roomNumber);
                            const isPhoneValid = validatePhoneNumber(phoneNumber);
                            if (!isBlockValid || !isRoomValid || !isPhoneValid) {
                                return;
                            }
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
                        <div>
                            <FocusableInput
                                type="text"
                                placeholder="Block Number (e.g., 06)"
                                value={blockNumber}
                                onChange={handleBlockChange}
                                onBlur={() => blockNumber && validateBlockNumber(blockNumber)}
                                inputMode="numeric"
                                maxLength={2}
                                required
                                style={blockError ? { borderColor: 'rgb(181, 68, 68)' } : {}}
                            />
                            {blockError && (
                                <p style={{ ...errorStyle, marginTop: '8px', marginBottom: 0 }}>{blockError}</p>
                            )}
                        </div>
                        <FocusableInput type="text" placeholder="Level (e.g., 4)" required />
                        <div>
                            <FocusableInput
                                type="text"
                                placeholder="Room Letter (e.g., A)"
                                value={roomNumber}
                                onChange={handleRoomChange}
                                onBlur={() => roomNumber && validateRoomNumber(roomNumber)}
                                maxLength={1}
                                required
                                style={roomError ? { borderColor: 'rgb(181, 68, 68)' } : {}}
                            />
                            {roomError && (
                                <p style={{ ...errorStyle, marginTop: '8px', marginBottom: 0 }}>{roomError}</p>
                            )}
                        </div>
                        <div>
                            <FocusableInput
                                type="tel"
                                placeholder="Phone Number (e.g., 91234567)"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                onBlur={() => phoneNumber && validatePhoneNumber(phoneNumber)}
                                inputMode="numeric"
                                maxLength={8}
                                required
                                style={phoneError ? { borderColor: 'rgb(181, 68, 68)' } : {}}
                            />
                            {phoneError && (
                                <p style={{ ...errorStyle, marginTop: '8px', marginBottom: 0 }}>{phoneError}</p>
                            )}
                        </div>
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
