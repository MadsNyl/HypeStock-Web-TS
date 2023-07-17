

type Input = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: any;
    disabled?: boolean;
    type?: string;
    required?: boolean;
    checked?: boolean;
}


export default Input;