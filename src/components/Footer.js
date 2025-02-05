import React from "react";

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>© 2024. Made by <strong>Your Name</strong></p>
            <p>📧 Contact: <a href="mailto:your.email@example.com" style={linkStyle}>your.email@example.com</a></p>
            <p>🔗 GitHub: <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" style={linkStyle}>github.com/yourgithub</a></p>
        </footer>
    );
};

const footerStyle = {
    position: "fixed",  // 화면 맨 아래 고정
    bottom: 0,
    left: 0,
    width: "100%",
    background: "#222",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
    fontSize: "14px",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
};

const linkStyle = {
    color: "#4da6ff",
    textDecoration: "none",
};

export default Footer;