// Get references to HTML elements
const leverElement = document.getElementById("lever");
const leftCommElement = document.getElementById("left-comm");
const rightCommElement = document.getElementById("right-comm");

// Changed to select all <li> elements with the class "stat"
var menuItems = document.querySelectorAll(".stat li");

// Function to retrieve the rotation angle from the transformation matrix
function getRotationAngle(element) {
  var style = window.getComputedStyle(element);
  var matrix = new DOMMatrix(style.transform);
  return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
}

// Event handler for mouse movement
function updateRotationAngles() {
  // Get rotation angles for lever, leftComm, and rightComm elements
  var rotationAngle = getRotationAngle(leverElement);
  var leftRotationAngle = getRotationAngle(leftCommElement);
  var rightRotationAngle = getRotationAngle(rightCommElement);

  // Update values for each <li> element with the class "stat"
  menuItems[0].textContent = "Lever angle: " + rotationAngle + " degrees";
  menuItems[1].textContent =
    "Temperature: " + (-(rotationAngle / 90) * 36 + 36) + " C";
  menuItems[2].textContent =
    "LeftComm angle: " + leftRotationAngle + " degrees";
  menuItems[3].textContent =
    "RightComm angle: " + rightRotationAngle + " degrees";
}

// Call the function to set initial values
updateRotationAngles();


// Variable to track whether the mouse button is currently pressed
var isMouseDown = false;

// Adding event handlers
leverElement.addEventListener("mousedown", function (event) {
  isMouseDown = true;
  updateRotationAngles(event);

  // Add event listeners at the document level for mouse movement and release
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
});

// Event handler function for mouse movement
function mouseMoveHandler(event) {
  if (isMouseDown) {
    updateRotationAngles(event);
  }
}

// Event handler function for mouse release
function mouseUpHandler() {
  if (isMouseDown) {
    isMouseDown = false;

    // Remove event listeners at the document level for mouse movement and release
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  }
}
