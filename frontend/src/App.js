import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "./services/authService";
import Header from "./components/header/Header";
import Landing from "./pages";
import Home from "./pages/latest";
import PageNotFound from "./pages/not-found";
import CreateSet from "./pages/set/create";
import SetHome from "./pages/set/setId";
import EditSet from "./pages/set/setId/edit";
import StudySet from "./pages/set/setId/study";
import Profile from "./pages/user/username";
import UserSets from "./pages/user/username/sets";
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
          <Route path="set">
            <Route path="create" exact element={<CreateSet />} />
            <Route path=":setId" element={<SetHome />} />
            <Route path=":setId/edit" exact element={<EditSet />} />
            <Route path=":setId/study" exact element={<StudySet />} />
          </Route>
          <Route path="user">
            <Route path=":username" element={<Profile />}>
              <Route path="sets" element={<UserSets />} />
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
