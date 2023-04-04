const gridSizeRange = document.querySelector("#grid-size");
const colorPicker = document.querySelector("#color-picker");
const gridContainer = document.querySelector(".square-divs");
const dimensionRangeText = document.querySelector("#range-text");
const increaseGrid = document.querySelector(".plus");
const decreaseGrid = document.querySelector(".minus");
const buttons = document.querySelectorAll(".button");
const gridButtons = [increaseGrid, decreaseGrid];
let gridScale = gridSizeRange.value;
let isDrawing = false;
let hue = 0;
let intervalId;
let colorPicked = `black`;
let currentMode = "color-pick";

// initiate grid generation and active button:
window.onload = () => {
  makeGrid();
  setActiveButton(currentMode);
};

// Draw only inside the grid container:
gridContainer.addEventListener("mousedown", () => (isDrawing = true));
document.addEventListener("mouseup", () => {
  isDrawing = false;
  clearInterval(intervalId);
});

// Grid dimension range listener:
gridSizeRange.addEventListener("mousemove", () => {
  changeGridDimen();
});

// Increase and Decrease buttons listeners:
gridButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeGridDimen(button === increaseGrid);
  });
  button.addEventListener("mousedown", () => {
    intervalId = setInterval(() => {
      changeGridDimen(button === increaseGrid);
    }, 100);
  });
  button.addEventListener("mouseup", () => {
    clearInterval(intervalId);
  });
});

// Color picker:
colorPicker.addEventListener("input", (e) => {
  colorPicked = e.target.value;
});

// Set mode to color pick if clicked on it:
colorPicker.addEventListener("click", () => setCurrentMode("color-pick"));

// Set mode when click on button:
buttons.forEach((button) => {
  button.addEventListener("click", () => setCurrentMode(button.id));
});

function makeGrid() {
  dimensionRangeText.textContent = `${gridScale} x ${gridScale}`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridScale}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridScale}, 1fr)`;
  for (let i = 0; i < gridScale * gridScale; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    squareDiv.addEventListener("mousedown", changeColor);
    squareDiv.addEventListener("mouseover", changeColor);
    gridContainer.appendChild(squareDiv);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !isDrawing) {
    return;
  } else isDrawing = true;

  if (currentMode === "color-pick") {
    e.target.style.background = colorPicked;
  } else if (currentMode === "rainbow") {
    e.target.style.background = `hsl(${hue}, 100%, 50%)`;
    hue++;
  } else if (currentMode === "eraser") {
    e.target.style.background = "#efefef";
  }
}

function changeGridDimen(increase) {
  const prevGrid = gridScale;
  if (typeof increase != "boolean") {
    gridScale = gridSizeRange.value;
  } else if (increase) {
    gridSizeRange.value++;
    gridScale = gridSizeRange.value;
  } else {
    gridSizeRange.value--;
    gridScale = gridSizeRange.value;
  }
  // Change grid container only if gridScale has been changed:
  if (prevGrid != gridScale) {
    gridContainer.innerHTML = "";
    makeGrid();
  }
}

function setCurrentMode(newMode) {
  if (newMode === `clear-all`) {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sq) => {
      sq.style.background = "#efefef";
    });
    return;
  }
  setActiveButton(newMode);
  currentMode = newMode;
}

function setActiveButton(newMode) {
  const activateButton = document.getElementById(newMode).classList;
  const deactivateButton = document.getElementById(currentMode).classList;

  if (newMode !== "clear-all") {
    deactivateButton.remove("active");
    activateButton.add("active");
  }
}
