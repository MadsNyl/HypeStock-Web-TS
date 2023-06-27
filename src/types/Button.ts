

type ButtonType = {
    title: string;
    type: string;
    onClick?: (() => void) | (() => {}) 
    disabled?: boolean;
    icon?: React.ReactElement;
}

export type NavButtonType = {
    title: string;
    type: string;
    path: string;
    icon?: React.ReactElement;
}


export default ButtonType;