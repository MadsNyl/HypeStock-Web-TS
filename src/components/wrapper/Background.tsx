import { ReactNode } from "react";

type BackgroundType = {
    children: ReactNode;
    padding?: string;
};

const Background: React.FC<BackgroundType> = ({ children, padding }) => {
    return (
        <div className={(padding ? padding : "px-6 py-4") + " w-full bg-white rounded-md shadow-sm border border-gray-200"}>
            { children }
        </div>
    );
}


export default Background;