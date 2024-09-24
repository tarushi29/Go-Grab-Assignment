
let allProjects = [];

let patta = document.querySelector(".patta");
patta.textContent = "All Tasks";

let currentProject = "None";

let container = document.querySelector(".menu");

let taskList = document.querySelector(".task-list");

function uniqueID() {
    return Math.floor(Math.random() * Date.now());
}

function task(title, description, date, priority, completed, tempo){
    this.taskTitle = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.completed = completed;
    this.UID= tempo;
}

function project(title){
    this.projectTitle = title;
    this.tasks = [];
}

function displayProjects(){
    let arrLen = allProjects.length;
    let list = document.querySelector(".project-items");
    list.textContent = " ";
    for (const project in allProjects){
        let newItem = document.createElement("div");
        let deleteButton = document.createElement("img");
        newItem.textContent = project;
        deleteButton.src = "Icons/delete.svg";
        deleteButton.classList.add("del");
        deleteButton.id = project;
        newItem.appendChild(deleteButton);
        newItem.classList.add("item");
        newItem.classList.add("project")
        newItem.id = project;
        list.appendChild(newItem);
    }
}

function onButtonClick(){
    document.getElementById('textInput').className="show";
    document.getElementById('add').className = "hide";
}

function onSubmit(){
    let newTitle = document.getElementById("project-textbox").value;
    let newProject = new project(newTitle);
    document.getElementById('project-textbox').value = "";
    allProjects[newTitle] = newProject;
    document.getElementById('textInput').className="hide";
    document.getElementById('add').className = "show";
    displayProjects();
}

function completeTask(e){
    if (e.target.className === "unchecked"){
        e.target.src = "Icons/checkbox-marked-circle.svg";
        e.target.className = "checked";
        for (const prozect in allProjects){
            let presentTasks = allProjects[prozect].tasks;
            for (const presentTask in presentTasks){
                if (presentTasks[presentTask].UID == e.target.id){
                    allProjects[prozect].tasks[presentTask].completed = true;
                }
            }
        }
    }

    else if (e.target.className === "checked"){
        e.target.src = "Icons/checkbox-blank-circle-outline.svg";
        e.target.className = "unchecked";
        for (const prozect in allProjects){
            let presentTasks = allProjects[prozect].tasks;
            for (const presentTask in presentTasks){
                if (presentTasks[presentTask].UID == e.target.id){
                    allProjects[prozect].tasks[presentTask].completed = false;
                }
            }
        }
    }
}

function deleteProject(e){
    if (e.target.className === "del"){
        let deletedProject = e.target.id;
        for (const abhiProject in allProjects){
            if (abhiProject === deletedProject){
                delete allProjects[abhiProject];
            }
        }
        displayProjects();
        displayAllTasks();
        patta.textContent = "All Tasks";
        document.getElementById('add-task').className="hide";
    }
}

container.addEventListener('click', deleteProject);

taskList.addEventListener('click', completeTask);

function clickOnProject(e){
    if (e.target.classList.contains("item")){
        patta.textContent = e.target.id;
    }

    if (e.target.classList.contains("project")){
        currentProject = e.target.id;
        displayGivenTasks();
        document.getElementById('add-task').className="add-task";
    }

    if (e.target.id === "All Tasks" || e.target.id === "Important" || e.target.id === "Today" || e.target.id === "This Month"){
        document.getElementById('add-task').className="hide";
    }

    if (e.target.id === "All Tasks"){
        displayAllTasks();
    }

    if (e.target.id === "Important"){
        displayImportantTasks();
    }

    if (e.target.id === "Today"){
        displayTodayTasks();
    }

    if (e.target.id === "This Month"){
        displayMonthTasks();
    }
}

