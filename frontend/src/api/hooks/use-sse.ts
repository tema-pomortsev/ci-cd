import {useEventSource} from "@reactuses/core";

type Parser<T> = (data: unknown) => T;

export function useSSE<T>(
    url: string,
    parser?: Parser<T>,
) {
    const { data, error, status, eventSourceRef, close } = useEventSource(url);
    
    let parsed: T | null = null;
    
    if (data) {
        try {
            const raw = JSON.parse(data);
            parsed = parser ? parser(raw) : (raw as T);
        } catch (err) {
            console.error('SSE parse error', err);
        }
    }
    
    return {
        data: parsed,
        error,
        status,
        eventSourceRef,
        close,
    };
}
