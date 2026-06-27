import React from 'react'

function GymCapacityBox({currentCapacity, maxCapacity}) {
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
            padding: '10px',
            marginBottom: '10px'
            },
        card: {
                width: '200px',
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: '1px solid #f0f0f0',
            },
        progressContainer: {
                width: '100%',
                height: '20px',
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden',
                marginTop: '15px'
            },
        progressFiller: {
                height: '100%',
                backgroundColor: 'rgb(181, 68, 68)',
                borderRadius: 'inherited',
                transition: 'width 0.3s ease-in-out'
            }
        }

    const numericCapacity = Number(currentCapacity);
    const numericMaxCapacity = Number(maxCapacity);

    if (!Number.isFinite(numericCapacity) || !Number.isFinite(numericMaxCapacity) || numericMaxCapacity <= 0) {
        return <p style={{textAlign: 'center'}}>Loading capacity...</p>
    }

    const rawPercentage = Math.round((numericCapacity / numericMaxCapacity) * 100);
    const percentage = Math.min(Math.max(rawPercentage, 0), 100);
    return (
        <div style={styles.widgetContainer}>
            <h1 style={styles.titleHeader}>Today's gym capacity</h1>

                <div style={styles.card}>
                    <h2 style={{ font: 'sans-serif', fontSize: "20px", marginTop: '5px' }}>{rawPercentage}% full</h2>
                       <div style={styles.progressContainer}>
                           <div style={{...styles.progressFiller, width: `${percentage}%`}}></div>
                        </div>
                    </div>
               </div>
    );
//
}


export default GymCapacityBox;
