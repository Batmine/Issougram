import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([ 
    {
      username: "Issou",
      caption: " La Saint-Chancla",
      imageUrl: "https://zupimages.net/up/20/31/5ts2.png"
    },
    {
      username: "Persan",
      caption: " Bon ap à moi!",
      imageUrl: "https://jardinage.lemonde.fr/images/dossiers/2016-09/rapiette-151735.jpg"
    }
  ]); /*in order to avoid hard coding this posts, it's better to make them come from somewhere, we gonna use "State", a short term memory store in react, a piece of state is how you set variables in react*/

//instead of having that code above hardcoded we want to pullin in our database, so we gonna use useEffect (it runs a piece of code based on a specific condition)

useEffect(() => {
  // this is the posts inside firebase, snapShot is a very powerful listner (every single time the database changes it take the snap of the database)
  db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => doc.data()));
  })
}, []);

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

        {
          posts.map(post => (
            <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )) /* map is going to every single post, and after I'm looping between the posts, map is just outputing a post component every time it catchs some informations*/

        }

    </div>
  );
}

export default App;
