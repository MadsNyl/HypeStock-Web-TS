import { useEffect, useState } from "react";
import PublicPage from "../../components/wrapper/PublicPage";
import Search from "../../icons/Search";
import Ticker from "../../types/Ticker";
import axios from "../../api/axios";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/input/SearchBar";
import useTickers from "../../hooks/api/useTickers";


const TickersPage: React.FC = () => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [searchWord, setSearchWord] = useState<string>("");

    const { data, error } = useTickers(10);

    // const search = async () => {
    //     setLoading(true);

    //     try {
    //         const response = await axios.get(`/ticker/search?search=${searchWord}&limit=20`);

    //         response?.data?.tickers && setTickers(response?.data?.tickers)
    //     } catch (error) {

    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     searchWord.length >= 2 && search();
    // }, [searchWord]);

    return (
        <div className="min-h-screen bg-slate-950 px-12">
            <div className="pt-48 space-y-6">
                <div className="max-w-4xl w-full mx-auto flex items-center justify-between border-b border-b-gray-800 pb-12">
                    <div className="max-w-sm w-full">
                        <SearchBar />
                    </div>

                    <div className="text-white">
                        tet
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-12">

                </div>
            </div>
        </div>
        // <>
        //     <PublicPage> 
        //         <div className="max-w-xl w-full mx-auto mt-12 pb-20">
        //             <div className="flex items-center space-x-4 bg-white rounded-md border border-gray-200 px-4 shadow-sm">
        //                 <input
        //                     onChange={e => setSearchWord(e.target.value)}
        //                     className="focus:outline-none py-3 w-full" 
        //                     type="text" 
        //                     placeholder="Search for a ticker or company name..."
        //                 />
        //                 <Search style="w-6 h-6" />
        //             </div>
        //         </div>

        //         <div className="grid grid-cols-4 gap-6">
        //             {
        //                 isLoading
        //                     ? <></>
        //                     : 
        //                     tickers.map((item, index) => {
        //                         return <TickerView key={index} name={item.name} symbol={item.symbol} />
        //                     })
        //             }
        //         </div>
        //     </PublicPage>
        // </>
    );
}


const TickerView: React.FC<Ticker> = ({ name, symbol }) => {
    return (
        <NavLink
            to={`/tickers/${symbol}`}
            className={"bg-white shadow-sm rounded-md border border-gray-200 px-6 py-4 transition duration-150 ease-in-out hover:bg-gray-800 hover:text-white"}
        >
            <div className="space-y-2 h-32">
                <div>
                    <h1 className="font-semibold">
                        { symbol }
                    </h1>
                </div>
                <div>
                    <p className="">
                        { name }
                    </p>
                </div>
            </div>
        </NavLink>
    );
}

export default TickersPage;