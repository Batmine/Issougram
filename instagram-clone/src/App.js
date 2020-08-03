import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

//instead of having the precedent hardcoded we want to pullin in our database, so we gonna use useEffect (it runs a piece of code based on a specific condition)

useEffect(() => {
  // this is the posts inside firebase, snapShot (every single time the database changes it take the snap of the database and this code run, map (loop through my documents))
  db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id, //ID of the document created on my database of firebase
      post: doc.data() // the data of the id docuent (caption, username, imageurl)
    })));
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
          posts.map(({id, post}) => ( //it was only post before and mapping like everything was an object, now it's an object with keys
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} /> //adding now a key who is the new id of a new post, it'll just add the post without refershing everithing but just what we are adding
          )) /* map is going to every single post, and after I'm looping between the posts, map is just outputing a post component every time it catchs some informations*/

        }

    </div>
  );
}

export default App;
