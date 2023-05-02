import React from "react";

function SearchBar() {
  return (<>
     <div className=" flex items-center justify-center">
      <input 
       type="text"
       placeholder="What are you looking for?" 
       className="outline-none border p-2 w-96 border-r-0 bg-gray-100"
       />
       <i className="uil uil-search-alt border text-2xl p-1 border-l-0 bg-gray-200 text-gray-400"></i>
    
     </div>
    </>
  );
}

export default SearchBar;
