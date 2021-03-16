import { useContext, useState } from 'react';
import { Context } from '../App';

function Signup() {

  const { setUser, history } = useContext(Context)
  const [mailValue, setMailValue] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const getUserSign = async () => {
    const ftch = await fetch('http://localhost:8080/users/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: mailValue, login: loginValue, password: passValue })
    });
    // const resFetch = await ftch.json();
    // setUser(resFetch)
  }

  const emailHandler = ({ target }) => {
    setMailValue(target.value)
  }
  const loginHandler = ({ target }) => {
    setLoginValue(target.value)
  }
  const passwordHandler = ({ target }) => {
    setPassValue(target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault();
    getUserSign();
    setMailValue('');
    setLoginValue('');
    setPassValue('');
    history.push('/newpost') 
  }

  return (
    <div className="comp form" id="signup">
      <h3>Sign Up</h3>

      <form 
      onSubmit={submitHandler} 
      action="http://localhost:8080/users/signup" method="POST">
        <div>
        <label>Enter your e-mail:&ensp;
        <input onChange={emailHandler} type="text" name="email" value={mailValue}/>
        </label>
        </div>

        <br />

        <div>
        <label>Create a login:&ensp;
        <input onChange={loginHandler} type="text" name="login" value={loginValue}/>
        </label>
        </div>

        <br />

        <div>
        <label>Create a password:&ensp;
        <input onChange={passwordHandler} type="password" name="password" value={passValue}/>
        </label>
        </div>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
