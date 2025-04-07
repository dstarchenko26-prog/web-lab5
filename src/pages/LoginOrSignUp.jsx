import { useEffect } from "react"
import LoginForm from "../forms/LoginForm"
import SignUpForm from "../forms/SignUpForm"
import "../styles/pages/LoginOrSignUp.css"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const LoginOrSignUp = function() {
    const navigate = useNavigate()
    const {user} = useAuth()

    useEffect (() => {
      if (user) {
        navigate("/")
      }  
    })

    function openLogForm() {
        document.getElementById("lf1").style.display = "block";
      }
    
    function closeLogForm() {
        document.getElementById("lf1").style.display = "none";
      }
    
    window.onclick = function(event) {
        let form = document.getElementById("lf1");
        if (event.target === form) {
          closeLogForm();
        }
      }

    function openRegForm() {
        document.getElementById("suf1").style.display = "block";
      }
    
    function closeRegForm() {
        document.getElementById("suf1").style.display = "none";
      }
    
    window.onclick = function(event) {
        let form = document.getElementById("suf1");
        if (event.target === form) {
          closeRegForm();
        }
      }

    return (
        <section id="login">
            <LoginForm/>
            <SignUpForm/>
            <div className="chLogPage">
                <button className="LogBtn" id="btnLog" onClick={openLogForm}>Увійти</button>
                <button className="LogBtn" id="btnReg" onClick={openRegForm}>Зареєструватися</button>
            </div>
        </section>
    )
}

export default LoginOrSignUp