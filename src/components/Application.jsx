import React, { Component } from 'react'; 
import {firestore,auth,createUserProfile} from './firebase'
import { getIdAndData} from './utils'
import Authentication from './Authentication'

import Posts from './Posts';

class Application extends Component {
  state = {
    posts: [ 
    ],
    user: null
  };
  
  subscribeToFirestore=null;
  subscribeToAuth=null;
  
  
  
  async componentDidMount(){    
   this.subscribeToFirestore=   firestore.collection('posts').onSnapshot(snapshot=>{
       const posts = snapshot.docs.map(getIdAndData)
       this.setState({ posts})
     })
     
     
   this.subscribeToAuth= auth.onAuthStateChanged(async (user)=>{
   
     const userProfile = await createUserProfile(user)
     this.setState({user:userProfile})
   })
   
 
  }
  
  componentWillUnmount(){
    this.subscribeToFirestore()
    this.subscribeToAuth()
  }
  



  render() {
    const { posts,user } = this.state;
 

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user}/>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
