import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalType from "../../types/Modal";
import Button from "../form/Button";
import TextInput from "../form/TextInput";
import Modal from "../wrapper/Modal";
import { useState } from "react";


const AddSubreddit: React.FC<ModalType> = ({ openModal, setOpenModal }) => {

    const axios = useAxiosPrivate();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");

    const add = async () => {
        setLoading(true);

        try {
            await axios.post(
                "/reddit/subreddit/create",
                JSON.stringify({
                    name: name,
                    url: url
                })
            );


            setName("");
            setUrl("");
        } catch (e) {
            console.log(e)
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
                Add new subreddit 
                </h1>

                <form
                    onSubmit={add}
                    className="space-y-4 max-w-md w-full"
                >
                    <div>
                        <h1 className="pb-2 font-semibold">
                            Name <span className="text-red-300">*</span>
                        </h1>
                        <TextInput 
                            type="text"
                            onChange={e => setName(e.target.value)}
                            required={true}
                            value={name}
                        />
                    </div>

                    <div>
                        <h1 className="pb-2 font-semibold">
                            Url <span className="text-red-300">*</span>
                        </h1>
                        <TextInput 
                            type="text"
                            onChange={e => setUrl(e.target.value)}
                            required={true}
                            value={url}
                        />
                    </div>

                    <div className="w-44">
                        <Button 
                            type="save"
                            title="Add newspaper"
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}


export default AddSubreddit;