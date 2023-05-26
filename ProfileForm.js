import classes from './ProfileForm.module.css';
import React,{useRef,useContext} from 'react';
import AuthContext from '../Store/auth-context';

const ProfileForm = () => {
  const passRef=useRef();

  const authCtx=useContext(AuthContext);

 

  const changePasswordHandler=(event)=>{
        event.preventDefault();
        const enteredNewPassword=passRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBZRt1EODmiryCwAf1Okgl9yEJS_vgdkkI',{
          method:'POST',
          body:JSON.stringify({
            idToken:authCtx.token,
            password:enteredNewPassword,
            returnSecureToken:false
          }),
          headers:{
            'Content-Type':'application/json'
          }
        }).then((res)=>{
          if(res.ok){
            return res.json();
          }
          else{
            return res.json().then((data)=>{
              throw new Error(data.error.message);
            })
          }
        }).then((data)=>{
          console.log(data);
        }).catch((err)=>{
          alert(err.message);
        })
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passRef}/>
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
