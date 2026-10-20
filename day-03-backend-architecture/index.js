const http = require('http');
const crypto = require('crypto');
const productController = require('./controllers/productController');
const PORT = 3000;
const app = http.createServer((req, res) => {
    res.setHeader("Content-type", "application/json")
    let url = new URL(req.url, "http://localhost:3000");
    if (url.pathname === '/products' && req.method === 'GET') {
        return productController.getAllProducts(req, res)
    }
    else if (url.pathname === '/products' && req.method === 'POST') {
        let body = '';
        let userData;
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            try {

                userData = JSON.parse(body);
            }
            catch (error) {
                res.statusCode = 400;
                return res.end(
                    JSON.stringify({
                        "status": 400,
                        "message": "Invalid JSON",
                    })
                )
            }
            const newUserData = {
                ...userData, id: crypto.randomUUID()
            }
            return productController.createProduct(req, res, newUserData)
        });
        return;
    }
    else if (req.method === "GET" && url.pathname.startsWith('/products/')) {
        const id = url.pathname.split('/')[2];
        return productController.getProductById(req, res, id);

    }
    else {
        res.statusCode = 404;
        res.end(
            JSON.stringify({
                status: 404,
                "message": "URL Not Found"
            })
        )
    }
});
app.listen(PORT, () => console.log(`SERVER Running at :${PORT}`));