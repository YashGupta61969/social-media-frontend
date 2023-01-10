import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import AddPost from './AddPost'
import './home.css'
import Post from './post/Post';

function Home() {
  const [posts, setPosts] = useState([])
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const {user} = useSelector(state=>state.user)

  useEffect(()=>{
    fetch('http://localhost:8000/posts',{
      headers:{
        'Content-Type': "application/json", 
        'Authorization': `Bearer ${user.token}`, 
      }}).then(res=>res.json()).then(res=>{
        const invisiblePosts = res.result && res.result.filter((item=>Number(item.visiblity) === 1 || item.userId === user.id))
        setPosts(invisiblePosts)
      }).catch(err=>console.log(err))
  },[shouldUpdate])

  
  return (
    <div className='home'>

      <AddPost setShouldUpdate={setShouldUpdate}/>

      {posts && posts.map(p=>{
        return <Post post={p} key={p.id} setShouldUpdate={setShouldUpdate}/>
      })}

    </div>
  )
}

export default Home