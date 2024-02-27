// Update the indicators based on the given angle increment
const updateIndicators = (addAngle) => {
  let angle = getRotationAngle(leverElement) + addAngle;
  // console.log(angle);
  leverElement.style.transform = `rotate(${angle}deg)`;
};

// Update the temperature by sending a POST request to the server
const updateTemperature = (temperature) => {
  fetch("http://127.0.0.1:5000/update", { // change for your server
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ temperature: temperature }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Response:", data);
      // Update the indicators on the screen with the received data
      updateIndicators(data.angle);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Handle the click event on the update button
document.getElementById("updateButton").addEventListener("click", () => {
  // Convert the current lever angle to temperature
  let temp = angle2Temp(getRotationAngle(leverElement));

  // Update the temperature on the server and refresh the indicators
  updateTemperature(temp);
  updateMenuIndicator();
});
