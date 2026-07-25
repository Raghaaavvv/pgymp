import { useEffect, useRef, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function ScannerPage() {
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [useCamera, setUseCamera] = useState(false);
    const [cameraMessage, setCameraMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");
    const videoRef = useRef(null);

    const sendTokenToBackend = async (scannedToken) => {
        if (!scannedToken) {
            setMessage("Please enter or scan a token!");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/scan`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: scannedToken })
            });

            const data = await response.json();

            if (data.status) {
                setIsSuccess(true);
                setMessage("Check In Successful!");
                setToken("");
            } else {
                setIsSuccess(false);
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Scan error:", error);
            setIsSuccess(false);
            setMessage("Cannot connect to server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!useCamera || !isAuthenticated) return undefined;

        let stream = null;
        let animationFrameId = null;
        let isActive = true;

        const startCameraScanner = async () => {
            if (!("BarcodeDetector" in window)) {
                setCameraMessage("Camera scanning is not supported in this browser. Please enter the token manually.");
                return;
            }

            if (!navigator.mediaDevices?.getUserMedia) {
                setCameraMessage("Camera access is not available. Please enter the token manually.");
                return;
            }

            try {
                const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: "environment" } }
                });

                if (!isActive || !videoRef.current) {
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setCameraMessage("Point the camera at the resident QR code.");

                const scanFrame = async () => {
                    if (!isActive || !videoRef.current) return;

                    try {
                        const codes = await detector.detect(videoRef.current);
                        const scannedToken = codes[0]?.rawValue;
                        if (scannedToken) {
                            setToken(scannedToken);
                            setUseCamera(false);
                            sendTokenToBackend(scannedToken);
                            return;
                        }
                    } catch (error) {
                        console.error("QR detection error:", error);
                    }

                    animationFrameId = requestAnimationFrame(scanFrame);
                };

                animationFrameId = requestAnimationFrame(scanFrame);
            } catch (error) {
                console.error("Camera error:", error);
                setCameraMessage("Camera error. Please enter the token manually.");
            }
        };

        startCameraScanner();

        return () => {
            isActive = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [useCamera, isAuthenticated]);

    const handleAdminLogin = () => {
        if (adminPassword === "abc") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password!");
        }
    };

    const handleCameraToggle = () => {
        setUseCamera(!useCamera);
        setCameraMessage("");
        setMessage("");
    };

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
            textAlign: 'center'
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
            marginBottom: '20px'
        },
        cameraContainer: {
            width: '100%',
            marginBottom: '20px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid rgb(181, 68, 68)'
        },
        cameraMessage: {
            padding: '12px',
            color: '#777',
            fontSize: '14px',
            textAlign: 'center',
            backgroundColor: '#f7f7f7'
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
            opacity: isLoading ? 0.7 : 1
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
            border: `1px solid ${isSuccess ? '#a8d5b0' : '#f5c0c0'}`
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ ...styles.container, justifyContent: 'center' }}>
                <div style={{ ...styles.card, maxWidth: '360px', textAlign: 'center' }}>
                    <h2 style={{ color: 'rgb(181, 68, 68)', marginBottom: '18px', fontWeight: 700 }}>
                        Security Staff Access Only
                    </h2>
                    <input
                        type="password"
                        placeholder="Enter staff password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                        style={styles.input}
                    />
                    {error && <p style={{ color: 'rgb(181, 68, 68)', fontSize: '14px' }}>{error}</p>}
                    <button onClick={handleAdminLogin} style={styles.submitBtn}>
                        Access Scanner
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>PGymP Security Scanner</h1>
            <p style={styles.subtitle}>Scan resident QR code to check them in</p>

            <div style={styles.card}>
                <button
                    style={styles.cameraToggleBtn}
                    onClick={handleCameraToggle}
                >
                    {useCamera ? "Turn Off Camera" : "Scan QR Code with Camera"}
                </button>

                {useCamera && (
                    <div style={styles.cameraContainer}>
                        <video
                            ref={videoRef}
                            playsInline
                            muted
                            style={{ width: '100%', display: 'block', backgroundColor: '#111' }}
                        />
                        {cameraMessage && <div style={styles.cameraMessage}>{cameraMessage}</div>}
                    </div>
                )}

                <div style={styles.divider}>
                    <div style={styles.dividerLine}></div>
                    <span style={styles.dividerText}>OR enter token manually</span>
                    <div style={styles.dividerLine}></div>
                </div>

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Paste or type token here"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />

                <button
                    style={styles.submitBtn}
                    onClick={() => sendTokenToBackend(token)}
                    disabled={isLoading}
                >
                    {isLoading ? "Checking In..." : "Check In"}
                </button>

                {message && <div style={styles.message}>{message}</div>}
            </div>

            <style>{`
                @keyframes scannerCardIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default ScannerPage;
