
export interface Quote {
    id: string;
    term: number;
    sumInsured: number;
    premiums: Record<string, number>;
    createdDate: string;
}

const API_BASE = "/api/quotes";

export async function submitQuote(term: number, sumInsured: number): Promise<string> {
    const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term, sumInsured }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to submit quote: ${text}`);
    }

    const data = await response.json();
    return data.quoteId;
}

export async function getQuote(id: string): Promise<Quote> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error("Quote not found");
    return response.json();
}
