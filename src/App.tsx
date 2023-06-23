import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Home from "./pages/Home";
import Dashboard from "./components/layout/Dashboard";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import Role from "./enums/Role";
import Login from "./pages/Login";
import PersistLogin from "./components/auth/PersistLogin";
import ProfilePage from "./pages/dashboard/Profile";
import ArticlesPage from "./pages/dashboard/Articles";
import HomographsPage from "./pages/dashboard/Homographs";
import HomographDetails from "./pages/dashboard/Homograph";
import UsersPage from "./pages/dashboard/Users";
import NewspapersPage from "./pages/dashboard/Newspapers";
import NewspaperPage from "./pages/dashboard/Newspaper";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Nav />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PersistLogin />}>
              <Route element={<Dashboard />}>
                  <Route element={<RequireAuth allowedRoles={[Role.Admin, Role.Editor, Role.User]} />}>
                    <Route path="/dashboard/profile" element={<ProfilePage />} />
                  </Route>
                  <Route element={<RequireAuth allowedRoles={[Role.Admin, Role.Editor]} />}>
                    <Route path="/dashboard/newspapers" element={<NewspapersPage />} />
                    <Route path="/dashboard/newspapers/:provider" element={<NewspaperPage />} />
                    <Route path="/dashboard/articles" element={<ArticlesPage />} />
                    <Route path="/dashboard/articles/homographs" element={<HomographsPage />} />
                    <Route path="/dashboard/articles/homographs/:id" element={<HomographDetails />} />
                  </Route>
                  <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
                    <Route path="/dashboard/users" element={<UsersPage />} />
                  </Route>
              </Route>
            </Route>
          </Routes> 
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
