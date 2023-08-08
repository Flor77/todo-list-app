const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

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
  date = date.toString().split(" ");
  date = date[1] + " " + date[2] + " " + date[3];
  document.querySelector("#date").innerHTML = date;
}

function displayTime() {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();

  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;

  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
}

function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    const completed = itemsArray[i].completed ? "line-through" : "none";
    items += `<div class="item">
                <div class="input-controller">
                <textarea disabled style="text-decoration: ${completed};">${itemsArray[i].text}</textarea>
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
  }
  document.querySelector(".to-do-list").innerHTML = items;
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
      completeItem(i);
    });
  });
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      deleteItem(i);
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
      updateItem(inputs[i].value, i);
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
  itemsArray.unshift({ text: item.value, completed: false });
  localStorage.setItem("items", JSON.stringify(itemsArray));
  displayItems();
}

function completeItem(i) {
  itemsArray[i].completed = !itemsArray[i].completed;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  displayItems();
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

window.onload = function () {
  displayDate();
  displayItems();
  displayTime();
  setInterval(displayTime, 1000);
};
