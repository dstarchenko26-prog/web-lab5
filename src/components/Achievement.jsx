import { useEffect, useState } from "react"
import host from "../hostAdress"
import "../styles/components/Achievement.css"


const Achievement = function(props) {
    const [status, setStatus] = useState("0%")
    let index = props.index + 1
    const [imagePath, setImagePatch] = useState(`${host}res/achievement${index}.png`)

    useEffect(() =>
    {
        let cg = countG(-2)
        if (cg > 0) {
            if (index == 1) {
                if (countG(1) > 0) {
                    setStatus("Досягнуто")
                    setImagePatch(`${host}res/achievement${index}+.png`)
                }
            } else if (index == 2) {
                if (countG(1) > 9) {
                    setStatus("Досягнуто")
                    setImagePatch(`${host}res/achievement${index}+.png`)
                } else {
                    setStatus("" + countG(1) * 10 + "%")
                }
            } else if (index == 3) {
                if (countG(1) > 99) {
                    setStatus("Досягнуто")
                    setImagePatch(`${host}res/achievement${index}+.png`)
                } else {
                    setStatus("" + countG(1) + "%")
                }
            } else {
                if (countG(-1) > 0) {
                    setStatus("Досягнуто")
                    setImagePatch(`${host}res/achievement${index}+.png`)
                }
            }
        }
    })

    function countG(c) {
        if (c == -2)
            return props.goals.length
        else {
            let count = 0
            for (let i in props.goals) {
                if (props.goals[i].s == c) {
                    count++
                }
            }
            return count
        }
    }

    return(
        <div className="achievement" id={"ach" + index}>
            <img className="achImg" src={imagePath}/>
            <div>
                <h4>{props.ach.name}</h4>
                <p>{props.ach.desc}</p>
                <p>Статус: {status}</p>
            </div>
        </div>
    )
}

export default Achievement