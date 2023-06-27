import { useEffect, useState } from "react";
import Homograph from "../../types/Homograph";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Plus from "../../icons/Plus";
import { NavLink } from "react-router-dom";
import ChevronDoubleLeft from "../../icons/ChevronDoubleLeft";
import ChevronDoubleRight from "../../icons/ChevronDoubleRight";
import NavButton from "../../components/form/NavButton";


const HomographsPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [homographs, setHomographs] = useState<Homograph[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [nextPage, setNextPage] = useState<string>("");
    const [prevPage, setPrevPage] = useState<string>("");

    const getHomographs = async (url: string) => {
        setLoading(true);

        try {
            const response = await axios.get(url);

            setHomographs(response?.data.homographs);
            setNextPage(response?.data.next_page);
            setPrevPage(response?.data.prev_page);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getHomographs(`/homograph?limit=10&page=${page}`);
    }, []);

    return (
        <>
            <div className="px-6 md:px-12">

                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Homographs
                    </h1>

                    <div>
                        <NavButton 
                            path="/dashboard/articles/homographs/add"
                            title="Add new"
                            type="save"
                            icon={<Plus style="w-6 h-6 ml-2" />}
                        />
                    </div>
                </div>

                <div className="pb-24 space-y-6">
                    <table className="mx-auto w-full text-left shadow-sm border border-slate-200">
                        <thead className="text-sm uppercase bg-slate-900 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-tl-lg">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Word
                                </th>
                                <th scope="col" className="hidden md:table-cell px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-tr-lg">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                homographs?.map((item, index) => {
                                    return <HomographRow 
                                                key={index}
                                                id={item.id}
                                                word={item.word}
                                                description={item.description}
                                            />
                                })
                            }
                        </tbody>

                    </table>

                    <div className="flex items-center justify-center space-x-12">
                        <button
                            onClick={() => {
                                getHomographs(prevPage);
                                setPage(page - 1);
                            }}
                            disabled={!prevPage}
                            className={(!prevPage ? "text-slate-400" : "") + ""}
                        >
                            <ChevronDoubleLeft style="w-6 h-6" />
                        </button>

                        <div>
                            <h1 className="text-xl font-semibold">
                                { page }
                            </h1>
                        </div>

                        <button
                            onClick={() => {
                                getHomographs(nextPage);
                                setPage(page + 1);
                            }}
                            disabled={!nextPage}
                            className={(!nextPage ? "text-slate-400" : "") + ""}
                        >
                            <ChevronDoubleRight style="w-6 h-6" />
                        </button>
                    </div>
                </div>

            </div>
        </>
    );

} 

const HomographRow: React.FC<Homograph> = ({ id, word, description }) => {
    return (
        <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium">
                { id }
            </th>
            <td className="px-6 py-4">
                { word }
            </td>
            <td className="hidden md:table-cell px-6 py-4">
                { description }
            </td>
            <td className="px-6 py-4 text-right">
                <NavLink
                    to={`/dashboard/articles/homographs/${id}`}
                    className="font-medium text-emerald-500 hover:text-slate-900"
                >
                    Edit
                </NavLink>
            </td>
        </tr>
    );
}

export default HomographsPage;