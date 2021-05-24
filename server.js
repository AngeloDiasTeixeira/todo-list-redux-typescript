const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3001;
const app = express();

// Serve static assets if in production
if(process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.use(cors());
app.use(express.json());

let todoListItems = [];

app.get("/api/todoListItems", (req, res) => {
    res.json(todoListItems);
});

app.post("/api/todoListItems", (req, res) => {
    let todoListItem = req.body;
    if(todoListItems.length==0) todoListItem.id = 1;
    else todoListItem.id = todoListItems[todoListItems.length - 1].id + 1;
    todoListItems.push(todoListItem);
    res.json(todoListItem);
});

app.delete("/api/todoListItems", (req, res) => {
    const ids = req.body.ids;
    for(let id of ids) {
        todoListItems.forEach((item,index,array) => {
            if(item.id == id) {
                array.splice(index,1);
            }
        });
    }
    res.json(todoListItems);
});

app.put("/api/todoListItems", (req, res) => {
    let todoListItem = req.body;
    todoListItems.forEach(item => {
        if(item.id == todoListItem.id) {
            item.title = todoListItem.title;
            item.description = todoListItem.description;
            item.completed = todoListItem.completed;
            res.end();
        }
    });
});

app.put("/api/todoListItems/markAllAsCompleted", (req, res) => {
    todoListItems.forEach(item => item.completed=true);
    res.json(todoListItems);
});

app.put("/api/todoListItems/markAllAsNotCompleted", (req, res) => {
    todoListItems.forEach(item => item.completed=false);
    res.json(todoListItems);
});

app.listen(port, () => {
    console.log("SERVER IS RUNNING");
});