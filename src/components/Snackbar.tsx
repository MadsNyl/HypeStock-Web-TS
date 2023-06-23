import { useEffect } from "react";
import Close from "../icons/Close";
import ComponentSnackbar from "../types/ComponentSnackbar";


const Snackbar: React.FC<ComponentSnackbar> = ({ success, message, showBar, setShowBar }) => {

    if (!showBar) {
        return (
            <>
            </>
        );
    }

    useEffect(() => {
        if (showBar) {
            setTimeout(() => {
                setShowBar(false);
            }, 3500);
        }
    }, [showBar]);

    return (
        <div className={(success ? "bg-emerald-800 text-white" : "bg-red-800 text-white") + " fixed bottom-0 right-4 max-w-xs w-full rounded-t-md px-4 py-3 flex justify-start"}>
            <div className="w-60">
                <h1 className="font-medium">
                    { message }
                </h1>
            </div>
            <div className="absolute top-2 right-2">
                <button
                    onClick={() => setShowBar(false)}
                >
                    <Close style="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    );
}


export default Snackbar;