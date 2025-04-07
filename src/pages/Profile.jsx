import host from "../hostAdress"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/pages/Profile.css"
import ProfileRedactForm from "../forms/ProfileRedactForm"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

const Profile = function() {
    const [userD, setUserD] = useState("")
    const [statusUpdate, setStatusUpdate] = useState(false)
    const { id } = useParams()
    const { token } = useAuth()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [uid, setUid] = useState("null")
    
    useEffect (() => {
        if (user) {
            setUid(user.uid)
        }
    }, [user])

    useEffect (() => {
        getData()
    }, [id])

    if (!statusUpdate) {
        setStatusUpdate(true)
        getData()
    }

    async function getData() {
        try {
            const response = await fetch(`${host}api/protected/profile?id=${id}`, {headers: {
                Authorization: `Bearer ${token}`
            }})
            const data = await response.json()
            setUserD(data)
        } catch (error) {
            alert(error)
        }
    }

    async function handleOut() {
        await signOut(auth)
        navigate("/web-lab5/")
    }

    function openRedactForm() {
        document.getElementById("prf1").style.display = "block";
      }
    
    function closeRedactForm() {
        document.getElementById("prf1").style.display = "none";
      }
    
    window.onclick = function(event) {
        let form = document.getElementById("lf1");
        if (event.target === form) {
          closeRedactForm();
        }
      }

    return(
        <section id="profile">
            <ProfileRedactForm user={userD} user_id={id} update={setStatusUpdate}/>
            <div id="card">
                <h2>Профіль користувача:</h2>
                <p>Ім'я: {userD.name}</p>
                <p>Прізвище: {userD.surname}</p>
                <p>Вік: {userD.age}</p>
                <p>Email: {userD.email}</p>
                <p>Досягнуто цілей: {userD.countDG}</p>
                {id == uid ? (
                    <div className="prButtons">
                        <button onClick={openRedactForm}>Редагувати</button>
                    <   button onClick={handleOut}>Вийти</button>
                    </div>
                ): (<></>)}
            </div>
        </section>
    ) 
}  

export default Profile