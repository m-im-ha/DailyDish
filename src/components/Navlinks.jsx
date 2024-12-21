import { NavLink } from "react-router-dom";

function Navlinks() {
  return (
    <div className="flex gap-10">
      <NavLink to="/">Logo</NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink>Available Foods</NavLink>
      <NavLink>Add Food</NavLink>
      <NavLink>Manage My Foods</NavLink>
      <NavLink>My Food Request</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
}

export default Navlinks;
