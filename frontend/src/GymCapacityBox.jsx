import React from 'react'

function GymCapacityBox({ currentCapacity, maxCapacity }) {
    const styles = {
        widgetContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        titleHeader: {
            textAlign: 'center',
            color: 'rgb(181, 68, 68)',
            fontSize: '25px',
            fontWeight: '700',
            padding: '10px',
            marginBottom: '10px',
            letterSpacing: '-0.02em',
        },
        card: {
            width: '220px',
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            border: '1px solid #f0f0f0',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        },
        percentText: {
            fontFamily: 'sans-serif',
            fontSize: '22px',
            fontWeight: '700',
            marginTop: '4px',
            marginBottom: '16px',
            color: '#222',
        },
        progressContainer: {
            width: '100%',
            height: '14px',
            backgroundColor: '#eee',
            borderRadius: '999px',
            overflow: 'hidden',
            position: 'relative',
        },
        progressFiller: {
            height: '100%',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, rgb(181, 68, 68), rgb(214, 96, 96))',
            transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        },
    };

    const numericCapacity = Number(currentCapacity);
    const numericMaxCapacity = Number(maxCapacity);

    if (!Number.isFinite(numericCapacity) || !Number.isFinite(numericMaxCapacity) || numericMaxCapacity <= 0) {
        return (
            <div style={styles.widgetContainer}>
                <p style={{ textAlign: 'center', color: '#888', animation: 'fadeIn 0.4s ease' }}>
                    Loading capacity...
                </p>
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}</style>
            </div>
        );
    }

    const rawPercentage = Math.round((numericCapacity / numericMaxCapacity) * 100);
    const percentage = Math.min(Math.max(rawPercentage, 0), 100);

    return (
        <div style={styles.widgetContainer}>
            <h1 style={styles.titleHeader}>Today's gym capacity</h1>

            <div
                style={styles.card}
                className="capacity-card"
            >
                <h2 style={styles.percentText}>{rawPercentage}% full</h2>
                <div style={styles.progressContainer}>
                    <div style={{ ...styles.progressFiller, width: `${percentage}%` }}></div>
                </div>
            </div>

            <style>{`
                .capacity-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 4px 14px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.06);
                }
            `}</style>
        </div>
    );
}

export default GymCapacityBox;