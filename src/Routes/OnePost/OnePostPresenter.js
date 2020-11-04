
import React from "react";
import Loader from "../../Components/Loader";
import Post from "../../Components/Post";
export default ({data, loading} ) =>{

    if(loading){
        return (
            <Loader/>
        )
    }else{
        console.log(data)
        return "hello"
    }
}