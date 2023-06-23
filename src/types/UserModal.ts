import User from "./User";


type UserModal = {
    user: User;
    openModal?: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEditUser?: React.Dispatch<React.SetStateAction<User>>;
}


export default UserModal;