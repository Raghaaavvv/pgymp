
function Header({ setCurrentPage} ) {
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
                    <li><a href="#" onClick={() => setCurrentPage("home")}>Home</a></li>
                    <li><a href="#" onClick={() => setCurrentPage("about")}>About</a></li>
                    <li><a href="#" onClick={() => setCurrentPage("contact")}>Contact</a></li>
                    <li><a href="#" onClick={() => setCurrentPage("feedback")}>Feedback</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("scanner"); }}>Scanner</a></li>
                </ul>
            </nav>
            <hr></hr>

        </header>
    );




}
/* add href for diff buttons */

export default Header;