import useAuth from "../hooks/useAuth";
import { useState } from "react";

function AddGame({ data, addGames }) {
  const { auth } = useAuth();
  const [newTitle, setNewTitle] = useState('');
  const [newPublisher, setNewPublisher] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newText, setNewText] = useState('');

  const gameTitles = data.map((element, index) => {
    return <div key={index}>{element.title}</div>;
  });
  function handleAddGame() {
    console.log("Will add new Game")
    
    addGames({
        title: newTitle,
        author: newAuthor,
        imgUrl: newImgUrl,
        rich_text: newText,
        publisher: newPublisher,
        accessToken:auth.accessToken,
      roles: auth.roles
    })
}
  console.log(data);
 
  return (
    <div>
        <div>{gameTitles}</div>
      
      <div className="t">
        <input
          placeholder="Title"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div className="tabl">
        <input
          placeholder="Author"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div className="table">
        <input
          placeholder="Image URL"
          value={newImgUrl}
          onChange={({ target }) => setNewImgUrl(target.value)}
        />
      </div>
      <div className="tabl2">
        <input
          placeholder="Publisher"
          value={newPublisher}
          onChange={({ target }) => setNewPublisher(target.value)}
        />
      </div>
      
      <label for="story">Rich TEXT:</label>

      <textarea id="story" name="story" rows="5" cols="33" onChange={({ target }) => setNewText(target.value)}>
        Insert TEXT...
      </textarea>
      <div className="tableCell1">
        <button onClick={handleAddGame}>Add Game</button>
      </div>
    </div>
  )
}

export default AddGame;
