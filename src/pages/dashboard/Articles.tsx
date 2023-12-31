import ChartBar from "../../icons/ChartBar";
import Settings from "../../icons/Settings";
import ArticleTrackingType from "../../types/ArticleTracking";
import RightArrow from "../../icons/RightArrow";
import { useEffect, useState } from "react";
import ArticleBaseData, { defaultArticleBaseData } from "../../types/ArticleBaseData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LineChart from "../../components/chart/LineChart";
import NavButton from "../../components/form/NavButton";
import DashboardPage from "../../components/wrapper/DashboardPage";
import LoadingScreen from "../../components/loading/Loading";
import Background from "../../components/wrapper/Background";


const ArticlesPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [baseData, setBaseData] = useState<ArticleBaseData>(defaultArticleBaseData);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [days, _setDays] = useState<number>(7);

    const getBaseData = async () => {   
        setLoading(true);

        try {
            const response = await axios.get(`/article/base?days=${days}`);
            setBaseData(response?.data);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBaseData();
    }, []);

    const articlesTracking = [
        {
            title: "Total number of articles",
            count: baseData.total_article_count.length
                    ? baseData.total_article_count[0].count.toLocaleString()
                    : "0"
        },
        {
            title: "Articles collected last 24 h",
            count: baseData.article_count_last_day.length
                    ? baseData.article_count_last_day[0].count.toLocaleString()
                    : "0"
        },
        {
            title: "Articles collected last week",
            count: baseData.article_count_by_days.length
                    ? baseData.article_count_by_days[0].count.toLocaleString()
                    : "0"
        },
    ];

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <DashboardPage>

                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Articles
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
                                <LineChart 
                                    text="Number of articles collected for each hour the last 24 hours"
                                    dataLabel="Number of articles"
                                    labels={baseData?.article_count_each_hour.map(item => item.date.toString())}
                                    data={baseData?.article_count_each_hour.map(item => item.count)}
                                />
                            </Background>
                            <Background>
                                <LineChart 
                                    text={`Number of articles collected for each day the last ${days} days`}
                                    dataLabel="Number of articles"
                                    labels={baseData?.article_count_each_day.map(item => item.date.toString())}
                                    data={baseData?.article_count_each_day.map(item => item.count)}
                                />
                            </Background>
                        </div>

                        <div className="space-y-4 max-w-xs w-full">
                            {
                                articlesTracking.map((item, index) => {
                                    return <ArticleTracking 
                                                key={index}
                                                title={item.title}
                                                count={item.count}
                                            />
                                })
                            }
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
                                    Homographs with Tickers
                                </h1>
                            </div>

                            <div className="pb-12">
                                <p>
                                    These linguistic homographs demonstrate a unique duality, functioning both as everyday language and as symbols representing specific companies in the financial world.
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="font-medium text-lg">
                                        Current count: <span className="text-emerald-500">{
                                            baseData.total_article_words_count.length
                                                ? baseData.total_article_words_count[0].count
                                                : 0
                                        }</span>
                                    </h1>
                                </div>
                                <div>
                                    <NavButton 
                                        type="basic"
                                        path="/dashboard/articles/homographs"
                                        icon={<RightArrow style="w-4 h-4 ml-1" />}
                                        title="See more"
                                    />
                                </div>
                            </div>
                        </Background>

                        <Background>
                            <div className="pb-6">
                                <h1 className="text-xl font-semibold">
                                    Article Crawler
                                </h1>
                            </div>

                            <div className="pb-12">
                                <p>
                                    The article crawler is a script which crawl the webpages of the newspapers for articles. The config contains a set of options for how the crawler should operate.
                                </p>
                            </div>

                            <div className="flex items-center justify-end">
                                <div>
                                    <NavButton 
                                        type="basic"
                                        path="/dashboard/config/article"
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

const ArticleTracking: React.FC<ArticleTrackingType> = ({ title, count }) =>{
    return (
        <Background
            padding="px-8 py-6"
        >
            <div className="flex justify-center pb-4">
                <h1 className="font-bold text-2xl text-emerald-500">
                    { count }
                </h1>
            </div>
            <h1 className="font-semibold text-gray-400 text-center">
                { title }
            </h1>
        </Background>
    );
}


export default ArticlesPage;