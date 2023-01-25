import { useState } from "react";

const SearchComponent = (props) => {

    const [searchtext, setSearchText] = useState("");

    const search = (e) => {
        e.preventDefault();
        setSearchText(e.currentTarget.value)
        props.searchQuery(e.currentTarget.value);
    }

    return (
        <div>
            <form className="w-1/2 m-4 flex flex-row items-center p-2" onSubmit={search}>
                <label htmlFor="search" className="mr-2">Search</label>
                <input id="search" type="text" className="w-1/2 p-2 border rounded" 
                    value={searchtext} 
                    // onChange={(e)=>{setSearchText(e.currentTarget.value)}}>
                    onChange={(e)=>search(e)}>
                </input>  
                {/* <button className="mx-2 bg-slate-600 text-white p-2 rounded transition ease-in-out duration-300 hover:bg-slate-800">Submit</button> */}
            </form>
        </div>
    )
}

export default SearchComponent;