import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "./services/authService";
import Header from "./components/header/Header";
import Landing from "./pages";
import Home from "./pages/latest";
import PageNotFound from "./pages/not-found";
import CreateDeck from "./pages/deck/create";
import DeckHome from "./pages/deck/deckId";
import EditDeck from "./pages/deck/deckId/edit";
import StudyDeck from "./pages/deck/deckId/study";
import Profile from "./pages/user/username";
import UserDecks from "./pages/user/username/decks";
import UserFolders from "./pages/user/username/folders";
import Login from "./pages/login";

function App() {
  const user = getCurrentUser()
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            exact
            element={user ? <Navigate replace to="latest" /> : <Landing />}
          />
          <Route path="latest" exact element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="deck">
            <Route path="create" exact element={<CreateDeck />} />
            <Route path=":deckId" element={<DeckHome />} />
            <Route path=":deckId/edit" exact element={<EditDeck />} />
            <Route path=":deckId/study" exact element={<StudyDeck />} />
          </Route>
          <Route path="user">
            <Route path=":username" element={<Profile />}>
              <Route path="decks" element={<UserDecks />} />
              <Route path="folders" element={<UserFolders />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
