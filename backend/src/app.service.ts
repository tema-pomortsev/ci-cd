import { Injectable } from '@nestjs/common';
import * as fs from "node:fs";

interface Quote {
    quote: string;
    author: string;
}

@Injectable()
export class AppService {
    private readonly quotes: Quote[];
    
    constructor() {
        const json = JSON.parse(
            fs.readFileSync('./src/data/quotes.json', 'utf-8')
        ) as { quotes: Quote[] };
        
        this.quotes = json.quotes;
    }
    
    async getQuote(): Promise<Quote> {
        const idx = Math.floor(Math.random() * this.quotes.length);
        return this.quotes[idx];
    }
}
