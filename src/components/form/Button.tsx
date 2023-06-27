import ButtonType from "../../types/Button";


const Button: React.FC<ButtonType> = ({ title, disabled, type, onClick, icon }) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={
                (
                    disabled 
                        ? "bg-slate-300 text-slate-900" 
                        : type === "basic"
                            ? "bg-slate-900 text-white"
                            : "bg-emerald-400 text-white"
                ) +
                " w-full px-4 py-1 md:px-6 md:py-2 rounded-md transition duration-150 ease-in-out hover:bg-slate-300 hover:text-slate-900"
            }
        >
            {
                !icon
                    ? title
                    : 
                    <div
                        className="flex items-center"
                    >
                        { title }
                        { icon }
                    </div>
                    
            }
        </button>
    );
}


export default Button;