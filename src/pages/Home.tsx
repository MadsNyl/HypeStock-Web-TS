import { NavLink } from "react-router-dom";
import Dollar from "../icons/Dollar";
import Chat from "../icons/Chat";
import Calculator from "../icons/Dollar copy";


const Home: React.FC = () => {

    const features = [
        {
            title: "Ticker price tracking",
            description: "Daily trackings of the stockprice.",
            icon: <Dollar style="w-8 h-8 text-indigo-500" />
        },
        {
            title: "Social media tracking",
            description: "Live tracking of ticker mentions in social media, such as newspaper articles and Reddit.",
            icon: <Chat style="w-8 h-8 text-indigo-500" />
        },
        {
            title: "Financial reports",
            description: "Automatic analyses of financial reports which are displayed in visual calculations.",
            icon: <Calculator style="w-8 h-8 text-indigo-500" />
        }
    ];

    return (
        <>
            <div className="px-6 bg-white space-y-20 pb-20">
                <div className="w-full bg-gradient-to-br from-gray-950 via-gray-800 to-emerald-700 rounded-b-3xl px-16 pb-20">
                    <header className="flex items-center justify-between pt-6 pb-20">
                        <div>
                            <h1 className="text-emerald-500 font-bold text-2xl">
                                HypeStock
                            </h1>
                        </div>

                        <nav className="text-gray-400 flex items-center space-x-8">
                            <NavLink
                                to="/"
                            >
                                <h1 className="transition duration-150 ease-in-out hover:text-emerald-500">
                                    overview
                                </h1>
                            </NavLink>
                            <NavLink
                                to="/"
                            >
                                <h1 className="transition duration-150 ease-in-out hover:text-emerald-500">
                                    about
                                </h1>
                            </NavLink>
                            <NavLink
                                to="/tickers"
                            >
                                <h1 className="transition duration-150 ease-in-out hover:text-emerald-500">
                                    tickers
                                </h1>
                            </NavLink>
                        </nav>

                        <div className="flex items-center space-x-6">

                            {/* <div className="flex items-center space-x-2 rounded-md bg-gray-500 border border-gray-200 px-2 py-1">
                                <input type="text" />
                                <Search 
                                    style="w-6 h-6"
                                />
                            </div> */}

                            <NavLink 
                                to={"/login"}
                                className="px-8 py-2 rounded-full bg-gray-800 border border-gray-700"
                            >
                                <h1 className="text-gray-200">
                                    Login
                                </h1>
                            </NavLink>
                        </div>
                    </header>

                    <div className="flex justify-center">
                        <div className="space-y-12 max-w-4xl w-full">
                            <div className="">
                                <h1 className="text-7xl font-bold text-white text-center">
                                    Make your stockmarket analytics easy.
                                </h1>
                            </div>

                            <div className="px-40">
                                <p className="text-center text-gray-400">
                                    Hypestock makes analysing of the stockmarket easier and more effecient for the trader with statitistics and investment calculations.
                                </p>
                            </div>

                            <div className="max-w-sm w-full mx-auto">
                                <div className="flex justify-center space-x-8">
                                    <NavLink 
                                        to="/"
                                    >
                                        <div className="px-8 py-3 rounded-full bg-indigo-500 text-white">
                                            <h1 className="text-xl font-semibold">
                                                Get started
                                            </h1>
                                        </div>
                                    </NavLink>
                                    <NavLink 
                                        to="/"
                                    >
                                        <div className="px-8 py-3 rounded-full border border-gray-500 text-white">
                                            <h1 className="text-xl font-semibold">
                                                Learn more
                                            </h1>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-12 grid grid-cols-3 gap-8">
                    {
                        features.map((item, index) => {
                            return (
                                <div
                                    className="space-y-6 px-6 py-4 rounded-md bg-white border border-gray-200 shadow-md"
                                    key={index}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            { item.icon } 
                                        </div>
                                        <h1 className="text-xl font-semibold">
                                            { item.title }
                                        </h1>
                                    </div>

                                    <div>
                                        <p>
                                            { item.description }
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </>
    );
}

export default Home;