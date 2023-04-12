const productData = require("../data/products.json");
const express = require("express");

//Cannot access app in this file so we create a new router object to collect
//routes information
const router = express.Router();

//Returns all data
router.get("/", (req, res) => {
  const { category, minprice } = req.query;

  const newProductData = [];
  productData.map((product) => {
    const { id, title, price, category, image } = product;
    newProductData.push({ id, title, price, category, image });
  });
  //Using reduce
  // const test = productData.reduce((prev, curr) => {
  //     const {id, title, price, category, image} = curr
  //     return ([...prev, { id, title, price, category, image }])
  // }, [])
  // console.log(test)
  let filteredProducts = [];
  //First check category filter
  if (category) {
    filteredProducts = newProductData.filter(
      (product) => product.category === category
    );
  }
  //Second check min price filter
  if (minprice) {
    //Checking if any previous filter has already run
    if (filteredProducts.length !== 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minprice
      );
    } else {
      filteredProducts = newProductData.filter(
        (product) => product.price >= minprice
      );
    }
  }
  if (category || minprice) {
    res.render("index", { title: "Ecommerce", newProductData: filteredProducts });
  } else {
    res.render("index", { title: "Ecommerce", newProductData: newProductData });
  }
});

//Return specific data
//:productID is called Route Parameter
router.get("/:productID", (req, res) => {
  const { productID } = req.params;
  //Typecasting to number as params is string by default
  if (Number(productID) >= 1 && Number(productID) <= productData.length) {
    // res.json(productData[productID - 1]);
    res.render('details', {title: "Ecommerce", data: productData[productID - 1]})
  } else {
    res.send("Invalid URL");
  }
});

module.exports = router;
