import React, { useState, useEffect } from "react";
import "./Post.css"; /*This is a component in order to design how posts will look and direct add it to our script*/
import { db } from "./firebase";
import Avatar from "@material-ui/core/Avatar"; /*Adding the Avatar from material-ui*/
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(""); // we creating a piece of state to keep tracking of individual comment we put in that's why it's "comment", there the value is blanc to show the placeholder

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      //if a postId is passing through then
      unsubscribe = db
        .collection("posts") // we are accessing the post collection
        .doc(postId) // going to that postId document
        .collection("comments") //then going inside this comments collection
        .orderBy("timestamp", "desc") // then ordering the comments by times poster
        .onSnapshot((snapshot) => {
          // then we are saying go for a snapshot listenner for that
          setComments(snapshot.docs.map((doc) => doc.data())); // in conclusion when a comment is created we gonna listen the comments of the post and not all the posts (it's a nisted listenner)
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]); // everytime we use a variable in the code above, we need to include his independency, that way if a variable changes it refire this code

  const postComment = (event) => {
    // that function gonna submit my comment in the db to that specefic post
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      // "posts" gonna take me to the collection of posts in db, then I'll get in the specific post with the postId,
      // then to comments then I want to post the comment
      text: comment, // we just need to add in the field of value, text would be what's inside the comment state
      username: user.displayName, //when I push in I don't want the post username but the one who sign in so we fix this on App.js, and this line of code gonna show the user who sign in
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //For ordering the comments
    });
    setComment(""); // it's gonna clear the box after commenting
  };

  return (
    <div className="post">
      {" "}
      {/*adding a class to the container*/}
      <div className="post__header">
        {" "}
        {/*We added this classname to the container who surrend these two elements (avatar and h3)*/}
        <Avatar
          className="post__avatar"
          alt=""
          src="https://zupimages.net/up/20/33/xy2s.jpg" /*can put an image to my avatar*/
        />
        <h3>{username}</h3>
      </div>
      {/*header => avatar + usernamer*/}
      <img className="post__image" src={imageUrl} alt="" />
      {/*Image du poste là c'est David et moi, adding a classname in order to do a styling of the image from my code Post.css imported*/}
      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>
      {/*username + caption*/}
      <div className="post__comments">
        {comments.map((
          comment //I'm mapping through each comment
        ) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}{" "}
            {/*The fields inside the db was username and text*/}
          </p> // A p tag
        ))}
      </div>
      {user && ( // We only show the comment box if we are login
        <form className="post__commentBox">
          {" "}
          {/*giving a className to form in order to style it*/}
          <input // input in order to write inside
            className="post__input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)} // it's gonna update the state as we type in
          />
          <button
            className="post__button"
            disabled={!comment} //If no comment it will be disabled
            type="submit"
            onClick={postComment} // On click we gonna run a function "postComment"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
