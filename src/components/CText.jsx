import { Link } from "react-router-dom"
import "../styles/components/CText.css"

const CText = function(props) {
    return (
        <div className="ctext" id={props.com.id}>
            <div className="userIntro">
                <Link to={`/profile/${props.com.user_id}`}>{props.com.surname} {props.com.name}:</Link>
            </div>
            <p>{props.com.message}</p>
        </div>
    )
}

export default CText;