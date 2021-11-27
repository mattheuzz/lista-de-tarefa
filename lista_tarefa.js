const inputTask = document.querySelector('#item-lista')
const btnTask = document.querySelector('.btn-tarefa')
const task = document.querySelector('.tarefas')

inputTask.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if (!inputTask.value){
            return
        }else{
            creatTask(inputTask.value)
        }
        
    }
})

function creatButon(li){
    li.innerText += ' '
    const clearButton = document.createElement('button')
    clearButton.innerText = 'Apagar'
    clearButton.setAttribute('class', 'clear')
    li.appendChild(clearButton)
}

function cleanInput(){
    inputTask.value = ''
    inputTask.focus()
}

function creatLi(){
    const li = document.createElement('li')
    return li
}

function creatTask(txtInput){
    const li = creatLi()
    li.innerText = txtInput
    task.appendChild(li)
    cleanInput()
    creatButon(li)
    saveTask()
}  

btnTask.addEventListener('click', function(e){
    if (!inputTask.value){
        return
    }
    creatTask(inputTask.value)
})

document.addEventListener('click', function(e){
    const el = e.target
    
    if (el.classList.contains('clear')){
        el.parentElement.remove()
        saveTask()
    }
})

function saveTask(){
    const liTask = task.querySelectorAll('li')
    const listTask = []

    for(let tasks of liTask){
        let tasksTxt = tasks.innerText
        tasksTxt = tasksTxt.replace('Apagar', '').trim()
        listTask.push(tasksTxt)
    }
    const taskJSON = JSON.stringify(listTask)
    console.log(taskJSON)
    localStorage.setItem('tasks', taskJSON)
}

function addSaveTask(){
    const tasks = localStorage.getItem('tasks')
    const listTask = JSON.parse(tasks)
    console.log(listTask)

    for(let task of listTask){
        creatTask(task)
    }
}

addSaveTask()