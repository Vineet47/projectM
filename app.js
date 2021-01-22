const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

let addProduct = new Map();
let totalCartPrice = 0;

const app = express();

let product = [
  {
    id: 1,
    title: "Shoe",
    rating: 8.0,
    description: "These are nice pair of shoes for special occasions",
    price: 1000,
    imageSrc: "/images/shoes.jpg",
  },
  {
    id: 2,
    title: "Book",
    rating: 9.0,
    description: "Quite informatic book",
    price: 230,
    imageSrc: "/images/book.jpg",
  },
  {
    id: 3,
    title: "Headphone",
    rating: 7.6,
    description: "These contians balance",
    price: 1200,
    imageSrc: "/images/headphone.jpg",
  },
  {
    id: 4,
    title: "Cycle",
    rating: 8.4,
    description: "most elegant creature",
    price: 2200,
    imageSrc: "/images/cycle.jpg",
  },
];

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/Cart/:productId", (req, res) => {
  const paramId = parseInt(req.params.productId);
  if (addProduct.has(paramId)) {
    let i = addProduct.get(paramId) + 1;
    addProduct.set(paramId, i);
  } else {
    addProduct.set(paramId, 1);
  }
  addProduct.forEach((value, key, map) => {
    totalCartPrice = totalCartPrice + (product[value].price*key);
  });
  console.log(totalCartPrice);
  res.render("cart", {
    product: product,
    help: addProduct,
    price: totalCartPrice
  });
});

app.post("/remove", (req, res) => {
  const id = req.body.productId.toString();
  addProduct.forEach((value, key, map) => {
    if (key == id) {
      map.set(key, value - 1);
      if (value === 1) {
        map.delete(key);
      }
    }
  });
  res.render("cart", {
    product: product,
    help: addProduct,
    price: totalCartPrice
  });
});
app.post("/", (req, res) => {
  const user = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };
  console.log(user);
  res.render("shop");
});
app.get("/details/:productId", (req, res) => {
  const paramId = parseInt(req.params.productId);
  const index = product.findIndex((p) => p.id === paramId);
  const useProduct = product[index];
  res.render("details", {
    product: useProduct,
  });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signUp", (req, res) => {
  res.render("signUp");
});
app.get("/Products", (req, res) => {
  res.render("products", {
    product: product,
  });
});
app.get("/Cart", (req, res) => {
  res.render("cart", {
    product: product,
    help: addProduct,
    price: totalCartPrice
  });
});
app.get("/aboutUs", (req, res) => {
  res.render("aboutUs");
});
app.get("/buy/:prodId", (req, res) => {
  const prodId = parseInt(req.params.prodId);
  console.log(prodId);
  res.render("buying", {
    id: prodId,
    product: product,
    help: addProduct,
  });
});
app.get("/buy", (req, res) => {
  res.render("buying");
});
app.get("/", (req, res) => {
  res.render("shop");
});
app.listen(3000, () => console.log("server running on port 3000"));
