

type Ticker = {
    name: string;
    symbol: string;
    created_date?: Date;
    exchange?: string;
    cik?: number;
    legacy?: boolean;
}

export const defaultTicker = {
    created_date: new Date(),
    exchange: "",
    legacy: false,
    name: "",
    symbol: "",
    cik: 0
}

export default Ticker;