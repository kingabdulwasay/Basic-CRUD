const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())
const tasks = [
    {id:1,name:"Task 1",done:true},
    {id:2,name:"Task 2",done:true},
    {id:3,name:"Task 3",done:false},
]
// app.use('/docs',)
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

app.put('/task/:id', (req, res) => {
    var newTask = req.body
    var index = tasks.findIndex(t => t.id == req.params.id)
    if(newTask.title === ""){
        res.status(400).send({})

    }else if(index === -1){
        res.status(404).json({ "error": `Task ${req.params.id} not found`})

    }else{
        tasks[index] = newTask
        res.status(201).send({"Updated": newTask })
    }
})

app.delete('/task/:id', (req, res) => {
    var id = req.params.id
    var index = tasks.findIndex(t => t.id == id)
    if(index === -1){
        res.status(404).json({ "error": `Task ${id} not found` })

    }else{
        tasks.splice(index, 1)
        res.status(204).send()
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});