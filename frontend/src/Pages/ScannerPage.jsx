import { useState } from 'react';
import QrScanner from 'react-qr-scanner';

function ScannerPage() {
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [useCamera, setUseCamera] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 20px',
            minHeight: '100vh',
            backgroundColor: '#f9f9f9'
        },
        title: {
            fontSize: '28px',
            fontWeight: '700',
            color: 'rgb(181, 68, 68)',
            marginBottom: '8px',
            textAlign: 'center',
            letterSpacing: '-0.02em'
        },
        subtitle: {
            fontSize: '15px',
            color: '#777',
            marginBottom: '30px',
            textAlign: 'center'
        },
        card: {
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 10px 28px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f0f0f0',
            animation: 'scannerCardIn 0.35s ease both'
        },
        cameraToggleBtn: {
            width: '100%',
            padding: '13px',
            backgroundColor: useCamera ? '#666' : 'rgb(181, 68, 68)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'filter 0.2s ease, transform 0.15s ease'
        },
        cameraContainer: {
            width: '100%',
            marginBottom: '20px',
            borderRadius: '12px',
            overflow: 'hidden',
            animation: 'scannerCardIn 0.3s ease both',
            border: '2px solid rgb(181, 68, 68)'
        },
        divider: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
        },
        dividerLine: {
            flex: 1,
            height: '1px',
            backgroundColor: '#e5e5e5'
        },
        dividerText: {
            color: '#999',
            fontSize: '13px'
        },
        input: {
            width: '100%',
            padding: '13px',
            borderRadius: '10px',
            border: '2px solid #e5e5e5',
            fontSize: '14px',
            marginBottom: '16px',
            boxSizing: 'border-box',
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
            outline: 'none'
        },
        submitBtn: {
            width: '100%',
            padding: '13px',
            backgroundColor: 'rgb(181, 68, 68)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            transition: 'filter 0.2s ease, transform 0.15s ease'
        },
        message: {
            marginTop: '20px',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: isSuccess ? '#e6f4ea' : '#fce8e8',
            color: isSuccess ? '#2d7a3a' : 'rgb(181, 68, 68)',
            border: `1px solid ${isSuccess ? '#a8d5b0' : '#f5c0c0'}`,
            animation: 'scannerMessageIn 0.3s ease both'
        }
    };

    const handleAdminLogin = () => {
        if (adminPassword === "abc") {  // Simple hardcoded password
            setIsAuthenticated(true);
        } else {
            setError("Incorrect password!");
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '40px',
                backgroundColor: '#f9f9f9'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '360px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '32px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 10px 28px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #f0f0f0',
                    textAlign: 'center',
                    animation: 'scannerCardIn 0.35s ease both',
                    marginTop: '-400px'

                }}>
                    <h2 style={{ color: 'rgb(181, 68, 68)', marginBottom: '18px', fontWeight: 700 }}>
                        Security Staff Access Only
                    </h2>
                    <input
                        type="password"
                        placeholder="Enter staff password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                        style={{
                            padding: '12px',
                            marginBottom: '14px',
                            width: '100%',
                            boxSizing: 'border-box',
                            borderRadius: '10px',
                            border: '2px solid #e5e5e5',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.25s ease'
                        }}
                    />
                    {error && (
                        <p style={{
                            color: 'rgb(181, 68, 68)',
                            fontSize: '14px',
                            marginBottom: '12px',
                            animation: 'scannerMessageIn 0.25s ease both'
                        }}>
                            {error}
                        </p>
                    )}
                    <button
                        onClick={handleAdminLogin}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'rgb(181, 68, 68)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'filter 0.2s ease, transform 0.15s ease'
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Access Scanner
                    </button>
                </div>
                <style>{`
                    @keyframes scannerCardIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes scannerMessageIn {
                        from { opacity: 0; transform: translateY(-4px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        );
    }

    const sendTokenToBackend = async (scannedToken) => {
        if (!scannedToken) {
            setMessage("Please enter or scan a token!");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: scannedToken })
            });

            const data = await response.json();

            if (data.status) {
                setIsSuccess(true);
                setMessage("✓ Check In Successful!");
                setToken(""); // Clear input after success
            } else {
                setIsSuccess(false);
                setMessage(`✗ ${data.message}`);
            }
        } catch (error) {
            console.error("Scan error:", error);
            setIsSuccess(false);
            setMessage("Cannot connect to server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleScan = (data) => {
        if (data && data.text) {
            sendTokenToBackend(data.text);
        }
    };

    const handleError = (error) => {
        console.error("Camera error:", error);
        setIsSuccess(false);
        setMessage("Camera error. Please use manual input instead.");
    };

    const handleManualSubmit = () => {
        sendTokenToBackend(token);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>PGymP Security Scanner</h1>
            <p style={styles.subtitle}>Scan resident QR code to check them in</p>

            <div style={styles.card}>

                {/* Camera Toggle Button */}
                <button
                    style={styles.cameraToggleBtn}
                    onClick={() => {
                        setUseCamera(!useCamera);
                        setMessage("");
                    }}
                    onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(0.92)'}
                    onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
                >
                    {useCamera ? "Turn Off Camera" : "Scan QR Code with Camera"}
                </button>

                {/* Camera View */}
                {useCamera && (
                    <div style={styles.cameraContainer}>
                        <QrScanner
                            onScan={handleScan}
                            onError={handleError}
                            style={{ width: '100%', display: 'block' }}
                            constraints={{
                                video: { facingMode: "environment" } // Use back camera on phone
                            }}
                        />
                    </div>
                )}

                {/* Divider */}
                <div style={styles.divider}>
                    <div style={styles.dividerLine}></div>
                    <span style={styles.dividerText}>OR enter token manually</span>
                    <div style={styles.dividerLine}></div>
                </div>

                {/* Manual Input */}
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Paste or type token here"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgb(60, 153, 128)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(60, 153, 128, 0.15)';
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e5e5e5';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                />

                {/* Submit Button */}
                <button
                    style={styles.submitBtn}
                    onClick={handleManualSubmit}
                    disabled={isLoading}
                    onMouseOver={(e) => !isLoading && (e.currentTarget.style.filter = 'brightness(0.92)')}
                    onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
                >
                    {isLoading ? "Checking In..." : "Check In"}
                </button>

                {/* Success/Error Message */}
                {message && (
                    <div style={styles.message}>
                        {message}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes scannerCardIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scannerMessageIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default ScannerPage;