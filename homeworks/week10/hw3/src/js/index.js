$(document).ready(function(e) {
  let list = []
  function render(){
    $('.todo-list__output').empty() 
    for (let i=0;i<list.length;i++) {
      $('.todo-list__output').append(`
      <li class="todo-list__item">${list[i]}
        <input class="todo-list__id" type="hidden" value="${i}">
        <button class="todo-list__complete">complete</button>
        <button class="todo-list__delete">delete</button>
      </li>`)
    }
  }
  function addTodo(todo) { 
    list.push(todo)
    render()
  }
  function removeTodo(id) { 
    id = Number(id)
    let listAfter = []
    for(let i=0; i<list.length; i++) {
      if(i!==id) {
        listAfter.push(list[i])
      } 
    }
    list = listAfter
    render()
  }
  function completeTodo(target) {
    target.parent().toggleClass('complete')
  }
  $('.todo-list__input').on('submit', e => {
    e.preventDefault()
    let todo = $('.todo-list__content').val()
    if (todo) addTodo(todo)
    $('.todo-list__content').val('')
  }) 
  $('.todo-list__output').on('click', e => { 
    e.preventDefault()
    if ($(e.target).html()==='delete') {
      let id = $(e.target).parent().find('.todo-list__id').val()
      removeTodo(id) 
    } else if ($(e.target).html()==='complete') {
      completeTodo($(e.target))
    } 
  })
}) 
