const express = require('express');
const app = express();
const crypto = require('crypto');
app.use(express.json());
const PORT = 3000;
const data = [];

app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(
        JSON.stringify({
            "status": 200,
            "message": "Users list Fetch Successfully",
            "data": data
        })
    )
});
app.post('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if (typeof body?.name !== "string" ||
        !body.name.trim()) {
        res.statusCode = 400;
        return res.send(
            JSON.stringify({
                "status": 400,
                "message": "Name is required"
            })
        )
    }
    const newUser = { ...body, id: crypto.randomUUID() }
    data.push(newUser);
    res.statusCode = 201;
    return res.send(
        JSON.stringify({
            "status": 201,
            "message": "Users Created Successfully",
            "data": newUser
        })
    )
});
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const filterData = data.find((item) => item.id == id);
    res.setHeader('Content-Type', 'application/json');
    if (!filterData) {
        return res.status(404).json({
            "status": 404,
            "message": "User Not Found"
        })
    }
    res.statusCode = 200;
    res.send(
        JSON.stringify({
            "status": 200,
            "message": "User Fetch Successfully",
            "data": filterData
        })
    )
});
app.delete('/users/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    const findIndex = data.findIndex((item) => item.id == id);
    if (findIndex === -1) {
        return res.status(404).json({
            "status": 404,
            "message": "User Not Found"
        })
    }
    data.splice(findIndex, 1);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.send(
        JSON.stringify({
            "status": 200,
            "message": "User Delete Successfully"
        })
    )
});
app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const index = data.findIndex((item) => item.id == id);
    if (index === -1) {
        res.statusCode = 404;
        return res.status(404).json({
            "status": 404,
            "message": "User Not Found"
        })
    }
    if (
        req.body.name !== undefined &&
        (
            typeof req.body.name !== "string" ||
            !req.body.name.trim()
        )
    ) {
        return res.status(400).json({
            status: 400,
            message: "Name must be a non-empty string"
        });
    }
    data[index] = { ...data[index], ...req.body, id: data[index].id }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(
        JSON.stringify({
            "status": 200,
            "message": "User Update Successfully"
        })
    )
})
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})