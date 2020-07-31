import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">
        <div className="app__header"> {/*div is a simple container, and this way of naming our css classes is called Bem, it helps you to stay consistent as you code bigger projects */}
          <img 
            className="app__headerImage" 
            src="https://www.zupimages.net/up/20/31/q40v.png" /*Mon logo issougram*/            
            alt=""
          />
        </div>

        <h1> Salam Aleykoum </h1> {/*On enlève tout pour repartir clean sur le code*/}

        <Post />
        {/* Posts */}
        {/* Posts */}
    </div>
  );
}

export default App;