function displayMonthTasks(){
    taskList.textContent = " ";
    for (const currProject in allProjects){
        lisht = allProjects[currProject];
        for (const sksk in lisht.tasks){
            let temp = lisht.tasks[sksk];
            let currTask = document.createElement("div");
            // let temp = lisht[currentTask];
            let currentTitle = temp.taskTitle;
            let currentDescription = temp.description;
            let currentDate = temp.date;
            let currentPriority = temp.priority; 

            let today = new Date();
            let month = today.getMonth();
            let taskMon = currentDate.getMonth();
            if (month !== taskMon){
                continue;
            }

            let currTitle = document.createElement("div");
            currTitle.textContent = `${currentTitle}`;
            currTitle.classList.add("task-title")

            let currDesc = document.createElement("div");
            currDesc.textContent = `Task Description: ${currentDescription}`;
            currDesc.classList.add("task-desc")

            let currDate = document.createElement("div");
            currDate.textContent = `Due Date: ${currentDate.toLocaleDateString()}`;
            currDate.classList.add("task-date")

            let currPriority = document.createElement("img");
            if (currentPriority){
                currPriority.src = "Icons/star.svg";
            }
            else{
                currPriority.src = "Icons/star-outline.svg";
            }
            currPriority.classList.add("icon");

            let currTaskLeft = document.createElement("div");
            currTaskLeft.classList.add("task-list");
            let checkbox = document.createElement("img");

            if (temp.completed){
                checkbox.src = "Icons/checkbox-marked-circle.svg";
                checkbox.classList.add("checked");
            }
            else{
                checkbox.src = "Icons/checkbox-blank-circle-outline.svg";
                checkbox.classList.add("unchecked");
            }
            currTaskLeft.appendChild(checkbox);
            checkbox.id = temp.UID;

            let currTaskRight = document.createElement("div");

            let currDatePriority = document.createElement("div");
            currDatePriority.appendChild(currDate);
            currDatePriority.appendChild(currPriority);
            currDatePriority.classList.add("task-date-priority");

            currTaskRight.appendChild(currTitle);
            currTaskRight.appendChild(currDesc);
            currTaskRight.appendChild(currDatePriority);

            currTask.appendChild(currTaskLeft);
            currTask.appendChild(currTaskRight);

            currTask.classList.add("task");

            taskList.appendChild(currTask);
        }
    }
}

function displayTodayTasks(){
    taskList.textContent = " ";
    for (const currProject in allProjects){
        lisht = allProjects[currProject];
        for (const sksk in lisht.tasks){
            let temp = lisht.tasks[sksk];
            let currTask = document.createElement("div");
            // let temp = lisht[currentTask];
            let currentTitle = temp.taskTitle;
            let currentDescription = temp.description;
            let currentDate = temp.date;
            let currentPriority = temp.priority; 

            let today = new Date();
            let day = today.getDate();
            let taskDay = currentDate.getDate();
            if (taskDay !== day){
                continue;
            }

            let currTitle = document.createElement("div");
            currTitle.textContent = `${currentTitle}`;
            currTitle.classList.add("task-title")

            let currDesc = document.createElement("div");
            currDesc.textContent = `Task Description: ${currentDescription}`;
            currDesc.classList.add("task-desc")

            let currDate = document.createElement("div");
            currDate.textContent = `Due Date: ${currentDate.toLocaleDateString()}`;
            currDate.classList.add("task-date")

            let currPriority = document.createElement("img");
            if (currentPriority){
                currPriority.src = "Icons/star.svg";
            }
            else{
                currPriority.src = "Icons/star-outline.svg";
            }
            currPriority.classList.add("icon");

            let currTaskLeft = document.createElement("div");
            currTaskLeft.classList.add("task-list");
            let checkbox = document.createElement("img");

            if (temp.completed){
                checkbox.src = "Icons/checkbox-marked-circle.svg";
                checkbox.classList.add("checked");
            }
            else{
                checkbox.src = "Icons/checkbox-blank-circle-outline.svg";
                checkbox.classList.add("unchecked");
            }
            currTaskLeft.appendChild(checkbox);
            checkbox.id = temp.UID;

            let currTaskRight = document.createElement("div");

            let currDatePriority = document.createElement("div");
            currDatePriority.appendChild(currDate);
            currDatePriority.appendChild(currPriority);
            currDatePriority.classList.add("task-date-priority");

            currTaskRight.appendChild(currTitle);
            currTaskRight.appendChild(currDesc);
            currTaskRight.appendChild(currDatePriority);

            currTask.appendChild(currTaskLeft);
            currTask.appendChild(currTaskRight);

            currTask.classList.add("task");

            taskList.appendChild(currTask);
        }
    }
}

