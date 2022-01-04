//Selectors
const listContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]');
const taskBody = document.querySelector('.todo');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] //the whole reason we need to change this to an object is because we need to know if it's the "active" list or not, need id to do that.
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY)

//Functions
const render = () => {
    clearElement(listContainer)
    renderLists()

    const selectedList = lists.find(list => list.id === selectedListId)
    console.log(selectedList);
    if (selectedList == null) {
        listDisplayContainer.style.display = 'none';
        clearElement(tasksContainer);
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.name
        renderTaskCount(selectedList);
        clearElement(tasksContainer);
        renderTasks(selectedList);
    }

}

const renderTasks = (selectedList) => {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        tasksContainer.appendChild(taskElement);
    })
}

const renderLists = () => {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.classList.add('list__item')
        listElement.innerText = list.name
        listContainer.appendChild(listElement) // if we don't append, we just have a li item, not a li item that is within the ul
        if (list.id === selectedListId) {
            listElement.classList.add('list__item--active');
        }
        listElement.dataset.listId = list.id
    });
}

const renderTaskCount = (selectedList) => {
    const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTaskCount === 1 ? "Task" : "Tasks";
    listCountElement.innerText = `${incompleteTaskCount}\n${taskString}`;
    
}

const clearElement = (element) => {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    };
}

const createList = (name) => {
    return { id: Date.now().toString(), name: name, tasks: [] };
}

const save = () => {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedListId);
}

const saveAndRender = () => {
    save()
    render()
}

const createTask = (name) => {
    return { id: Date.now().toString(), name: name, complete: false};
}

//EventListeners
newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value 
    if (listName == null || listName === "") return
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    saveAndRender() //changed this from just render(), to saveAndRender()
});

listContainer.addEventListener('click', e =>{
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender();
    };
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedList)
    }
})

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
})

clearCompleteTasksButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value 
    if (taskName == null || taskName === "") return
    const task = createTask(taskName);
    newTaskInput.value = null;
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(task);
    saveAndRender() //changed this from just render(), to saveAndRender()
});

render()

