import { useEffect, useState } from "react";
import Newspaper from "../../types/Newspaper";
import Plus from "../../icons/Plus";
import Info from "../../icons/Info";
import NewspaperGuideInfo from "../../types/NewspaperGuideInfo";
import AddNewspaper from "../../components/modal/AddNewspaper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { NavLink } from "react-router-dom";
import GetArticleStatus from "../../components/GetArticleStatus";
import Button from "../../components/form/Button";


const NewspapersPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [newspapers, setNewspapers] = useState<Newspaper[]>([]);
    const [openNewModal, setOpenNewModal] = useState<boolean>(false);


    const getNewspapers = async () => {
        try {
            const response = await axios.get("/newspaper");
            const newspapersData = response?.data?.newspapers;

            setNewspapers(newspapersData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNewspapers();
    }, []);

    const toggleAddNewModal = () => {
        setOpenNewModal(prev => prev = !prev);
    }

    const GuideInfos = [
        {
            name: "Provider",
            description: "The abbreviation for the full name of the newspaper. Often used as the logo." 
        },
        {
            name: "Full name",
            description: "Full name of the newspaper. Used for description for the users." 
        },
        {
            name: "Base url",
            description: "The base url for the newspaper webpage. Used to get the full url of article urls found." 
        },
        {
            name: "Start url",
            description: "The start url for the crawler of the newspaper webpage. This is where the crawler start, but it does not fit with the urls to the found articles. Therefor you need to provide a base url." 
        },
        {
            name: "Status",
            description: "How many articles that are crawled. Red - No articles found. Orange - between 1 and 50 articles found. Green - more than 50 articles found. If the status is red, there need to be changes." 
        },
    ];

    useEffect(() => {
        const bodyElement = document.body;

        openNewModal
            ? bodyElement.style.overflow = "hidden"
            : bodyElement.style.overflow = "";

    }, [openNewModal]);

    return (
        <>
            <AddNewspaper 
                openModal={openNewModal}
                setOpenModal={setOpenNewModal}
            /> 

            <div className="px-6 md:px-12">

                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Newspapers
                    </h1>

                    <div>

                        <Button 
                            type="save"
                            title="Add new"
                            onClick={toggleAddNewModal}
                            icon={<Plus style="w-5 h-5 ml-2" />}
                        />

                    </div>
                </div>

                <div className="hidden md:block pb-12">
                    <div className="flex items-center space-x-2 pb-4 px-6">
                        <h1 className="text-2xl font-semibold">
                            Guide
                        </h1>
                        <Info style="w-7 h-7 text-emerald-500" />
                    </div>
                    <div className="w-full rounded-md bg-white border border-slate-200 shadow-sm px-8 py-6">

                        <div className="space-y-6">
                            
                            {
                                GuideInfos.map((item, index) => {
                                    return <GuideInfo 
                                        key={index}
                                        name={item.name}
                                        description={item.description}
                                    />
                                })
                            }

                        </div>
                    </div>
                </div>

                <div className="pb-24">
                    <table className="mx-auto w-full text-left shadow-sm border border-slate-200">
                        <thead className="text-sm uppercase bg-slate-900 text-white">
                            <tr>
                                <th scope="col" className="hidden md:table-cell px-6 py-3 rounded-tl-lg">
                                    Logo
                                </th>
                                <th scope="col" className="rounded-tl-lg md:rounded-tl-none px-6 py-3">
                                    Full name
                                </th>
                                <th scope="col" className="hidden md:table-cell px-6 py-3">
                                    Base url
                                </th>
                                <th scope="col" className="hidden md:table-cell px-6 py-3">
                                    Start url
                                </th>
                                <th scope="col" className="table-cell px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="table-cell px-6 py-3 rounded-tr-lg">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newspapers?.map((newspaper, index) => {
                                    return <NewspaperRow
                                        key={index}
                                        provider={newspaper.provider}
                                        base_url={newspaper.base_url}
                                        start_url={newspaper.start_url}
                                        full_name={newspaper.full_name}
                                        article_count={newspaper.article_count}
                                        logo={newspaper.logo}
                                    />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const GuideInfo: React.FC<NewspaperGuideInfo> = ({ name, description }) => {
    return (
        <div className="flex items-center justify-between w-full border-b border-b-slate-200 pb-4">
            <div>
                <h1 className="text-lg font-semibold">
                    { name }
                </h1>
            </div>

            <div className="max-w-lg w-full">
                <p>
                    { description }
                </p>
            </div>
        </div>
    );
}

const NewspaperRow: React.FC<Newspaper> = ({ provider, base_url, start_url, full_name, article_count, logo }) => {
    return (
        <>
            <tr className="bg-white border-b">
                <th scope="row" className="hidden md:table-cell px-6 py-4">
                    <img 
                        className="w-20"
                        src={logo}
                    />
                </th>
                <td className="px-6 py-4">
                    { full_name }
                </td>
                <td className="hidden md:table-cell px-6 py-4">
                    { base_url }
                </td>
                <td className="hidden md:table-cell px-6 py-4">
                    { start_url }
                </td>
                <td className="px-6 py-4">
                    <div className="flex h-full justify-center items-center">
                        <GetArticleStatus 
                            article_count={Number(article_count)}
                            size="sm"
                        />
                    </div>
                </td>
                <td className="px-6 py-4 text-right">
                    <NavLink 
                        to={`/dashboard/newspapers/${provider}`}
                        className="font-medium text-emerald-500 hover:text-slate-900"
                    >
                        Edit
                    </NavLink>
                </td>
            </tr>
        </>
    );
}

export default NewspapersPage;