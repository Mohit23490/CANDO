
const todo = document.querySelector("#todo")
const recent = document.querySelector("#recent")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll(".task")
const addtaskbtn = document.querySelector("nav .right button")
const submitbtn = document.querySelector(".internal button")
const page1 = document.querySelector(".addnew")
const page2 = document.querySelector(".center")
const columns = [todo,recent,done]
let dropelement = null;
let taskdata={};
tasks.forEach((elem) => {
    elem.addEventListener("drag",(e)=>{
          dropelement = elem;
    })
});


// function createelment 
function Createlement(title , desc , column){
    
     const div = document.createElement("div")
     div.classList.add("task")
     div.setAttribute("draggable","true")
     div.innerHTML= `<h3>${title}</h3>
     <p>${desc}</p>
     <button>Delete</button>`

     
     column.appendChild(div);

     
    let Delbtn = div.querySelector(".task button")
    Delbtn.addEventListener("click",()=>{
        div.remove();
        countasks();
    })
    div.addEventListener("drag",(e)=>{
          dropelement = div;
    })
    countasks();
    return div;
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
transferElement(done)


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
function countasks(){
    columns.forEach(elem =>{
    const tasks = elem.querySelectorAll(".task")
    const count = elem.querySelector(".column-top .right")
    count.innerHTML = tasks.length;
    taskdata[elem.id]=Array.from(tasks).map(element =>{
        return{
                title:element.querySelector("h3").innerHTML,
                desc:element.querySelector("p").innerHTML
        }
    })
    localStorage.setItem("data",JSON.stringify(taskdata))
})
}

// now here we retrive the data that we store in localStroage
if(localStorage.getItem("data")){
    
    const task = JSON.parse(localStorage.getItem("data"));
    console.log(task)
     for (const key in task) {
         const column = document.querySelector(`#${key}`)
         console.log(column)
         console.log(key)
           task[key].forEach(element => {
                Createlement(element.title,element.desc,column)
           });
           console.log(task[key]);
           countasks();
     }
}