import "./App.css";
import { useState , useEffect } from "react";
import axios from "axios";
function App() {

  const [file, setFile] = useState();
  const [user, setUser] = useState();
  const [users , setUsers] = useState([]);
  const HandleForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", user);
    axios
      .post("http://localhost:3001/api/upload",formData)
      .then((res) => {
        console.log("uplode");
        console.log(res.data);
      })
      .catch((er) => console.log(er));
  };
  useEffect(()=>{
    const req = async ()=>{
      await axios.get("http://localhost:3001/api/get")
      .then((res)=>{
        setUsers(res.data.msg);
      })
      .catch(er=>console.log(er))
    };
    req();
  },[])

  return (
    <>
      <div>
        <form onSubmit={HandleForm}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter your username"
        />
        <button>Upload</button>
      </form>
      
      <hr /><hr />
      <div>
        {
          users.map((user) => {
            return (
              <div key={user._id}>
                <img src={`../public/${user.img}`} width="200" alt="img" />
                <p>{user.user}</p>
              </div>
            );
          })
        }
      </div>
     
      </div>
    </>
  );
}

export default App;
