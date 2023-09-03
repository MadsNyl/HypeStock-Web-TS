import { useParams } from "react-router-dom";
import PublicPage from "../../components/wrapper/PublicPage";
import { useEffect, useState } from "react";
import Ticker, { defaultTicker } from "../../types/Ticker";
import axios from "../../api/axios";
import Background from "../../components/wrapper/Background";
import Article from "../../types/Article";


const TickerPage: React.FC = () => {

    const { symbol } = useParams();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [days, setDays] = useState<number>(7);
    const [limit, setLimit] = useState<number>(10);
    const [ticker, setTicker] = useState<Ticker>(defaultTicker);
    const [articles, setArticles] = useState<Article[]>([]);

    const getData = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/ticker/get?symbol=${symbol}&days=${days}&limit=${limit}`);
            const data = response?.data;
            console.log(data)

            setTicker(data?.ticker);
            setArticles(data?.articles);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <PublicPage>
                <div className="mt-12 flex space-x-12 pb-12">
                    <div className="w-full space-y-6">
                        <div className="grid grid-cols-3 gap-6">
                            <Background>

                            </Background>
                            <Background>
                                
                            </Background>
                            <Background>
                                
                            </Background>
                        </div>
                        <Background>

                        </Background>
                    </div>

                    <div className="max-w-md w-full">
                        <Background>
                            <div className="flex justify-between pb-8">
                                <div className="space-y-1">
                                    <h1 className="font-bold text-2xl">
                                        { ticker?.symbol }
                                    </h1>
                                    <p className="text-sm">
                                        <span className="font-bold mr-1 text-gray-300">CIK</span> { ticker?.cik }
                                    </p>
                                </div>
                                <h1 className="uppercase font-medium">
                                    { ticker?.exchange }
                                </h1>
                            </div>

                            <div className="px-6">
                                <p className="">
                                    { ticker?.name }
                                </p>
                            </div>
                        </Background>
                    </div>
                </div>

                <div className="w-full space-y-6">
                    <div>
                        <h1 className="font-bold text-2xl">
                            Articles
                        </h1>
                    </div>
                    <div>
                        <Background>
                            <div className="">
                                {
                                    articles?.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="w-full flex space-x-6 items-center bg-white shadow-sm border-t border-t-gray-200 px-6 py-4"
                                            >
                                                <h1 className="font-semibold">
                                                    { item.provider }
                                                </h1>
                                                <h1 className="font-semibold">
                                                    { item.title }
                                                </h1>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Background>
                    </div>
                </div>
            </PublicPage>
        </>
    );
}


export default TickerPage;