import { useEffect, useState, React } from "react";
import { useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown"
import {getSingleBoardGame} from "../Controllers/api";

function GameDetails () {
    let { gameSlug } = useParams();
    const [singleGameData, setSingleGameData] = useState();
    console.log(gameSlug)

    async function getSingleGame(){
        const singleBoardGame = await getSingleBoardGame(gameSlug);
        console.log(singleBoardGame)
        setSingleGameData(singleBoardGame)
    }
    console.log(singleGameData)

    useEffect(() => {
        getSingleGame();
      }, []);
        
      if (!singleGameData) {
        return <div>Data is Loading...</div>;
      } 

    return (
        <div className="body-game-details">
           <img className="game-detail-img" src={singleGameData.imgUrl} alt="not loading"/>  
            <div>
              <h1 className="game-detail-title">{singleGameData.title}</h1>
              <p>Created by: <i>{singleGameData.author}</i></p>
              <br/>
              <ReactMarkdown>{singleGameData.richText}</ReactMarkdown>
              <br/>
              <p>Published by: <i>{singleGameData.publisher}</i></p>
            </div>
        </div>
    )
}

export default GameDetails