import "../styles/pages/Goals.css"
import Goal from "../components/Goal"
import { useState } from "react"
import host from "../hostAdress"
import { useAuth } from "../context/AuthContext"
import GoalForm from "../forms/GoalForm"

const Goals = function() {
  const[filter, setFilter] = useState(-2)
  const[sort, setSort] = useState(-1)
  const [goalsArray, setGoalsArray] = useState([])
  const [statusUpdate, setStatusUpdate] = useState(false)
  const {token} = useAuth()
  const {user} = useAuth()

  function openForm() {
    document.getElementById("goalForm").style.display = "block";
  }

  function closeForm() {
    document.getElementById("goalForm").style.display = "none";
  }

  window.onclick = function(event) {
    let form = document.getElementById("goalForm");
    if (event.target === form) {
      closeForm();
    }
  }

  if (!statusUpdate) {
    setStatusUpdate(true)
    getData()
  }

  async function getData() {
    try {
      const response = await fetch(`${host}api/protected/goals?id=${user.uid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      let correctData = []
      for (let i in data) {
        let s = statusControl(data[i])
        let status = 
          s == -1 ? "Прострочено" :
          s == 0 ? "Виконується" :
          "Досягнуто"
        const goal = {id: data[i].id, name: data[i].name, date: s == 1? data[i].finishDate : data[i].deadline, s: s, status: status}
        correctData.push(goal)
      }
      setGoalsArray(correctData)
    } catch (e) {
      alert(e)
    }
  }

  function statusControl(goal) {
    if (goal.finishDate) {
      return 1
    } else {
      let today = new Date().toISOString().split('T')[0];
      if (goal.deadline >= today) {
        return 0
      } else {
        return -1
      }
    }
  }

  function filterEvent(event) {
    setFilter(event.target.value)
  }

  function sortEvent(event) {
    setSort(event.target.value)
  }

  return (
  <section id="goals">
    <GoalForm update={setStatusUpdate}/>
    <h2>Мої цілі</h2>
    <div className="goalNavigation">
      <p>Тут ви можете побачити свої цілі:</p>
      <div class="panelSelect">
        <div id ="goalFilter">
          <label for="goalFilter" id="goalFilterLabel">Фільтрування: </label>
          <select id="goalFilterSelect" name="Filter" onChange={filterEvent}>
            <option value={-2}>Всі</option>
            <option value={0}>Виконуються</option>
            <option value={1}>Досягнуті</option>
            <option value={-1}>Прострочені</option>
          </select>
        </div>
        <div id ="goalSort">
          <label for="goalSort" id="goalSort">Сортування: </label>
          <select id="goalSortSelect" name="Sort" onChange={sortEvent}>
            <option value={-1}>Спочатку старіші</option>
            <option value={1}>Спочатку новіші</option>
          </select>
        </div>
      </div>
    </div>
    <div className="goalList">
      {goalsArray.filter(goal => goal.s == filter || filter == -2).sort((a, b) => a.date < b.date? sort: -sort).map((goal) =>
        <Goal goal={goal} update={setStatusUpdate}/>
      )}
      <div className="goal"><button id = "addButton" className = "addButton" onClick={openForm}><img src={`${host}res/add.png`}></img></button></div>
    </div>
  </section>
  )
}

export default Goals;