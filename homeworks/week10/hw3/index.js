
"use strict";$(document).ready(function(e){var list=[];function render(){$('.todo-list__output').empty();for(var i=0;i<list.length;i++){$('.todo-list__output').append("\n      <li class=\"todo-list__item\">".concat(list[i],"\n        <input class=\"todo-list__id\" type=\"hidden\" value=\"").concat(i,"\">\n        <button class=\"todo-list__complete\">complete</button>\n        <button class=\"todo-list__delete\">delete</button>\n      </li>"));}}
function addTodo(todo){list.push(todo);render();}
function removeTodo(id){id=Number(id);var listAfter=[];for(var i=0;i<list.length;i++){if(i!==id){listAfter.push(list[i]);}}
list=listAfter;render();}
function completeTodo(target){target.parent().toggleClass('complete');}
$('.todo-list__input').on('submit',function(e){e.preventDefault();var todo=$('.todo-list__content').val();if(todo)addTodo(todo);$('.todo-list__content').val('');});$('.todo-list__output').on('click',function(e){e.preventDefault();if($(e.target).html()==='delete'){var id=$(e.target).parent().find('.todo-list__id').val();removeTodo(id);}else if($(e.target).html()==='complete'){completeTodo($(e.target));}});});