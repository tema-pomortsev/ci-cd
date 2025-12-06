import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import {quoteApi} from "../api/quote/api.ts";

export function Quote() {
    const { data: quote } = quoteApi.getQuote();
    
    const key = useMemo(() => {
        return quote ? `${quote.quote}-${quote.author}` : "loading";
    }, [quote]);
    
    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "24px",
                borderRadius: "16px",
                background: "var(--quote-bg)",
                color: "var(--quote-text)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                fontFamily: "serif",
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {!quote && (
                        <div style={{ textAlign: "center", opacity: 0.6 }}>
                            Загружаем цитату…
                        </div>
                    )}
                    
                    {quote && (
                        <>
                            <div
                                style={{
                                    fontSize: "1.3rem",
                                    lineHeight: "1.5",
                                    marginBottom: "16px",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                “{quote.quote}”
                            </div>
                            
                            <div
                                style={{
                                    textAlign: "right",
                                    fontSize: "1rem",
                                    opacity: 0.7,
                                    fontStyle: "italic",
                                }}
                            >
                                — {quote.author}
                            </div>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}