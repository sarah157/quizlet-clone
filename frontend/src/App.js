import { useState, useEffect} from "react";
import { login } from "./services/authService";
import { createDeck } from "./services/dataService";

function App() {
  const [data, setData] = useState()
  useEffect(() => {
    createDeck({title: "test deck"}).then(res=>setData(res.data))
  }, []);
  return (
    <div>
    {console.log(data)}
      hello
    </div>
  );
}

export default App;
