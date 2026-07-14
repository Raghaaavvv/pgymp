function Footer() {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '24px 20px',
            marginTop: '40px',
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fafafa',
        }}>
            <p style={{
                margin: 0,
                fontSize: '13px',
                color: '#999',
                fontFamily: 'Arial, sans-serif',
            }}>
                &copy; {new Date().getFullYear()} Orbital Soma and Raghav
            </p>
        </footer>
    );
}

export default Footer;