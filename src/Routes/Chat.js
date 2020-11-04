import React from "react"
import gql from "apollo-boost"
import { useSubscription } from "react-apollo-hooks";

const MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId){
        message
    }
  }
`;

export default () => {
  const { loading, error, data } = useSubscription(MESSAGE_SUBSCRIPTION,{variables:{
      roomId:"asdasd"
  
  }})
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  const { message } = data
  return <p>New message: {message}</p>
}