const simulatedFileSystem = {
  "C:\\Users\\Maru": {
    Documents: {
      Resume: {
        "Experience.txt":"assets/experience.html",
        "Education.txt": "assets/education.html",
        "Skills.txt": "assets/skills.html",
        "Languages.txt": "assets/languages.html",
        "Contact.txt":"assets/contact.html"
        },
    },
    Projects: {
      CMD_Simulator: {
        "script.js":"assets/script.html",
        "style.css":"assets/style.html",
        "cmd.html":"assets/cmd.html",
        "Readme.md":"assets/readme.html",
      },
    },
  },
};

let currentDirectoryPath = ["C:\\Users\\Maru"];
const commandLineInput = document.getElementById('commandInput');
const commandPrompt = document.getElementById('staticPrompt');
const commandOutput = document.getElementById('output');


commandLineInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const input = commandLineInput.value.trim();
    if (input !== '') {
      handleCommand(input);
    }
    commandLineInput.value = '';
  }
});

// --- 1. Command Handling Functions ---

/**
 * Interprets the user input and routes it to the corresponding command function
 * @param {string} input - the full command string entered by the user
 */
function handleCommand(input) {

  commandOutput.innerHTML += `<div class="input">${getCurrentDirectoryPath()}> ${input}</div>`;

  if (input.startsWith('cd ')) {
    const folder = input.slice(3).trim();
    changeDirectory(folder);
  } else if (input === 'dir') {
    listDirectoryContents();
  } else if (input === 'cls') {
    commandOutput.innerHTML = '';
  } else if (input === 'help') {
    displayHelp();
  } else if (input.startsWith('cat ')) {
    const fileName = input.slice(4).trim();
    displayFileContent(fileName);
  } else {
    commandOutput.innerHTML += `<div>Unrecognized command: ${input}</div>`;
  }

  refreshCommandPrompt();
  scrollToBottomOfTerminal()
}
/**
 * Changes the current directory if the folder exists, or goes back one level with '..'.
 *
 * @param {string} folderName - The folder to navigate to.
 */
function changeDirectory(folderName) {
  if (folderName === "..") {
    if (currentDirectoryPath.length > 1) {
      currentDirectoryPath.pop();
    } else {
      commandOutput.innerHTML += "<div>You are already at the root.</div>";
    }
  } else {
    let pointer = simulatedFileSystem;
    for (let dir of currentDirectoryPath) {
      pointer = pointer[dir];
    }

    if (pointer.hasOwnProperty(folderName) && typeof pointer[folderName] === 'object') {
      currentDirectoryPath.push(folderName);
    } else {
      commandOutput.innerHTML += `<div>"${folderName}" Is not a valid directory.</div>`;
    }
  }

  refreshCommandPrompt();
  scrollToBottomOfTerminal();
}

function listDirectoryContents() {
  let pointer = simulatedFileSystem;
  for (let dir of currentDirectoryPath) {
    pointer = pointer[dir];
  }

  const folders = Object.keys(pointer);
  if (folders.length === 0) {
    commandOutput.innerHTML += `<div><vacío></div>`;
  } else {
    commandOutput.innerHTML += `<div class="light-gray">
    Volume in drive C has no label.
    Volume Serial Number is 260E-5035 </div>

    Directory of ${getCurrentDirectoryPath()}
    `
    folders.forEach(folder => {
      if (!(folder.endsWith('.txt') || folder.endsWith('.js') || folder.endsWith('.css') || folder.endsWith('.html') || folder.endsWith('.md'))) {
        commandOutput.innerHTML += `<div>29/04/2025      12:59      &lt;DIR&gt;         ${folder}</div>`;
      } else {
        commandOutput.innerHTML += `<div>29/04/2025      12:59            ${folder}</div>`;
      }
    });
    commandOutput.innerHTML += ` `
  }
}

/**
 * Displays the content of a file from the current directory if it exists.
 *
 * @param {string} fileName - The name of the file to display.
 */
function displayFileContent(fileName) {
  let pointer = simulatedFileSystem;
  for (let dir of currentDirectoryPath) {
    if (pointer[dir]) {
      pointer = pointer[dir];
    } else {
      commandOutput.innerHTML += `<div>The file "${fileName}" does not exist in the current directory.</div>`;
      return;
    }
  }

  // Check if the file exists in the current directory
  if (pointer.hasOwnProperty(fileName)) {
    const filePath = pointer[fileName];
    if (typeof filePath === 'string') {
      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to load the file");
          }
          return response.text();
        })
        .then(content => {
          commandOutput.innerHTML += `<div class="light-gray">${content}</div>`;
          scrollToBottomOfTerminal();
        })
        .catch(error => {
          commandOutput.innerHTML += `<div>Error reading "${fileName}": ${error.message}</div>`;
        });
    }
  } else {
    commandOutput.innerHTML += `<div>The file "${fileName}" does not exist in the current directory.</div>`;
  }
}


function displayHelp(){
  commandOutput.innerHTML += `
  Available commands:

        help  .................. Display this help menu
        dir   .................. List all directories
        cls   .................. Clear the terminal screen
        cd    .................. Change current directory
        cat   .................. Display file contents

  Notes: please keep in mind that the terminal is case-sensitive.
         
  `;
}

// --- 2. UI Handling Functions ---

function refreshCommandPrompt() {
  commandPrompt.innerText = `${getCurrentDirectoryPath()}>`;
}

function scrollToBottomOfTerminal() {
  const terminalContainer = document.querySelector('.terminalContainer');
  terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

// --- 3. Utility Functions ---

/**
 * Constructs the current prompt path string.
 *
 * @returns {string} The current path to be displayed as a prompt.
 */
function getCurrentDirectoryPath() {
  if (currentDirectoryPath.length === 1) {
    return currentDirectoryPath[0] + '\\';
  } else {
    return currentDirectoryPath[0] + '\\' + currentDirectoryPath.slice(1).join('\\');
  }
}
