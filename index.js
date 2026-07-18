const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())
const tasks = [
    {id:1,name:"Task 1",done:true},
    {id:2,name:"Task 2",done:true},
    {id:3,name:"Task 3",done:false},
]
app.get('/', (req, res) => {
  res.status(200).json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
});

app.get('/health', (req, res) => {
  res.status(200).json({ "status": "ok"});
});

app.get('/tasks', (req, res) => {
  res.status(200).send(tasks);
});

app.get('/task/:id', (req, res) => {
    var task = tasks.find(t => t.id == req.params.id)
    if(task){
        res.status(200).send(task)
    }else{
        res.status(404).json({ "error": `Task ${req.params.id} not found` })
    }
})


app.post('/tasks', (req, res) => {
    var task = req.body
    if(task.title === ""){
        res.status(400).send({})

    }else{
        tasks.push(task)
        res.status(201).send(task)
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});