import LoadingScreen from "../../components/loading/Loading";
import Background from "../../components/wrapper/Background";
import DashboardPage from "../../components/wrapper/DashboardPage";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ChartBar from "../../icons/ChartBar";
import { useState, useEffect } from "react";
import RedditBaseData, { defaultRedditBaseData } from "../../types/RedditBaseData";
import BarChart from "../../components/chart/BarChart";
import NavButton from "../../components/form/NavButton";
import RightArrow from "../../icons/RightArrow";
import Settings from "../../icons/Settings";


export const RedditPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [baseData, setBaseData] = useState<RedditBaseData>(defaultRedditBaseData);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [days, _setDays] = useState<number>(7);

    const getBaseData = async () => {   
        setLoading(true);

        try {
            const response = await axios.get(`/reddit/days=${days}`);
            setBaseData(response?.data);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBaseData();
    }, [])

    
    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <DashboardPage>
                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Reddit
                    </h1>

                    <div>
                        
                    </div>
                </div>

                <div className="pb-8 md:pb-24">
                    <div className="flex items-center space-x-2 pb-8 md:px-6">
                        <h1 className="text-2xl font-semibold">
                            Stats
                        </h1>
                        <ChartBar style="w-7 h-7 text-emerald-500" />
                    </div>

                    <div className="w-full flex space-x-6">
                        <div className="max-w-3xl w-full space-y-4">
                            <Background>
                                <BarChart 
                                    text="Number of comments collected for each subreddit"
                                    dataLabel="Number of comments"
                                    labels={baseData?.commentCountPerSubreddit.map(item => item.name)}
                                    data={baseData?.commentCountPerSubreddit.map(item => item.count)}
                                />
                            </Background>
                        </div>

                        <div className="space-y-4 max-w-xs w-full">
                            {/* {
                                articlesTracking.map((item, index) => {
                                    return <ArticleTracking 
                                                key={index}
                                                title={item.title}
                                                count={item.count}
                                            />
                                })
                            } */}
                        </div>
                    </div>
                </div>
                
                <div className="pb-24">
                    <div className="flex items-center space-x-2 pb-8 md:px-6">
                        <h1 className="text-2xl font-semibold">
                            Config
                        </h1>
                        <Settings style="w-7 h-7 text-emerald-500" />
                    </div>

                    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-12">
                        <Background>
                            <div className="pb-6">
                                <h1 className="text-xl font-semibold">
                                    Subreddits
                                </h1>
                            </div>

                            <div className="pb-12">
                                <p>
                                    Overview of the subreddits of Reddit which data is collected from.
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="font-medium text-lg">
                                        Current count: <span className="text-emerald-500">{
                                            baseData.commentCountPerSubreddit.length
                                        }</span>
                                    </h1>
                                </div>
                                <div>
                                    <NavButton 
                                        type="basic"
                                        path="/reddit/subreddits"
                                        icon={<RightArrow style="w-4 h-4 ml-1" />}
                                        title="See more"
                                    />
                                </div>
                            </div>
                        </Background>

                        <Background>
                            <div className="pb-6">
                                <h1 className="text-xl font-semibold">
                                    Reddit Scraper
                                </h1>
                            </div>

                            <div className="pb-12">
                                <p>
                                    The reddit scraper is a script which calls the api for reddit and collects data about subreddits, submissions and comments. The config contains a set of options for how the scraper should operate.
                                </p>
                            </div>

                            <div className="flex items-center justify-end">
                                <div>
                                    <NavButton 
                                        type="basic"
                                        path="/dashboard/config/reddit"
                                        icon={<RightArrow style="w-4 h-4 ml-1" />}
                                        title="See more"
                                    />
                                </div>
                            </div>
                        </Background>
                    </div>
                </div>
            </DashboardPage>
        </>
    );
} 