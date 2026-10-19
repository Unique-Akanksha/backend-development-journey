const products = require('./product');
const http = require('http');
const PORT = 3000;
const app = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:3000');
    res.setHeader("Content-Type", "application/json");
    if (req.method === 'GET' && url.pathname.startsWith('/products')) {
        const name = url.searchParams.get("name");
        const category = url.searchParams.get('category');
        let filterData = products;
        if (category) {
            filterData = filterData.filter((item) => item.category === category);
        }
        if (name) {
            filterData = filterData.filter((item) => item.name === name);
        }
        res.statusCode = 200;
        res.end(
            JSON.stringify({
                "status": 200,
                "message": "Product Fetched Successfully!",
                "data": filterData
            })

        )
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            status: 404,
            message: 'Route not found'
        }));
    }
});
app.listen(PORT, () => console.log(`SERVER RUNNING AT ${PORT}`));