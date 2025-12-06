import { z } from 'zod';

export const QuoteSchema = z.object({
    quote: z.string(),
    author: z.string(),
});


export type Quote = z.infer<typeof QuoteSchema>;
