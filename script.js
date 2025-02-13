let arr = [];
let addbuton = document.getElementById("add_button");
let taskInput = document.getElementById("addbar");

addbuton.addEventListener("click", function () {
  let todoList = document.getElementById("todo_list");

  let newtodoItem = document.createElement("li");
  let todoTask = taskInput.value.trim();
  if (todoTask === "") return;
  let taskId = Date.now();
  newtodoItem.innerHTML = `
    <div class="newlycreated">
      <div class="task" id="task-${taskId}">
        <p>${taskInput.value}</p>
      </div>
      <div class="buttons">
        <button class="edit" data-id="edit-${taskId}">Edit</button>
        <button class="completed" data-id="completed-${taskId}">Completed</button>
        <button class="remove" data-id="remove-${taskId}">Remove</button>
      </div>
    </div>`;
  arr.push({
    Task: todoTask,
    completed: false,
    id: taskId,
    conatiner: newtodoItem,
  });
  todoList.insertAdjacentElement("beforeend", newtodoItem);
  newtodoItem.querySelector(".edit").addEventListener("click", function () {
    edit(taskId);
  });

  newtodoItem
    .querySelector(".completed")
    .addEventListener("click", function () {
      completed(taskId);
    });

  newtodoItem.querySelector(".remove").addEventListener("click", function () {
    remove(taskId, newtodoItem);
  });
  taskInput.value = "";
});

function completed(taskId) {
  let task = arr.find((x) => x.id === taskId);
  let xyz = document.getElementById(`task-${taskId}`);
  if (task && task.completed === false) {
    task.completed = true;
    xyz.style.textDecoration = "line-through";
    xyz.style.color = "grey";
  } else if (task && task.completed === true) {
    task.completed = false;
    xyz.style.textDecoration = "none";
    xyz.style.color = "wheat";
  }
}

function remove(taskId, newtodoItem) {
  arr = arr.filter((x) => x.id !== taskId);
  newtodoItem.remove();
}

function edit(taskId) {
  let task = arr.find((x) => x.id === taskId);
  let oldelement = document.getElementById(`task-${taskId}`);
  if (task) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = task.Task;

    let savebutton = document.createElement("button");
    savebutton.textContent = "Save";
    savebutton.setAttribute("type", "button");

    let newelemnt = document.createElement("div");
    newelemnt.appendChild(input);
    newelemnt.appendChild(savebutton);
    let p = oldelement.querySelector("p");
    oldelement.replaceChild(newelemnt, p);

    savebutton.addEventListener("click", () => {
      let newvalue = input.value.trim();
      if (newvalue) {
        task.Task = newvalue;
        let newvalueelement = document.createElement("p");
        newvalueelement.innerText = newvalue;
        oldelement.replaceChild(newvalueelement, newelemnt);
      }
    });
  }
}

//--------------------------------------- Fetching API -----------------------------------------------//

let API = "https://jsonplaceholder.typicode.com/todos";
async function fectchingapis() {
  try {
    let a = await fetch(API);
    let data = await a.json();
    data = data.filter((x) => x.id < 5);
    data.forEach((element) => {
      let todoList = document.getElementById("todo_list");
      let taskId = element.id;
      let apilist = document.createElement("li");
      apilist.innerHTML = `
        <div class="newlycreated">
          <div class="task" id="task-${taskId}">
            <p>${element.title}</p>
          </div>
          <div class="buttons">
            <button class="edit" data-id="edit-${taskId}">Edit</button>
            <button class="completed" data-id="completed-${taskId}">Completed</button>
            <button class="remove" data-id="remove-${taskId}">Remove</button>
          </div>
        </div>`;

      arr.push({
        Task: element.title,
        completed: element.completed,
        id: taskId,
        conatiner: apilist,
      });
      todoList.insertAdjacentElement("beforebegin", apilist);
      apilist.querySelector(".edit").addEventListener("click", function () {
        edit(taskId);
      });

      apilist
        .querySelector(".completed")
        .addEventListener("click", function () {
          completed(taskId);
        });

      apilist.querySelector(".remove").addEventListener("click", function () {
        remove(taskId, apilist);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

fectchingapis();

let search = document.getElementById("searchbar");

search.addEventListener("input", (event) => {
  let value = event.target.value.toLowerCase();
  arr.forEach((item) => {
    let visible = item.Task.toLowerCase().includes(value);
    item.conatiner.classList.toggle("hide", !visible);
  });
});
