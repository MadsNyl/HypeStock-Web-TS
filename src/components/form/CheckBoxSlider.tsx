import Input from "../../types/Input";


const CheckBoxSlider: React.FC<Input> = ({ value, disabled, onChange }) => {

    return (
        <label className={(disabled ? "" : "cursor-pointer") +  " relative inline-flex items-center"}>
            <input 
                type="checkbox" 
                checked={value}
                disabled={disabled}
                onChange={onChange} 
                className="sr-only peer" 
            />
            <div className="w-14 h-7 bg-slate-300 focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sky-400" />
        </label>
    );
}


export default CheckBoxSlider;