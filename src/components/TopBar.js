import React from "react";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </div>
  );
}

export default TopBar;
