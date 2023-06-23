import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Newspaper, { defaultNewspaper } from "../../types/Newspaper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import GetArticleStatus from "../../components/GetArticleStatus";
import TrashCan from "../../icons/TrashCan";
import DeleteNewspaper from "../../components/modal/DeleteNewspaper";
import CountDate from "../../types/CountDate";
import LineChart from "../../components/chart/LineChart";
import Snackbar from "../../components/Snackbar";


const NewspaperPage: React.FC = () => {

    const { provider } = useParams();
    const axios = useAxiosPrivate();

    const [newspaper, setNewspaper] = useState<Newspaper>(defaultNewspaper);
    const [articleCount, setArticleCount] = useState<CountDate[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [saveDisabled, setSaveDisabled] = useState<boolean>(true);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [newProvider, setNewProvider] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [baseUrl, setBaseUrl] = useState<string>("");
    const [startUrl, setStartUrl] = useState<string>("");


    const getNewspaper = async () => {
        try {
            const response = await axios.get(`/newspaper/${provider}`);

            if (response?.data.newspaper) {
                const newspaper = response?.data.newspaper;
                setNewspaper(newspaper);
                setNewProvider(newspaper.provider);
                setFullname(newspaper.full_name);
                setBaseUrl(newspaper.base_url);
                setStartUrl(newspaper.start_url);
            }

            response?.data.article_count_each_hour && setArticleCount(response?.data.article_count_each_hour);
        } catch (error) {

        }
    }

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(
                "/newspaper/update",
                JSON.stringify({
                    provider: provider,
                    full_name: fullname,
                    base_url: baseUrl,
                    start_url: startUrl
                })
            );
            
            setShowSnackbar(true);
        } catch (e) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getNewspaper();
    }, []);

    return (
        <>

            <Snackbar 
                success={true}
                showBar={showSnackbar}
                setShowBar={setShowSnackbar}
                message="Newspaper updated."
            />

            <DeleteNewspaper
                openModal={openModal}
                setOpenModal={setOpenModal}
                newspaper={newspaper}
            />

            <div className="px-12">
                <div className="pt-8 pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-4xl font-bold">
                        { newspaper?.full_name }
                    </h1>

                    <div>
                        <button 
                            onClick={() => setOpenModal(true)}
                            className="flex items-center space-x-3 px-6 py-2 rounded-md bg-black text-white font-semibold duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"
                        >
                            <TrashCan style="w-6 h-6" />
                            <p>
                                Delete
                            </p>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between space-x-6">
                    <div className="max-w-md w-full bg-white border border-slate-200 rounded-md shadow-sm px-12 py-6">
                        <form
                            onSubmit={update}
                            className="space-y-4 max-w-md w-full"
                        >
                            <div>
                                <h1 className="pb-2 font-semibold">
                                    Provider <span className="text-red-300">*</span>
                                </h1>
                                <input 
                                    className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                                    type="text" 
                                    onChange={e => {
                                        setNewProvider(e.target.value);
                                        setSaveDisabled(false);
                                    }}
                                    value={newProvider}
                                    required
                                />
                            </div>

                            <div>
                                <h1 className="pb-2 font-semibold">
                                    Full name <span className="text-red-300">*</span>
                                </h1>
                                <input 
                                    className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                                    type="text"
                                    onChange={e => {
                                        setFullname(e.target.value);
                                        setSaveDisabled(false);
                                    }}
                                    value={fullname}
                                    required
                                />
                            </div>

                            <div>
                                <h1 className="pb-2 font-semibold">
                                    Base URL <span className="text-red-300">*</span>
                                </h1>
                                <input 
                                    className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                                    type="text" 
                                    onChange={e => {
                                        setBaseUrl(e.target.value);
                                        setSaveDisabled(false);
                                    }}
                                    value={baseUrl}
                                    required
                                />
                            </div>

                            <div>
                                <h1 className="pb-2 font-semibold">
                                    Start URL <span className="text-red-300">*</span>
                                </h1>
                                <input 
                                    className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                                    type="text" 
                                    onChange={e => {
                                        setStartUrl(e.target.value);
                                        setSaveDisabled(false);
                                    }}
                                    value={startUrl}
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button 
                                    disabled={isLoading || saveDisabled}
                                    className={
                                        (saveDisabled || isLoading ? "bg-slate-300 text-slate-900" : "text-white bg-emerald-500") + 
                                        " px-12 py-2 rounded-md font-semibold duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"
                                    }
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="w-full space-y-6">
                        <div className="flex justify-between items-center w-full bg-white border border-slate-200 rounded-md shadow-sm px-12 py-6">
                            <div className="flex items-center space-x-4">
                                <h1 className="text-2xl font-semibold">
                                    Status:
                                </h1>
                                <GetArticleStatus 
                                    article_count={Number(newspaper?.article_count)}
                                    size="md"
                                />
                            </div>

                            <div>
                                <h1 className="text-lg font-semibold">
                                    Articles collected: <span className="text-emerald-500 font-bold">{ newspaper?.article_count }</span>
                                </h1>
                            </div>
                        </div>

                        <div className="w-full bg-white rounded-md shadow-sm border border-slate-200 px-2 py-6">
                            <LineChart 
                                text="Number of articles collected for each hour the last 24 hours"
                                dataLabel="Number of articles"
                                labels={articleCount.map(item => item.date.toString())}
                                data={articleCount.map(item => item.count)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewspaperPage;