const http = require('http');
const crypto = require('crypto');
const PORT = 3000;
const data = [];

//SEVER CREATE
const app = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost:3000");
    res.setHeader("Content-Type", "application/json");

    //GET
    if (req.method === 'GET' && req.url === '/users') {
        res.statusCode = 200;
        res.end(
            JSON.stringify({
                "status": "200",
                "message": "Users Fetch Successfully",
                "data": data
            })
        )
    }

    //POST
    else if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", () => {
            let userData
            try {
                userData = JSON.parse(body);
            }
            catch (err) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    status: 400,
                    message: "Invalid JSON body"
                }));
            }
            const { name, email } = userData;
            if (typeof name !== "string" || name.trim('') === "") {
                res.statusCode = 400;
                return res.end(
                    JSON.stringify({
                        "status": 400,
                        "message": "name is required"
                    })
                );
            }
            else if (typeof email !== "string" || email.trim('') === "") {
                res.statusCode = 400;
                return res.end(
                    JSON.stringify({
                        "status": 400,
                        "message": "email is required",
                    })
                );
            }
            const newuserData = {
                ...userData, id: crypto.randomUUID()
            }
            data.push(newuserData);
            res.statusCode = 201;
            res.end(
                JSON.stringify({
                    "status": 201,
                    "message": "User Create Successfully ! ",
                    "data": newuserData
                })
            )
        })


    }

    //DELETE
    else if (req.method === 'DELETE' && url.pathname.startsWith('/users/')) {
        const id = req.url.split("/")[2];
        const index = data.findIndex((data) => data.id === id);
        if (index === -1) {
            res.statusCode = 404;
            return res.end(
                JSON.stringify({
                    "status": 404,
                    "message": "User not found"
                })
            )
        }
        data.splice(index, 1);
        res.statusCode = 200;
        res.end(
            JSON.stringify({
                "status": "200",
                "message": "Users Delete Successfully"
            })
        )
    }

    //PATCH
    else if (req.method === 'PATCH' && url.pathname.startsWith('/users/')) {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on('end', () => {
            let userData;
            try {

                userData = JSON.parse(body);
            }
            catch (err) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    status: 400,
                    message: "Invalid JSON body"
                }));
            }
            const id = req.url.split("/")[2];
            const index = data.findIndex((item) => item.id === id);
            if (index === -1) {
                res.statusCode = 404;
                return res.end(
                    JSON.stringify({
                        "status": 404,
                        "message": "User not found"
                    })
                )
            }
            // Object.assign(data[index], ...userData)
            data[index] = {
                ...data[index],
                ...userData,
                id: data[index].id
            };
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    "status": 200,
                    "message": "Update Successfully!",
                    "data": data[index]
                })
            )

        })
    }

    //URL NOT FOUND
    else {
        res.statusCode = 404;
        res.end(
            JSON.stringify({
                "status": "404",
                "message": "URL NOT FOUND"
            })
        )
    }
});

//SERVER LISTENING
app.listen(PORT, () => {
    console.log(`PORT Running at ${PORT}`);
});