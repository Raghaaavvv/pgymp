function Gymequipment({ equipment }) {
    const equipmentList = Array.isArray(equipment) ? equipment : [];

    const styles = {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '18px',
            padding: '20px',
        },
        title: {
            textAlign: 'center',
            color: 'rgb(181, 68, 68)',
            fontSize: '25px',
            fontWeight: '700',
            padding: '10px',
            letterSpacing: '-0.02em',
        },
        card: {
            width: '90px',
            padding: '18px 14px',
            borderRadius: '14px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05), 0 6px 18px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            border: '1px solid #f0f0f0',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            cursor: 'default',
        },
        image: {
            width: '36px',
            objectFit: 'contain',
            marginBottom: '8px',
            transition: 'transform 0.25s ease',
        },
        name: {
            fontSize: '11px',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#333',
        },
        availability: {
            fontSize: '17px',
            fontWeight: '700',
            color: 'rgb(181, 68, 68)',
        },
        availableText: {
            fontSize: '11px',
            color: '#999',
            marginTop: '4px',
        },
    };

    return (
        <div>
            <h2 style={styles.title}>Equipment Availability</h2>
            <div style={styles.container}>
                {equipmentList.map((item, index) => {
                    const available = item.total - item.inUse;
                    const isLow = available === 0;
                    return (
                        <div
                            style={{
                                ...styles.card,
                                animation: `equipFadeIn 0.4s ease both`,
                                animationDelay: `${index * 0.05}s`,
                            }}
                            className="equip-card"
                            key={item.name}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                style={styles.image}
                                className="equip-image"
                            />
                            <h3 style={styles.name}>{item.name}</h3>
                            <p style={{
                                ...styles.availability,
                                color: isLow ? '#999' : 'rgb(181, 68, 68)'
                            }}>
                                {available} / {item.total}
                            </p>
                            <p style={styles.availableText}>
                                {isLow ? 'Full' : 'Available'}
                            </p>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .equip-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 4px 14px rgba(0,0,0,0.08), 0 10px 24px rgba(0,0,0,0.06);
                }
                .equip-card:hover .equip-image {
                    transform: scale(1.2);
                }
                @keyframes equipFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default Gymequipment;