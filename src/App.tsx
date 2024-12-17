import { useState } from "react";
import Modal from "./components/Modal";


function App() {
  const closeAllModal = [false, false, false];
  const [isOpen, setIsopen] = useState<boolean[]>(closeAllModal);
  function handleNo(): void {
    alert("We are sorry! That kinds of coffee is not exist");
    setIsopen(closeAllModal);
  }
  function handleYes(l: number): void {
    const tempArray = [...isOpen];
    tempArray[l] = true;
    setIsopen(tempArray);
  }
  function final(): void {
    alert("Congratulation!!! This is yorr big coffee with sugar and milk!!!");
    setIsopen(closeAllModal);
  }

  return (
    <div style={{height: "100vh" }} className="center">
      <div className="center">
        <h2>Do you want coffee?</h2>
        <div>
          <button onClick={() => handleYes(0)}>Yes</button>
          <button onClick={() => alert("Why do you here?")}>No</button>
        </div>
      </div>

      <Modal
        isOpen={isOpen[0]}
        level={0}
        question={"Do you want big coffee?"}
        handleYes={() => handleYes(1)}
        handleNo={() => handleNo()}
      />
      <Modal
        isOpen={isOpen[1]}
        level={1}
        question={"With extra white sugar from west india?"}
        handleYes={() => handleYes(2)}
        handleNo={() => handleNo()}
      />
      <Modal
        isOpen={isOpen[2]}
        level={2}
        question={"With milk?"}
        handleYes={() => final()}
        handleNo={() => handleNo()}
      />
    </div>
  );
}

export default App;
