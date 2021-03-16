import { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import Post from './Post';
import { v4 as uuidv4 } from 'uuid';
import CreatePost from './CreatePost';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function Home() {

  const { user, posts, setPosts } = useContext(Context);
  const [show, setShow] = useState(false)

  const clickHandler = () => {
    setShow(pre => !pre)
  }
  const getPosts = async () => {
    let fetchResult = await fetch('http://localhost:8080/posts/allposts');
    let finalFetchResult = await fetchResult.json();
    setPosts(finalFetchResult.reverse())
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="comp" id="home">
    <h3>Home</h3>
    {posts.length !== 0 && 
    <button onClick={clickHandler}>New Post</button>
    }
    <br />
    <TransitionGroup>
        {show && 
      <CSSTransition classNames="option">
        <div id="buttonnewpost" >
          <CreatePost />
          </div>
      </CSSTransition>
      }
    </TransitionGroup>

      {posts.map(({ author, photo, body }) => (
        <div>
        <Post
          key={uuidv4()} 
          author={author}
          photo={photo}
          body={body}
          />
        </div>
      ))}

    </div>
  );
}

export default Home;





