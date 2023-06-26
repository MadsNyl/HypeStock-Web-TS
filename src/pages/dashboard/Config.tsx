import { NavLink } from "react-router-dom";
import RightArrow from "../../icons/RightArrow";


const ConfigPage: React.FC = () => {

    const configures = [
        {
            title: "config file",
            description: "Configurations for the config file. This file will be decide the configs. If the file is not provided, the scripts will run a default.",
            path: "/dashboard/config/file"
        },
        {
            title: "cronjobs",
            description: "Configurations for cronjobs. These configs will decide how often which tasks will run.",
            path: "/dashboard/config/cronjob"
        },
        {
            title: "articles",
            description: "Configurations for articles. These configs will decide how the article crawler will operate.",
            path: "/dashboard/config/article"
        }
    ];

    return (
        <>
            <div className="px-12">
                <div className="pt-8 pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-4xl font-bold">
                        Configure
                    </h1>

                    <div>

                    </div>
                </div>

                <div>

                </div>

                <div className="grid grid-cols-2 gap-8">
                    {
                        configures.map((item, index) => {
                            return <Configure 
                                key={index}
                                title={item.title}
                                description={item.description}
                                path={item.path}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
}


type ConfigureComponent = {
    title: string;
    description: string;
    path: string;
}

const Configure: React.FC<ConfigureComponent> = ({ title, description, path }) => {
    return (
        <div className="rounded-md bg-white border border-slate-200 shadow-sm px-6 py-4">
            <div className="pb-6">
                <h1 className="text-xl font-semibold capitalize">
                    { title }
                </h1>
            </div>

            <div className="pb-12">
                <p>
                    { description }
                </p>
            </div>

            <div className="flex items-center justify-end">
                <div>
                    <NavLink
                        to={path}
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
    );
}

export default ConfigPage;