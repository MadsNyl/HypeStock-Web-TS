import { NavLink } from "react-router-dom";
import ChartBar from "../../icons/ChartBar";
import Settings from "../../icons/Settings";
import ArticleTrackingType from "../../types/ArticleTracking";
import RightArrow from "../../icons/RightArrow";
import { useEffect, useState } from "react";
import ArticleBaseData, { defaultArticleBaseData } from "../../types/ArticleBaseDate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LineChart from "../../components/chart/LineChart";


const ArticlesPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [baseData, setBaseData] = useState<ArticleBaseData>(defaultArticleBaseData);
    const [_isLoading, setLoading] = useState<boolean>(false);
    const [days, _setDays] = useState<number>(7);

    const getBaseData = async () => {   
        setLoading(true);

        try {
            const response = await axios.get(`/article/base?days=${days}`);
            console.log(response?.data)
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
            title: "Number of articles last 24 h",
            count: baseData.article_count_last_day.length
                    ? baseData.article_count_last_day[0].count
                    : 0
        },
        {
            title: "Number of articles last week",
            count: baseData.article_count_by_days.length
                    ? baseData.article_count_by_days[0].count
                    : 0
        },
        {
            title: "Total number of articles",
            count: baseData.total_article_count.length
                    ? baseData.total_article_count[0].count
                    : 0
        },
    ]

    return (
        <>
            <div className="px-12">

                <div className="pt-8 pb-16 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-4xl font-bold">
                        Articles
                    </h1>

                    <div>
                        
                    </div>
                </div>

                <div className="pb-24">
                    <div className="flex items-center space-x-2 pb-8 px-6">
                        <h1 className="text-2xl font-semibold">
                            Stats
                        </h1>
                        <ChartBar style="w-7 h-7 text-emerald-500" />
                    </div>

                    <div className="grid grid-cols-3 gap-12 pb-12">
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

                    <div className="grid grid-cols-2 gap-2">
                        <div className="w-full bg-white rounded-md shadow-sm border border-slate-200 px-2 py-6">
                            <LineChart 
                                text="Number of articles collected for each hour the last 24 hours"
                                dataLabel="Number of articles"
                                labels={baseData?.article_count_each_hour.map(item => item.date.toString())}
                                data={baseData?.article_count_each_hour.map(item => item.count)}
                            />
                        </div>
                        <div className="w-full bg-white rounded-md shadow-sm border border-slate-200 px-12 py-6">
                            <LineChart 
                                text={`Number of articles collected for each day the last ${days} days`}
                                dataLabel="Number of articles"
                                labels={baseData?.article_count_each_day.map(item => item.date.toString())}
                                data={baseData?.article_count_each_day.map(item => item.count)}
                            />
                        </div>
                    </div>
                </div>

                <div className="pb-24">
                    <div className="flex items-center space-x-2 pb-8 px-6">
                        <h1 className="text-2xl font-semibold">
                            Config
                        </h1>
                        <Settings style="w-7 h-7 text-emerald-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        <div className="rounded-md bg-white border border-slate-200 shadow-sm px-6 py-4">
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
                                    <NavLink
                                        to={"/dashboard/articles/homographs"}
                                    >
                                        <div className="flex items-center space-x-1 px-3 py-1 rounded-md bg-black text-white transition duration-150 ease-in-out hover:bg-slate-300 hover:text-slate-900">
                                            <h1 className="">
                                                See more
                                            </h1>
                                            <RightArrow style="w-4 h-4" />
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md bg-white border border-slate-200 shadow-sm px-6 py-4">
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
                                    <NavLink
                                        to={"/dashboard/articles/config"}
                                    >
                                        <div className="flex items-center space-x-1 px-3 py-1 rounded-md bg-black text-white transition duration-150 ease-in-out hover:bg-slate-300 hover:text-slate-900">
                                            <h1 className="">
                                                See more
                                            </h1>
                                            <RightArrow style="w-4 h-4" />
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

const ArticleTracking: React.FC<ArticleTrackingType> = ({ title, count }) =>{
    return (
        <div className="rounded-md bg-white border border-slate-200 shadow-sm px-8 py-6">
            <div className="flex justify-center pb-4">
                <h1 className="font-bold text-2xl text-emerald-500">
                    { count }
                </h1>
            </div>
            <h1 className="font-semibold text-lg text-gray-400 text-center">
                { title }
            </h1>
        </div>
    );
}


export default ArticlesPage;