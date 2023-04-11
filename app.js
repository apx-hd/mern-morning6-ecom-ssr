const express = require("express");
const PORT = 5000;
const productRouter = require("./routes/productRoutes")
const homeRouter = require("./routes/homeRoutes")
const cors = require('cors')

const app = express();

app.use(cors())

//SSR Setup
//Setting the default view engine to hbs
app.set('view engine', 'hbs')
//Serving static files so that frontend can access it
app.use(express.static('./public'))

//Routes
app.use(homeRouter)
//Product Routes
app.use("/products", productRouter);

// app.get('/products', (req, res) => {
//   res.render('index', { title : "Ecommerce"});
// })

//Handle all other routes
app.all("*", (req, res) => {
    res.status(404).send("<h1 style='color: red'>Page not found</h1>")
})

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
