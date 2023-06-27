import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Info from "../../../icons/Info";
import CheckBoxSlider from "../../../components/form/CheckBoxSlider";
import NumberInput from "../../../components/form/NumberInput";
import Snackbar from "../../../components/Snackbar";
import isAdmin from "../../../utils/isAdmin";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../components/form/Button";


const ArticleConfigPage: React.FC = () => {

    const axios = useAxiosPrivate();
    const { auth } = useAuth();

    const [_configure, setConfigure] = useState(null);
    const [limit, setLimit] = useState<string>("");
    const [async, setAsync] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [isAdminLocked, setAdminLocked] = useState<boolean>(false);


    const getConfigure = async () => {
        try {
            const response = await axios.get("/config/section?key=article");
            const data = response?.data;

            setConfigure(data);
            setLimit(data.limit);
            setAsync(data.async);
        } catch (error) {

        }
    }

    const updateConfigure = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.put(
                "/config/update",
                JSON.stringify({
                    section: {
                        article: {
                            limit: limit,
                            async: async
                        }
                    }
                })
            );
            
            setDisabled(true);
            setShowSnackBar(true);
        } catch (error) {
            console.log(error);
        }   
    }

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<boolean>>) => {
        const currentValue = e.target.checked;
        setValue(currentValue);
        setDisabled(false);
    }  

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<any>>) => {
        const currentValue = e.target.value;
        setValue(currentValue);
        setDisabled(false);
    }  

    useEffect(() => {
        setAdminLocked(!isAdmin(auth?.role));
        getConfigure();
    }, []);


    const inputs = [
        {
            title: "Collection Limit",
            description: "Number of articles collected per newspaper.",
            input: <NumberInput value={limit} disabled={isAdminLocked} onChange={e => handleInput(e, setLimit)} />
        },
        {
            title: "Asynchronous Scraping",
            description: "Option for how the http requests should be handled. Asynchronous scraping use more memory.",
            input: <CheckBoxSlider value={async} disabled={isAdminLocked} onChange={e => handleToggle(e, setAsync)} />
        }
    ];


    return (
        <>

            <Snackbar 
                showBar={showSnackBar}
                setShowBar={setShowSnackBar}
                success={true}
                message="Configure file updated."
            />

            <div className="px-6 md:px-12">
                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold">
                            Article Configure
                        </h1>
                        <h1 className="pl-6 text-lg font-semibold">
                            {
                                isAdminLocked
                                    ? "Read access only"
                                    : ""
                            }
                        </h1>
                    </div>

                    <div>

                    </div>
                </div>

                <form 
                    onSubmit={updateConfigure}
                    className="bg-white border border-slate-200 rounded-md shadow-sm px-6 md:px-12 py-6"
                >

                    <div className="pb-16 space-y-12">
                        {
                            inputs.map((item, index) => {
                                return <FormField
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    inputField={item.input}
                                />
                            })
                        }
                    </div>

                    <div className="flex justify-end">
                        <div className="w-36">
                            <Button 
                                title="Save"
                                type="save"
                                disabled={disabled || isAdminLocked}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}


const FormField: React.FC<{ title: string, description: string, inputField: React.ReactElement }> = ({ title, description, inputField }) => {

    const [showInfo, setShowInfo] = useState<boolean>(false);

    return (
        <div className="flex items-center space-x-20">
            <div className="flex items-center space-x-4 w-44 md:max-w-xs md:w-full">
                <h1 className="md:text-xl font-bold">
                    { title }
                </h1>
                <button
                    className="relative hidden md:inline"
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                >

                    {
                        !showInfo
                            ? <></>
                            :
                            <div className="z-10 w-96 absolute bottom-7 left-4 bg-white rounded-md shadow-sm border border-slate-300 px-4 py-2">
                                <p className="text-sm text-left">
                                    { description }
                                </p>
                            </div>
                    }

                    <Info style="w-7 h-7 text-sky-400" />
                </button>
            </div>

            <div>
                { inputField }
            </div>
        </div>
    );
}


export default ArticleConfigPage;