import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export const withParams = (Component) => (props) => {
  let params = useParams();
  let navigate = useNavigate();
  return <Component {...props} params={params} navigate={navigate} />;
};
