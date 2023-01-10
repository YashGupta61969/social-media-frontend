import React, { useState } from 'react'
import './post.css'
import Comments from '../Comments'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';

function Post({ post, setShouldUpdate }) {
    const { user } = useSelector(state => state.user)
    const [updatedText, setUpdatedText] = useState(post.text)
    const [updatedVisiblity, setUpdatedVisiblity] = useState(Number(post.visiblity))
    const [updatedImage, setUpdatedImage] = useState(post.image ? post.image : '')
    const [postOptionsVisible, setPostOptionsVisible] = useState(false)
    const [editing, setEditing] = useState(false)

    const deletePost = () => {
        fetch(`http://127.0.0.1:8000/posts/${post.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': "application/json",
            },
        }).then(res => res.json()).then(res => {
            alert('Post Deleted Successfully')
            setShouldUpdate(prev => !prev)
        }).catch(err => console.log(err))
    }

    const editPost = (e) => {
        if (!updatedImage && !updatedText) {
            return alert('Please Provide Some Text Or Image')
        }
        e.preventDefault()
        const formData = new FormData()
        formData.append('text', updatedText)
        formData.append('visiblity', updatedVisiblity)
        formData.append('image', updatedImage)

        fetch(`http://127.0.0.1:8000/posts/${post.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            body: formData
        }).then(res => res.json()).then(res => {setShouldUpdate(prev => !prev); setEditing(false) }).catch(err => console.log(err))
    }
    return (
        <div className="post" key={post.id}>

            {updatedImage && <div className="postImg">
                {editing &&
                    <div className="editImg">
                        <label htmlFor="myInput"><EditIcon className='editIcon' sx={{ fontSize: 60, color: "white" }} /></label>
                        <DeleteOutlineOutlinedIcon className='editIcon' sx={{ fontSize: 60, color: "white" }} onClick={() => setUpdatedImage('')} />

                        <input
                            id="myInput"
                            style={{ display: 'none' }}
                            type={"file"}
                            onChange={(e) => setUpdatedImage(e.target.files[0])}
                        />
                    </div>
                }
                {updatedImage && <img src={post.image} alt="post" />}
            </div>}

            <div className="postDesc">
                <div>
                    <span className='userName'>{post.user.email} :-</span>
                    {!editing ? <span className='caption'>{post.text}</span> : <input className='captionInput' type='text' value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />}
                </div>
                {!editing && user.id === post.userId && <MoreVertIcon sx={{ fontSize: 20, color: "gray" }} className='arrow' onClick={() => setPostOptionsVisible(prev => !prev)} />}


                {/* cancel icon if editing */}
                {editing && <div style={{ display: 'flex' }}>
                    <div className='visiblityEditContainer' onClick={() => setUpdatedVisiblity(prev => !prev)}>
                        <p style={{display:'flex', alignItems:'center'}}>Visible to ALL {updatedVisiblity ?<CheckIcon sx={{ fontSize: 15, color: "green", marginLeft:'5px'}} /> : <ClearIcon sx={{ fontSize: 15, color: "red" }} />}</p>
                    </div>

                    <p className='cancelIcon' style={{ marginRight: '2rem' }} onClick={editPost}><CheckIcon sx={{ fontSize: 15, color: "green", marginRight: '5px' }} />Save</p>

                    <p className='cancelIcon' onClick={() => setEditing(false)}><ClearIcon sx={{ fontSize: 15, color: "red", marginRight: '5px' }} />Cancel Editing</p></div>}

                {!editing && postOptionsVisible && <div className="postDropdown">
                    <p onClick={() => setEditing(true)}><EditIcon sx={{ fontSize: 15, color: "gray", marginRight: '5px' }} /> Edit</p>
                    <p onClick={deletePost}><DeleteOutlineOutlinedIcon sx={{ fontSize: 15, color: "gray", marginRight: '5px' }} />Delete</p>
                </div>}

            </div>

            {!editing && <Comments data={post} />}

        </div >
    )
}

export default Post