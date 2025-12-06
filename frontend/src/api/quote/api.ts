import {useSSE} from "../hooks/use-sse.ts";
import {QuoteSchema} from "./schemas.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export const quoteApi = {
    getQuote: () => useSSE(`${apiUrl}/quote`, (raw) => QuoteSchema.parse(raw)),
}
