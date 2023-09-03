import { useEffect, useState } from "react";
import Homograph from "../../types/Homograph";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Plus from "../../icons/Plus";
import { NavLink } from "react-router-dom";
import NavButton from "../../components/form/NavButton";
import DashboardPage from "../../components/wrapper/DashboardPage";
import LoadingScreen from "../../components/loading/Loading";
import DashboardHeading from "../../components/wrapper/DashboardHeading";
import TableRowLoading from "../../components/loading/TableRow";
import PaginationButton from "../../components/table/Pagination";
import TableWrapper from "../../components/table/TableWrapper";


const HomographsPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [homographs, setHomographs] = useState<Homograph[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isPageLoading, setPageLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [nextPage, setNextPage] = useState<string>("");
    const [prevPage, setPrevPage] = useState<string>("");

    const getHomographs = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/homograph?limit=10&page=${page}`);

            setHomographs(response?.data.homographs);
            setNextPage(response?.data.next_page);
            setPrevPage(response?.data.prev_page);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    const swapPage = async (url: string) => {
        setPageLoading(true);

        try {
            const response = await axios.get(url);

            setHomographs(response?.data.homographs);
            setNextPage(response?.data.next_page);
            setPrevPage(response?.data.prev_page);
        } catch (e) {

        } finally {
            setPageLoading(false);
        }

    }

    useEffect(() => {
        getHomographs();
    }, []);

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <DashboardPage>

                <DashboardHeading
                    title="Homographs"
                    goBack={true}
                >
                    <div>
                        <NavButton 
                            path="/dashboard/articles/homographs/add"
                            title="Add new"
                            type="save"
                            icon={<Plus style="w-6 h-6 ml-2" />}
                        />
                    </div>
                </DashboardHeading>

                <div className="pb-24 space-y-6">
                    <PaginationButton
                        page={page}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        setPage={setPage}
                        swapPage={swapPage}
                    />

                    <TableWrapper>
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
                                !isPageLoading
                                    ?
                                    homographs?.map((item, index) => {
                                        return <HomographRow 
                                                    key={index}
                                                    id={item.id}
                                                    word={item.word}
                                                    description={item.description}
                                                />
                                    })
                                    :
                                    Array(10).fill(null).map((_item, index) => {
                                        return <TableRowLoading key={index} />
                                    })
                            }
                        </tbody>

                    </TableWrapper>
                </div>

            </DashboardPage>
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