// Function to retrieve the rotation angle from the transformation matrix
const getRotationAngle = (element) => {
  var style = window.getComputedStyle(element);
  var matrix = new DOMMatrix(style.transform);
  return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
};

// Get references to HTML elements
const leverElement = document.getElementById("lever");
const leftCommElement = document.getElementById("left-comm");
const rightCommElement = document.getElementById("right-comm");

// Event handler for mouse movement
const updateRotationAngles = () => {
  // Select the container element with the class "stat"
  var statContainer = document.querySelector(".stat");

  // Check if there are existing <li> elements, create them if not
  if (!statContainer.querySelector("li")) {
    for (var i = 0; i < 4; i++) {
      var liElement = document.createElement("li");
      statContainer.appendChild(liElement);
    }
  }

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
updateRotationAngles();

// Variable to track whether the mouse button is currently pressed
var isMouseDown = false;

// Event handler function for mouse movement
const mouseMoveHandler = (event) => {
  if (isMouseDown) {
    updateRotationAngles(event);
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
leverElement.addEventListener("mousedown", function (event) {
  isMouseDown = true;
  updateRotationAngles(event);

  // Add event listeners at the document level for mouse movement and release
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
});

// Опрацьовуйте подію click на кнопці
document.getElementById("updateButton").addEventListener("click", function () {
  // Викликайте функцію updateTemperature при натисканні на кнопку
  let temp = -(getRotationAngle(leverElement) / 90) * 45 + 45;
  updateTemperature(temp); // Замініть 25 на потрібне значення температури
});

const updateIndicators = (addAngle) => {
  let lever = document.getElementById("lever");
  let angle = getRotationAngle(lever) + addAngle;
  console.log(angle);
  lever.style.transform = `rotate(${angle}deg)`;
};

function updateTemperature(temperature) {
  fetch("http://127.0.0.1:5000/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ temperature: temperature }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      // Оновлюй індикатори на екрані з отриманими даними
      updateIndicators(data.angle);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
