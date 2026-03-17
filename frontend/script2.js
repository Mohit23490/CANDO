
const todo = document.querySelector("#todo")
const recent = document.querySelector("#recent")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll(".task")
const addtaskbtn = document.querySelector("nav .right button")
const submitbtn = document.querySelector(".internal button")
const page1 = document.querySelector(".addnew")
const page2 = document.querySelector(".center")
const h1 = document.querySelector(".header .todo")
const h2 = document.querySelector(".header .recent")
const h3 = document.querySelector(".header .done")

const columns = [todo,recent,done]
let dropelement = null;
let taskdata={};
tasks.forEach((elem) => {
    elem.addEventListener("drag",(e)=>{
          dropelement = elem;
    })
});


// function createelment 
function Createlement(title , desc , column ,id){
    
     const div = document.createElement("div")
     div.classList.add("task")
     div.setAttribute("draggable","true")
     div.innerHTML= `<h3>${title}</h3>
     <p>${desc}</p>
     <button id=${id}>Delete</button>`

     
     column.appendChild(div);

     
    let Delbtn = div.querySelector(".task button")
    Delbtn.addEventListener("click",()=>{
        const id = Delbtn.id
        deleteTask(id)
        div.remove();
        countasks();
    })
    div.addEventListener("drag",(e)=>{
          dropelement = div;
    })
    countasks();
    return div;
}

// to delete button in data base
      async function deleteTask(id) {
        const response = await fetch(`https://cando-backend.onrender.com/api/data/${id}`, {
        method: "DELETE"
        })
        const data = await response.json()
        //   console.log(data)
        }



// this is for select background borderd and drag element from one to another place 
 function transferElement(column) {
column.addEventListener("dragenter",(e)=>{
    column.classList.add("hover-over");
})
column.addEventListener("dragleave",(e)=>{
    column.classList.remove("hover-over");
})
// drag over and drop are interrelated be like jab tak element chodo ga nahi to wo gira ga kaise 
column.addEventListener("dragover",(e)=>{
    e.preventDefault();
})
column.addEventListener("drop",(e)=>{
    column.appendChild(dropelement);
    column.classList.remove("hover-over");
    countasks();
})
}

transferElement(todo);
transferElement(recent);
transferElement(done);

// this is just to minimize the page that shows in the home page  
addtaskbtn.addEventListener("click", ()=>{
     page1.classList.add("active")
})
page2.addEventListener("click", ()=>{
     page1.classList.remove("active")
})



// here using add button we to make div and append it and some drag also 
submitbtn.addEventListener("click",()=>{
     const title = document.querySelector(".internal input").value
     const desc = document.querySelector(".internal textarea").value

     Createlement(title, desc , todo)
         
     
     page1.classList.remove("active")

     document.querySelector(".internal input").value = " "
     document.querySelector(".internal textarea").value = " "
})

// now make count opiton see what happens with that 
async function countasks(){
    // columns.forEach(elem =>{
    for (const elem of columns) {
    const tasks = elem.querySelectorAll(".task")
    const count = elem.querySelector(".column-top .right")
    count.innerHTML = tasks.length;
    taskdata[elem.id]=Array.from(tasks).map(element =>{
        return{
                title:element.querySelector("h3").innerHTML,
                desc:element.querySelector("p").innerHTML
        }
    })
}
const response = await fetch("https://cando-backend.onrender.com/api/data/", {
method: "POST",                        
headers: {
  "Content-Type": "application/json"   
},
body: JSON.stringify(taskdata)
});
const data = await response.json();
console.log(data);
}

async function getData() {
    const response = await fetch("https://cando-backend.onrender.com/api/data/get")
    const task = await response.json()
    for (const key in task) {
         const column = document.querySelector(`#${key}`)
           task[key].forEach(element => {
                Createlement(element.title,element.desc,column,element.id)
           });
           countasks();
     }
}
getData();
h1.addEventListener("mouseenter", function(){
    h1.classList.add("active")
    h2.classList.remove("active")
    h3.classList.remove("active")
    recent.style.display="none"
    done.style.display="none"
    todo.style.display="block"
})

h2.addEventListener("mouseenter", function(){
    h2.classList.add("active")
    h1.classList.remove("active")
    h3.classList.remove("active")
    recent.style.display="block"
    done.style.display="none"
    todo.style.display="none"
})

h3.addEventListener("mouseenter", function(){
    h3.classList.add("active")
    h1.classList.remove("active")
    h2.classList.remove("active")
     recent.style.display="none"
    done.style.display="block"
    todo.style.display="none"
})
h1.addEventListener("dragover",(e)=>{
    e.preventDefault();
})
h1.addEventListener("drop",(e)=>{
    todo.appendChild(dropelement);
    todo.classList.remove("hover-over");
    countasks();
})
h2.addEventListener("dragover",(e)=>{
    e.preventDefault();
})
h2.addEventListener("drop",(e)=>{
    recent.appendChild(dropelement);
    recent.classList.remove("hover-over");
    countasks();
})
h3.addEventListener("dragover",(e)=>{
    e.preventDefault();
})
h3.addEventListener("drop",(e)=>{
    done.appendChild(dropelement);
    done.classList.remove("hover-over");
    countasks();
})
