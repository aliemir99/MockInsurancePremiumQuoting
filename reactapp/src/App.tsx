import React from "react";
import QuoteForm from "./Components/QuoteForm";

function App() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "100vh",
            fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}>
            <div

                style={{
                    backgroundColor: "white",
                    padding: "2rem 3rem",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    maxWidth: "700px",
                    width: "90%",
                }}
            >
                <h1 style={{ marginBottom: "1.5rem", color: "#003366", fontWeight: 700 }}>
                    Mock Insurance Quote Generator
                </h1>
                <p style={{ marginBottom: "2rem", color: "#444", fontSize: "0.95rem" }}>
                    Enter your details below to generate a mock insurance premium.
                </p>
                <QuoteForm />
            </div>
        </div>
    );
}

export default App;
