import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
    const [isLikedS,setIsLiked]=useState(isLiked);
    const [likeCountS, setLikeCount]=useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments]=useState([]);
    const [loading,setLoading]=useState(false);

    const comment = useInput("");
    const slide = () =>{
        const totalValue=files.length-1;
        if(currentItem===totalValue){
            setTimeout(()=>setCurrentItem(0),3000);
        }else{
            setTimeout(()=> setCurrentItem(currentItem+1),3000);
        }
    }
    useEffect(()=>{
        slide();
    },[currentItem]);
    const [toggleLikeMutation]=useMutation(TOGGLE_LIKE,{variables:{postId:id}});
    const [addCommentMutation]=useMutation(ADD_COMMENT,{variables:{
      postId:id, text:comment.value
    }});
    const handleLike = () =>{
      if(isLikedS){
       setLikeCount(likeCountS-1);
      }else{
        setLikeCount(likeCountS+1);
      }
      setIsLiked(!isLikedS);
      toggleLikeMutation();
    }
    const onKeyPress= async event =>{
      const { which}=event;
      if(which===13){
        event.preventDefault();
        try{
          setLoading(true);
          const{data:{addComment}}=await addCommentMutation();
          setLoading(false);
          setSelfComments([...selfComments,addComment]);
          comment.setValue("");
        }catch{
          toast.error("Can't send comment");
        }
      }
    }
    return (
      <PostPresenter
        user={user}
        files={files}
        likeCount={likeCountS}
        location={location}
        caption={caption}
        isLiked={isLikedS}
        comments={comments}
        createdAt={createdAt}
        newComment={comment}
        setIsLiked={setIsLiked}
        setLikeCount={setLikeCount}
        currentItem={currentItem}
        handleLike={handleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
        loading={loading}
        id={id}
      />
    );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string
};

export default PostContainer;