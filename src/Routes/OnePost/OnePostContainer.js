import React from "react";
import { useQuery } from "react-apollo-hooks";
import withRouter from "react-router-dom/withRouter";
import OnePostPresenter from "./OnePostPresenter";
import { SEE_POST } from "./OnePostQueries";



export default withRouter(({match:{params:{id}}}) => {
  const { data , loading}=useQuery(SEE_POST,{variables:{id}});
  console.log(loading);
  console.log(data);
    return (
    
    <OnePostPresenter data={data}  loading={loading} /> 
   
    )



    
});