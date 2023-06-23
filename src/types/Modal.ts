import { ReactNode } from "react";


type ModalType = {
    children?: ReactNode;
    openModal?: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}


export default ModalType;