function displayImportantTasks(){
    taskList.textContent = " ";
    for (const currProject in allProjects){
        lisht = allProjects[currProject];
        for (const sksk in lisht.tasks){
            let temp = lisht.tasks[sksk];
            let currTask = document.createElement("div");
            // let temp = lisht[currentTask];
            let currentTitle = temp.taskTitle;
            let currentDescription = temp.description;
            let currentDate = temp.date;
            let currentPriority = temp.priority; 

            if (!currentPriority){
                continue;
            }

            let currTitle = document.createElement("div");
            currTitle.textContent = `${currentTitle}`;
            currTitle.classList.add("task-title")

            let currDesc = document.createElement("div");
            currDesc.textContent = `Task Description: ${currentDescription}`;
            currDesc.classList.add("task-desc")

            let currDate = document.createElement("div");
            currDate.textContent = `Due Date: ${currentDate.toLocaleDateString()}`;
            currDate.classList.add("task-date")

            let currPriority = document.createElement("img");
            if (currentPriority){
                currPriority.src = "Icons/star.svg";
            }
            else{
                currPriority.src = "Icons/star-outline.svg";
            }
            currPriority.classList.add("icon");

            let currTaskLeft = document.createElement("div");
            currTaskLeft.classList.add("task-list");
            let checkbox = document.createElement("img");

            if (temp.completed){
                checkbox.src = "Icons/checkbox-marked-circle.svg";
                checkbox.classList.add("checked");
            }
            else{
                checkbox.src = "Icons/checkbox-blank-circle-outline.svg";
                checkbox.classList.add("unchecked");
            }
            currTaskLeft.appendChild(checkbox);
            checkbox.id = temp.UID;

            let currTaskRight = document.createElement("div");

            let currDatePriority = document.createElement("div");
            currDatePriority.appendChild(currDate);
            currDatePriority.appendChild(currPriority);
            currDatePriority.classList.add("task-date-priority");

            currTaskRight.appendChild(currTitle);
            currTaskRight.appendChild(currDesc);
            currTaskRight.appendChild(currDatePriority);

            currTask.appendChild(currTaskLeft);
            currTask.appendChild(currTaskRight);

            currTask.classList.add("task");

            taskList.appendChild(currTask);
        }
    }
}

function displayGivenTasks(){
    let currentTasks = allProjects[currentProject].tasks;
    displayTasks(currentTasks);
}

function displayTasks(lisht){
    taskList.textContent = " ";
    for (const currentTask in lisht){
        let currTask = document.createElement("div");
        let temp = lisht[currentTask];
        let currentTitle = temp.taskTitle;
        let currentDescription = temp.description;
        let currentDate = temp.date;
        let currentPriority = temp.priority; 

        let currTitle = document.createElement("div");
        currTitle.textContent = `${currentTitle}`;
        currTitle.classList.add("task-title")

        let currDesc = document.createElement("div");
        currDesc.textContent = `Task Description: ${currentDescription}`;
        currDesc.classList.add("task-desc")

        let currDate = document.createElement("div");
        currDate.textContent = `Due Date: ${currentDate.toLocaleDateString()}`;
        currDate.classList.add("task-date")

        let currPriority = document.createElement("img");
        if (currentPriority){
            currPriority.src = "Icons/star.svg";
        }
        else{
            currPriority.src = "Icons/star-outline.svg";
        }
        currPriority.classList.add("icon");

        let currTaskLeft = document.createElement("div");
        currTaskLeft.classList.add("task-list");
        let checkbox = document.createElement("img");

        if (temp.completed){
            checkbox.src = "Icons/checkbox-marked-circle.svg";
            checkbox.classList.add("checked");
        }
        else{
            checkbox.src = "Icons/checkbox-blank-circle-outline.svg";
            checkbox.classList.add("unchecked");
        }
        currTaskLeft.appendChild(checkbox);
        checkbox.id = temp.UID;

        let currTaskRight = document.createElement("div");

        let currDatePriority = document.createElement("div");
        currDatePriority.appendChild(currDate);
        currDatePriority.appendChild(currPriority);
        currDatePriority.classList.add("task-date-priority");

        currTaskRight.appendChild(currTitle);
        currTaskRight.appendChild(currDesc);
        currTaskRight.appendChild(currDatePriority);

        currTask.appendChild(currTaskLeft);
        currTask.appendChild(currTaskRight);

        currTask.classList.add("task");

        taskList.appendChild(currTask);
    }
}

