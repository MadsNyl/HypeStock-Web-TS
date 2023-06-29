import { useParams } from "react-router-dom";
import DashboardPage from "../../components/wrapper/DashboardPage";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Statement from "../../types/Statement";
import NavButton from "../../components/form/NavButton";
import RightArrow from "../../icons/RightArrow";
import DashboardHeading from "../../components/wrapper/DashboardHeading";
import BetaLabel from "../../components/label/Beta";

const FilingPage: React.FC = () => {

    const axios = useAxiosPrivate();
    const { id } = useParams();

    const [statements, setStatements] = useState<Statement[]>([]);

    const getStatements = async () => {
        try {
            const response = await axios.get(`/statement/get?filingId=${id}`);
            setStatements(response?.data.statements);
        } catch (e) {

        }
    }

    useEffect(() => {
        getStatements();
    }, []);

    return (
        <>
            <DashboardPage>
                <DashboardHeading
                    title="Statements"
                    goBack={true}
                >
                    <BetaLabel />
                </DashboardHeading>

                <div className="grid grid-cols-3 gap-8">
                    {
                        statements?.map((item, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="bg-white rounded-md shadow-sm px-4 py-4 border border-slate-200 flex justify-between items-center"
                                >
                                    <h1 className="font-medium text-lg capitalize">
                                        { item.name }
                                    </h1>

                                    <NavButton 
                                        title="View"
                                        type="basic"
                                        path={`/dashboard/statements/${item.id}`}
                                        icon={<RightArrow style="w-5 h-5 ml-2" />}
                                    />
                                </div>
                            )
                        })
                    }
                    </div>
            </DashboardPage>
        </>
    );
}


export default FilingPage;