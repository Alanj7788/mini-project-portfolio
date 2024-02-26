import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import{Link} from "react-router-dom"
const Register =() =>{
  return(
<div className='wrapper'>
       <form action="">
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder="Email" required/>
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required/>
          <RiLockPasswordFill className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Confirm Password" required/>
          <RiLockPasswordFill className="icon" />
        </div>
        
        <button type="submit">Register</button>

        <div className="register-link">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
        </form>
    </div>
   );
};


export default Register;