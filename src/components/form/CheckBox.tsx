import Input from "../../types/Input";


const CheckBox: React.FC<Input> = ({ onChange, checked }) => {

    return (
        <input 
            type="checkbox"
            onChange={onChange} 
            checked={checked}
        />
    );
}


export default CheckBox;