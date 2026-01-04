const api = 'https://todo-app-backend-a6km.onrender.com/api/todo'
const input = document.getElementById('form')
const cardBody = document.querySelector('.card-body')


const btn = document.querySelector(".btn")
console.log('eze chibueze....')
btn.addEventListener("click", function(e){
    e.preventDefault()
    e.stopPropagation()
    console.log(input.value)
    postTodo()
    

})


async function getTodo() {
    try {
        const response = await fetch(api)
        const todos = await response.json()
        console.log(todos)
        displayTodo(todos)
        
    } catch (error) {
        console.log('error' ,error)
        
    }
   


}

 getTodo()

 async function  postTodo() {
    if( !input.value.trim()) return
    try {
        const response = await fetch(api,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:input.value
            })

           
        })
        console.log(response)

         await getTodo()  


        
    } catch (error) {
        console.error(error)
        
    }
    
}

 function displayTodo(todos){
     cardBody.innerHTML = '' 
    console.log(todos)
    todos.todo.forEach(i => {
       



        let taskjs = document.createElement('div') 
    let taskMainjs = document.createElement('div') 
    let taskCheckjs = document.createElement('div') 
    let taskDeletejs = document.createElement('div') 

    let checkImg = document.createElement('img')


    checkImg.src = "img/check.jpg"
   
    let deleteImg = document.createElement('img')
    deleteImg.src = "img/delete.webp"
   

    let h4js = document.createElement('h4') 
     taskjs.classList.add('task-con')
     taskjs.classList.add('my-2')
     taskjs.classList.add('bg-white')




    taskMainjs.classList.add('task-main')
    h4js.textContent = i.name
     if (i.com === "true") {
        h4js.classList.add('com')

        
    }
    taskMainjs.append(h4js)

    taskCheckjs.append(checkImg)
    taskCheckjs.classList.add('task-check')
    taskDeletejs.append(deleteImg)
    taskDeletejs.classList.add('task-delete')
    // h4js.classList.add('com')
   

    taskjs.append(taskMainjs)
    taskjs.append(taskCheckjs)
    taskjs.append(taskDeletejs)
    checkImg.style.width ='20px'
    deleteImg.style.width ='20px'
    cardBody.append(taskjs)

    taskDeletejs.addEventListener('click',()=>{
      
        deleteTodo(i.id)
    })
    

    taskCheckjs.addEventListener('click', (e)=>{

        if(i.com == 'false' || "0" ){
       let newstatus = 'true'
       comTodo(newstatus,i.id)
       return console.log(newstatus)
    }else if (i.com == 'true')
        {
        let newstatus = 'false'
        comTodo(newstatus ,i.id)
        return console.log(newstatus)   


    }
    
    
     

       
        
       

        
    })



        
    });

   
getTodo()
location.reload()

 }

 getTodo()


  
    
 
 
 async function deleteTodo(id){
    console.log(id)
   
    try {
        const response= await fetch(`${api}/${id}`,{
            method:'DELETE'
        })
        const result = await response.json()
        console.log(`delete ${result}`)
         await getTodo()  
       
        
    } catch (error) {
        console.log(error)
        
    }

  }

  async function comTodo( newstatus,id)  {
    console.log(newstatus,id)
   try {
    const response = await fetch(`${api}/${id}`,{
        method:'PATCH',
        headers:{
           'Content-Type':'application/json'

        },
        body:JSON.stringify({
            com:newstatus
        })
    })
    const data =await response.json()
    console.log(response)
 console.log(data)
  await getTodo()  

    
   } catch (error) {
    console.log(error)
    
   }


    
    

  
   

    
  } 

 

 

//  <div class="task-con my-2 bg-white">

//            <div class="task-main"> <h4>GO TO MEET ELON</h4></div>
//            <div class="task-check"><img src="img/check.jpg" style=" width: 20px;" alt=""></div>
//            <div class="task-delete"> <img src="img/delete.webp"  style="width: 20px;"></div>
//            <div class="task-edit"> <img src="img/delete.webp"  style="width: 20px;"></div>

//         </div>
