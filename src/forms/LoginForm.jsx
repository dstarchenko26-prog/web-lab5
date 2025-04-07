// import { useState } from "react";
// import "../../styles/goals/GoalForm.css"

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/forms/LoginForm.css"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function closeLogForm() {
    document.getElementById("lf1").style.display = "none";
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const i = await signInWithEmailAndPassword(auth, email, password);
      navigate(`/web-lab5/profile/${i.user.uid}`);
    } catch (error) {
      alert("Помилка: " + error.message);
    }
  };

  return (
    <div className="LoginForm" id = "lf1">
      <div className="lf-content">
        <span className="lf-close" onClick={closeLogForm}>&times;</span>
        <h2>Вхід</h2>
        <form className="lfc1" onSubmit={handleLogin}>
          <div className="lf-lp">
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <button type="submit">Увійти</button>
        </form>
      </div>
    </div>
  );
}



// const GoalForm = function({create}) {
//     const [goal, setGoal] = useState({name: "", deadline: "", s: "", status: ""})

//     function closeForm() {
//         document.getElementById("goalForm").style.display = "none";
//     }

//     function submit(event) {
//         event.preventDefault();
    
//         let gN = document.getElementById("goalName").value;
//         let dL = document.getElementById("deadline").value;
    
//         let newGoal = {
//             name: gN,
//             deadline: dL,
//             s: setStatus(dL),
//             status: setStatus(dL) == 0 ? "виконується" : "прострочено"
//         };
    
//         create(newGoal)
//         setGoal(newGoal)
//         document.getElementById("f1").reset();
//         closeForm()
//     };
    
//     function setStatus(dL){
//         let today = new Date().toISOString().split('T')[0];
//         if (dL >= today)
//             return 0;
//         else
//             return -1;
//     }

//     return(
//         <div id="goalForm" className="form1">
//             <div className="form-content">
//                 <span className="close" onClick={closeForm}>&times;</span>
//                 <h2>Додавання цілі</h2>
//                 <form id="f1" onSubmit={submit}>
//                     <label for="goalName">Назва цілі: </label>
//                     <input type="goalName" id="goalName" name="goalName" required/>
//                     <hr></hr>
                  
//                     <label for="deadline">Дедлайн: </label>
//                     <input type="date" id="deadline" name="deadline" required/>
//                     <hr></hr>
//                     <button type="submit" className="sumbit">Додати</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default GoalForm;