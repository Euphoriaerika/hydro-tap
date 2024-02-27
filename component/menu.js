// Get references to HTML elements
const leverElement = document.getElementById("lever");
const leftCommElement = document.getElementById("left-comm");
const rightCommElement = document.getElementById("right-comm");

// Function to retrieve the rotation angle from the transformation matrix
const getRotationAngle = (element) => {
  let style = window.getComputedStyle(element);
  let matrix = new DOMMatrix(style.transform);
  return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
};

const angle2Temp = (angle) => {
  return -(angle / 90) * 45 + 45;
};

const createMenuIndicator = (count) => {
  // Select the container element with the class "stat"
  var statContainer = document.querySelector(".stat");

  // Check if there are existing <li> elements, create them if not
  if (!statContainer.querySelector("li")) {
    for (var i = 0; i < count; i++) {
      var liElement = document.createElement("li");
      statContainer.appendChild(liElement);
    }
  }
};

// Event handler for mouse movement
const updateMenuIndicator = () => {
  // Changed to select all <li> elements with the class "stat"
  var menuItems = document.querySelectorAll(".stat li");

  // Update values for each <li> element with the class "stat"
  menuItems[0].textContent =
    "Lever angle: " + getRotationAngle(leverElement) + " degrees";
  menuItems[1].textContent =
    "Temperature: " + (-(getRotationAngle(leverElement) / 90) * 45 + 45) + " C";
  menuItems[2].textContent =
    "LeftComm angle: " + getRotationAngle(leftCommElement) + " degrees";
  menuItems[3].textContent =
    "RightComm angle: " + getRotationAngle(rightCommElement) + " degrees";
};

// Call the function to set initial values
createMenuIndicator(4);
updateMenuIndicator();

//--- UPDATE INDICATOR, WHEN MOUSEMOVE ---//

// Variable to track whether the mouse button is currently pressed
var isMouseDown = false;

// Event handler function for mouse movement
const mouseMoveHandler = () => {
  if (isMouseDown) {
    updateMenuIndicator();
  }
};

// Event handler function for mouse release
const mouseUpHandler = () => {
  if (isMouseDown) {
    isMouseDown = false;

    // Remove event listeners at the document level for mouse movement and release
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  }
};

// Adding event handlers
leverElement.addEventListener("mousedown", () => {
  isMouseDown = true;
  updateMenuIndicator();

  // Add event listeners at the document level for mouse movement and release
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
});