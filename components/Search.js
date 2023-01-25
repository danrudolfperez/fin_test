import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMergedData } from "@/store/actions/getMergedDataAction"; 

const SearchComponent = () => {

    const dispatch = useDispatch();
    const { mergeddata, originalmergeddata } = useSelector((state) => state.getMergedData);
    const [searchtext, setSearchText] = useState("");

    const search = (e) => {
        e.preventDefault();
        setSearchText(e.currentTarget.value)
        let searchstring = e.currentTarget.value;
        if(searchstring!=""){
            const searcharr = originalmergeddata.filter((str)=>{
                return JSON.stringify(str).toLowerCase().indexOf(searchstring.toLowerCase()) !== -1;
            })
            dispatch(getMergedData(searcharr, originalmergeddata))    
        }
        else{
            dispatch(getMergedData(originalmergeddata, originalmergeddata))
        }
    }

    return (
        <div>
            <form className="w-1/2 m-4 flex flex-row items-center p-2 xs:w-full" onSubmit={search}>
                <label htmlFor="search" className="mr-2">Search</label>
                <input id="search" type="text" className="w-1/2 p-2 border rounded" 
                    value={searchtext} 
                    onChange={(e)=>search(e)}>
                </input>  
            </form>
        </div>
    )
}

export default SearchComponent;