import React from 'react';
import './styles/Signup.css';
const Signup = () => {

return (
    <div className='boxes'>
        <div className="box-1">

        </div>
        <div className="box-2">
            <div className="box-2-title">
                <div>Hello Again!!</div>
                <div>Welcome Back</div>
            </div>
            <form className='form'>
                <div className='inputBorder'>
                    <input type="text" placeholder="Full Name" />
                </div>
                <div className='inputBorder'>
                    <input type="text" placeholder="Username" />
                </div>
                <div className='inputBorder'>
                    <input type={'email'} placeholder="Email" />
                </div>
                <div className='inputBorder'>
                    <input type="password" placeholder="Password" />
                </div>
                <div className='inputBorder'>
                    <input type="password" placeholder="Confirm Password" />
                </div>
                <div className='signupBtn'>
                    <button className='button'>Sign Up</button>
                </div>
                <div className='forgetPassword'>
                    <a href="#">Forget Password?</a>
                </div>    
            </form>           
        </div>
    </div>
    );
}

export default Signup;