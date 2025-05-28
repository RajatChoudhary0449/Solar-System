import "./ModalWindow.css";
export default function ModalWindow(textprop, timerprop = 10) {
  setTimeout(() => {
    const modal = document.getElementById("instruction-modal");
    const closeButton = document.getElementById("close-modal");
    const timer = document.querySelector(".timer");
    const text = document.querySelector("#instruction-modal p");
    modal.style.display = "flex";
    text.innerHTML = textprop;
    timer.innerHTML = timerprop;
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
    const clearEverything = () => {
      modal.style.display = "none";
      document.body.removeEventListener("click", bodyClickHandler);
      clearInterval(id);
    };
    const bodyClickHandler = () => {
      clearEverything();
    };
    const timerHandler = () => {
      timer.innerHTML = String(Number(timer.innerHTML) - 1);
    };
    const id = setInterval(timerHandler, 1000);
    document.body.addEventListener("click", bodyClickHandler);

    setTimeout(() => {
      clearEverything();
    }, timerprop * 1000);
  }, 0);
}
