const gridSize = document.querySelector("#grid-size");
const divs = document.querySelector(".square-divs");
const rangeText = document.querySelector("#range-text");
let gridScale = gridSize.value;
let isDrawing = false;
rangeText.textContent = `${gridScale} x ${gridScale}`;
makeGrid();

gridSize.addEventListener("change", (e) => {
  console.log(gridSize.value);
  gridScale = gridSize.value;
  rangeText.textContent = `${gridScale} x ${gridScale}`;
  changeGridDimen();
});

function makeGrid() {
  divs.style.gridTemplateColumns = `repeat(${gridScale}, 1fr)`;
  divs.style.gridTemplateRows = `repeat(${gridScale}, 1fr)`;
  for (let i = 0; i < gridScale * gridScale; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    divs.appendChild(squareDiv);
  }
  const square = document.querySelectorAll(".square");
  square.forEach((el) => {
    el.addEventListener("mousedown", () => {
      isDrawing = true;
    });
    el.addEventListener("mouseup", () => (isDrawing = false));
    el.addEventListener("mousemove", () => {
      if (!isDrawing) return;
      el.style.background = "black";
    });
  });
}

function changeGridDimen() {
  divs.innerHTML = "";
  makeGrid();
}
