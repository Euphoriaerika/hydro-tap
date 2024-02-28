// Get references to HTML elements
const leverElement = document.getElementById("lever");
const leftCommElement = document.getElementById("left-comm");
const rightCommElement = document.getElementById("right-comm");

// Function to retrieve the rotation angle from the transformation matrix
const getRotationAngle = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrix(style.transform);
  return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
};

// Function to convert angle to temperature
const angle2Temp = (angle) => -(angle / 90) * 45 + 45;

// Function to create a menu element with a specified class
const createMenuElement = (className) => {
  const element = document.createElement("p");
  element.className = className;
  return element;
};

// Function to create menu indicators based on the given count
const createMenuIndicator = (count) => {
  const statContainer = document.querySelector(".stat");

  // Check if there are existing <li> elements, create them if not
  if (!statContainer.querySelector("li")) {
    for (let i = 0; i < count; i++) {
      const liElement = document.createElement("li");
      statContainer.appendChild(liElement);

      // Create <p> element for title
      liElement.appendChild(createMenuElement("menu-el-title"));

      // Create <p> element for date
      liElement.appendChild(createMenuElement("menu-el-data"));
    }
  }
};

// Function to update menu indicators with relevant data
const updateMenuIndicator = () => {
  const menuTitles = document.querySelectorAll(".stat li .menu-el-title");
  const menuData = document.querySelectorAll(".stat li .menu-el-data");

  const menuEl = {
    "Lever angle: ": getRotationAngle(leverElement) + " degrees",
    "Temperature: ": angle2Temp(getRotationAngle(leverElement)) + " C",
    "LeftComm angle: ": getRotationAngle(leftCommElement) + " degrees",
    "RightComm angle: ": getRotationAngle(rightCommElement) + " degrees",
  };

  // Iterate through menuEl and update titles and data
  let count = 0;
  for (const key in menuEl) {
    menuTitles[count].textContent = key;
    menuData[count].textContent = menuEl[key];
    count += 1;
  }
};

// Call the function to set initial values
createMenuIndicator(4);

// Call the function to update menu indicators with relevant data
updateMenuIndicator();

//--- UPDATE INDICATOR, WHEN MOUSEMOVE ---//

// Variable to track whether the mouse button is currently pressed
let isMouseDown = false;

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
