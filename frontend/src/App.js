import { useState, useEffect} from "react";
import { login } from "./services/authService";
import { getUserDecks } from "./services/deckService";

function App() {
  const [data, setData] = useState()
  useEffect(() => {
   getUserDecks().then(res=>setData(res.data)).catch(err=>console.log(err.response))
  }, []);
  return (
    <div>
    {console.log(data)}
      hello
    </div>
  );
}

export default App;
