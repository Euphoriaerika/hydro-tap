// Get references to HTML elements
const lever = document.getElementById("lever");
const leftComm = document.getElementById("left-comm");
const rightComm = document.getElementById("right-comm");

// Variables to track dragging state and initial angle
let isDragging = false;
let initialAngle = 0;
let center, rect;

// Event listener for mouse down on the lever
lever.addEventListener("mousedown", (e) => {
  // Set dragging state to true
  isDragging = true;

  // Get the lever's bounding rectangle and its center
  rect = lever.getBoundingClientRect();
  center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };

  // Calculate the initial angle based on mouse position
  initialAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x);

  // Get the current rotation angle when pressed
  const style = window.getComputedStyle(lever);
  const transform = style.getPropertyValue("transform");
  const matrix = new DOMMatrix(transform);
  initialAngle -= Math.atan2(matrix.b, matrix.a);
});

// Event listener for mouse move on the document
document.addEventListener("mousemove", (e) => {
  // Check if the lever is being dragged
  if (isDragging) {
    // Calculate the current angle based on mouse position
    const angle = Math.atan2(e.clientY - center.y, e.clientX - center.x);

    // Calculate the rotation angle and adjust for the desired orientation
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

    // Calculate rotation angles for left and right components
    const leftCommRotation = (rotation + Math.PI / 2) / 2;
    const rightCommRotation = (rotation - Math.PI / 2) / 2;

    // Apply transformations to elements based on the calculated angles
    lever.style.transform = `rotate(${rotation}rad)`;
    leftComm.style.transform = `rotate(${leftCommRotation}rad)`;
    rightComm.style.transform = `rotate(${rightCommRotation}rad)`;
  }
});

// Event listener for mouse up on the document
document.addEventListener("mouseup", () => {
  // Set dragging state to false when the mouse is released
  isDragging = false;
});
