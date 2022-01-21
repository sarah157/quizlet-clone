import axios from "axios"
import { useState, useEffect} from "react";

function App() {
  const [data, setData] = useState()
  useEffect(() => {
    axios.get("http://localhost:3005/decks/?username=sarora").then(res=>setData(res.data))
  }, []);
  return (
    <div>
{    console.log(data)
}      hello</div>
  );
}

export default App;
