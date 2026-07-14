import { useState } from 'react';
import QrScanner from 'react-qr-scanner';

function ScannerPage() {
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [useCamera, setUseCamera] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            fontWeight: 'bold',
            color: 'rgb(181, 68, 68)',
            marginBottom: '10px',
            textAlign: 'center'
        },
        subtitle: {
            fontSize: '16px',
            color: '#666',
            marginBottom: '30px',
            textAlign: 'center'
        },
        card: {
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f0f0f0'
        },
        cameraToggleBtn: {
            width: '100%',
            padding: '12px',
            backgroundColor: useCamera ? '#666' : 'rgb(181, 68, 68)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '20px'
        },
        cameraContainer: {
            width: '100%',
            marginBottom: '20px',
            borderRadius: '8px',
            overflow: 'hidden'
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
            backgroundColor: '#e0e0e0'
        },
        dividerText: {
            color: '#888',
            fontSize: '14px'
        },
        input: {
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box'
        },
        submitBtn: {
            width: '100%',
            padding: '12px',
            backgroundColor: 'rgb(181, 68, 68)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
        },
        message: {
            marginTop: '20px',
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: isSuccess ? '#e6f4ea' : '#fce8e8',
            color: isSuccess ? '#2d7a3a' : 'rgb(181, 68, 68)',
            border: `1px solid ${isSuccess ? '#a8d5b0' : '#f5c0c0'}`
        }
    };

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
                >
                    {useCamera ? "Turn Off Camera" : "Scan QR Code with Camera"}
                </button>

                {/* Camera View */}
                {useCamera && (
                    <div style={styles.cameraContainer}>
                        <QrScanner
                            onScan={handleScan}
                            onError={handleError}
                            style={{ width: '100%' }}
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
                />

                {/* Submit Button */}
                <button
                    style={styles.submitBtn}
                    onClick={handleManualSubmit}
                    disabled={isLoading}
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
        </div>
    );
}

export default ScannerPage;