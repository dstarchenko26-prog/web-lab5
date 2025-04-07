import { Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useLayoutEffect } from "react";
import "../styles/components/Header.css"

export default function Header() {
  const { user } = useAuth();
  const [description, setDescription] = useState("")
  const [sizeHeader, setSizeHeader] = useState("0px")
  const [user_id, setUser_id] = useState("null")

  window.addEventListener("resize", resizeHeader);

  function resizeHeader() {
    setSizeHeader("" + (document.getElementsByTagName("header")[0].clientHeight * 1.01) + "px")
  }

  useEffect(() => {
    document.getElementsByTagName("main")[0].style.paddingTop = sizeHeader
  }, [sizeHeader]);

  useLayoutEffect(() => {
    resizeHeader()
    let items = document.querySelectorAll(".menu-item");
    items.forEach(item => {
      item.addEventListener("mouseover", function() {
        setDescription(this.dataset.desc);
      });

      item.addEventListener("mouseout", function() {
        setDescription("");
      });
    });
  });

  useEffect(() => {
    if (user) {
      setUser_id(user.uid)
    }
  }, [user])

  return (
    <header onResize={resizeHeader}>
	    <h1>Менеджер з досягнення цілей</h1>
      <nav>
        <ul>
          <li><Link to="/web-lab5/" className="menu-item" data-desc="Переміщає вас до головної сторінки">Головна</Link></li>
          <li><Link to="/web-lab5/goals" className="menu-item" data-desc="Переміщає вас до сторінки з вашими цілями">Мої цілі</Link></li>
          <li><Link to="/web-lab5/progress" className="menu-item" data-desc="Відображає ваші досягнення">Прогрес</Link></li>
          <li><Link to="/web-lab5/community" className="menu-item" data-desc="Переміщає вас до спільноти">Спільнота</Link></li>
          <li><Link to={`/web-lab5/profile/${user_id}`} className="menu-item" data-desc="Показує ваш профіль">Профіль</Link></li>
        </ul>
        <p id="description" className="desc">{description}</p>
      </nav>
    </header>
  );
}