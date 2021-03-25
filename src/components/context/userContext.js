import React,{createContext,useState,useEffect} from 'react';
import {auth} from '../firebase'
import {createUserProfile} from '../firebase'




export const userContext = createContext({})

const UserProvider= ({children})=>{
  const [userP,setUser] = useState(null)
  
  useEffect(()=>{
   const subscribeToAuth = auth.onAuthStateChanged(async (user)=>{
     if(user){
     const userProfileRef = await createUserProfile(user)
      userProfileRef.onSnapshot(snapshot=>{
        setUser({
          uid:snapshot.id,
          ...snapshot.data()
        })
      })}
      setUser(user)
   })  
   return subscribeToAuth   
  },[])
  
    return(
        <userContext.Provider value={userP}>{children}</userContext.Provider>
    )
}

export default UserProvider