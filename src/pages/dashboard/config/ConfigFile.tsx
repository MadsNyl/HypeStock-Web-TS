import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import ConfigFile from "../../../types/ConfigFile";
import Snackbar from "../../../components/Snackbar";
import Download from "../../../icons/Download";
import TrashCan from "../../../icons/TrashCan";
import useAuth from "../../../hooks/useAuth";
import isAdmin from "../../../utils/isAdmin";
import Button from "../../../components/form/Button";
import DashboardPage from "../../../components/wrapper/DashboardPage";


const ConfigFilePage: React.FC = () => {

    const axios = useAxiosPrivate();
    const { auth } = useAuth();

    const [configFile, setConfigFile] = useState<ConfigFile | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showAddSnackbar, setShowAddSnackbar] = useState<boolean>(false);
    const [showDeleteSnackbar, setShowDeleteSnackbar] = useState<boolean>(false);
    const [file, setFile] = useState<File>();

    const getConfigFile = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/config?name=config.json");

            response?.data.config.length && setConfigFile(response.data.config[0]);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getConfigFile();
    }, []);

    const upload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const fileData = new FormData();
            
            if (!file) {
                return;
            }

            fileData.append("file", file);

            await axios.post(
                "/config/create",
                fileData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            setShowAddSnackbar(true);
            await getConfigFile();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteConfigFile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.delete(`/config/delete/${configFile?.id}`);
            setShowDeleteSnackbar(true);
            setConfigFile(null);
        } catch (error) {

        }
    }


    if (!isLoading && !configFile) {
        return (
            <>

                <Snackbar
                    showBar={showDeleteSnackbar}
                    setShowBar={setShowDeleteSnackbar}
                    message="Configure file deleted."
                    success={true}
                />

                <DashboardPage>
                    <div className="pt-8 pb-24 flex items-center justify-between mx-auto w-full">
                        <h1 className="text-4xl font-bold">
                            Configure File
                        </h1>

                        <div>

                        </div>
                    </div>

                    <div className="w-full flex justify-center bg-white rounded-md shadow-sm border border-slate-200 px-12 py-6">
                        <div>
                            <div className="pb-12 text-center">
                                <h1 className="text-2xl font-semibold pb-4">
                                    There is no config file available
                                </h1>
                                <p className="text-lg">
                                    Upload a new config.json file
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <form
                                    onSubmit={upload}
                                    className="flex items-center space-x-8"
                                >

                                    <div className="relative w-72 py-2 text-white bg-black rounded-md duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900">
                                        <input 
                                            onChange={e => e.target.files?.length && setFile(e.target.files[0])}
                                            type="file" 
                                            className="hidden" 
                                            id="fileInput" 
                                        />

                                        <label 
                                            htmlFor="fileInput" 
                                            className="inline-block w-full text-center text-lg font-medium cursor-pointer"
                                        >
                                            { file ? file.name : "Select a file" }
                                        </label>
                                    </div>

                                    <button 
                                        disabled={!file || !isAdmin(auth.role)}
                                        className={(!file || !isAdmin(auth.role) ? "bg-slate-300 text-slate-900" : "bg-emerald-500 text-white") + " px-12 py-2 rounded-md duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900 text-lg font-medium"}
                                    >
                                        <p>
                                            Upload
                                        </p>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div> 
                </DashboardPage>
            </>
        );
    }


    return (
        <>

            <Snackbar
                showBar={showAddSnackbar}
                setShowBar={setShowAddSnackbar}
                message="Configure file added."
                success={true}
            />

            <div className="px-12">
                <div className="pt-8 pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-4xl font-bold">
                        Configure File
                    </h1>

                    <div>

                    </div>
                </div>

                <div className="px-12 py-6 max-w-lg w-full bg-white border border-slate-200 rounded-md shadow-sm">
                    <div>
                        <div className="flex justify-between pb-12">
                            <h1 className="text-xl font-semibold">
                                Current configure file
                            </h1>

                            <div className="px-4 py-2 border border-slate-300 rounded-md">
                                <h1 className="font-medium">
                                    { configFile?.name }
                                </h1>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">

                            <div>
                                <a
                                    href={configFile?.url}
                                    className="px-4 py-2 rounded-md bg-emerald-500 border border-emerald-500 text-white flex items-center space-x-2 cursor-pointer transition hover:bg-slate-300 hover:text-slate-900 text-lg font-medium hover:border-slate-300"
                                >
                                    <Download style="w-6 h-6" />
                                    <p>
                                        Download
                                    </p>
                                </a>
                            </div>

                            
                            <form
                                onSubmit={deleteConfigFile}
                            >
                                <Button 
                                    title="Delete"
                                    type="basic"
                                    disabled={!isAdmin(auth.role)}
                                    icon={<TrashCan style="w-6 h-6 ml-2" />}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default ConfigFilePage;