const express = require('express')
const app = express()

app.use(express.json())

let items = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
]

/* Root endpoint */
app.get('/', (req,res)=>{
    res.send("Hello from Jenkins Docker CI/CD")
})

/* GET all items */
app.get('/items', (req,res)=>{
    res.json(items)
})

/* GET single item */
app.get('/items/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const item = items.find(i => i.id === id)

    if(!item){
        return res.status(404).json({message:"Item not found"})
    }

    res.json(item)
})

/* POST create item */
app.post('/items', (req,res)=>{
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    }

    items.push(newItem)

    res.status(201).json({
        message: "Item created",
        item: newItem
    })
})

/* PUT update item */
app.put('/items/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const item = items.find(i => i.id === id)

    if(!item){
        return res.status(404).json({message:"Item not found"})
    }

    item.name = req.body.name

    res.json({
        message:"Item updated",
        item:item
    })
})

/* DELETE item */
app.delete('/items/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const index = items.findIndex(i => i.id === id)

    if(index === -1){
        return res.status(404).json({message:"Item not found"})
    }

    const deleted = items.splice(index,1)

    res.json({
        message:"Item deleted",
        item:deleted[0]
    })
})

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})
