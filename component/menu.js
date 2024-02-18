const leverElement = document.getElementById("lever");
const leftCommElement = document.getElementById("left-comm");
const rightCommElement = document.getElementById("right-comm");

// Змінено на звернення до всіх елементів <li> з класом "stat"
var menuItems = document.querySelectorAll(".stat li");

// Функція для отримання значення кута обертання з матриці трансформації
function getRotationAngle(element) {
  var style = window.getComputedStyle(element);
  var matrix = new DOMMatrix(style.transform);
  return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
}

// Обробник події при русі миші
function updateRotationAngles() {
  var rotationAngle = getRotationAngle(leverElement);
  var leftRotationAngle = getRotationAngle(leftCommElement);
  var rightRotationAngle = getRotationAngle(rightCommElement);

  // Оновлення значень для кожного елемента <li> з класом "stat"
  menuItems[0].textContent = "Lever angle: " + rotationAngle + " degrees";
  menuItems[1].textContent =
    "Temperature: " + (-(rotationAngle / 90) * 36 + 36) + " C";
  menuItems[2].textContent =
    "LeftComm angle: " + leftRotationAngle + " degrees";
  menuItems[3].textContent =
    "RightComm angle: " + rightRotationAngle + " degrees";
}

// Виклик функції для встановлення початкових значень
updateRotationAngles();

// Обробник події при русі миші
leverElement.addEventListener("mousemove", updateRotationAngles);
