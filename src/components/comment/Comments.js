import React, { useEffect } from 'react'
import { useState } from 'react'
import './comments.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import Comment from './Comment';

function Comments({ data }) {
    const { user } = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const currentDate = moment(new Date()).format('DD/MM/YYYY')
    const [text, setText] = useState('')
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
    }, [shoudlUpdate, showComments])

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

    return (
        <div className='comment_page'>
            <div className="comments_head">
                <h1>Comments</h1>
                {showComments ? <ArrowDropUpIcon sx={{ fontSize: 25, color: "black" }} onClick={() => setShowComments(prev => !prev)} className='arrow' /> : <ArrowDropDownIcon sx={{ fontSize: 25, color: "black" }} onClick={() => setShowComments(prev => !prev)} className='arrow' />}
            </div>

            {showComments && <><form onSubmit={addComment} className="comment_form" style={{ borderBottom: comments.length && '1px solid black' }}>
                <div className="comment_form_name">
                    <h1>{user.email}</h1>
                    <p>{currentDate}</p>
                </div>
                <input type="text" placeholder='Add a comment' onChange={(e) => setText(e.target.value)} value={text} />
                <button>Post</button>
            </form>

                {comments && comments.map((c, i, a) => <Comment key={c.id} c={c} i={i} a={a} data={data} user={user} setShoudlUpdate={setShoudlUpdate} />)}
            </>} 

        </div>
    )
}

export default Comments