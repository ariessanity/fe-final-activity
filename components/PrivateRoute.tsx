import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

interface Props {
  children: any;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = useSelector((state: any) => state.auth.accessToken);
  return <div>{token ? children : <LoadingToRedirect />}</div>;
};

export default PrivateRoute;
