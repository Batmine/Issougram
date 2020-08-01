import React from 'react' /*This is a component in order to design how posts will look and direct add it to our script*/
import './Post.css';
import Avatar from "@material-ui/core/Avatar"; /*Adding the Avatar from material-ui*/

function Post({ username, caption, imageUrl}) {
    return (
        <div className="post"> {/*adding a class to the container*/}
              <div classname="post__header"> {/*We added this classname to the container who surrend these two elements (avatar and h3)*/}
                <Avatar
                  className="post__avatar"
                  alt=""
                  src="/static/images/avatar/1.jpg" /*can put an image to my avatar*/
                />
                <h3>{username}</h3>
              </div> 
            {/* header => avatar + usernamer */}

            <img className="post__image" src={imageUrl} alt=""/>
            {/* Image du poste là c'est David et moi, adding a classname in order to do a styling of the image from my code Post.css imported */}

            <h4 className="post__text"><strong>{username}</strong>{caption}</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post