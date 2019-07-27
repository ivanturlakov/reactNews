import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";
import { distanceInWordsToNow } from "date-fns";

function LinkDetail(props) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const linkId = props.match.params.linkId
  const [commentText, setCommentText] = React.useState("")
  const [link, setLink] = React.useState(null)
  const linkRef = firebase.db.collection('links').doc(linkId)

  React.useEffect(() => {
    getLink()
  }, [])

  function getLink() {
    linkRef.get().then(doc => {
      setLink({ ...doc.data(), id: doc.id })
    })
  }

  function handleAddComment() {
    if(!user) {
      props.history.push('/login')
    } else {
      linkRef.get().then(doc => {
        if(doc.exists) {
          const previousComments = doc.data().comments
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText
          }
          const updatedComments = [...previousComments, comment]
          linkRef.update({ comments: updatedComments })
          setLink(prevState => ({
            ...prevState,
            comments: updatedComments
          }))
          setCommentText("")
        }
      })
    }
  }

  return !link ? (
    <div>Loading...</div>
  ) : (
    <div>
      <LinkItem showCount={false} link={link} />
      {user && (
        <>
          <textarea
            rows="6"
            columns="60"
            onChange={event => setCommentText(event.target.value)}
            value={commentText}
          />
          <div>
            <button className="button" onClick={handleAddComment}>
              Add comment
            </button>
          </div>
        </>
      )}
      {link.comments.map((comment, index) => (
        <div key={index}>
          <p className="comment-author">
            {comment.postedBy.name} 
            {" | "} 
            {distanceInWordsToNow(comment.created)} ago</p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  )
}

export default LinkDetail;
