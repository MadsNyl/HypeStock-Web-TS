import Input from "../../types/Input";


const NumberInput: React.FC<Input> = ({ value, disabled, onChange }) => {

    return (

        <input 
            className={(disabled ? "bg-slate-100" : "bg-white") + " w-full focus:outline-none font-medium px-2 md:px-4 py-1 md:py-2 rounded-md border border-slate-300"}
            type="number"
            value={value}
            disabled={disabled}
            onChange={onChange} 
        />
    );
}


export default NumberInput;