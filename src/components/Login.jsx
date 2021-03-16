import { useContext, useState, useEffect } from 'react';
import { Context } from '../App'

function Login() {

  const {history} = useContext(Context)
  const [passValue, setPassValue] = useState('');
  const [loginValue, setLoginValue] = useState('');
  // const [userLogin, setUserLogin] = useState('');

  const getUserLog = async () => {
    let ftch = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ login: loginValue, password: passValue })
    });
    // let resFetch = await ftch.text();
    // setUserLogin(resFetch)
  }
  const changeHandler = ({ target }) => {
    setLoginValue(target.value)
  }
  const changePassHandler = ({ target }) => {
    setPassValue(target.value)
  }
  
  const submitHandler = (event) => {
    event.preventDefault();
    getUserLog();
    setLoginValue('');
    setPassValue('');
    history.push('/newpost') 
  }

  return (
    <div className="comp form">
      <h3>Log In</h3>
      <form onSubmit={submitHandler} action="http://localhost:8080/login" method="POST">

        <div>
        <label>Enter your login:&ensp;
        <input onChange={changeHandler} type="text" name="login"value={loginValue}/>
        </label>
        </div>

        <br />

        <div>
        <label>Enter your password:&ensp;
        <input onChange={changePassHandler} type="password" name="password" value={passValue}/>
        </label>
        </div>
        <br />
        <button type="submit">Log In</button>
      </form>

    </div>
  );
}

export default Login;
