import { useParams } from "react-router-dom";
import DashboardPage from "../../components/wrapper/DashboardPage";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Statement from "../../types/Statement";
import Figure, { FigureGraph } from "../../types/Figure";
import DashboardHeading from "../../components/wrapper/DashboardHeading";
import BetaLabel from "../../components/label/Beta";

const StatementPage: React.FC = () => {

    const axios = useAxiosPrivate();
    const { id } = useParams();

    const [statement, setStatement] = useState<Statement>();
    const [figures, setFigures] = useState<FigureGraph[]>([]);

    const getStatements = async () => {
        try {
            const response = await axios.get(`/statement?statementId=${id}`);
            const data: Statement = response?.data.statement;

            console.log(data.figures)

            setStatement(data);
            data.figures && setFigures(
                Object.entries(data.figures)
                .map(
                    ([key, value]) => ({
                        [key]: value
                    })
                )
            );
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
                    title={statement?.name || ""}
                    goBack={true}
                >
                    <BetaLabel />
                </DashboardHeading>

                <div className="space-y-4">
                    {
                        figures.map((item, index) => {
                            const figure = item[Object.keys(item)[0]];
                            return (
                                <div
                                    key={index}
                                    className="w-full px-6 py-4 rounded-md shadow-sm bg-white border border-slate-200"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="max-w-sm w-full">
                                                <h1 className="text-lg font-bold">
                                                    { figure.name }
                                                </h1>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                {
                                                    figure.values?.map((item, index) => {
                                                        return (
                                                            <div
                                                                key={index} 
                                                                className=""
                                                            >
                                                                { item.value } ({ item.sequence })
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <RenderChildren children={figure.children} /> 
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </DashboardPage>
        </>
    );
}


const RenderChildren: React.FC<{ children?: Figure[] }> = ({ children }) => {

    if (!children || !children.length) {
        return null;
    }

    return (
        <div className="space-y-2 pl-6">
            {
                children.map((child, index) => {
                    return (
                        <div
                            key={index}
                        >
                            <div className="flex items-center justify-between">
                                <div className="max-w-sm w-full">
                                    <h1>
                                        { child.name }
                                    </h1>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {
                                        child.values?.map((item, index) => {
                                            return (
                                                <div
                                                    key={index} 
                                                    className=""
                                                >
                                                    { item.value } ({ item.sequence })
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <RenderChildren children={child.children} />
                        </div>
                    )
                })
            }
        </div>
    );
}


export default StatementPage;