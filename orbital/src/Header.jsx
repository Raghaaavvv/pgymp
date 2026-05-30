
function Header() {
    const styles = {
      
  fontfamily: 'Arial, sans-serif',
  color: "black",
  fontSize: "24px",
            }               
    

    return ( 
        <header style={styles}>
            <h1>PGymP</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Feedback</a></li>
                </ul>
            </nav>
            <hr></hr>

        </header>
    );




}
/* add href for diff buttons */

export default Header;