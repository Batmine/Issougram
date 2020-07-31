import React from 'react' /*This is a component in order to design how posts will look and direct add it to our script*/

function Post() {
    return (
        <div>
            <h3>Username</h3>
            {/* header => avatar + usernamer */}

            <img src="https://zupimages.net/up/20/31/5ts2.png" alt=""/>
            {/* Image du poste là c'est David et moi */}

            <h4>Username: caption</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
