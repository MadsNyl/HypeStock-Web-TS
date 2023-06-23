import { AxiosError } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalType from "../../types/Modal";
import Modal from "../wrapper/Modal";
import { useEffect, useState } from "react";


const AddHomograph: React.FC<ModalType> = ({ openModal, setOpenModal }) => {

    const axios = useAxiosPrivate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [word, setWord] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");

    const add = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                "/homograph/create",
                JSON.stringify({
                    word: word,
                    description: description
                })
            );

            setDescription("");
            setWord("");
            
            window.location.reload();
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

    useEffect(() => {
        setErrMsg("");
    }, [word, description]);
 
    return (
        <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
        >
            <div className="flex items-center">
                <div className="max-w-md w-full">
                    <h1 className="text-xl font-semibold pb-6">
                    Add new homograph 
                    </h1>

                    <form
                        onSubmit={add}
                        className="space-y-4"
                    >
                        <div>
                            <h1 className="pb-2 font-semibold">
                                Word <span className="text-red-300">*</span>
                            </h1>
                            <input 
                                className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                                type="text" 
                                onChange={e => setWord(e.target.value)}
                                value={word}
                                required
                            />
                        </div>

                        <div>
                            <h1 className="pb-2 font-semibold">
                                Description <span className="text-red-300">*</span>
                            </h1>
                            <textarea
                                className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                required
                            >

                            </textarea>
                        </div>

                        <div>
                            <button 
                                disabled={isLoading}
                                className={(isLoading ? "bg-slate-100 text-gray-900" : "") + " max-w-sm w-full py-3 rounded-md bg-emerald-400 text-white font-semibold text-lg"}
                            >
                                Add homograph
                            </button>
                        </div>
                    </form>
                </div>

                <div>
                    <h1 className="text-red-800">
                        {
                            errMsg.length
                                ? errMsg
                                : ""
                        }
                    </h1>
                </div>
            </div>
        </Modal>
    );
}


export default AddHomograph;