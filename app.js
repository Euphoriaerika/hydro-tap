const lever = document.getElementById("lever");
const leftComm = document.getElementById("left-comm");
const rightComm = document.getElementById("right-comm");

let isDragging = false;
let initialAngle = 0;
let center, rect;

lever.addEventListener("mousedown", (e) => {
  isDragging = true;

  rect = lever.getBoundingClientRect();
  center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };

  initialAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x);

  // Отримуємо поточний кут обертання при натисканні
  const style = window.getComputedStyle(lever);
  const transform = style.getPropertyValue("transform");
  const matrix = new DOMMatrix(transform);
  initialAngle -= Math.atan2(matrix.b, matrix.a);
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);

    let rotation = angle - initialAngle;

    rotation += (Math.PI * 3) / 2;
    rotation = rotation % (2 * Math.PI);
    rotation =
      rotation < Math.PI / 2
        ? 2 * Math.PI
        : rotation > Math.PI
        ? rotation
        : Math.PI;
    rotation -= (Math.PI * 3) / 2;
    leftCommRotation = (rotation + Math.PI / 2) / 2;
    rightCommRotation = (rotation - Math.PI / 2) / 2;

    lever.style.transform = `rotate(${rotation}rad)`;
    leftComm.style.transform = `rotate(${leftCommRotation}rad)`;
    rightComm.style.transform = `rotate(${rightCommRotation}rad)`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
