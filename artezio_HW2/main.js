let inputCreate = document.getElementById("input-create");
let buttonCreate = document.getElementById("btn-create");
let list = document.getElementById("todo-list");

let doneList = document.getElementById("done-list");

buttonCreate.addEventListener('click', function(){
  let value = inputCreate.value;
  if(/\S/.test(value)){ // TASK 1 - сделано с помощью регул. выражения
    addItemToDom(value);
    inputCreate.value = '';
  }
})

function addItemToDom(value){
    let itemView = `
      <div class="item">
        <span class="item-text">${value}</span>
        <span class="secondary-content">
          <div class="item-btn item-btn-del btn-floating btn-small waves-effect waves-light red">x</div>
        </span>
      </div>`;

    let item = document.createElement('li');
    //класс, который я не вспомнил на уроке
    item.classList = 'collection-item';
    item.innerHTML = itemView;

    //добавим слушатель для удаления
    let buttonDelete = item.getElementsByClassName('item-btn-del')[0];
    buttonDelete.addEventListener('click', addToDone);
  
    list.appendChild(item);
}

function addToDone(event){
  let item = event.target.parentNode.parentNode.parentNode;
  let value = item.getElementsByClassName('item-text')[0].innerText;
  let doneItemView = `
      <div class="item">
        <span class="item-text">${value}</span>
      </div>`;
  let doneItem = document.createElement('li');
  doneItem.classList = 'collection-item finished';
  doneItem.innerHTML = doneItemView;
  doneList.appendChild(doneItem);
  let filter = inputSearch.value;
  if((/\S/.test(filter)) && (value.indexOf(filter) === -1))
    doneItem.style.display="none";
  list.removeChild(item);
}

let inputSearch = document.getElementById("input-search");

inputSearch.addEventListener('input', searchTasks);

function searchTasks(event){
  let value = inputSearch.value;
  let eachDone = document.getElementsByClassName('finished');
  for(let i = 0; i < eachDone.length; i++) {
    if(eachDone[i].innerText.indexOf(value) > -1)
      eachDone[i].style.display="";
    else
      eachDone[i].style.display="none";
  }
  
}