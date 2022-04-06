const getData = async () => {
  const PRODUCTS_URL = "http://localhost:3600/bsale/products";
  try {
    const request = await fetch(PRODUCTS_URL);
    const data = await request.json();
    data.map((product) => {
      document.getElementById(
        "myData"
      ).innerHTML += `<div class="card col-12 col-md-6 col-lg-4 m-4 rounded" style="width: 18rem;">
      <img src="${
        product.url_image
          ? product.url_image
          : "https://www.bevi.com/static/files/0/ecommerce-default-product.png"
      }" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <p class="card-text">${product.name}</p>
        <p class="card-text">$${product.price.toLocaleString("de-DE")}</p>
      </div>
    </div>`;
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async () => {
  const CATEGORY_URL = "http://localhost:3600/bsale/category";
  try {
    const request = await fetch(CATEGORY_URL);
    const data = await request.json();
    data.map((category) => {
      document.getElementById(
        "categories"
      ).innerHTML += `<li class="list-group-item" id="${category.id}" onclick="getProductoCategory(id)">${category.name}</li>`;
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const filterByName = async (search) => {
  const PRODUCTS_BY_NAME = `http://localhost:3600/bsale/products/name/${search}`;
  try {
    const request = await fetch(PRODUCTS_BY_NAME);
    const data = await request.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

getData();
getCategory();
const submitButton = document.getElementById("submitButton");
const myForm = document.getElementById("myForm");
const search = document.getElementById("mySearch");

search.addEventListener("keyup", (e) => {
  e.target.value === "" ? getData() : filterByName(e.target.value);
});

const getProductoCategory = (id) => {
  console.log(id);
};
