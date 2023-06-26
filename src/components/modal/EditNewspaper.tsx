import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NewspaperModal from "../../types/NewspaperModal";
import Modal from "../wrapper/Modal";
import { useState, useEffect } from "react";


const EditNewspaper: React.FC<NewspaperModal> = ({ openModal, setOpenModal, newspaper }) => {

    const axios = useAxiosPrivate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [_isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);

    const [provider, setProvider] = useState<string>(newspaper.provider);
    const [fullname, setFullname] = useState<string>(newspaper.full_name);
    const [baseUrl, setBaseUrl] = useState<string>(newspaper.base_url);
    const [startUrl, setStartUrl] = useState<string>(newspaper.start_url);

    useEffect(() => {
        if (openModal) {
            setProvider(newspaper.provider);
            setFullname(newspaper.full_name);
            setBaseUrl(newspaper.base_url);
            setStartUrl(newspaper.start_url);
        }
    }, [openModal]);

    const add = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(
                "/newspaper/update",
                JSON.stringify({
                    provider: provider,
                    full_name: fullname,
                    base_url: baseUrl,
                    start_url: startUrl
                })
            );
            
            window.location.reload();
        } catch (e) {
            
        } finally {
            setLoading(false);
        }
    }

    const deleteNewspaper = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingDelete(true);

        try {
            await axios.delete(
                `/newspaper/delete/${provider}`
            );
            
            window.location.reload();
        } catch (e) {
            
        } finally {
            setLoadingDelete(false);
        }
    }
 
    return (
        <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
        >
            <div>
                <h1 className="text-xl font-semibold pb-6">
                Edit newspaper 
                </h1>

                <div className="flex justify-between">
                    <form
                        onSubmit={add}
                        className="space-y-4 max-w-md w-full"
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
                                className={(isLoading ? "bg-slate-100 text-gray-900" : "") + " max-w-sm w-full py-2 rounded-md bg-emerald-400 text-white font-semibold text-lg"}
                            >
                                Edit newspaper
                            </button>
                        </div>
                    </form>

                    <div className="max-w-xs w-full space-y-16">
                        <div>
                            <button
                                onClick={() => setWarning(true)}
                                className="max-w-sm w-full py-2 rounded-md bg-black text-white font-semibold text-lg"
                            >
                                Delete newspaper
                            </button>
                        </div>

                        {
                            warning &&
                            <form
                                onSubmit={deleteNewspaper} 
                                className="space-y-6"
                            >
                                <div>
                                    <p className="font-medium">
                                        Are you sure you want to delete this newspaper? All connected articles will also be deleted.
                                    </p>
                                </div>
                                <div>
                                <button
                                    disabled={isLoading}
                                    className={(isLoading ? "bg-slate-100 text-gray-900" : "") + " max-w-sm w-full py-2 rounded-md bg-red-800 text-white font-semibold text-lg"}
                                >
                                    Delete
                                </button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
}


export default EditNewspaper;