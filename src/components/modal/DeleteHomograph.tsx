import { AxiosError } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Modal from "../wrapper/Modal";
import { useState } from "react";
import WarningTriangle from "../../icons/WarningTriangle";
import HomographModal from "../../types/HomographModal";
import { useNavigate } from "react-router-dom";
import Button from "../form/Button";


const DeleteHomograph: React.FC<HomographModal> = ({ openModal, setOpenModal, homograph }) => {

    const axios = useAxiosPrivate();
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [_errMsg, setErrMsg] = useState<string>("");

    const deleteHomograph = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.delete(`/homograph/delete/${homograph.id}`);
            
            navigate("/dashboard/articles/homographs");

            document.body.style.overflow = "";
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
                            style="text-yellow-500 w-20 h-20 md:w-24 md:h-24"
                        />
                    </div>

                    <div className="space-y-4 pb-12 text-center max-w-lg w-full">
                        <h1 className="text-lg md:text-2xl font-semibold">
                            Are you sure you want to delete this homograph?
                        </h1>
                        <p className="text-sm md:text-md">
                            If you delete this homograph, the article parser will no longer ignore this ticker when found in articles.
                        </p>
                    </div>

                    <form
                        onSubmit={deleteHomograph} 
                        className="flex justify-center"
                    >
                        <Button 
                            type="basic"
                            title="Delete homograph"
                            disabled={isLoading}
                        />
                    </form>
                </div>
            </div>
        </Modal>
    );
}


export default DeleteHomograph;