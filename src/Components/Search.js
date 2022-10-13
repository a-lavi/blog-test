import React from 'react'
import Highlighter from "react-highlight-words";
function Search({searchResults, searchQuery}) {
    
    console.log(searchQuery)
    if(!searchResults){
        return (
            <p>Searching ...</p>
        )
    }
    else if(searchResults.length === 0 || searchResults === null){
        return(
            <div>
                <h5>Ther is not any results ...</h5>
            </div>
        )
    }

  return (
    <div>
       
       <ul className="search-row">{searchResults.map((searchResult,index)=>{
         
          return(
          <li className='li-search' md={4}key={index} >
              <div  className=" search-back">
                <div className="search-body">
                  
                  <Highlighter autoEscape={true} searchWords={[searchQuery]} className="search-text-title" textToHighlight={searchResult.fields.title}/> 
                  <Highlighter autoEscape={true} searchWords={[searchQuery]} className="search-text" textToHighlight={searchResult.fields.richText.content[0].content[0].value}/>
                  <p className="search-Author">Author(s): {searchResult.fields.author}</p>
                  <a href={`/${searchResult.fields.title.replaceAll(" ", "_").toLowerCase()}`}>Read more...</a>
                  
                </div>
              </div>
            </li>
          )
          }) }
        </ul> 
      
    </div>
  )
}

export default Search