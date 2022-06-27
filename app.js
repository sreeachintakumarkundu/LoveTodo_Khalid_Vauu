const todoInput=document.querySelector('.todoInput')
const form = document.querySelector('.form')
const tudos= document.querySelector('.tudos ul')

const editTodos=document.querySelector('.editTodos')
const deleteTodo=document.querySelector('.deleteTodo')

const getTodos=()=>{
    const todos= JSON.parse(localStorage.getItem('todos'))
    let allTodos=''
    todos.forEach((todo,index) =>{
         const newTodo=`
        
        <li class= "sTudo">
            <span>${todo.text}</span> 
             <div class="icons">
                <img  class="editTodos" src="001-document-editor.png" alt="" data-id=${index}>
                 <img class="deleteTodo" src="003-delete.png" alt="" data-id=${index}>        
             </div>
          </li>

        `
       
        allTodos +=newTodo
    })
    tudos.innerHTML= allTodos
}

const addTodo=(text)=>{   
    if(text){
       
        let oldTodos= JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')):[]
       
        localStorage.setItem('todos',JSON.stringify([...oldTodos,{text}]))

        todoInput.value=''
        todoInput.focus()
        getTodos()
    }
}

const editTodo= (text)=>{
    let newTudo=prompt('eidt todo', text.trim())
    if(!newTudo){
        newTudo=prompt('eidt todo', text.trim())
    }else{
        return newTudo
    }
}

tudos.addEventListener('click', (e) =>{
    if(e.target.classList.contains('sTudo')){
        e.target.classList.toggle('conpleteTodo')
    }
    if(e.target.nodeName === "SPAN"){
            e.target.classList.toggle('conpleteTodo')
    }
    if(e.target.classList.contains('deleteTodo')){
         const id=  e.target.getAttribute('data-id')
        let allTodos= JSON.parse(localStorage.getItem('todos'))?JSON.parse(localStorage.getItem('todos')):[]

        allTodos.splice(Number(id),1)
        localStorage.setItem('todos',JSON.stringify(allTodos))
        getTodos()
    }
    if(e.target.classList.contains('editTodos')){
        const editedTodo= editTodo(e.target.parentElement.parentElement.innerText)
       
        const id=  e.target.getAttribute('data-id')
        let allTodos= JSON.parse(localStorage.getItem('todos'))?JSON.parse(localStorage.getItem('todos')):[]

        allTodos.splice(Number(id),1,{text:editedTodo})
        localStorage.setItem('todos',JSON.stringify(allTodos))
        getTodos()
  
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo(todoInput.value)

})


getTodos()
