import "../styles/components/Goal.css"

import { useAuth } from "../context/AuthContext"
import host from "../hostAdress"

const Goal = function(props) {
    const {user} = useAuth()
    const {token} = useAuth()

    let goal = props.goal

    async function doneEvent(event) {
        if (goal.s == 0) {
        let data = {user_id: user.uid, goal_id: goal.id, finishDate: new Date().toISOString().split('T')[0]}
        try {
            const response = await fetch(host + "api/protected/doneGoal", 
                {method: "POST", 
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }, 
                body: JSON.stringify(data)})
            const result = await response.json()
        } catch (e) {
            alert("Немає з'єднання з сервером")
        }

        props.update(false)
    }
    }

    async function crossEvent(event) {
        let data = {user_id: user.uid, goal_id: goal.id}
        try {
            const response = await fetch(host + "api/protected/remoteGoal", 
                {method: "DELETE", 
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }, 
                body: JSON.stringify(data)})
            const result = await response.json()
        } catch (e) {
            alert("Немає з'єднання з сервером")
        }

        props.update(false)
    }

    return(
        <div id={"g" + goal.id} className="goal">
            <p>Ціль: {goal.name}</p>
            {goal.s == 1? (<p>Виконано: {goal.date}</p>) :
            goal.s == 0? (<p>Дедлайн: {goal.date}</p>) :
            (<p>Прострочено: {goal.date}</p>)
            }
            <p>Cтатус: {goal.status}</p>
            <div className="buttonLine">
                <button id={"g" + goal.id + "d"} className="gButton" onClick = {doneEvent}>
                    <img id={"gd" + goal.id + "i"} className="btnImg" src={`${host}res/done.png`}/>
                </button>
                <button id={"g" + goal.id + "c"} className="gButton" onClick = {crossEvent}>
                    <img id={"gc" + goal.id + "i"} className="btnImg" src={`${host}res/cross.png`}/>
                </button>
            </div>
        </div>
    )
}

export default Goal