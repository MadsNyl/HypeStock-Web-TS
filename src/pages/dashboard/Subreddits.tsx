import { useEffect, useState } from "react";
import PaginationButton from "../../components/table/Pagination";
import DashboardHeading from "../../components/wrapper/DashboardHeading";
import DashboardPage from "../../components/wrapper/DashboardPage";
import Plus from "../../icons/Plus";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingScreen from "../../components/loading/Loading";
import Subreddit from "../../types/Subreddit";
import TableWrapper from "../../components/table/TableWrapper";
import TableRowLoading from "../../components/loading/TableRow";
import Button from "../../components/form/Button";
import AddSubreddit from "../../components/modal/Addsubreddit";
import { NavLink } from "react-router-dom";


const SubredditsPage: React.FC = () => {
    const axios = useAxiosPrivate();

    const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isPageLoading, setPageLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [nextPage, setNextPage] = useState<string>("");
    const [prevPage, setPrevPage] = useState<string>("");
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);

    const getSubreddits = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/reddit/subreddit?limit=10&page=${page}`);

            setSubreddits(response?.data.subreddits);
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

            setSubreddits(response?.data.subreddits);
            setNextPage(response?.data.next_page);
            setPrevPage(response?.data.prev_page);
        } catch (e) {

        } finally {
            setPageLoading(false);
        }

    }

    useEffect(() => {
        getSubreddits();
    }, []);

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>

            <AddSubreddit 
                openModal={openAddModal}
                setOpenModal={setOpenAddModal}
            />

            <DashboardPage>
                <DashboardHeading
                    title="Subreddits"
                    goBack={true}
                >
                    <div>
                        <Button 
                            onClick={() => setOpenAddModal(true)}
                            title="Add new"
                            type="success"
                            icon={<Plus style="w-6 h-6 ml-2" />}
                        />
                    </div>
                </DashboardHeading>

                <div className="pb-24 space-y-6">
                    <PaginationButton 
                        page={page}
                        nextPage={nextPage}
                        prevPage={prevPage}
                        setPage={setPage}
                        swapPage={swapPage}
                    />

                    <TableWrapper>
                        <thead className="text-sm uppercase bg-slate-900 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-tl-lg">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Subscribers
                                </th>
                                <th scope="col" className="hidden md:table-cell px-6 py-3">
                                    Url
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
                                    subreddits?.map((item, index) => {
                                        return (
                                            <SubredditRow 
                                                key={index}
                                                name={item.name}
                                                description={item.description}
                                                url={item.url}
                                                subscribers={item.subscribers}
                                            />
                                        )
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


const SubredditRow: React.FC<Subreddit> = ({ name, description, subscribers, url }) => {

    return (
        <>
            <tr className="bg-white border-b">
                <td scope="row" className="hidden md:table-cell px-6 py-4">
                    { name }
                </td>
                <td className="px-6 py-4">
                    { description }
                </td>
                <td className="hidden md:table-cell px-6 py-4">
                    { subscribers }
                </td>
                <td className="hidden md:table-cell px-6 py-4">
                    { url }
                </td>
                <td className="px-6 py-4 text-right">
                    <NavLink 
                        to={`/dashboard/reddit/subreddits/${name}`}
                        className="font-medium text-emerald-500 hover:text-slate-900"
                    >
                        Edit
                    </NavLink>
                </td>
            </tr>
        </>
    );
}


export default SubredditsPage;