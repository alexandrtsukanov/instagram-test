function Post({ author, photo, body }) {

  return (
    <div className="comp post">
      <div>
        {author}
      </div>
      <img alt="300" width="225" src={photo}/>
      <div>
        {body}
      </div>
    </div>
  );
}

export default Post;
