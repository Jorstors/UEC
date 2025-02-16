let inputBox = document.getElementById("input");
let inputButton = document.getElementById("convert");
let copyButton = document.getElementById("copy");
let outputBox = document.getElementById("output");
let userInput = "";

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    userInput = inputBox.value;
    console.log(userInput);
  }
});

inputButton.addEventListener("click", function () {
  userInput = inputBox.value;
  console.log(userInput);
});

// Write dummy text to the output div
outputBox.innerText = "Hello, World!";

copyButton.addEventListener("click", function () {
  // Copy the text from the output div
  let text = outputBox.innerText;
  navigator.clipboard.writeText(text);
  console.log("Copied to clipboard");
});
