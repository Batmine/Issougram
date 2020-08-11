import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { Modal, Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

function getModalStyle() {
  //styling of my modal
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles(); //we need classes, they use makeStyles hook and gave us the useStyles parameters, we just call it and give us access to classes and we end up using it below (classes.paper) and there is a bunch of styling
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false); // A piece of state to track if the modal is open
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    //there is a listenner in useEffect suited to front end, every time it changes, it refire this code below (what if this code get fire 10 times because the username get change 10 times, well have 10 listenners and it will be really heavy) so we use const = unsubscribe to avoid this in the line below before our back end listenner
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //This gonna listen every single time authentique change happen, it's a back end listenner (if we log in if we don't log in), const unsubscribe is like I said in the line above
      if (authUser) {
        // user has logged in
        console.log(authUser); //to see inside the console if somebody is there or not
        setUser(authUser); //capture this user in our State, it survive refresh!!!, state is not persistent but it's auth.onAuthStateChanged((authUser) => with this like who keep me log in
      } else {
        //user has logger out
        setUser(null);
      }
    }); // this gonna listen any authentication change happen, you log or log out, this code fire, we use it for database on snapshot

    return () => {
      // it tells if the useEffect fire again, perform some cleanup actions before you refire the useEffect
      unsubscribe(); //in that way we unsubscribe the listenner, it doesn't spam (exemple: let's say we log in and we update the username, it's gonna refile the frond end code but before it doeas that we are saying to detach the listenner that we just set up (auth.onAuthStateChanged) in order to not have diplucate and then it'll refire it)
    };
  }, [user, username]); // we have to include here their independence, any time they chance they have to be fireup

  //instead of having the precedent hardcoded we want to pullin in our database, so we gonna use useEffect (it runs a piece of code based on a specific condition)
  useEffect(() => {
    // this is the posts inside firebase, snapShot (every single time the database changes it take the snap of the database and this code run, map (loop through my documents))
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id, //ID of the document created on my database of firebase
          post: doc.data(), // the data of the id docuent (caption, username, imageurl)
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault(); // We power up this sign up and avoid the refresh of our sign up (adding type="submit" in the button)

    auth
      .createUserWithEmailAndPassword(email, password) //creat the user and catch it
      .then((authUser) => {
        return authUser.user.updateProfile({
          //in order to get the username updated, in our State we have the user we just type in so we telling (return authUser) go to the user you just log in with, then update there profile and display that username
          displayName: username, // and after all this, this will add it to firebase as an attribute
        });
      })
      .catch((error) => alert(error.message)); //if any error they will show an error message
  };

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)} //everytime I click outside of the modal, it set the modal to be false and it closes
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            {" "}
            {/*to look nicer the sign up*/}
            <center>
              <img
                className="app__headerImage"
                src="https://www.zupimages.net/up/20/31/q40v.png" /*Mon logo issougram*/
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        {" "}
        {/*div is a simple container, and this way of naming our css classes is called Bem, it helps you to stay consistent as you code bigger projects */}
        <img
          className="app__headerImage"
          src="https://www.zupimages.net/up/20/31/q40v.png" /*Mon logo issougram*/
          alt=""
        />
      </div>
      <Button onClick={() => setOpen(true)}>Sign up</Button>{" "}
      {/*we open the modal*/}
      <h1> Salam Aleykoum </h1>{" "}
      {/*On enlève tout pour repartir clean sur le code*/}
      {
        posts.map((
          { id, post } //it was only post before and mapping like everything was an object, now it's an object with keys
        ) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          /> //adding now a key who is the new id of a new post, it'll just add the post without refershing everithing but just what we are adding
        )) /* map is going to every single post, and after I'm looping between the posts, map is just outputing a post component every time it catchs some informations*/
      }
    </div>
  );
}

export default App;
