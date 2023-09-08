import Dollar from "../icons/Dollar";
import Chat from "../icons/Chat";
import Calculator from "../icons/Dollar copy";
import { NavLink } from "react-router-dom";


type FeatureContent = {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const Feature = ({ title, description, icon }: FeatureContent) => {
    return (
        <div className="flex space-x-6 max-w-md w-full rounded-md p-6 border border-gray-700 bg-gray-900">
            <div className="w-8">
                {/* <Check style="w-8 h-8 text-orange-500" /> */}
                { icon }
            </div>
            <div className="space-y-4 text-white">
                <h1 className="font-semibold text-xl">
                    { title }
                </h1>
                <p>
                    { description }
                </p>
            </div>
        </div>
    );
}


const Home = () => {

    const features = [
        {
            title: "Ticker price tracking",
            description: "Daily trackings of the stockprice.",
            icon: <Dollar style="w-8 h-8 text-orange-500" />
        },
        {
            title: "Social media tracking",
            description: "Live tracking of ticker mentions in social media, such as newspaper articles and Reddit.",
            icon: <Chat style="w-8 h-8 text-orange-500" />
        },
        {
            title: "Financial reports",
            description: "Automatic analyses of financial reports which are displayed in visual calculations.",
            icon: <Calculator style="w-8 h-8 text-orange-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="w-full flex items-center h-screen bg-gradient-to-br from-gray-950 via-sky-950 to-gray-950 rounded-b-3xl">
                <div className="max-w-4xl text-center w-full mx-auto space-y-12">
                    <div>
                        <h1 className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-400">
                            Make your stockmarket analytics easy and reliable
                        </h1>
                    </div>

                    <div className="pb-12">
                        <p className="font-semibold text-xl text-gray-400">
                            Hypestock makes analysing of the stockmarket easier and more effecient for the trader with statitistics and investment calculations.
                        </p>
                    </div>

                    <div>
                        <NavLink
                            className="px-20 py-3 rounded-md bg-pink-700 font-semibold text-lg text-white"
                            to={"/tickers"}
                        >
                            Dive in
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="w-full bg-slate-950 h-screen flex items-center px-20">
                <div className="flex space-x-20">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-white font-extrabold text-2xl">
                                Guide to
                            </h1>
                            <h1 className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-400">
                                HypeStock
                        </h1>
                        </div>

                        <div>
                            <NavLink
                                className="py-3 px-28 rounded-md bg-orange-500 font-semibold text-lg text-white"
                                to={"/tickers"}
                            >
                                Explore
                            </NavLink>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        {
                            features.map((item, index) => {
                                return <Feature 
                                            key={index} 
                                            title={item.title} 
                                            description={item.description} 
                                            icon={item.icon} 
                                />
                            })
                        }
                    </div>
                </div>         
            </div>
        </div>
    );
}

export default Home;