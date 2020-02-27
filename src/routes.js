const express = require('express')
const connectDB = require('./public/js/connection')

const router = express.Router()

const conn = connectDB()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/get_todos', (req, res) => {
    const queryString = "SELECT * FROM todos"
    conn.query(queryString, (err, rows, fields) =>{
        if(err){
            console.log('failed to query ' + err)
            res.send("Opps!! Something went wrong. Site will be up soon!!")
        }
        else{
            res.render('getTodos', {data:rows})
        }
    })
    
})

router.post('/add_todo', (req, res) => {
    const todo = req.body.add_todo_input
    const queryString = "INSERT INTO todos (todo) VALUES (?)"
    if(todo !== ""){
        conn.query(queryString, [todo], (err, rows, fields)=>{
            if(err){
                res.send("Opps!! Something went wrong. Site will be up soon!!")
                console.log("failed to insert" + err);
            }
            else{
                res.redirect('/get_todos')
            }
        })
    }
    else{
        console.log("input is empty");
        res.redirect('/get_todos')
    }
    
})

router.post('/update_todo/:id', (req, res) => {
    const todo_id = req.params.id
    const queryString = "UPDATE todos SET complete = '1' WHERE todo_id= ?"

    conn.query(queryString, [todo_id], (err, rows, fields)=>{
        if(err){
            res.send("Opps!! Something went wrong. Site will be up soon!!")
            console.log("failed to update" + err);
        }
        else{
            res.redirect('/get_todos')
        }
    })
})

router.post('/delete_todo/:id', (req, res) => {
    const todo_id = req.params.id
    const queryString = "DELETE FROM todos WHERE todo_id= ?"

    conn.query(queryString, [todo_id], (err, rows, fields)=>{
        if(err){
            res.send("Opps!! Something went wrong. Site will be up soon!!")
            console.log("failed to delete" + err);
        }
        else{
            res.redirect('/get_todos')
        }
    })
})

router.get('*', (req, res)=>{
    res.render('404')
})

module.exports = router
