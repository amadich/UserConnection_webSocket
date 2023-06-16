import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");
function App() {
  const [nb , setNb] = useState(0);
  useEffect(() => {
    socket.on("here" , (response) => {
      setNb(response);
    })
  }, [socket])
  return ( 
    <>
      <h1>Connected : {nb}</h1>
    </>
   );
}

export default App;