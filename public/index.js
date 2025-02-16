let inputBox = document.getElementById("input");
let inputButton = document.getElementById("convert");
let copyButton = document.getElementById("copy");
let outputBox = document.getElementById("output");
let userInput = "";
let loadingID;

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter" && inputBox.value) {
    userInput = inputBox.value;
    // Clear the input and output boxes
    outputBox.innerText = "";
    inputBox.value = "";
    // If there is a spinner running, clear it
    if (loadingID) clearSpinner();
    loadingID = loading();
    // Call the API with the user input
    prompt();
  }
});

inputButton.addEventListener("click", function () {
  if (!inputBox.value) return;
  userInput = inputBox.value;
  // Clear the input and output boxes
  outputBox.innerText = "";
  inputBox.value = "";
  // If there is a spinner running, clear it
  if (loadingID) clearSpinner();
  loadingID = loading();
  // Call the API with the user input
  prompt();
});

copyButton.addEventListener("click", function () {
  // Copy the text from the output div
  let text = outputBox.innerText;
  navigator.clipboard.writeText(text);
  console.log("Copied to clipboard!");
});

// ASCII LOADER

let asciiSpinner = "▉▊▋▍▎▏▎▍▋▊▉";

function loading() {
  // Set the font size large enough to see the spinner
  outputBox.style.fontSize = "2.5rem";
  // Every 700ms, update the spinner in the output div
  let i = 0;
  return setInterval(() => {
    outputBox.innerText = "▉▉▉" + asciiSpinner[i];
    i += 1;
    if (i >= asciiSpinner.length) {
      i = 0;
    }
  }, 200);
}

// Stop the spinner
function clearSpinner() {
  clearInterval(loadingID);
  // Grab variable from css
  outputBox.style.fontSize = "var(--ASCII-font-size)";
}

// API call to backend through HTTPS request
async function promptAPI() {
  const string = userInput;
  const appendedPrompts =
    "make a drawing of a high contrast, black and white, minimalistic ";
  const baseUrl = `/get-art?prompt=${appendedPrompts}${string}&size=`;
  for (var i = 2; i < 70; i += 1) {
    try {
      const response = await fetch(baseUrl + i);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.text();
      // Update the output box with the ASCII art
      clearSpinner();
      outputBox.innerText = data;
    } catch (error) {
      // If an error occurs, display an error message and break the loop
      clearSpinner();

      // Load placeholder ASCII art in the output box
      fetch("public/notavailable.txt")
        .then((response) => response.text())
        .then((data) => {
          outputBox.innerHTML = data;
        })
        .catch((error) =>
          console.error("Error loading error ASCII art:", error)
        );

      // Log the error
      console.error("Error fetching data:", error);
      break;
    }
  }
}

// Debounced version of the prompt function
function debounce(func, timeout = 5 * 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

const prompt = debounce(promptAPI, 3 * 1000);

// @app.route("/get-art")
// def getArt():
//     filename = request.args.get("prompt") + ".png"
//     if filename is None:
//         return "Invalid request: prompt is required"
//     if not os.path.isfile(filename):
//         generate_images(request.args["prompt"])

//     s = request.args.get("size", 1, type=int)
//     asc = image_to_ascii(filename, size=(s,s), charset=' .:-=+*#%@')

//     return asc

// Load placeholder ASCII art in the output box
fetch("public/wormy.txt")
  .then((response) => response.text())
  .then((data) => {
    outputBox.innerHTML = data;
  })
  .catch((error) =>
    console.error("Error loading placeholder ASCII art:", error)
  );
