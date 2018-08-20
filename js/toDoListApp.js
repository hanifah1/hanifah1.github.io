function addItem() {
    var newItemText = document.getElementsByTagName('input')[0].value;

    document.getElementsByTagName('input')[0].value = '';
    var newItem = document.createElement('li');

    newItem.innerHTML = newItemText;

    document.getElementById('todoList').appendChild(newItem);
  	newItem.addEventListener('click', completeItem);
}

function completeItem() {
removeItemFromTodos(this);
addItemToCompleted(this); 
}

function removeItemFromTodos (itemElement) {
	document.getElementById('todoList').removeChild(itemElement);  
}

function addItemToCompleted (itemElement) {
  	document.getElementById('completedList').appendChild(itemElement);
}

document.getElementsByTagName('button')[0].addEventListener('click', addItem);