
function LoginButton() {

    const handleLogin = () => {
        console.log("Login button clicked");
    };

    return (
        <button className="login-btn" onClick={handleLogin}>
            Login
        </button>
    );
}

export default LoginButton;