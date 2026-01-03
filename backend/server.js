const express = require('express')
const app = express()
const PORT = 9000
const cors = require('cors')
app.use(cors())
app.use(express.json())
let db = require('./connect.js')
db.configure('busyTimeout',5000)
const path = require('path')  // ADD THIS
app.use(express.json())

// SERVE STATIC FILES FROM FRONTEND FOLDER
app.use(express.static(path.join(__dirname, '../frontend/bootstrap-5.2.3-dist')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/bootstrap-5.2.3-dist/index.html'))
})


app.get('/api/todo',(req,res)=>{
    let sql = 'SELECT * FROM todo'
    let data = {todo:[]}
    try{
        db.all(sql,[],(err,rows) =>{
            if(err){
               return   console.log(err)
            }
            rows.forEach((row)=>{
                data.todo.push({ id:row.todoId, name:row.todoName, com:row.todoCom})

            })
            
        return res.send(data)
        })
    }catch(err){
         return  console.log('this is a fucking promblem')

    }
   
})

app.get('/api/todo/:id',(req,res) =>{
    const todoId = req.params.id
    console.log(todoId)
    let sql =`SELECT todoCom, todoName, todoId FROM todo WHERE  todoId = ?`
    db.get(sql,[todoId] ,(err,row)=>{
         
        if(err){
           return console.log('database error',err)
            return res.status(500).json({error :'database is not found'})
           
        }
        if(!row){
                        return res.status(404).json({error :'todo not found'})

        }
       return  res.json({id: row.todoId , name:row.todoName, com: row.todoCom})
        
            })
            

    })



app.post('/api/todo',(req,res)=>{
       const sql = 'INSERT INTO  todo( todoName,todoCom) VALUES (?,?)'
       let name = req.body.name
       let com = req.body.com
     
       let fcom = (com && com.trim().length> 0) ? com : false
         console.log(` fcom ${fcom}`)
      
       

      try{
         db.run(sql,[name, fcom], function(err){
             if(err) {
           return console.log('database error',err)
        }
       let  newID = this.lastID
        res.status(201)
        let data = {status:201, message: `${newID}`}
        
        return res.send(data)

         })
      }catch(err){
       return  console.log('this is a fucking promblem')


      }


   
})


app.patch('/api/todo/:id',(req,res)=>{
   
       res.set('content-type', 'application/json')
       const sql =`UPDATE todo  SET todoCom = ?  WHERE todoId= ? `

        let name = req.body.name
       let com = req.body.com

     
       let fcom = (com && com.trim().length> 0 ) ? com : 'false'
        

        db.run(sql,[ fcom,req.params.id], function(err){
       
      if(err){
         return res.status(400).send(err)
      }
      res.json({
        message:'Update done',

      })
       })




})

app.delete('/api/todo/:id',(req,res)=>{
    console.log(req.params.id)

     res.set('content-type', 'application/json')
   const sql = ' DELETE FROM todo WHERE todoId = ?';

   try{
    db.run(sql,[req.params.id], function(err){
        if(err)  throw err
        console.log(this.changes,req.params.id)
        // if(this.changes === 1 ){
        //    return   res.status(200).send(`${req.params.id} was removed`)
        // }else{
        //   return  res.send("{message :'no operation needed'}")
        // }
        return  res.send("{message e do go}")
        
    })

   }catch(err){
     console.log(err.message)
   return  res.send('a bug has eaten ur data bro/sis ')

   }

    

   
   
})


app.listen(PORT,()=>{
    console.log(`${PORT}`)
})