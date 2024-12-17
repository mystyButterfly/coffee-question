import { useEffect, useRef } from "react";
import "../App.css";

interface PropsType {
  isOpen: boolean;
  level: number;
  question: string;
  handleYes: () => void;
  handleNo: () => void;
}

function Modal({ isOpen, level, question, handleYes, handleNo }: PropsType) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const initialX = useRef(0);
  const initialY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      card.addEventListener("mousedown", mouseDown);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousedown", mouseDown);
      }
    };
  }, [isOpen]);

  function mouseDown(e: MouseEvent) {
    startX.current = e.clientX;
    startY.current = e.clientY;
    initialX.current = cardRef.current?.offsetLeft || 0;
    initialY.current = cardRef.current?.offsetTop || 0;
    isDragging.current = true;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(e: MouseEvent) {
    if (!isDragging.current) return;

    const newX = initialX.current + (e.clientX - startX.current);
    const newY = initialY.current + (e.clientY - startY.current);

    if (cardRef.current) {
      cardRef.current.style.left = newX + "px";
      cardRef.current.style.top = newY + "px";
    }
  }

  function mouseUp() {
    isDragging.current = false;
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }

  if (!isOpen) return null;
  return (
    <div
      className="modal-content"
      ref={cardRef}
      style={{ transform: `translateY(${level * 20}px)` }}
    >
      <p>Level of modal: {level}</p>
      <h2>{question}</h2>
      <div>
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
    </div>
  );
}

export default Modal;
