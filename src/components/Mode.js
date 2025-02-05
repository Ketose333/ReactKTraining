import React, { useEffect } from "react";

const Mode = ({ mode, onModeChange }) => {
    const modes = ["등록", "수정", "목록"];

    return (
        <nav className="mode-bar">
            {modes.map((m) => (
                <button
                    key={m}
                    className={`mode-btn ${mode === m ? "active" : ""}`}
                    onClick={() => onModeChange(m)}
                    disabled={
                        mode === "등록" && (m === "수정" || m === "목록") ||
                        mode === "수정" && (m === "등록" || m === "목록") ||
                        mode === "목록" && (m === "수정")
                    }
                >
                    {m}
                </button>
            ))}
        </nav>
    );
};

export default Mode;
