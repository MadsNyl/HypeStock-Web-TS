import { ReactNode } from "react";
import LeftArrow from "../../icons/LeftArrow";
import { useNavigate } from "react-router-dom";

type Heading = {
    goBack: boolean;
    title: string;
    children?: ReactNode;
}

const DashboardHeading: React.FC<Heading> = ({ title, goBack, children }) => {

    const navigate = useNavigate();

    return (
        <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
            <div className={goBack ? "flex items-center space-x-8" : ""}>
                {
                    !goBack
                        ? null
                        :
                        <button 
                            onClick={() => navigate(-1)}
                            className="space-y-1 transition duration-150 ease-in-out hover:text-emerald-500"
                        >
                            <div className="flex justify-center">
                                <LeftArrow style="w-6 h-6" />
                            </div>
                            <h1 className="text-center font-medium">
                                Go back
                            </h1>
                        </button>
                }
                <h1 className="text-3xl md:text-4xl font-bold capitalize">
                    { title }
                </h1>
            </div>

            { children }
        </div>
    );
}


export default DashboardHeading;