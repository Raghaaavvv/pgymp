import gymlogo from "./assets/6040568.png";

function card(){
    return(
        <div className = "card1">
            <img className = "card-image" src = {gymlogo} alt = "gym" />
            <h2 className= "card-title"> PGymP Orbital</h2>
            <p className = "card-text"> Better Gym Experience Starts Today</p>
        </div>
    );

}

export default card;