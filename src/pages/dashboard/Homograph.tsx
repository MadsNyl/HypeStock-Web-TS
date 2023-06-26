import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Homograph, { defaultHomograph } from "../../types/Homograph";
import Ticker, { defaultTicker } from "../../types/Ticker";
import TrashCan from "../../icons/TrashCan";
import DeleteHomograph from "../../components/modal/DeleteHomograph";
import { AxiosError } from "axios";
import Snackbar from "../../components/Snackbar";


const HomographDetails: React.FC = () => {

    const { id } = useParams();

    const axios = useAxiosPrivate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [_isUpdateLoading, setUpdateLoading] = useState<boolean>(false);
    const [homograph, setHomograph] = useState<Homograph>(defaultHomograph);
    const [ticker, setTicker] = useState<Ticker>(defaultTicker);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [disabledSave, setDisabledSave] = useState<boolean>(true);
    const [description, setDescription] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const getDetails = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/homograph/${id}`);

            response?.data.ticker.length && setTicker(response?.data.ticker[0]);
            if (response?.data.homograph.length) {
                setHomograph(response?.data.homograph[0]);
                setDescription(response?.data.homograph[0].description);
            }    
        } catch (error) {
            if (error instanceof AxiosError) {
                if (!error?.response) {
                    setErrMsg("No server response.");
                } else {
                    setErrMsg(error.response.data);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdateLoading(true);

        try {   
            await axios.put(
                "/homograph/update",
                JSON.stringify({
                    id: homograph.id,
                    description: description
                })
            );
            
            setDisabledSave(true);
            setShowSnackbar(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (!error?.response) {
                    setErrMsg("No server response.");
                } else {
                    setErrMsg(error.response.data);
                }
            }
        } finally {
            setUpdateLoading(false);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [description]);


    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return(
        <>

            <Snackbar 
                success={true}
                message={"Homograph updated"}
                showBar={showSnackbar}
                setShowBar={setShowSnackbar}
            />

            <DeleteHomograph
                setOpenModal={setOpenModal}
                openModal={openModal}
                homograph={homograph}
            />

            <div className="px-12">
                <div className="pt-8 pb-24 flex items-center justify-between mx-auto w-full">
                    <div className="space-y-6 max-w-md w-full">
                        <h1 className="text-4xl font-bold">
                            { ticker.symbol } - <span className="uppercase text-2xl">{ ticker.exchange }</span>
                        </h1>
                        <h1 className="text-xl font-medium">
                            { ticker.name }
                        </h1>
                    </div>
                    
                    <div>
                        <button 
                            onClick={() => setOpenModal(true)}
                            className="flex items-center space-x-3 px-6 py-2 rounded-md bg-black text-white font-semibold duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"
                        >
                            <TrashCan style="w-6 h-6" />
                            <p>
                                Delete
                            </p>
                        </button>
                    </div>

                </div>

                <div className="max-w-2xl w-full mx-auto">
                    <div className="pb-2 px-6">
                        <h1 className="text-3xl font-semibold">
                            Edit description
                        </h1>
                    </div>
                    <form 
                        onSubmit={update}
                        className="w-full bg-white rounded-md shadow-sm border border-slate-200 px-12 py-6"
                    >
                        <div className="pb-8">
                            <textarea
                                onChange={e => {
                                    setDescription(e.target.value);
                                    setDisabledSave(false);
                                }}
                                className="focus:outline-none border border-slate-200 rounded-md w-full h-60 px-4 py-2"
                                value={description}
                            >
                            </textarea>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-red-800">
                                    {
                                        errMsg.length
                                            ? errMsg
                                            : ""
                                    }
                                </h1>
                            </div>
                            <button 
                                disabled={disabledSave}
                                className={(disabledSave ? "bg-slate-300 text-slate-900" : "bg-emerald-500 text-white") + " px-12 py-2 rounded-md font-semibold duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"}
                            >
                                <p>
                                    Save
                                </p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
} 


export default HomographDetails;