function Createtasks(){
    this.inputTasks = document.querySelector('.input-tasks');
    this.btnTasks = document.querySelector('.btn-tasks');
    this.tasks = document.querySelector('.tasks');

    this.start = () => {
        this.captureEnter();
        this.btnTasks();
        this.btnDelete();
        this.addTasksSaved();
    }

    this.createTasks = (textInput) => {
        const li = this.createLi();
        li.innerText = textInput;
        this.tasks.appendChild(li);
        this.cleanText();
        this.createBtnDelete(li);
        this.saveTasks();
    }

    this.saveTasks = () => {
        const liTask = this.tasks.querySelectorAll('li');
        const toDoTasks = [];

        for(let task of liTask){
            let taskText = task.innerText;
            taskText = taskText.replace('Delete', '').trim();
            toDoTasks.push(taskText);
        }
        const tasksJSON = JSON.stringify(toDoTasks);
        localStorage.setItem('tasks', tasksJSON);
        
    }

    this.addTasksSaved = () => {
        const tasks = localStorage.getItem('tasks');
        const toDoList = JSON.parse(tasks);
    
        for(let task of toDoList){
            this.createTasks(task);
        }
    }

    this.captureEnter = () =>{
        document.addEventListener('keypress', e => {
            if(e.keyCode !== 13 || !this.inputTasks.value) return;
            this.createTasks(this.inputTasks.value);
        })
    }

    this.btnDelete = () =>{
        document.addEventListener('click', e =>{
            const el = e.target;
            if(el.classList.contains('delete')) el.parentElement.remove();
            this.saveTasks();
        })
    }

    this.btnTasks = () => {
        document.addEventListener('click', e => {
            const el = e.target;
            if(!this.inputTasks.value) return;
            if(el.classList.contains('btn-tasks')) this.createTasks(this.inputTasks.value);
        })
    }

    this.createBtnDelete = (li) => {
        li.innerText += ' ';
        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.setAttribute('class', 'delete');
        button.setAttribute('title', 'Delete this task?')
        li.appendChild(button);
    }

    this.createLi = () => {
        const li = document.createElement('li');
        return li;
    }

    this.cleanText = () => {
        this.inputTasks.value = '';
    }
}
const task = new Createtasks();
task.start();