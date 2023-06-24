import { useEffect, useState } from "react";
import Homograph from "../../types/Homograph";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Plus from "../../icons/Plus";
import { NavLink } from "react-router-dom";


const HomographsPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [homographs, setHomographs] = useState<Homograph[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    const getHomographs = async () => {
        setLoading(true);

        try {
            const response = await axios.get("/homograph");
            setHomographs(response?.data.homographs);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getHomographs();
    }, []);

    return (
        <>
            <div className="px-12">

                <div className="pt-8 pb-16 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-4xl font-bold">
                        Homographs
                    </h1>

                    <div>
                        <NavLink 
                            to={"/dashboard/articles/homographs/add"}
                            className="flex items-center space-x-3 px-6 py-2 rounded-md bg-emerald-400 text-white font-semibold duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"
                        >
                            <Plus style="w-6 h-6" />
                            <p>
                                Add new
                            </p>
                        </NavLink>
                    </div>
                </div>

                <div className="pb-24">
                    <table className="mx-auto w-full text-left shadow-sm border border-slate-200">
                        <thead className="text-sm uppercase bg-slate-900 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-tl-lg">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Word
                                </th>
                                <th scope="col" className="px-6 py-3">
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
            <td className="px-6 py-4">
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