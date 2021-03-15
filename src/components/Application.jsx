import React, { Component } from 'react';
import firebase from './firebase'
import {firestore} from './firebase'
import { getIdAndData} from './utils'

import Posts from './Posts';

class Application extends Component {
  state = {
    posts: [ 
    ],
  };
  
  async componentDidMount(){
    
    const snapshot =await firestore.collection('posts').get()
    
    const posts = snapshot.docs.map(getIdAndData)
    
    this.setState({ posts});
 
  }
  

  handleCreate = async post => {
    const { posts } = this.state;

    const docRef = await firestore.collection('posts').add(post)
    
    const doc=await  docRef.get()
    
    const newPost= getIdAndData(doc)
    
    this.setState({ posts: [newPost, ...posts] });
  };
  
  handleRemove= async id=>{

    const posts= this.state.posts
    
    await firestore.doc(`posts/${id}`).delete()
    
    const newPosts = posts.filter(post=> post.id !== id)
    
    this.setState({ posts:newPosts });
    

  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
