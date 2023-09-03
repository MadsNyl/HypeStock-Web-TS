import RightArrow from "../../icons/RightArrow";
import NavButton from "../../components/form/NavButton";
import DashboardPage from "../../components/wrapper/DashboardPage";


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
        },
        {
            title: "reddit",
            description: "Configurations for Reddit. These configs will decide how the Reddit crawler will operate.",
            path: "/dashboard/config/reddit"
        }
    ];

    return (
        <>
            <DashboardPage>
                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Configure
                    </h1>

                    <div>

                    </div>
                </div>

                <div className="pb-24 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
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
            </DashboardPage>
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
                    <NavButton 
                        type="basic"
                        path={path}
                        title="See more"
                        icon={<RightArrow style="w-4 h-4 ml-1" />}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConfigPage;