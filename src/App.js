import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { AuthProvider} from "./context/AuthContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Community from "./pages/Community"
import PrivateRoute from "./components/PrivateRoute"
import "./styles/App.css"
import LoginOrSignUp from "./pages/LoginOrSignUp"
import Profile from "./pages/Profile"
import Goals from "./pages/Goals"
import Progress from "./pages/Progress"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/goals" element={<PrivateRoute>
                  <Goals />
                </PrivateRoute>}/>
              <Route path="/progress" element={<PrivateRoute>
                  <Progress />
                </PrivateRoute>}/>
              <Route path="/community" element={<Community />}/>
              <Route path="/profile/:id" element={<PrivateRoute>
                  <Profile />
                </PrivateRoute>}/>
              <Route path="/loginOrSignUp" element={<LoginOrSignUp />}/>
            </Routes>
          </main>
          <Footer/>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;