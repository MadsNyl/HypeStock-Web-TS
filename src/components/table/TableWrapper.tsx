import ComponentChildren from "../../types/ComponentChildren";


const TableWrapper: React.FC<ComponentChildren> = ({ children }) => {
    return (
        <table className="mx-auto w-full text-left shadow-sm border border-gray-200">
            { children }
        </table>
    );
}


export default TableWrapper;