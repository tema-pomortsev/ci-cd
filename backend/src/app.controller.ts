import { Controller, Get, MessageEvent, Res, Sse } from '@nestjs/common';
import {from, interval, mergeMap, Observable, startWith} from 'rxjs';
import { map } from 'rxjs/operators';
import {AppService} from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    get() {
        return 'hello world';
    }
    
    @Sse('quote')
    sse(): Observable<MessageEvent> {
        return interval(10000).pipe(
            startWith(0),
            mergeMap(() => from(this.appService.getQuote())),
            map((quote) => ({ data: { ...quote } }) as MessageEvent),
        );
    }
}