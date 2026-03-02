function updateClock(){
    const now=new Date();
    document.getElementById("clock").innerText=now.toLocaleTimeString();

    const hour=now.getHours();
    let greet="Good Evening";
    if(hour<12) greet="Good Morning";
    else if(hour<18) greet="Good Afternoon";

    document.getElementById("greeting").innerText=greet;
}
setInterval(updateClock,1000);
updateClock();

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function addTask(){
    const input=document.getElementById("taskInput");
    if(input.value==="") return;
    tasks.push({text:input.value,done:false});
    input.value="";
    updateTasks();
}

function updateTasks(){
    const list=document.getElementById("taskList");
    list.innerHTML="";
    tasks.forEach((t,i)=>{
        const li=document.createElement("li");
        li.innerHTML=`
            <span onclick="toggleTask(${i})" style="cursor:pointer;text-decoration:${t.done?'line-through':'none'}">
            ${t.text}</span>
            <button onclick="deleteTask(${i})">X</button>
        `;
        list.appendChild(li);
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    updateProgress();
}

function toggleTask(i){
    tasks[i].done=!tasks[i].done;
    updateTasks();
}

function deleteTask(i){
    tasks.splice(i,1);
    updateTasks();
}

function saveNote(){
    const note=document.getElementById("noteInput").value;
    if(note==="") return;
    let notes=JSON.parse(localStorage.getItem("notes"))||[];
    notes.push(note);
    localStorage.setItem("notes",JSON.stringify(notes));
    document.getElementById("noteInput").value="";
    displayNotes();
}

function displayNotes(){
    const notes=JSON.parse(localStorage.getItem("notes"))||[];
    const container=document.getElementById("notes");
    container.innerHTML="";
    notes.forEach(n=>{
        const div=document.createElement("div");
        div.innerText=n;
        div.style.margin="5px 0";
        container.appendChild(div);
    });
}

let goal=0;

function setGoal(){
    goal=parseInt(document.getElementById("goalInput").value);
    updateProgress();
}

function updateProgress(){
    if(goal===0) return;
    let completed=tasks.filter(t=>t.done).length;
    let percent=(completed/goal)*100;
    if(percent>100) percent=100;
    document.getElementById("progressBar").style.width=percent+"%";
}

const quotes=[
"Push yourself, because no one else will.",
"Dream big. Work hard.",
"Discipline beats motivation.",
"Success is built daily."
];

function newQuote(){
    const random=Math.floor(Math.random()*quotes.length);
    document.getElementById("quote").innerText=quotes[random];
}

function toggleTheme(){
    document.body.classList.toggle("light");
}

updateTasks();
displayNotes();