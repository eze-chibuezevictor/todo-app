const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./fourthtodo.db', sqlite3.OPEN_READWRITE, connected )
db.configure('busyTimeout',5000)



function connected(){


    console.log('connected')
}
let sql =`CREATE TABLE IF NOT EXISTS todo(
todoId INTEGER PRIMARY KEY,
todoName TEXT NOT NULL,
todoCom TEXT DEFAULT 'false'


)`

db.run(sql,[], (err)=>{
     if(err){
         console.log('error creating enemies table' , err)
             return
        
     }
     console.log('TABLE CREATED')

 })

 module.exports =db
