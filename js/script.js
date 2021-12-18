const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

const toDoData = []

const checkLocalStorage = function () {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    toDoData.push(JSON.parse(localStorage.getItem(key)))
    console.log(key);
    render()
  }
}


const render = function () {
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''

  toDoData.forEach(function (item, index) {
    localStorage.setItem(item.text, JSON.stringify(item))
    const li = document.createElement('li');
    li.classList.add('todo-item')

    li.innerHTML = `
      <span class="text-todo">${item.text}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `

    if (item.completed) {
      todoCompleted.append(li)
    } else {
      todoList.append(li)
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed
      render()
    })

    li.querySelector('.todo-remove').addEventListener('click', function () {
      li.remove()
      toDoData.splice(index, 1)
      localStorage.removeItem(localStorage.key(item))
      render()
    })

  })
}

todoControl.addEventListener('submit', function (event) {
  event.preventDefault()

  if (headerInput.value.trim() === '' ) {
    alert('Введите Ваш новый план :-)')
  } else {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    }
    toDoData.push(newToDo)
    headerInput.value = ''

    render()
  }
})

checkLocalStorage();