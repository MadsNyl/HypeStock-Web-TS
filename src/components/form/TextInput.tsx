import Input from "../../types/Input";


const TextInput: React.FC<Input> = ({ value, disabled, onChange, type, required }) => {

    return (
        <input 
            className="w-full focus:outline-none font-medium bg-white px-4 py-2 rounded-md border border-slate-300"
            type={type ? type : "text"}
            disabled={disabled}
            value={value}
            onChange={onChange} 
            required={required}
        />
    );
}


export default TextInput;