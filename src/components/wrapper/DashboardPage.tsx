import ComponentChildren from "../../types/ComponentChildren";


const DashboardPage: React.FC<ComponentChildren> = ({ children }) => {
    return (
        <div className="px-6 md:px-12 pb-32">
            { children }
        </div>
    );
}


export default DashboardPage;