import ChevronDoubleLeft from "../../icons/ChevronDoubleLeft";
import ChevronDoubleRight from "../../icons/ChevronDoubleRight";


type Pagination = {
    page: number;
    nextPage: string;
    prevPage: string;
    swapPage: (url: string) => Promise<void>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationButton: React.FC<Pagination> = ({ page, nextPage, prevPage, swapPage, setPage }) => {
    return (
        <div className="flex items-center justify-start space-x-6">
            <button
                onClick={() => {
                    swapPage(prevPage);
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
                    swapPage(nextPage);
                    setPage(page + 1);
                }}
                disabled={!nextPage}
                className={(!nextPage ? "text-slate-400" : "") + ""}
            >
                <ChevronDoubleRight style="w-6 h-6" />
            </button>
        </div>
    );
}


export default PaginationButton;