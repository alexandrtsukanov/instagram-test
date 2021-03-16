import { useState, useEffect } from 'react'

function CreatePost() {

  const [list, setList] = useState('')

  const getData = async() => {
    const result = await fetch('http://localhost:8080/about');
    const finalResult = await result.text()    
    console.log(finalResult)
    setList(finalResult)
    console.log(list)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="comp">
      <h3>About</h3>
      {list}
      {/* <button>GET</button> */}
    </div>
  );
}

export default CreatePost;
