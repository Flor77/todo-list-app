let todosArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
console.log(todosArray);

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createTodo(item);
});

function createTodo(item) {
  todosArray.push(item.value);
  localStorage.setItem("todos", JSON.stringify(todosArray));
  location.reload();
}

const inputField = document.querySelector("#item");

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTodo(inputField);
  }
});

function displayTodos() {
  todo = "";
  for (let i = 0; i < todosArray.length; i++) {
    const todoNumber = i + 1;
    todo += ` <div class="item">
    <div class="input-controller">
    <span class="todo-number">${todoNumber}.</span>
      <textarea disabled>${todosArray[i]}</textarea>
      <div class="edit-controller">
        <button class="completeBtn">Done</button>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
    </div>
    <div class="update-controller">
      <button class="saveBtn">Save</button>
      <button class="cancelBtn">Cancel</button>
    </div>
  </div>`;
  }
  document.querySelector(".to-do-list").innerHTML = todo;
  activateCompleteListeners();
  activateEditListeners();
  activateDeleteListeners();
  activateSaveListeners();
  activateCancelListeners();
}

function activateCompleteListeners() {
  const completeBtn = document.querySelectorAll(".completeBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  completeBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      if (inputs[i].style.textDecoration === "line-through") {
        inputs[i].style.textDecoration = "none";
      } else {
        inputs[i].style.textDecoration = "line-through";
      }
    });
  });
}
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  const updateController = document.querySelectorAll(".update-controller");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function activateDeleteListeners() {
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteTodo(i);
    });
  });
}

function deleteTodo(i) {
  todosArray.splice(i, 1);
  localStorage.setItem("todos", JSON.stringify(todosArray));
  location.reload();
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateTodo(inputs[i].value, i);
    });
  });
}

function updateTodo(text, i) {
  todosArray[i] = text;
  localStorage.setItem("todos", JSON.stringify(todosArray));
  location.reload();
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  const updateController = document.querySelectorAll(".update-controller");
  cancelBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      inputs[i].value = todosArray[i];
      inputs[i].disabled = true;
      updateController[i].style.display = "none";
    });
  });
}

function displayTime() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3] + " " + date[4] + " ";
}

window.onload = function () {
  displayTime();
  setInterval(displayTime, 1000);
  displayTodos();
};
