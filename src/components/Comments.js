import React, { useEffect } from 'react'
import { useState } from 'react'
import './comments.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

function Comments({ data }) {
    const { user } = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const currentDate = moment(new Date()).format('DD/MM/YYYY')
    const [text, setText] = useState('')
    const [updatedText, setUpdaetdText] = useState('')
    const [editing, setEditing] = useState(false)
    const [editingComment, setEditingComment] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [shoudlUpdate, setShoudlUpdate] = useState(false)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/comment/${data.id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).then(res => res.json()).then(res => {
            setComments(res.data)
        }).catch(err => console.log(err))
    }, [shoudlUpdate])

    const addComment = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:8000/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                text,
                userId:user.id,
                postId: data.id
            })
        }).then(res => res.json()).then(res => {
            setShoudlUpdate(prev=>!prev)
            if (res.status === 'success') {
                setText('')
            }
        }).catch(err => console.log(err))
    }


    const editComment = () => {
        setEditing(prev => !prev)
        setEditingComment(prev => !prev)
    }
    
    const saveComment = (id)=>{
        fetch(`http://127.0.0.1:8000/comment/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
               text:updatedText,
            })
        }).then(res => res.json()).then(res => {
            setShoudlUpdate(prev=>!prev)
            if (res.status === 'success') {
                setUpdaetdText('')
                setEditing(false)
                setEditingComment(false)
            }
        }).catch(err => console.log(err))
    }

    const deleteComment = (id) => {
        fetch(`http://127.0.0.1:8000/comment/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).then(res => res.json()).then(res => {
            setEditingComment(false)
        }).catch(err => console.log(err))
    }

    return (
        <div className='comment_page'>
            <div className="comments_head">
                <h1>Comments</h1>
                {showComments ? <ArrowDropUpIcon sx={{ fontSize: 25, color: "black" }} onClick={() => setShowComments(prev => !prev)} className='arrow' /> : <ArrowDropDownIcon sx={{ fontSize: 25, color: "black" }} onClick={() => setShowComments(prev => !prev)} className='arrow' />}
            </div>

            {showComments && <><form onSubmit={addComment} className="comment_form" style={{ borderBottom: comments.length && '1px solid black' }}>
                <div className="comment_form_name">
                    <h1>Yash</h1>
                    <p>{currentDate}</p>
                </div>
                <input type="text" placeholder='Add a comment' onChange={(e) => setText(e.target.value)} value={text} />
                <button>Post</button>
            </form>

                {comments && comments.map((c, i, a) => {
                    return <div className="comments" style={{ borderBottom: i !== a.length - 1 && '1px solid #E5E8EC' }
                    } key={c.id}>
                        <div className='comment_name'>
                            <h1>{data.user.email}</h1>
                            <p>{moment(c.createdAt).format('DD/MM/YYYY')}{user.id === c.post.userId && <MoreVertIcon sx={{ fontSize: 20, color: "gray", marginLeft: '1rem' }} className='arrow' onClick={() => setEditing(prev => !prev)} />}</p>
                        </div>

                        {editingComment ? <div className="commentEditOptions">
                            <input type="text" placeholder={c.text} onChange={e => setUpdaetdText(e.target.value)} />
                             <div style={{ display: 'flex' }}>
                                <p className='cancelIcon' style={{ marginRight: '2rem' }} onClick={()=>saveComment(c.id)}><CheckIcon sx={{ fontSize: 15, color: "green", marginRight: '5px' }} />Save</p>

                                <p className='cancelIcon' onClick={() => setEditingComment(false)}><ClearIcon sx={{ fontSize: 15, color: "red", marginRight: '5px' }} />Cancel Editing</p></div>
                        </div> : <p>{c.text}</p> }

                        {editing && <div className="postDropdown">
                            <p onClick={editComment}><EditIcon sx={{ fontSize: 15, color: "gray", marginRight: '5px' }} /> Edit</p>
                            <p onClick={()=>deleteComment(c .id)}><DeleteOutlineOutlinedIcon sx={{ fontSize: 15, color: "gray", marginRight: '5px' }} /> Delete</p>
                        </div>}

                    </div>

                })}
            </>}

        </div>
    )
}

export default Comments