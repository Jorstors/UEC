let inputBox = document.getElementById("input");
let inputButton = document.getElementById("convert");
let copyButton = document.getElementById("copy");
let outputBox = document.getElementById("output");
let userInput = "";
let loadingID;

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Clear the input and output boxes
    outputBox.innerText = "";
    inputBox.value = "";
    userInput = inputBox.value;
    console.log(userInput);
    // If there is a spinner running, clear it
    if (loadingID) clearSpinner();
    loadingID = loading();
  }
});

inputButton.addEventListener("click", function () {
  // Clear the input and output boxes
  outputBox.innerText = "";
  inputBox.value = "";
  userInput = inputBox.value;
  console.log(userInput);
  // If there is a spinner running, clear it
  if (loadingID) clearSpinner();
  loadingID = loading();
});

// Write dummy text to the output div
outputBox.innerText = "Hello, World!";

copyButton.addEventListener("click", function () {
  // Copy the text from the output div
  let text = outputBox.innerText;
  navigator.clipboard.writeText(text);
  console.log("Copied to clipboard");
});

// ASCII LOADER

let asciiSpinner = "▉▊▋▍▎▏▎▍▋▊▉";

function loading() {
  // Set the font size large enough to see the spinner
  outputBox.style.fontSize = "2.5rem";
  // Every 700ms, update the spinner in the output div
  let i = 0;
  return setInterval(() => {
    outputBox.innerText = asciiSpinner[i];
    i += 1;
    if (i >= asciiSpinner.length) {
      i = 0;
    }
  }, 200);
}

// Stop the spinner
function clearSpinner() {
  clearInterval(loadingID);
  outputBox.style.fontSize = "1rem";
}
