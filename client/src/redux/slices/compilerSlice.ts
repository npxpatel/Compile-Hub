import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface compilerStateType {
  allCodes: {
    html: string;
    css: string;
    javascript: string;
  };

  currentLanguage: "html" | "css" | "javascript";
}

const initialState: compilerStateType = {
  allCodes: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Todo List</h1>
        <input type="text" id="new-item" placeholder="Add a new item...">
        <button onclick="addItem()">Add</button>
        <ul id="todo-list"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>

    `,
    css: `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
}

h1 {
    text-align: center;
}

input {
    width: 70%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    width: 25%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li.completed {
    text-decoration: line-through;
    color: #888;
}

li button {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    width: 80px;
}

li button:hover {
    color: #555;
}
`,
    javascript: `function addItem() {
    const newItem = document.getElementById('new-item').value;
    if (newItem.trim() === '') return;

    const listItem = document.createElement('li');
    listItem.innerHTML = \`
        \${newItem}
        <div>
            <button onclick="completeItem(this)">Complete</button>
            <button onclick="deleteItem(this)">Delete</button>
        </div>\`
    ;
    document.getElementById('todo-list').appendChild(listItem);

    document.getElementById('new-item').value = '';
}

function completeItem(button) {
    const listItem = button.parentElement.parentElement;
    listItem.classList.toggle('completed');
}

function deleteItem(button) {
    const listItem = button.parentElement.parentElement;
    listItem.remove();
}
`,
  },
  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateLanguage: (
      state,
      action: PayloadAction<compilerStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },

    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.allCodes[state.currentLanguage] = action.payload;
    },

    updateFullCode : (state,action:PayloadAction<compilerStateType["allCodes"]>) =>{
            state.allCodes = action.payload;
    },

    updateGivenCode : (state,action:PayloadAction<{language : compilerStateType["currentLanguage"],code : string}>) =>{
        state.allCodes[action.payload.language] = action.payload.code;
    },
    
  },
});

export default compilerSlice.reducer;
export const { updateLanguage, updateCodeValue,updateFullCode, updateGivenCode } = compilerSlice.actions;
