import React from 'react'

function GymCapacityBox({currentCapacity, maxCapacity}) {
    const styles = {
        widgetContainer: {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Centers the content horizontally
            },
        titleHeader: {
            textAlign: 'center',
            color: 'rgb(181, 68, 68)', // The user's exact title color
            fontSize: '25px',
            padding: '10px',
            marginBottom: '10px' // Space before the card
            },
        card: {
                width: '300px', // The user's card width
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: '1px solid #f0f0f0',
            },
        progressContainer: {
                width: '100%',
                height: '20px', // Total height of the bar
                backgroundColor: '#e0e0e0', // Light gray background (empty)
                borderRadius: '10px', // Rounded corners
                overflow: 'hidden', // Ensures the filler stays inside the corners
                marginTop: '15px'
            },
        progressFiller: {
                height: '100%', // Fills the vertical space
                backgroundColor: 'rgb(181, 68, 68)', // Red fill color
                borderRadius: 'inherited', // Uses the container's rounded corners
                transition: 'width 0.3s ease-in-out' // Smooth filling animation
            }
        }







    const rawPercentage = (currentCapacity / maxCapacity) * 100;
    const percentage = Math.min(Math.max(rawPercentage, 0), 100);

        return (
            <div style={styles.widgetContainer}>
                {/* The title displayed on top, outside the card */}
                <h1 style={styles.titleHeader}>Today's gym capacity</h1>

                {/* The visual card */}
                <div style={styles.card}>

                    {/* 1. Numerical display */}
                    <h2>{currentCapacity} / {maxCapacity}</h2>
                    <p>People currently inside</p>

                    {/* 2. Horizontal Progress Bar (The structure) */}
                    <div style={styles.progressContainer}>
                        {/* The dynamic filler (The magic happens here) */}
                        <div style={{
                            ...styles.progressFiller,
                            width: `${percentage}%` // Dynamic width calculation
                        }} />
                    </div>
                </div>
            </div>
        );
    }


export default GymCapacityBox;