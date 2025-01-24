import { useState, useContext, createContext } from "react";
//use se use,create se create krengai

const SearchContext = createContext();//just like navigate

//globally 
const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
        ///we will add the results in array that matches with the keyword
    });


    return (
        //just like we Wrapped App.js in index.js from browserRouter
        //to access the state ..we need to pass the value
        <SearchContext.Provider value={[auth, setAuth]} >
            {children}
        </SearchContext.Provider>
    )
}
//custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };