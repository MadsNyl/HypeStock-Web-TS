import Search from "../../icons/Search";



const SearchBar = () => {
    return (
        <div className="w-full flex items-center space-x-2 rounded-md border border-gray-700 bg-gray-900 px-4 py-2">
            <input
                className="focus:outline-none bg-gray-900 text-white w-full"
                type="text"
                placeholder="Search..." 
            />
            <div className="border-l border-gray-700 pl-2">
                <Search style="w-6 h-6 text-gray-400" />
            </div>
        </div>
    );
}


export default SearchBar;