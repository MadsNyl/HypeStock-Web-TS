import ModalType from "./Modal";
import Newspaper from "./Newspaper";


interface NewspaperModal extends ModalType {
    newspaper: Newspaper;
    setEditNewspaper?: React.Dispatch<React.SetStateAction<Newspaper>>;
}


export default NewspaperModal;