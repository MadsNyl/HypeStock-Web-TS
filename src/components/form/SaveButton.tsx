import Button from "../../types/Button";


const SaveButton: React.FC<Button> = ({ title, disabled }) => {
    return (
        <button 
            disabled={disabled}
            className={(disabled ? "bg-slate-300 text-slate-900" : "bg-emerald-400 text-white ") + " w-full py-2 rounded-md font-semibold text-lg transition duration-150 ease-in-out hover:bg-slate-300 hover:text-slate-900"}
        >
            { title }
        </button>
    );
}


export default SaveButton;