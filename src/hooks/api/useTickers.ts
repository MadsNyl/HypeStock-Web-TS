import { useEffect } from "react";
import axios from "../../api/axios";


type Ticker = {
    symbol: string;
    count: number;
}

type State = {
    data?: Ticker[];
    error?: Error; 
}

const useTickers = (limit: number): State => {
    const URL = `/ticker/popular?limit=${limit}`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL);
                console.log(response.data)
                return {
                    data: response?.data.tickers,
                    error: null
                }
            } catch (error) {
                return { data: null, error: error }
            }
        }

        fetchData();
    });

    return {
        data: undefined,
        error: undefined
    };
}


export default useTickers;