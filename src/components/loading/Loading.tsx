import Spinner from "./Spinner";


const LoadingScreen: React.FC = () => {
    return (
        <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
            <div>
                <div className="pb-16">
                    <h1 className="text-center text-emerald-500 text-7xl font-bold">
                        HypeStock
                    </h1>
                </div>
                <div className="">
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="w-12 h-12">
                                <Spinner />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-center">
                            Loading...
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default LoadingScreen;