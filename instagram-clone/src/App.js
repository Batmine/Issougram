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

        <Post username="Issou " caption=" La Saint-Chancla!" imageUrl="https://zupimages.net/up/20/31/5ts2.png"/>
        <Post username="Persian " caption=" Bon ap à moi!" imageUrl="https://jardinage.lemonde.fr/images/dossiers/2016-09/rapiette-151735.jpg"/>
        <Post username="Tacos-boy " caption=" tequiero puta" imageUrl="https://lacerisesurlemaillot.fr/wp-content/uploads/2019/03/fish-tacos.jpg"/>


    </div>
  );
}

export default App;
