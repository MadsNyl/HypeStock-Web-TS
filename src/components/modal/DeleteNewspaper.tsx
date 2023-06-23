import { AxiosError } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Modal from "../wrapper/Modal";
import { useState } from "react";
import WarningTriangle from "../../icons/WarningTriangle";
import { useNavigate } from "react-router-dom";
import NewspaperModal from "../../types/NewspaperModal";


const DeleteNewspaper: React.FC<NewspaperModal> = ({ openModal, setOpenModal, newspaper }) => {

    const axios = useAxiosPrivate();
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");

    const deleteNewspaper = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.delete(`/newspaper/delete/${newspaper.provider}`);
            
            navigate("/dashboard/newspapers");
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response)
                if (!error?.response) {
                    setErrMsg("No server response.");
                } else {
                    setErrMsg(error.response?.data);
                }
            }
        } finally {
            setLoading(false);
        }
    }
 
    return (
        <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
        >
            <div className="flex justify-center items-center">
                <div>
                    <div className="pb-6 flex justify-center">
                        <WarningTriangle 
                            style="text-yellow-500 w-24 h-24"
                        />
                    </div>

                    <div className="space-y-4 pb-12 text-center max-w-lg w-full">
                        <h1 className="text-2xl font-semibold">
                            Are you sure you want to delete this newspaper?
                        </h1>
                        <p>
                            If you delete this newspaper, all articles collected from this newspaper will be deleted.
                        </p>
                    </div>

                    <form
                        onSubmit={deleteNewspaper} 
                        className="flex justify-center"
                    >
                        <button 
                            disabled={isLoading}
                            className={(isLoading ? "bg-slate-100 text-slate-900" : "") + " max-w-sm w-full py-2 rounded-md bg-black text-white font-semibold text-lg duration-150 ease-in-out transition hover:bg-slate-300 hover:text-slate-900"}
                        >
                            Delete newspaper
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}


export default DeleteNewspaper;