import { useState } from 'react';

function Header({ setCurrentPage }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', page: 'home' },
        { label: 'About', page: 'about' },
        { label: 'Contact', page: 'contact' },
        { label: 'Feedback', page: 'feedback' },
        { label: 'Scanner', page: 'scanner' },
        { label: 'Muscle Map', page: 'infographic' },
        { label: 'Heat Map', page: 'heatmap' },
    ];

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setMenuOpen(false);
    };

    return (
        <header style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#ffffff',
            paddingTop: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            animation: 'headerFadeIn 0.35s ease both',
            position: 'relative',
            zIndex: 100,
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '0 16px',
            }}>
                {/* Hamburger button - visible on mobile only */}
                <button
                    className="hamburger-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className={`hamburger-line ${menuOpen ? 'line1-open' : ''}`}></span>
                    <span className={`hamburger-line ${menuOpen ? 'line2-open' : ''}`}></span>
                    <span className={`hamburger-line ${menuOpen ? 'line3-open' : ''}`}></span>
                </button>

                <h1 style={{
                    textAlign: 'center',
                    color: 'rgb(60, 153, 128)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    margin: 0,
                }}>
                    PGymP
                </h1>
            </div>

            {/* Desktop nav - horizontal row, hidden on mobile */}
            <nav className="desktop-nav">
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
                                onClick={(e) => { e.preventDefault(); handleNavClick(item.page); }}
                                className="header-nav-link"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile dropdown nav - only rendered in the DOM while open */}
            {menuOpen && (
                <nav className="mobile-nav">
                    <ul className="mobile-nav-list">
                        {navItems.map((item, index) => (
                            <li
                                key={item.page}
                                className="mobile-nav-item"
                                style={{ animationDelay: `${index * 0.04}s` }}
                            >
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.page); }}
                                    className="mobile-nav-link"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}

            <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: 0 }} />

            <style>{`
                .hamburger-btn {
                    display: none;
                    position: absolute;
                    left: 0;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 36px;
                    height: 36px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                    z-index: 110;
                }
                .hamburger-line {
                    width: 100%;
                    height: 2.5px;
                    background-color: rgb(60, 153, 128);
                    border-radius: 2px;
                    transition: transform 0.25s ease, opacity 0.25s ease;
                }
                .line1-open {
                    transform: translateY(7.5px) rotate(45deg);
                }
                .line2-open {
                    opacity: 0;
                }
                .line3-open {
                    transform: translateY(-7.5px) rotate(-45deg);
                }

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

                .mobile-nav {
                    width: 100%;
                    background-color: #ffffff;
                }
                .mobile-nav-list {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    list-style-type: none;
                    padding: 0;
                    margin: 12px 0 0;
                }
                .mobile-nav-item {
                    width: 100%;
                    opacity: 0;
                    animation: mobileItemIn 0.3s ease both;
                }
                @keyframes mobileItemIn {
                    from { opacity: 0; transform: translateX(-6px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .mobile-nav-link {
                    display: block;
                    width: 100%;
                    box-sizing: border-box;
                    text-decoration: none;
                    color: rgb(58, 103, 143);
                    font-size: 17px;
                    font-weight: bold;
                    font-family: 'Arial', sans-serif;
                    padding: 14px 20px;
                    border-top: 1px solid #f5f5f5;
                    transition: background-color 0.2s ease, color 0.2s ease;
                }
                .mobile-nav-link:hover {
                    background-color: rgba(60, 153, 128, 0.06);
                    color: rgb(60, 153, 128);
                }

                @keyframes headerFadeIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 700px) {
                    .hamburger-btn {
                        display: flex;
                    }
                    .desktop-nav {
                        display: none;
                    }
                }
                @media (min-width: 701px) {
                    .mobile-nav {
                        display: none;
                    }
                }
            `}</style>
        </header>
    );
}

/* add href for diff buttons */

export default Header;