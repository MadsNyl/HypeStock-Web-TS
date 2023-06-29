import DashboardPage from "../../components/wrapper/DashboardPage";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Filing from "../../types/Filing";
import NavButton from "../../components/form/NavButton";
import RightArrow from "../../icons/RightArrow";
import DashboardHeading from "../../components/wrapper/DashboardHeading";
import LoadingScreen from "../../components/loading/Loading";
import BetaLabel from "../../components/label/Beta";

const BetaPage: React.FC = () => {

    const axios = useAxiosPrivate();
    
    const [filings, setFilings] = useState<Filing[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    const getFilings = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/filing?cik=320193");

            setFilings(response?.data.filings);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFilings();
    }, []);

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <DashboardPage>
                <DashboardHeading 
                    title="Beta"
                    goBack={false}
                >
                    <BetaLabel />
                </DashboardHeading>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Apple filings
                        </h1>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {
                            filings?.map((item, index) => {
                                return (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-md shadow-sm px-4 py-4 border border-slate-200 flex justify-between items-center"
                                    >
                                        <h1 className="font-medium text-lg">
                                            { item.type }
                                        </h1>
                                        <h1>
                                            Date: { item.created_date.toString() }
                                        </h1>
                                        <NavButton 
                                            title="View"
                                            type="basic"
                                            path={`/dashboard/filings/${item.id}`}
                                            icon={<RightArrow style="w-5 h-5 ml-2" />}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </DashboardPage>
        </>
    );
}


export default BetaPage;