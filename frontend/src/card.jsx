import gymlogo from "./assets/6040568.png";

function card(){
    return(
        <div className="card1" style={{ animation: 'logoCardIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
            <img className="card-image" src={gymlogo} alt="gym" />
            <h2 className="card-title">PGymP Orbital</h2>
            <p className="card-text">Better Gym Experience Starts Today</p>
            <style>{`
                @keyframes logoCardIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default card;