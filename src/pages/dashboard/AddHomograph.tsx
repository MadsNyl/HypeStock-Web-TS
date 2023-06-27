import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import Search from "../../icons/Search";
import Ticker from "../../types/Ticker";
import Plus from "../../icons/Plus";
import Snackbar from "../../components/Snackbar";
import Button from "../../components/form/Button";


const AddHomographPage: React.FC = () => {

    const axios = useAxiosPrivate();

    const [_isLoading, setLoading] = useState<boolean>(false);
    const [word, setWord] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [_errMsg, setErrMsg] = useState<string>("");
    const [searchWord, setSearchWord] = useState<string>("");
    const [saveDisabled, setSaveDisabled] = useState<boolean>(true);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const add = async () => {
        setLoading(true);

        try {
            await axios.post(
                "/homograph/create",
                JSON.stringify({
                    word: word,
                    description: description
                })
            );

            setDescription("");
            setWord("");
            
            setShowSnackbar(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response)
                if (!error?.response) {
                    setErrMsg("No server response.");
                } else {
                    setErrMsg(error.response?.data);
                }
            }
        } finally {
            setLoading(false);
        }
    }
    
    const search = async () => {
        setLoading(true);

        
        if (!searchWord.length) {
            setTickers([]);
            return;
        }

        try {
            const response = await axios.get(`/ticker/symbol_search?search=${searchWord}&limit=6`);

            setTickers(response?.data.tickers);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        search();
    }, [searchWord]);

    useEffect(() => {

        if (word.length && description.length) {
            setSaveDisabled(false);
        } else {
            setSaveDisabled(true);
        }

    }, [word, description]); 

    return (
        <>

            <Snackbar 
                success={true}
                showBar={showSnackbar}
                setShowBar={setShowSnackbar}
                message="Homograph added."
            />

            <div className="px-6 md:px-12">
                <div className="pt-20 md:pt-8 pb-16 md:pb-24 flex items-center justify-between mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Add homograph
                    </h1>

                    <div>

                    </div>
                </div>

                <div className="space-y-4 md:space-y-0 md:flex justify-between items-baseline pb-24">

                    <div className="max-w-sm w-full bg-white rounded-md shadow-sm border border-slate-200 px-6 py-4">
                        <h1 className="text-xl font-semibold pb-12 text-center">
                            Selected homograph with ticker
                        </h1>

                        <div className="flex justify-center px-4 py-2 rounded-md border border-slate-300">
                            <h1 className="text-lg font-medium">
                                { 
                                    word.length
                                        ? word
                                        : "No word is selected"
                                }
                            </h1>
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="space-y-6 max-w-lg w-full">
                            <div className="flex items-center px-4 py-2 space-x-2 bg-white border border-slate-200 rounded-md shadow-sm">
                                <input 
                                    className="w-full focus:outline-none"
                                    type="text"
                                    placeholder="Search for ticker..."
                                    onChange={e => setSearchWord(e.target.value)}
                                    value={searchWord}
                                />
                                <Search style="w-6 h-6" />
                            </div>
                                
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    tickers.map((item, index) => {
                                        return <button 
                                                    onClick={() => {
                                                        setWord(item.symbol);
                                                        setTickers([]);
                                                        setSearchWord("");
                                                    }}
                                                    key={index} 
                                                    className="relative bg-white rounded-md shadow-sm border border-slate-200 px-4 py-2 transition duration-150 ease-in-out hover:text-white hover:bg-black"
                                                >
                                                    <h1 className="text-center font-medium">
                                                        { item.symbol }
                                                    </h1>

                                                    <Plus style="w-5 h-5 absolute top-1 right-1" />
                                                </button>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white rounded-md shadow-sm px-12 py-6 border border-slate-200 md:flex justify-between md:space-x-20">
                    <div className="hidden md:block max-w-md w-full">
                        <div className="pb-12">
                            <h1 className="text-xl font-semibold pb-6">
                                Description
                            </h1>

                            <p>
                                Provide a description for why this ticker will be ignored from article parsing. This information will be presented for the end user when the ticker is displayed.
                            </p>
                        </div>

                        <div className="w-36">
                            <Button 
                                title="Add"
                                type="save"
                                onClick={add}
                                disabled={saveDisabled}
                            />
                        </div>
                    </div>

                    <div className="w-full space-y-4 md:space-y-0">
                        <textarea
                            className="focus:outline-none border border-gray-300 rounded-md px-4 py-2 w-full h-52"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            required
                            placeholder="Insert description..."
                        >

                        </textarea>
                        <div className="md:hidden">
                            <Button 
                                title="Add"
                                type="save"
                                onClick={add}
                                disabled={saveDisabled}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default AddHomographPage;