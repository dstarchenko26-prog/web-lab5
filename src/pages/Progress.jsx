import { useEffect, useState } from "react"
import Achievement from "../components/Achievement"
import host from "../hostAdress"
import { useAuth } from "../context/AuthContext"
import "../styles/pages/Progress.css"

const Progress = function() {
  let achievements = [
    {name: "Перші кроки!", desc: "Досягнути першу ціль"},
    {name: "Вперед до досягнень!", desc: "Досягнути 10 цілей"},
    {name: "Вас не спинити!", desc: "Досягнути 100 цілей"},
    {name: "Сонько!", desc: "Прострочити 1 ціль"}
  ]
  const [done, setDone] = useState(0)
  const [cross, setCross] = useState(0)
  const [process, setProcess] = useState(0)
  const [goalsArray, setGoalsArray] = useState([])
  const [statusUpdate, setStatusUpdate] = useState(false)
  const {token, user} = useAuth()

  useEffect(() => {
    let cg = countG(-2)
    let cdg = countG(1)
    let ccg = countG(-1)
    let cpg = countG(0)
    if (cg > 0) {
      setDone("" + cdg + " (" + (cdg * 100 / cg).toFixed(2) + "%)")
      setCross("" + ccg + " (" + (ccg * 100 / cg).toFixed(2) + "%)")
      setProcess("" + cpg + " (" + (cpg * 100 / cg).toFixed(2) + "%)")
    }
  })

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
        const goal = {s: s}
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

  function countG(c) {
    if (c == -2)
      return goalsArray.length
    else {
      let count = 0
      for (let i in goalsArray) {
        if (goalsArray[i].s == c) {
          count++
        }
      }
      return count
    }
  }

  return (
    <section id="progress">
      <h2>Прогрес</h2>
      <h3>Ваші досягнення:</h3>
      <div className="achievements">
        {achievements.map((ach, index) =>
          <Achievement goals={goalsArray} index={index} ach={ach}/>
        )}
      </div>
      <h3>Статистика цілей:</h3>
      <div className="statistics">
        <p id="st5">Досягнуто - {done}</p>
        <p id="st6">Прострочено - {cross}</p>
        <p id="st7">В процесі - {process}</p>
      </div>
    </section>
  )
}

export default Progress;