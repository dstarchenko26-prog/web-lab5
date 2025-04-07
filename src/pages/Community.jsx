import host from "../hostAdress"
import { useState } from "react";
import CText from "../components/CText"
import "../styles/pages/Community.css"
import { useAuth } from "../context/AuthContext";


const Community = function() {
  const [communityArray, setCommunityArray] = useState([])
  const [statusUpdate, setStatusUpdate] = useState(false)
  const [us_mess, setUs_mess] = useState("")
  const {token, user} = useAuth()

  if (!statusUpdate) {
    setStatusUpdate(true)
    getData()
  }

  async function getData() {
    const response = await fetch(host + "api/users_message")
    const data = await response.json()
    setCommunityArray(data)
  }

  async function inputCText() {
    let message = {message: us_mess, user_id: user.uid}

    try {
      const response = await fetch(host + "api/protected/users_message", 
        {method: "POST", 
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }, 
        body: JSON.stringify(message)})
      const result = await response.json()
      setStatusUpdate(false)
    } catch (e) {
      alert("Немає з'єднання з сервером")
    }
  }

  return (
    <section id="community">
      <h2>Спільнота</h2>
      <p>Тут ви можете знайти поради від інших користувачів:</p>
      <div className="ctextList">
        {communityArray.map(com => 
          <CText com={com}/>
        )}
      </div>        
      <input type="textarea" className="ctextInput" id="textInput" placeholder="Залиште своє повідомлення тут..." value={us_mess} onChange={(e) => setUs_mess(e.target.value)}/>
      <button className="ctBTN" onClick={inputCText}>Залишити повідомлення</button>
    </section>
  )
}

export default Community;