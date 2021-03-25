import React,{useContext} from 'react'
import Post from './Post';
import AddPost from './AddPost';
import {postContext} from './context/postContext'

const Posts = () => {
  const posts= useContext(postContext)
  return (
    <section className="Posts">
      <AddPost/>
      {posts.map(post => <Post {...post} key={post.id}  id={post.id} />)}
    </section>
  )
}

export default Posts;
