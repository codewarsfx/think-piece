import React,{useReducer,useContext} from 'react';
import {firestore,storage} from '../components/firebase'
import {userContext} from '../components/context/userContext'


const reducer = (state,action)=>{
    switch(action.type){
        case "displayName":
            return {...state,displayName: action.payload };
            break;
        case "file":
            return {...state,imageFile: action.payload}
        case "clear":
            return {displayName:''}
        default:
            return state
    }
}

const initialState={displayName:'',imageFile:null}
const UserProfile = ()=>{
    const [state, dispatch] =useReducer(reducer,initialState)
    const currentUser = useContext(userContext)
    
    const handleSubmit= (e)=>{
        e.preventDefault()
        const currentUserRef = firestore.doc(`users/${currentUser.uid}`) 
        const storageRef= storage.ref() 
        const imageRef = storageRef.child(`images/${currentUser.uid}`)
        currentUserRef.update({
            displayName:state.displayName
        })  
        imageRef.put(state.imageFile)
                .then(snapshot=>{
                    return snapshot.ref.getDownloadURL()
                })
                .then(downloadURL=>{
                    currentUserRef.update({
                        photoURL:downloadURL
                    })
                }) 
        dispatch({type:"clear"})  
    }
    
    
    const handleChange= (e)=>{
        let file
        if(e.target.files) file = e.target.files[0];
        dispatch({
            type:e.target.name,
            payload:file || e.target.value
        })   
    }
    
    

    return( 
        <div>
            <h1>{state.displayName}</h1>
        <form action="#" onSubmit={handleSubmit}>
            <input type='text' name="displayName" value={state.displayName} onChange={handleChange} placeholder="Enter new displayName"/>      
            <input type='file' name="file" onChange={handleChange} /> 
            <input type='submit' value="Submit" />   
        </form> 
        </div>   
        
    )
}


export default UserProfile