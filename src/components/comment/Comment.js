import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import moment from "moment";


function Comment({ c, i, a, data, user, setShoudlUpdate }) {
    const [updatedText, setUpdaetdText] = useState('')
    const [editing, setEditing] = useState(false)
    const [editingComment, setEditingComment] = useState(false)


  const editComment = () => {
    setEditing((prev) => !prev);
    setEditingComment((prev) => !prev);
  };

      
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
        },
    }).then(res => res.json()).then(res => {

      setShoudlUpdate(prev=>!prev)
        setEditingComment(false)
        setEditing(false)
    }).catch(err => console.log(err))
}

  return (
    <div
      className="comments"
      style={{ borderBottom: i !== a.length - 1 && "1px solid #E5E8EC" }}
    >
      <div className="comment_name">
        <h1>{c.user.email}</h1>
        <p>
          {moment(c.createdAt).format("DD/MM/YYYY")}
          {user.id === c.userId && (
            <MoreVertIcon
              sx={{ fontSize: 20, color: "gray", marginLeft: "1rem" }}
              className="arrow"
              onClick={() => setEditing((prev) => !prev)}
            />
          )}
        </p>
      </div>

      {editingComment ? (
        <div className="commentEditOptions">
          <input
            type="text"
            placeholder={c.text}
            onChange={(e) => setUpdaetdText(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <p
              className="cancelIcon"
              style={{ marginRight: "2rem" }}
              onClick={() => saveComment(c.id)}
            >
              <CheckIcon
                sx={{ fontSize: 15, color: "green", marginRight: "5px" }}
              />
              Save
            </p>

            <p className="cancelIcon" onClick={() => setEditingComment(false)}>
              <ClearIcon
                sx={{ fontSize: 15, color: "red", marginRight: "5px" }}
              />
              Cancel Editing
            </p>
          </div>
        </div>
      ) : (
        <p>{c.text}</p>
      )}

      {editing && (
        <div className="postDropdown">
          <p onClick={editComment}>
            <EditIcon
              sx={{ fontSize: 15, color: "gray", marginRight: "5px" }}
            />{" "}
            Edit
          </p>
          <p onClick={() => deleteComment(c.id)}>
            <DeleteOutlineOutlinedIcon
              sx={{ fontSize: 15, color: "gray", marginRight: "5px" }}
            />{" "}
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default Comment;
