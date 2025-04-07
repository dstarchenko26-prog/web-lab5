 import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import host from "../hostAdress"
import "../styles/forms/GoalForm.css"

const GoalForm = function(props) {
   const [name, setName] = useState("")
   const [deadline, setDeadline] = useState("")   
    const { token } = useAuth()
    const { user } = useAuth()

    async function submit(event) {
        event.preventDefault();
    
        let newGoal = {
            user_id: user.uid,
            name: name,
            deadline: deadline,
        };
    
        try {
            const response = await fetch(host + "api/protected/addGoal", 
                {method: "POST", 
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }, 
                body: JSON.stringify(newGoal)})
            const result = await response.json()
        } catch (e) {
            alert("Немає з'єднання з сервером")
        }

        setName("")
        setDeadline("")
        closeForm()
        props.update(false)
    };
    
    function closeForm() {
        document.getElementById("goalForm").style.display = "none";
    }

    return(
        <div id="goalForm" className="gf1">
            <div className="gform-content">
                <span className="gclose" onClick={closeForm}>&times;</span>
                <h2>Додавання цілі</h2>
                <form id="gf1" onSubmit={submit}>
                    <label for="goalName">Назва цілі: </label>
                    <input type="goalName" id="goalName" name="goalName" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <hr></hr>
                  
                    <label for="deadline">Дедлайн: </label>
                    <input type="date" id="deadline" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required/>
                    <hr></hr>
                    <button type="submit" className="sumbit">Додати</button>
                </form>
            </div>
        </div>
    )
}

export default GoalForm;