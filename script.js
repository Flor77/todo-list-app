// let currentDate = "";
let todoCounter = 1;
const storedCounter = localStorage.getItem("todoCounter");
if (storedCounter !== null) {
  todoCounter = parseInt(storedCounter);
}

const todosByDate = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : {};

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

document.querySelector("#item").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item);
  }
});

function displayDate() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  date = date.toString().split(" ");

  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;
  date = date[2] + " " + date[1] + " " + date[3] + " " + h + ":" + m + ":" + s;
  document.querySelector("#date").innerHTML = date;
}

function displayItems() {
  let itemsHTML = "";
  for (const date in todosByDate) {
    if (Array.isArray(todosByDate[date])) {
      // Check if it's an array
      currentDate = date; // Set the current date
      itemsHTML += `<div class="group-header">${date}</div>`; // Add a group header
      todosByDate[date].forEach((todo, i) => {
        const completed = todo.completed ? "line-through" : "none";
        itemsHTML += `<div class="item" data-date="${date}">
                      <div class="input-controller">
                      <span class="order">${todo.order}</span>
                        <textarea disabled style="text-decoration: ${completed};">${todo.text}</textarea>
                        <div class="edit-controller">
                          <i class="fa-solid fa-pen-to-square editBtn" style="color:#11A1CD"></i>
                          <i class="fa-solid fa-check completeBtn" style="color:#1BDC10"></i>
                          <i class="fa-solid fa-trash deleteBtn" style="color:#FC099F"></i>
                        </div>
                      </div>
                      <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                      </div>
                    </div>`;
      });
    }
  }

  document.querySelector(".to-do-list").innerHTML = itemsHTML;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
  activateCompleteListeners();
}

function activateCompleteListeners() {
  let completeBtn = document.querySelectorAll(".completeBtn");
  completeBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      // Find the parent item element and get its date attribute
      const itemElement = dB.closest(".item");
      const date = itemElement.getAttribute("data-date");
      completeItem(date, i);
    });
  });
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      // Find the parent item element and get its date attribute
      const itemElement = dB.closest(".item");
      const date = itemElement.getAttribute("data-date");
      deleteItem(date, i);
    });
  });
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(currentDate, inputs[i].value, i);
    });
  });
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      inputs[i].style.border = "none";
    });
  });
}

function createItem(item) {
  const date = new Date().toISOString().split("T")[0];
  if (!todosByDate[date]) {
    todosByDate[date] = [];
    todoCounter = 1;
  }

  const taskId = Date.now().toString();

  todosByDate[date].push({
    id: taskId,
    text: item.value,
    completed: false,
    order: todoCounter++,
  });

  // Set the data-date attribute to the current date
  const itemElement = document.createElement("div");
  itemElement.classList.add("item");
  itemElement.setAttribute("data-date", date);

  localStorage.setItem("items", JSON.stringify(todosByDate));
  localStorage.setItem("todoCounter", todoCounter.toString()); // Store the entire todosByDate object
  displayItems();
  item.value = "";
}

function completeItem(date, i) {
  if (todosByDate[date] && todosByDate[date][i]) {
    todosByDate[date][i].completed = !todosByDate[date][i].completed;
    localStorage.setItem("items", JSON.stringify(todosByDate));
    displayItems();
  }
}

function deleteItem(date, i) {
  if (todosByDate[date] && todosByDate[date][i]) {
    todosByDate[date].splice(i, 1);
    if (todosByDate[date].length === 0) {
      delete todosByDate[date];
    }
    localStorage.setItem("items", JSON.stringify(todosByDate));
    displayItems();
  }
}

function updateItem(date, text, i) {
  todosByDate[date][i].text = text;
  localStorage.setItem("items", JSON.stringify(todosByDate));
  displayItems();
}

window.onload = function () {
  const currentDate = new Date().toISOString().split("T")[0];
  const storedDate = localStorage.getItem("currentDate");

  if (storedDate !== currentDate) {
    localStorage.setItem("currentDate", currentDate);
  }

  displayDate();
  displayItems();
  setInterval(displayDate, 1000);
};
