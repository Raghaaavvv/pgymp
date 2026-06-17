import backMachineImg from './assets/back_machine.png'
import barbellImg from './assets/barbell.png'
import benchImg from './assets/benchpress.png'
import dumbellImg from './assets/dumbell.png'
import ellipticalImg from './assets/elliptical.png'
import legPressImg from './assets/leg_press.png'
import treadmillImg from './assets/treadmill.png'

function Gymequipment() {
   
    const equipment = [
        {"name": "Benches", "total": 2, "inUse": 1, "image": benchImg},
        {"name": "Dumbbells", "total": 10, "inUse": 3, "image": dumbellImg},
        {"name": "Barbells", "total": 2, "inUse": 1, "image": barbellImg},
        {"name": "Back Machines", "total": 1, "inUse": 0, "image": backMachineImg},
        {"name": "Treadmills", "total": 3, "inUse": 2, "image": treadmillImg},
        {"name": "Ellipticals", "total": 1, "inUse": 0, "image": ellipticalImg},
        {"name": "Leg Presses", "total": 1, "inUse": 1, "image": legPressImg}
    ];

    const styles = {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            padding: '20px',
        },
        title: {
            textAlign: 'center',
            color: 'rgb(181, 68, 68)',
            fontSize: '25px',
            padding: '10px',
        },
        card: {
            width: '50px',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            border: '1px solid #f0f0f0',
        },
        image: {
            width: '30px',
            objectFit: 'contain'
        },
        name: {
            fontSize: '10px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
        },
        availability: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'rgb(181, 68, 68)',
        },
        availableText: {
            fontSize: '12px',
            color: '#888',
            marginTop: '5px',
        }
    };

    return (
        <div>
            <h2 style={styles.title}>Equipment Availability</h2>
            <div style={styles.container}>
                {equipment.map((item) => {
                    const available = item.total - item.inUse;
                    return (
                        <div style={styles.card} key={item.name}>
                            <img src={item.image} alt={item.name}
                                    style ={styles.image}></img>
                            <h3 style={styles.name}>{item.name}</h3>
                            <p style={styles.availability}>{available} / {item.total}</p>
                            <p style={styles.availableText}>Available</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Gymequipment;