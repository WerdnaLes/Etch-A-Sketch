const gridSizeRange = document.querySelector("#grid-size");
const gridContainer = document.querySelector(".square-divs");
const dimensionRangeText = document.querySelector("#range-text");
const increaseGrid = document.querySelector(".plus");
const decreaseGrid = document.querySelector(".minus");
const gridButtons = [increaseGrid, decreaseGrid];
let gridScale = gridSizeRange.value;
let isDrawing = false;
let hue = 0;
let intervalId;

// initiate grid generation:
makeGrid();

// divs.addEventListener("mouseleave", () => (isDrawing = false)); // Stop drawing if mouse leaves the grid borders

// Draw only inside the grid container:
gridContainer.addEventListener("mousedown", () => (isDrawing = true));
document.addEventListener("mouseup", () => (isDrawing = false));

// Grid dimension range listener:
// gridSizeRange.addEventListener("change", changeGridDimen);
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

function makeGrid() {
  dimensionRangeText.textContent = `${gridScale} x ${gridScale}`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridScale}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridScale}, 1fr)`;
  for (let i = 0; i < gridScale * gridScale; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");

    squareDiv.addEventListener("mousemove", () => {
      if (!isDrawing) return;
      squareDiv.style.background = `hsl(${hue}, 100%, 50%)`;
      hue++;
    });
    gridContainer.appendChild(squareDiv);
  }
}

function changeGridDimen(increase) {
  if (typeof increase != "boolean") {
    gridScale = gridSizeRange.value;
  } else if (increase) {
    gridSizeRange.value++;
    gridScale = gridSizeRange.value;
  } else {
    gridSizeRange.value--;
    gridScale = gridSizeRange.value;
  }
  gridContainer.innerHTML = "";
  makeGrid();
}
