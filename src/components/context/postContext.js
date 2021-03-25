import React,{createContext,useEffect,useState} from 'react'
import {firestore} from '../firebase'
import {getIdAndData }from '../utils'



export const postContext = createContext()


const PostProvider=({children})=>{
    const [posts,setPosts] = useState([])
    useEffect(()=>{ 
      const subscribeToFirestore=  firestore.collection('posts').onSnapshot(snapshot=>{
       const postsBack = snapshot.docs.map(getIdAndData)
        setPosts(postsBack)
     })
     
     return subscribeToFirestore 
    },[])
    return(
        <postContext.Provider value={posts}>{children}</postContext.Provider>
    )
}

export default PostProvider