function displayAllTasks(){
    taskList.textContent = " ";
    for (const currProject in allProjects){
        lisht = allProjects[currProject];
        for (const sksk in lisht.tasks){
            let temp = lisht.tasks[sksk];
            let currTask = document.createElement("div");
            // let temp = lisht[currentTask];
            let currentTitle = temp.taskTitle;
            let currentDescription = temp.description;
            let currentDate = temp.date;
            let currentPriority = temp.priority; 

            let currTitle = document.createElement("div");
            currTitle.textContent = `${currentTitle}`;
            currTitle.classList.add("task-title")

            let currDesc = document.createElement("div");
            currDesc.textContent = `Task Description: ${currentDescription}`;
            currDesc.classList.add("task-desc")

            let currDate = document.createElement("div");
            currDate.textContent = `Due Date: ${currentDate.toLocaleDateString()}`;
            currDate.classList.add("task-date")

            let currPriority = document.createElement("img");
            if (currentPriority){
                currPriority.src = "Icons/star.svg";
            }
            else{
                currPriority.src = "Icons/star-outline.svg";
            }
            currPriority.classList.add("icon");

            let currTaskLeft = document.createElement("div");
            currTaskLeft.classList.add("task-list");
            let checkbox = document.createElement("img");

            if (temp.completed){
                checkbox.src = "Icons/checkbox-marked-circle.svg";
                checkbox.classList.add("checked");
            }
            else{
                checkbox.src = "Icons/checkbox-blank-circle-outline.svg";
                checkbox.classList.add("unchecked");
            }
            currTaskLeft.appendChild(checkbox);
            checkbox.id = temp.UID;

            let currTaskRight = document.createElement("div");

            let currDatePriority = document.createElement("div");
            currDatePriority.appendChild(currDate);
            currDatePriority.appendChild(currPriority);
            currDatePriority.classList.add("task-date-priority");

            currTaskRight.appendChild(currTitle);
            currTaskRight.appendChild(currDesc);
            currTaskRight.appendChild(currDatePriority);

            currTask.appendChild(currTaskLeft);
            currTask.appendChild(currTaskRight);

            currTask.classList.add("task");

            taskList.appendChild(currTask);
        }
    }
}

container.addEventListener('click', clickOnProject);

function onSubmitTask(){
    let newTaskTitle = document.getElementById("title").value;
    let tempDate = document.getElementById("date").value;
    let taskYear = parseInt(tempDate.slice(0, 4));
    let taskMonth = parseInt(tempDate.slice(5, 8));
    let taskDate = parseInt(tempDate.slice(8))
    let dueDate = new Date(taskYear, taskMonth, taskDate);
    let desc = document.getElementById("desc").value;
    let priority = document.getElementById("priority").checked;
    let tempo = uniqueID();
    let newTask = new task(newTaskTitle, desc, dueDate, priority, false, tempo);
    allProjects[currentProject].tasks.push(newTask);
    document.getElementById('foram').className="hide";
    displayGivenTasks();
}

function onClickAddTask(){
    document.getElementById('foram').className="input";
}