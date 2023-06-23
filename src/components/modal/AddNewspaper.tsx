import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalType from "../../types/Modal";
import Modal from "../wrapper/Modal";
import { useState } from "react";


const AddNewspaper: React.FC<ModalType> = ({ openModal, setOpenModal }) => {

    const axios = useAxiosPrivate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [provider, setProvider] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [baseUrl, setBaseUrl] = useState<string>("");
    const [startUrl, setStartUrl] = useState<string>("");

    const add = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                "/newspaper/create",
                JSON.stringify({
                    provider: provider,
                    full_name: fullname,
                    base_url: baseUrl,
                    start_url: startUrl
                })
            );


            setProvider("");
            setFullname("");
            setBaseUrl("");
            setStartUrl("");

            window.location.reload();
        } catch (e) {
            
        } finally {
            setLoading(false);
        }
    }
 
    return (
        <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
        >
            <div>
                <h1 className="text-xl font-semibold pb-6">
                Add new newspaper 
                </h1>

                <form
                    onSubmit={add}
                    className="space-y-4"
                >
                    <div>
                        <h1 className="pb-2 font-semibold">
                            Provider <span className="text-red-300">*</span>
                        </h1>
                        <input 
                            className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                            type="text" 
                            onChange={e => setProvider(e.target.value)}
                            value={provider}
                            required
                        />
                    </div>

                    <div>
                        <h1 className="pb-2 font-semibold">
                            Full name <span className="text-red-300">*</span>
                        </h1>
                        <input 
                            className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                            type="text"
                            onChange={e => setFullname(e.target.value)}
                            value={fullname}
                            required
                        />
                    </div>

                    <div>
                        <h1 className="pb-2 font-semibold">
                            Base URL <span className="text-red-300">*</span>
                        </h1>
                        <input 
                            className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                            type="text" 
                            onChange={e => setBaseUrl(e.target.value)}
                            value={baseUrl}
                            required
                        />
                    </div>

                    <div>
                        <h1 className="pb-2 font-semibold">
                            Start URL <span className="text-red-300">*</span>
                        </h1>
                        <input 
                            className="focus:outline-none border border-gray-200 rounded-md px-4 py-2 max-w-sm w-full"
                            type="text" 
                            onChange={e => setStartUrl(e.target.value)}
                            value={startUrl}
                            required
                        />
                    </div>

                    <div>
                        <button 
                            disabled={isLoading}
                            className={(isLoading ? "bg-slate-100 text-gray-900" : "") + " max-w-sm w-full py-3 rounded-md bg-emerald-400 text-white font-semibold text-lg"}
                        >
                            Add newspaper
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}


export default AddNewspaper;