import React from "react";
import { Quote } from "../api";
import { format, parseISO } from "date-fns";

interface Props {
    quote: Quote;
}

const QuoteDetails: React.FC<Props> = ({ quote }) => {
    return (
        <div style={{ marginTop: "2rem", textAlign: "left" }}>
            <h3>Quote Details</h3>
            <p><strong>Quote ID:</strong> {quote.id}</p>
            <p><strong>Term:</strong> {quote.term} years</p>
            <p><strong>Sum Insured:</strong> ${quote.sumInsured.toLocaleString()}</p>

            <h4>Premiums:</h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Company</th>
                        <th style={{ borderBottom: "1px solid #ccc", textAlign: "right" }}>Premium</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(quote.premiums).map(([company, premium]) => (
                        <tr key={company}>
                            <td>{company}</td>
                            <td style={{ textAlign: "right" }}>${premium.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p style={{ marginTop: "1rem" }}>
                <strong>Created At:</strong>{" "}
                {format(parseISO(quote.createdDate), "PPpp")}
            </p>
        </div>
    );
};

export default QuoteDetails;
