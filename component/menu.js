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

// Event handler for mouse movement on the lever element
leverElement.addEventListener("mousemove", updateRotationAngles);
