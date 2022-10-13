import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
const EditPosts = ({ data, updateGame, deleteGames }) => {
  const { auth } = useAuth();
  let { gameid } = useParams();
  const foundgame = data.find((game) => game.id === gameid);
  console.log(foundgame);
  const history = useNavigate();
  const [newTitle, setNewTitle] = useState();
  const [newPublisher, setNewPublisher] = useState();
  const [newAuthor, setNewAuthor] = useState();
  const [newImgUrl, setNewImgUrl] = useState();
  const [newText, setNewText] = useState();

  
console.log(auth)
  const gameTitles = data.map((element, index) => {
    return <div key={index}>{element.title}</div>;
  });

   /*  async function calledGame (){
       const foundgame= await data.find((game)=> game.id === gameid)
       return setFindGame(foundgame) 
    }
    
    calledGame()
    console.log(findGame) */
  function handleDeleteGame() {
    deleteGames({ id: gameid,
      accessToken:auth.accessToken,
      roles: auth.roles });
    history("/");
  }

  function handleUpdateGame() {
    updateGame({
      id: gameid,
      title: newTitle,
      author: newAuthor,
      imgUrl: newImgUrl,
      richText: newText,
      publisher: newPublisher,
      accessToken:auth.accessToken,
      roles: auth.roles
    });
  }
  console.log(data);

  return (
    <div>
      <div>{foundgame.title}</div>

      <div className="t">
        <label for="title">Title: </label>
        <input
          id="title"
          placeholder={foundgame.title}
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div className="tabl">
        <label for="author">Author:</label>
        <input
          id="author"
          placeholder={foundgame.author}
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div className="table">
        <label for="imgurl">IMG URL:</label>
        <input
          id="imgurl"
          placeholder={foundgame.imgUrl}
          value={newImgUrl}
          onChange={({ target }) => setNewImgUrl(target.value)}
        />
      </div>
      <div className="tabl2">
        <label for="publisher">Publisher:</label>
        <input
          id="publisher"
          placeholder={foundgame.publisher}
          value={newPublisher}
          onChange={({ target }) => setNewPublisher(target.value)}
        />
      </div>

      <label for="story">Rich TEXT:</label>

      <textarea
        id="story"
        name="story"
        placeholder={foundgame.richText}
        rows="52"
        cols="100"
        onChange={({ target }) => setNewText(target.value)}
      ></textarea>
      <div className="tableCell1">
        <button onClick={handleUpdateGame}>Update</button>
      </div>
      <div className="tableCell1">
        <button onClick={handleDeleteGame}>Delete Game</button>
      </div>
    </div>
  );
};

export default EditPosts
