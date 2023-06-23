

type Ticker = {
    created_date: Date,
    exchange: string,
    legacy: boolean,
    name: string,
    symbol: string
}

export const defaultTicker = {
    created_date: new Date(),
    exchange: "",
    legacy: false,
    name: "",
    symbol: ""
}

export default Ticker;