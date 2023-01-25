import logo from "./logo.png";
import camera_logo from "./camera-icon.png";
import torch_logo from "./torch-icon.png";
import notification from "./notification.wav";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [max, setMax] = useState(Math.floor(Math.random() * 40) + 6);
  const wordTypes = ["Pro", "Max", "Plus"];
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [words, setWords] = useState([]);
  const [date, setDate] = useState(new Date());
  const heightPx = 660;

  const playNotification = () => {
    const audio = new Audio(notification);
    audio.play();
  };

  //difference in minutes
  const diff = (date1, date2) => {
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var mins = Math.floor(diff / 1000 / 60);
    return mins;
  };

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * 2500) + 500;
    const interval = setInterval(() => {
      // console.log("interval", count, max);
      let dt = new Date();
      setDate(dt);
      if (count < max) {
        playNotification();
        const newWords = [{ word: wordTypes[Math.floor(Math.random() * wordTypes.length)], dt: dt, id: words.length }, ...words];
        setWords(newWords);
        setCount(count + 1);
      }
    }, randomTime);
    return () => clearInterval(interval);
  }, [words]);

  useEffect(() => {
    setMax(Math.floor(Math.random() * 40) + 6);
  }, []);

  return (
    <div className="App">
      <div className="side-bar">
        <h3 className="title-subtext">
          {((heightPx + (words.length - 5 > 0 ? (words.length - 5) * 60 : 0)) * (6.33 / heightPx)).toFixed(2)} inches long!
        </h3>
      </div>
      <div className="iphone" style={{ height: `${heightPx + (words.length - 5 > 0 ? (words.length - 5) * 60 : 0)}px` }}>
        <div className="glow"></div>
        <img className="apple-logo" src={logo} alt="logo" width="50px" />
        <div className="title-block">
          <h1 className="title-text">The all new iPhone 14</h1>
        </div>
        <div className="inner" id="bg">
          <div className="dynamic_island" id="d_island">
            <div className="content">
              <div className="details">
                <p className="big-actually">That's pretty big actually</p>
              </div>
            </div>
          </div>
          <div className="clock">
            <h4>
              {weekday[date.getDay()]} {date.getDate()} {months[date.getMonth()]}
            </h4>
            <h1>
              {date.getHours()}:{date.getMinutes()}
            </h1>
          </div>
          <div className="notifications">
            <h4 className="notifications-title">Notification Centre</h4>
            <ul>
              {words
                .sort((a, b) => a.id > b.id)
                .map((word, i) => (
                  <li key={`notification${i}`} className="notification">
                    <div className="notification-icon">
                      <img src={logo} alt="logo" width="30px" />
                    </div>
                    <div className="notification-details">
                      <h3 className="notification-title">Apple</h3>
                      <p className="notification-text">{word.word}</p>
                    </div>
                    <div className="notification-time">
                      <p className="notification-time-text">{diff(date, word.dt) < 1 ? "now" : `${diff(date, word.dt)}m ago`}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="icons">
            <div className="torch-icon">
              <img src={torch_logo} alt="torch" width="60px" />
            </div>
            <div className="camera-icon">
              <img src={camera_logo} alt="torch" width="60px" />
            </div>
          </div>
        </div>
        <i className="btn btn1"></i>
        <i className="btn btn2"></i>
        <i className="btn btn3"></i>
        <i className="rightButton"></i>
      </div>

      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      <script src="mainscript.js"></script>
    </div>
  );
}

export default App;
