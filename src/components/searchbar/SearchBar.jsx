import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./searchBar.css";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [visible, setVisible] = useState("hidden");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    
    if (searchWord === "") {
      setVisible("hidden");
      setFilteredData([]);
    } else {
      setVisible("visible");
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setVisible("hidden");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}  
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {
            wordEntered === '' ? (
              <i className="fas fa-search" style={{cursor: "pointer"}} ></i>

            ):(
              <i className="fas fa-times" id="clearBtn" onClick={clearInput} ></i>
            )
          }
        </div>
      </div>
      {
      <div className="dataResult" style={{visibility:visible}}>
      {filteredData.slice(0, 15).map((value, key) => {
        return (
          <div className="dataItem"> 
          <Link to="/" className="link item"><p>{value.title} </p></Link> 
          </div>  
        );
      })}
    </div>
    }
    </div>
    

    
  );
}

export default SearchBar;

{/* <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <i className="fas fa-search" style={{cursor: "pointer"}} ></i>
          ) : (
            <i className="fas fa-times" id="clearBtn" onClick={clearInput} ></i>
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div> */}