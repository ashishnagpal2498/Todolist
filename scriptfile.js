let list;
let listElements = []; //this is an empty array
//If delete , toh jo bhi saare elements checked hai delete that
// Filter the array basically
//Up down buttons are used as to swap the position of the task
window.onload = function () {
    list = document.getElementById('list')
    let addbtn = document.getElementById('add-btn')
    let deletebtn = document.getElementById('del-btn')
    let addnewtodo = document.getElementById('add-new-todo')
    console.log(list);


    let list_div_item = document.getElementById('list-item')
    console.log(list_div_item)
    deletebtn.addEventListener('click',deletechecked)

    addbtn.onclick = function () {
        let todoval = addnewtodo.value;
        addTodo(todoval);
        showTodo();

    }

    function addListItem(task,done_val,id) {
        let listitem = document.createElement('li');
        listitem.className ="list-group-item"
        listitem.classList.add('mt-1','mb-1')
        listitem.innerHTML= `
                            <div class="row">
                    </div>`
        listitem.setAttribute('data-id',id)
        let Check_box = document.createElement('input');
        Check_box.setAttribute('type','checkbox')
        Check_box.className="col-1"

        Check_box.onchange = strikethrough;
        let taskSpan= document.createElement('span')
        taskSpan.className ="col-6"
        taskSpan.innerText = task
        if(done_val)
        {
            Check_box.setAttribute('checked',true);
            taskSpan.style.textDecoration = "line-through";
        }

        let deleteBTN = document.createElement('button')
        deleteBTN.className = "col-1 ml-1 mr-1 btn btn-danger";
        deleteBTN.innerText="X"
        deleteBTN.onclick = deleteTodo;

        let upmovementBTN = document.createElement('button')
            upmovementBTN.className = "col-1 mr-1 ml-1 btn btn-info";
        upmovementBTN.innerText="Up"
        upmovementBTN.onclick = switchup;

        let downmovementBTN = document.createElement('button')
        downmovementBTN.className = "col-1 ml-1 mr-1 btn btn-info";
        downmovementBTN.innerText="Down"
        downmovementBTN.onclick = switchdown;
    let emptyspace = document.createElement('div')
        emptyspace.className = "col-1 mr-1 ml-1"
        let arrsize = listElements.length;
        let divele = listitem.childNodes[1];
        divele.classList.add('p-1')
        divele.appendChild(Check_box);
        divele.appendChild(taskSpan)
        divele.appendChild(deleteBTN)
        //console.log(id);
        if(id != 0)
        {
            divele.appendChild(upmovementBTN);}
            else{
            divele.appendChild(emptyspace);
        }
        if(id != arrsize-1) {
            divele.appendChild(downmovementBTN)
        }
        else{
            divele.appendChild(emptyspace)
        }

 //       divele.childNodes[3].innerHTML = task;
        list.appendChild(listitem)
    }

    //this function creates todos again and again
    function showTodo() {
        list.innerHTML="";//it successively creates new list again and again
        // list.className ="list-group"
        for(i in listElements)
        {
            addListItem(listElements[i].task,listElements[i].done,i)
        }
    }

    //This function creates an object and add it to list element
    function addTodo(val) {
        let newTask = {
            task:val,
            done:false
        }
        listElements.push(newTask)
    }
    function deleteTodo(event) {
        let index = event.target.parentElement.parentElement.getAttribute('data-id');
        console.log(index);
        listElements.splice(index,1);
        showTodo();
    }
    function strikethrough(event) {
        let index = event.target.parentElement.parentElement.getAttribute('data-id');
        //console.log(index);
        listElements[index].done = event.target.checked
        showTodo();
    }
    function switchup(event) {
        let index = event.target.parentElement.parentElement.getAttribute('data-id');
        //console.log(index);
       for(item in listElements) {
            if(item == index)
            {  //console.log("inside if")
                let temp = listElements[item-1];
                listElements[item-1] = listElements[item];
                listElements[item] = temp;
            }
        }
        showTodo();
    }
    function switchdown(event) {
        let index = event.target.parentElement.parentElement.getAttribute('data-id');
        //console.log(index);
        for(item in listElements) {
            if(item == index)
            {
                let temp = listElements[item];
                listElements[item] = listElements[+item+1];
           // console.log(listElements[item]);
                listElements[+item+1] = temp;
                break;
            }
        }
        showTodo();
    }
    function deletechecked() {
      listElements =  listElements.filter(function (item) {
            return item.done!== true
        })
    showTodo();
    }

}