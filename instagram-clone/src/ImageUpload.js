import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { storage, db } from "./firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null); // for the image "choose file" that we gonna upload
  const [progress, setProgress] = useState(0); // the progress bar
  const [caption, setCaption] = useState(""); // we set up some state there and the capion by default would be empty and we'll be able to show the placeholder below in the input type text

  const handleChange = (e) => {
    // handleChange is a function, is fires up an event
    if (e.target.files[0]) {
      // this piece of code is saying to get the file that we have selected (the first file selected)
      setImage(e.target.files[0]); // and after, we setImage in state to that file
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image); //this line is saying, access storage of firebase, get a reference to this folder
    //(we are creating a new folder there images/ and storing evrything inside on him), image.name is the file name we selected,
    //put(image) is litteraly putting the image we selected into that fold

    uploadTask.on(
      // we have to listen to what's happening now
      "state_changed", //on state_changed give me a snapshot
      (snapshot) => {
        // progress function... as it get updated, give me snapshot of the progress in order to know how much time it gonna take
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 //it gonna give me the exact progress 0 to hundred based on how much informations has been sent across and how much is left
        );
        setProgress(progress); // we set the progress here from 0 to 100
      },
      (error) => {
        //error function... if anything got wrong during the upload, this gonna complain about it
        console.log(error); // we show it in the console to be more userfriendly
        alert(error.message);
      },
      () => {
        //complete function ... when the upload complete
        storage
          .ref("images") // go to ref images
          .child(image.name) // then to the image.name child
          .getDownloadURL() // and then get me the download URL of this stored image
          .then((url) => {
            // get the url

            // we want now to post the image inside the db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(), //tmestamp based on the server where the codes are living, and we'll able to see all the posts by the correct timing
              caption: caption,
              imageUrl: url, //it's the url of our image that we just uploaded in firebase storage, gave us a download link and now we are pushing the download link as part of the post in the db
              username: username,
            });

            setProgress(0); // we set the progress after it's done and we do the same for the caption and image, in order to be clean after the upload and not stuck
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      {/* I want to have... */}
      {/* Caption input... */}
      {/* File picker... */}
      {/* Post button... */}

      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      {/*For our caption, we need a piece of state to keep track of what we are typing inside the caption, and the onChange event gonna keep updateding the caption, 
      grab the latest text and pops it inside the caption, like this we'll always have the latest caption stored inside our state*/}
      <input type="file" onChange={handleChange} />
      {/*For our File picker, the input type file that's when the window open for selecting the file and when we clic a file it fire "handleChange"*/}
      <Button onClick={handleUpload}>
        {/*A button in order to post our picture*/}
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
