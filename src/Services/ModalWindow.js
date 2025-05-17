import "./ModalWindow.css";
export default function ModalWindow() {
  setTimeout(() => {
    const modal = document.getElementById("instruction-modal");
    const closeButton = document.getElementById("close-modal");
    const timer = document.querySelector(".timer");
    modal.style.display = "flex";

    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
    const bodyClickHandler = () => {
      modal.style.display = "none";
    };
    const timerHandler = () => {
      timer.innerHTML = String(Number(timer.innerHTML) - 1);
    };
    const id = setInterval(timerHandler, 1000);
    document.body.addEventListener("click", bodyClickHandler);

    setTimeout(() => {
      modal.style.display = "none";
      document.body.removeEventListener("click", bodyClickHandler);
      clearInterval(id);
    }, 10000);
  }, 0);
}
