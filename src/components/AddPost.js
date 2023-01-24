import React from 'react'
import { useState } from 'react'
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import CheckIcon from '@mui/icons-material/Check';
import './addPost.css'
import { useSelector } from 'react-redux';

function AddPost({setShouldUpdate}) {
  const {user} = useSelector(state => state.user)
  const [showToAll, setShowToAll] = useState(true)
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const uploadImage = (e)=>{
    setImage(e.target.files[0])
  }

  const post = (e) => {
    e.preventDefault()
    if(!text && !image){
    return alert('Please Add Some Texts Or Images')
    }

    const formData = new FormData()
    formData.append('text',text)
    formData.append('visiblity',showToAll)
    formData.append('userId',user.id)
    formData.append('image',image)

    fetch('http://127.0.0.1:8000/posts', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.token}`, 
      },  
      body: formData
    }).then(res => res.json()).then(res => {alert('Post Created Successfully');setImage('');setText('');setShouldUpdate(prev=>!prev)}).catch(err => console.log(err))

  }

  return (
    <form className='addPost' onSubmit={post}>
      <input placeholder="What's Happening ?" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="post_options">
        <label htmlFor="myInput">{image?.name ? <CheckIcon sx={{ fontSize: 25, color: "rgb(90, 90, 255)" }} className='arrow' /> : <BrokenImageOutlinedIcon sx={{ fontSize: 25, color: "rgb(90, 90, 255)" }} className='arrow' /> }</label>
        <input
          id="myInput"
          style={{ display: 'none' }}
          type={"file"}
          onChange={uploadImage}
        />
        <div className='image_conatiner' onClick={() => setShowToAll(prev => !prev)}>
          <p>{showToAll ? 'Everyone can View & reply':'Only Me'}</p>
        </div>
      </div>

      <button>Share Now</button>
    </form>
  )
}

export default AddPost