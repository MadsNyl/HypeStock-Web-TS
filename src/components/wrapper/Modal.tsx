import Close from "../../icons/Close";
import ModalType from "../../types/Modal";
import { useEffect } from "react";

const Modal: React.FC<ModalType> = ({ children, openModal, setOpenModal }) => {

    useEffect(() => {
        const bodyElement = document.body;

        openModal
            ? bodyElement.style.overflow = "hidden"
            : bodyElement.style.overflow = "";

    }, [openModal]);

    return (
        <>
            {
                !openModal
                  ? <></>  
                  : 
                    <div className="fixed bg-slate-900 bg-opacity-30 flex w-screen h-screen justify-center items-center">
                        <div className="mx-6 md:-ml-60 relative max-w-4xl w-full px-12 py-6 rounded-md bg-white border border-slate-200">
                            <button 
                                onClick={() => setOpenModal(false)}
                                className="absolute top-2 right-2"
                            >
                                <Close style="w-6 h-6" />
                            </button>

                            { children }
                        </div>
                    </div>
            }
        </>
    );
}


export default Modal;