import React, { useState } from "react";
import { submitQuote, getQuote, Quote } from "../api";
import QuoteDetails from "./QuoteDetails";

const QuoteForm: React.FC = () => {
    const [term, setTerm] = useState<number>(1);
    const [sumInsured, setSumInsured] = useState<number>(1000);
    const [displayValue, setDisplayValue] = useState<string>(
        sumInsured!.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        })
    );
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSumInsuredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d]/g, ""); // remove non-numeric
        const num = Number(raw);
        setSumInsured(num);

        setDisplayValue(
            num.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            })
        );
    };


    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // reapply currency format after editing
        setDisplayValue(
            sumInsured!.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            })
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const id = await submitQuote(term!, sumInsured!);
            const data = await getQuote(id);
            setQuote(data);
        } catch (err) {
            setError((err as Error).message);
            setQuote(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: 8 }}>
            <h2 style={{ textAlign: "center", marginBottom:"10px" }}>Get a Quote</h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "1rem" }}>
                    <div style={{
                        width: "120px",
                        textAlign: "left",
                        color: "#333",
                        fontWeight: 500,
                    }}>
                        Sum Insured:
                    </div> 
                    <input
                        type="text"
                        value={displayValue}
                        min={1000}
                        onChange={handleSumInsuredChange}
                        onBlur={handleBlur}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "1rem",
                            color: "#333",
                            backgroundColor: "#fff",
                            marginLeft: "10px",
                            flex: 1,
                            paddingBlock:"5px"
                        }}
                    />
                </label>

                <div style={{ width: "100%", maxWidth: "100%" }}>
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: "#003366",
                            marginBottom: "0.25rem",
                        }}
                    >
                        {term} year{term > 1 ? "s" : ""}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                        }}
                    >
                        <label
                            style={{
                                width: "120px",
                                textAlign: "left",
                                color: "#333",
                                fontWeight: 500,
                            }}
                        >
                            Term (years):
                        </label>

                        <input
                            type="range"
                            min={1}
                            max={30}
                            step={1}
                            value={term}
                            onChange={(e) => setTerm(Number(e.target.value))}
                            style={{
                                flex: 1,
                                accentColor: "#003366",
                                cursor: "pointer",
                                height: "6px",
                                borderRadius: "5px",
                                background: "#ddd",
                            }}
                        />
                    </div>
                </div>




                <button type="submit" disabled={loading} style={{
                    backgroundColor: "#003366",
                    color: "white",
                    padding: "0.75rem",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                    marginTop:"20px"
                }}>
                    {loading ? "Submitting..." : "Submit Quote"}
                </button>
            </form>

            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
            {quote && <QuoteDetails quote={quote} />}
        </div>
    );
};

export default QuoteForm;
