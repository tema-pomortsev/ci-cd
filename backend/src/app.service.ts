import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

interface Quote {
    quote: string;
    author: string;
}

@Injectable()
export class AppService {
    private readonly quotes: Quote[];
    
    constructor() {
        const json = JSON.parse(
            fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'quotes.json'), 'utf-8')
        ) as { quotes: Quote[] };
        
        this.quotes = json.quotes;
    }
    
    async getQuote(): Promise<Quote> {
        const idx = Math.floor(Math.random() * this.quotes.length);
        return await new Promise((resolve, reject) => {
            try {
                resolve(this.quotes[idx]);
            }
            catch (error) {
                reject(new Error(`Ошибка в промисе ${error}`))
            }
        })
    }
}
