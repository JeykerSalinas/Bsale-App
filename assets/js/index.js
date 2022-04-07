const getData = async () => {
  const PRODUCTS_URL = "http://localhost:3600/bsale/products";
  try {
    const request = await fetch(PRODUCTS_URL);
    const data = await request.json();
    document.getElementById("myData").innerHTML = "";
    data.map((product) => {
      document.getElementById(
        "myData"
      ).innerHTML += `<div class="my-card card col-12 col-md-6 col-lg-4 m-4  rounded" style="width: 18rem;">
<div class="h-100 d-flex align-items-center border-bottom">
<img src="${
        product.url_image
          ? product.url_image
          : "https://www.bevi.com/static/files/0/ecommerce-default-product.png"
      }" class="card-img-top img-fluid  " alt="${product.name}">

</div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
      <li class="list-group-item ">
      ${product.name}</li>
      <li class="list-group-item price text-end">$${product.price.toLocaleString(
        "de-DE"
      )}</li>
    </ul>
      </div>
    </div>`;
    });
    return "Hola"
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async () => {
  const CATEGORY_URL = "http://localhost:3600/bsale/category";
  try {
    const request = await fetch(CATEGORY_URL);
    const data = await request.json();

    data.map(
      (a) =>
        (document.getElementById(
          "categories"
        ).innerHTML += `<li class="dropdown-item" onclick="filterCardsByCategory(${a.id})" >${a.name}</li>`)
    );
  } catch (error) {
    console.error(error);
  }
};

const filterByName = async (search) => {
  const PRODUCTS_BY_NAME = `http://localhost:3600/bsale/products/name/${search}`;
  try {
    const request = await fetch(PRODUCTS_BY_NAME);
    const data = await request.json();
    console.log(data)
    document.getElementById(
      "myData"
    ).innerHTML=""
    data.map(
      (product) =>
        (document.getElementById(
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
  </div>`)
    );
  } catch (error) {
    document.getElementById(
      "myData"
    ).innerHTML = '<p>Lo sentimos, no se encontraron resultados...</p>'
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

const filterByCategory = async (search) => {
  const PRODUCTS_BY_CATEGORY = `http://localhost:3600/bsale/products/category/${search}`;
  try {
    const request = await fetch(PRODUCTS_BY_CATEGORY);
    const data = await request.json();
    console.log(data);
    data.map(
      (product) =>
        (document.getElementById(
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
  </div>`)
    );
  } catch (error) {
    console.error(error);
  }
};

const filterCardsByCategory = (id) => {
  document.getElementById("myData").innerHTML = "";
  id === 0 ? getData() : filterByCategory(id);
};

console.log(getData())