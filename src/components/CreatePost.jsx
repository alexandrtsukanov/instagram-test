import { useContext, useState, useEffect } from 'react';
import { Context } from '../App';

function CreatePost() {
  
  const { user, setUser, photoValue, setPhotoValue, bodyValue, setBodyValue, history } = useContext(Context)
  const [newPost, setNewPost] = useState(null)
  // USEFUL CODE !

  // const getLogin = async () => {
  //   let resultFetch = await fetch('http://localhost:8080/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({ login: login, password: pass })
  //   });
  //   let finalResultFetch = await resultFetch.text();
  //   setUser(finalResultFetch); 
  // };

  // USEFUL CODE

  const getUser = async () => {
      let resultFetch = await fetch('http://localhost:8080/users/auth');
      let finalResultFetch = await resultFetch.text();
      setUser(finalResultFetch); 
    };

  const getNewPost = async () => {
    let resultFetch = await fetch('http://localhost:8080/posts/newpost', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ author: user, photo: photoValue, body: bodyValue })
    });
    // let finalResultFetch = await resultFetch.json();
    // setNewPost(finalResultFetch)
  }

  useEffect(() => {
    getUser();
  })

  const photoChangeHandler = ({ target }) => {
    setPhotoValue(target.value)
  }
  const bodyChangeHandler = ({ target }) => {
    setBodyValue(target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    getNewPost();
    // setPosts(pre => [...pre, {
    //   author: user,
    //   photo: photoValue,
    //   body: bodyValue,
    // }])
    // getNewPost()
    setPhotoValue('')
    setBodyValue('')
    history.push('/')
  };

  return (
    <div className="comp form" id="newpost">
      <h3>Create A Post:</h3>

      <form onSubmit={submitHandler} action="http://localhost:8080/newpost" method="POST">
        <div>
        <label>Insert a link:&ensp;
        <input onChange={photoChangeHandler} type="text" name="photo" value={photoValue}/>

        </label>
        </div>
        <br />
        <div>
        <label>Type a text:&ensp;

        <input onChange={bodyChangeHandler} type="text" name="body" value={bodyValue}/>
        </label>
        </div>
        <br />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
