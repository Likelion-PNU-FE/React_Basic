import {useState} from "react";

export default function Counter() {
  const [num, setNum] = useState(0);

  const clickButton = (event) => {
    if (event.target.className === "button-minus") {
      setNum(num - 1);
      console.log(num);
    } else if (event.target.className === "button-plus") {
      setNum(num + 1);
    }
  };

  return (
    <div className="counter">
      <button className="button-minus" onClick={clickButton}>
        -
      </button>
      <div>{num}</div>
      <button className="button-plus" onClick={clickButton}>
        +
      </button>
    </div>
  );
}
