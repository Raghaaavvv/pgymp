function Header({ setCurrentPage }) {
    const navItems = [
        { label: 'Home', page: 'home' },
        { label: 'About', page: 'about' },
        { label: 'Contact', page: 'contact' },
        { label: 'Feedback', page: 'feedback' },
        { label: 'Scanner', page: 'scanner' },
    ];

    return (
        <header style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#ffffff',
            paddingTop: '18px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            animation: 'headerFadeIn 0.35s ease both',
        }}>
            <h1 style={{
                textAlign: 'center',
                color: 'rgb(60, 153, 128)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                margin: 0,
                marginBottom: '10px',
            }}>
                PGymP
            </h1>
            <nav>
                <ul style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    listStyleType: 'none',
                    padding: 0,
                    margin: '20px 0 10px',
                }}>
                    {navItems.map((item) => (
                        <li key={item.page}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setCurrentPage(item.page); }}
                                className="header-nav-link"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: 0 }} />

            <style>{`
                .header-nav-link {
                    position: relative;
                    text-decoration: none;
                    color: rgb(58, 103, 143);
                    font-size: 18px;
                    font-weight: bold;
                    font-family: 'Arial', sans-serif;
                    transition: color 0.25s ease;
                    padding-bottom: 2px;
                }
                .header-nav-link::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -2px;
                    width: 100%;
                    height: 2px;
                    background-color: rgb(60, 153, 128);
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.25s ease;
                }
                .header-nav-link:hover {
                    color: rgb(60, 153, 128);
                }
                .header-nav-link:hover::after {
                    transform: scaleX(1);
                    transform-origin: left;
                }
                @keyframes headerFadeIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </header>
    );
}

/* add href for diff buttons */

export default Header;