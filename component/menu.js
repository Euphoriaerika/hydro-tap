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

// Function to create menu indicators based on the given count
const createMenuIndicator = (count) => {
  // Select the container element with the class "stat"
  const statContainer = document.querySelector(".stat");

  // Check if there are existing <li> elements, create them if not
  if (!statContainer.querySelector("li")) {
    for (let i = 0; i < count; i++) {
      // Create <li> element
      const liElement = document.createElement("li");
      statContainer.appendChild(liElement);

      // Create <p> element for title
      const liTitle = document.createElement("p");
      liTitle.className = "menu-el-title";
      liElement.appendChild(liTitle);

      // Create <p> element for date
      const liDate = document.createElement("p");
      liDate.className = "menu-el-data";
      liElement.appendChild(liDate);
    }
  }
};

// Function to update menu indicators with relevant data
const updateMenuIndicator = () => {
  // Select all <li> elements with the class "stat" and their corresponding title and data elements
  const menuTitles = document.querySelectorAll(".stat li .menu-el-title");
  const menuData = document.querySelectorAll(".stat li .menu-el-data");

  // Data for menu indicators
  const menuEl = {
    "Lever angle: ": getRotationAngle(leverElement) + " degrees",
    "Temperature: ": -(getRotationAngle(leverElement) / 90) * 45 + 45 + " C",
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
