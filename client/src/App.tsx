import {Fragment} from "react";
import {Outlet} from "react-router-dom";

export function App() {
  return (
    <Fragment>
      <Outlet/>
    </Fragment>
  )
}