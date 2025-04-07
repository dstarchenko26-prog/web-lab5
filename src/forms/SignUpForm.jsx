import { useState } from "react";
import { useNavigate } from "react-router-dom";
import host from "../hostAdress"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/forms/SignUpForm.css"


export default function SignUpForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [age, setAge] = useState("")
    const navigate = useNavigate()

    const handleSignUp = async(e) => {
        e.preventDefault();
        const user = {email: email, password: password, name: name, surname: surname, age: age}
        try {
            const response = await fetch(host + "api/reg", {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(user)})
            const result = await response.json()

            if (response.ok) {
                await signInWithEmailAndPassword(auth, email, password)
                navigate(`/profile/${result.uid}`)
            } else {
                alert("Ви вже зареєстровані")
            }
        } catch (e) {
            alert("Немає з'єднання з сервером")
        }
        closeRegForm()
    }

    function closeRegForm() {
        document.getElementById("suf1").style.display = "none";
      }

    return (
        <div className="SignUpForm" id="suf1">
            <div className="suf-content">
                <span className="suf-close" onClick={closeRegForm}>&times;</span>
                <h2>Реєстрація</h2>
                <form id="sufc1" onSubmit={handleSignUp}>
                    <div className="suf-lp">
                        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <br></br>
                    <div className="suf-pd">
                        <input type="name" placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} required/>
                        <input type="surname" placeholder="Прізвище" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                        <input type="age" placeholder="Вік" value={age} onChange={(e) => setAge(e.target.value)} required/>
                    </div>
                    <br></br>
                    <button type="submit">Зареєструватися</button>
                </form>
            </div>
        </div>
    )
}