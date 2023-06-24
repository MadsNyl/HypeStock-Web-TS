import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ConfigFile from "../../../types/ConfigFile";
import Snackbar from "../../../components/Snackbar";


const ArticleCrawlerConfigPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [configFile, setConfigFile] =  useState<ConfigFile | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

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

    const [file, setFile] = useState<File>();

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

            setShowSnackbar(true);
            await getConfigFile();
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return (
            <>
            </>
        );
    }

    return (
        <>

            <Snackbar 
                showBar={showSnackbar}
                setShowBar={setShowSnackbar}
                message="Config file added."
                success={true}
            />

            <div className="px-12">
                <div className="pt-8 pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-4xl font-bold">
                        ArticleCrawler Config
                    </h1>

                    <div>
                        
                    </div>
                </div>

                {
                   !configFile
                    ? 
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
                                        disabled={!file}
                                        className={(!file ? "bg-slate-300 text-slate-900" : "bg-emerald-500 text-white") + " px-12 py-2 rounded-md duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900 text-lg font-medium"}
                                    >
                                        <p>
                                            Upload
                                        </p>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div> 

                    :

                    <div>

                    </div>
                }
            </div>
        </>
    );
} 


export default ArticleCrawlerConfigPage;