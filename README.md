# 💻 CMD Simulator

This project simulates a Windows-style command prompt (CMD) using HTML, CSS, and JavaScript. It allows the user to navigate a simulated file system and run basic commands like cd, dir, cls, cat, and help. It's designed to be used as a portfolio, showcasing a resume, contact information, and other personal content.

## 📁 Simulated File System Structure

Each .txt file points to an .html file which is loaded and displayed when the cat filename command is used.

```
C:\Users\Maru
├── Documents
│   └── Resume
│       ├── Experience.txt
│       ├── Education.txt
│       ├── Skills.txt
│       ├── Languages.txt
│       └── Contact.txt
└── Projects
    └── CMD_Simulator
        ├── script.js
        ├── style.css
        ├── cmd.html
        └── Readme.md
```

## 🧠 Available Commands

```
help → Shows a list of available commands.

dir → Lists the contents of the current directory.

cd folder_name → Navigates into the specified directory.

cd .. → Goes back one level.

cls → Clears the terminal screen.

cat filename → Displays the content of a file (linked to an .html).
```

### 🛠️ Built With

- HTML5  
- CSS3  
- JavaScript (Vanilla)


### 🚀 How to Use

1. Open the `cmd.html` file in your browser.  
2. Type any supported command into the input field (note: commands are case-sensitive).  
3. Use `help` to view available commands.


### 📌 Notes

- The `.txt` files don’t contain plain text—they link to HTML files located in the `assets` folder.
- This is a front-end simulation only; it does not interact with your actual file system.


## Authors

**Maruxa Muncharaz** – [MaruSheik on GitHub](https://github.com/marusheik)  
Created as an interactive web development project inspired by command-line interfaces.


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/marusheik/cmd_simulator/blob/main/LICENSE) file for details
