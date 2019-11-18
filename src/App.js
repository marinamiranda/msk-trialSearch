import React, { useState, useEffect } from "react";
import Record from "./components/Record";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    const search = searchValue => {
    setLoading(true);

    fetch(`https://clinicaltrialsapi.cancer.gov/v1/interventions?name=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
          setRecords(jsonResponse.terms);
          console.log(jsonResponse.terms)
          setLoading(false);
      });
    };

    const [searchValue, setSearchValue] = useState("");
  
    const handleSearchInputChanges = (e) => {
      setSearchValue(e.target.value);
    }

    const doSearch = (e) => {
      e.preventDefault();
      search(searchValue);
    }

    const sortByCategory = () => {
      const sorted = [...records].sort((a, b) => {
        return a.category.localeCompare(b.category);
      });
      setRecords(sorted);
    }
    
    return (

      <div className="App">
        <div className="searchBox">
          <div className="searchTitle">MSK Trials Search</div>
            <form className="search">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchInputChanges}
              />
        
              <input onClick={doSearch} type="submit" value="search" />
            </form>
        </div>
        <div className="records">
          {loading && !errorMessage ? (
            <span>loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">Error loading results</div>
          ) : (
          records.map((record, index) => (
            <Record key={`${index}-${record.name}`} record={record} />
          ))
          )}  
      <input onClick={sortByCategory} type="submit" value="sort by category"/>
      </div> 

      </div>
  );
};


export default App;