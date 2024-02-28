// Function to convert degrees to radians
const degToRad = (degAngle) => degAngle * (Math.PI / 180);

// Function to update indicators based on the given angle increment
const updateIndicators = (addAngle) => {
  const angle = getRotationAngle(leverElement) + addAngle;
  updateTapAngle(degToRad(angle));
};

// Function to update the temperature by sending a POST request to the server
const updateTemperature = async (temperature) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/update", {
      // Change for your server
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ temperature }),
    });

    const data = await response.json();
    // Update the indicators on the screen with the received data
    updateIndicators(data.angle);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Handle the click event on the update button
document.getElementById("updateButton").addEventListener("click", async () => {
  // Convert the current lever angle to temperature
  const temp = angle2Temp(getRotationAngle(leverElement));

  // Update the temperature on the server and refresh the indicators
  await updateTemperature(temp);
  updateMenuIndicator();
});
