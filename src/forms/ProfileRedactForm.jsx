import { useState } from "react";
import { useNavigate } from "react-router-dom";
import host from "../hostAdress"
import { useAuth } from "../context/AuthContext"
import "../styles/forms/ProfileRedactForm.css"


 export default function ProfileRedactForm(props) {
    const [name, setName] = useState(props.user.name)
    const [surname, setSurname] = useState(props.user.surname)
    const [age, setAge] = useState(props.user.age)
    const { token } = useAuth()
    const navigate = useNavigate()

    const handleSignUp = async(e) => {
        e.preventDefault();
        const user = {user_id: props.user_id, name: name, surname: surname, age: age, email: props.user.email}
        try {
            const response = await fetch(host + "api/protected/redactProfile", 
                {method: "POST", 
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }, 
                body: JSON.stringify(user)})
            const result = await response.json()
            if (response.ok) {
                navigate(`/profile/${props.user_id}`)
            } else {
                alert("!!!")
            }
        } catch (e) {
            alert("Немає з'єднання з сервером")
        }
        closeRedactForm()
        props.update()
    }

    function closeRedactForm() {
        document.getElementById("prf1").style.display = "none";
    }

    return (
        <div className="ProfileRedactForm" id="prf1">
            <div className="prf-content">
                <span className="prf-close" onClick={closeRedactForm}>&times;</span>
                <h2>Редагування профілю</h2>
                <form id="prfc1" onSubmit={handleSignUp}>
                    <div className="prf-pd">
                        <input type="name" placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} required/>
                        <input type="surname" placeholder="Прізвище" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                        <input type="age" placeholder="Вік" value={age} onChange={(e) => setAge(e.target.value)} required/>
                    </div>
                    <br></br>
                    <button type="submit">Редагувати</button>
                </form>
            </div>
        </div>
    )
}