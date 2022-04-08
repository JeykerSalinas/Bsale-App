const cardsTitle = document.getElementById("cards-title");
const submitButton = document.getElementById("submitButton");
const myForm = document.getElementById("myForm");
const search = document.getElementById("mySearch");
const cardsNode = document.getElementById("myData");
let cardsArray = [];
let myCategories = [];

const cardsLayout = () => {
  cardsNode.innerHTML = "";
  cardsArray.map((product) => {
    cardsNode.innerHTML += `<div class="my-card card col-12 col-md-6 col-lg-4 m-4  rounded" style="width: 18rem;">
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
};
const getData = async (URL) => {
  try {
    const request = await fetch(URL);
    const data = await request.json();
    cardsArray = data;
    cardsLayout();
  } catch (error) {
    document.getElementById("myData").innerHTML =
      "<p>Lo sentimos, no se encontraron resultados...</p>";
    console.error(error);
  }
};
const initialData = () => {
  cardsTitle.innerHTML = "Todos nuestros productos:";
  const PRODUCTS_URL = "https://api-bsale-jeyker.herokuapp.com/bsale/products";
  getData(PRODUCTS_URL);
};
initialData();

const getCategory = (async () => {
  const CATEGORY_URL = "https://api-bsale-jeyker.herokuapp.com/bsale/category";
  try {
    const request = await fetch(CATEGORY_URL);
    const data = await request.json();
    myCategories = data;
    data.map(
      (a) =>
        (document.getElementById(
          "categories"
        ).innerHTML += `<li class="dropdown-item" onclick="filterCardsByCategory(${a.id})" >${a.name}</li>`)
    );
  } catch (error) {
    console.error(error);
  }
})();

const filterByName = (search) => {
  cardsTitle.innerHTML = `Resultados para: <span style="text-transform: capitalize">${search}</span>`;
  const PRODUCTS_BY_NAME = `https://api-bsale-jeyker.herokuapp.com/bsale/products/name/${search}`;
  getData(PRODUCTS_BY_NAME);
};

search.addEventListener("keyup", (e) => {
  e.target.value === "" ? initialData() : filterByName(e.target.value);
});

const filterByCategory = (search) => {
  cardsTitle.innerHTML = `Categoría: <span style="text-transform: capitalize">${
    myCategories.find((a) => a.id === search).name
  }</span>`;
  const PRODUCTS_BY_CATEGORY = `https://api-bsale-jeyker.herokuapp.com/bsale/products/category/${search}`;
  getData(PRODUCTS_BY_CATEGORY);
};

const filterCardsByCategory = (id) => {
  id === 0 ? initialData() : filterByCategory(id);
};

const sortCardsByName = () => {
  cardsArray.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  cardsLayout();
};

const sortCardsLowerPrice = () => {
  cardsArray.sort((a, b) => a.price - b.price);
  cardsLayout();
};
const sortCardsHigherPrice = () => {
  cardsArray.sort((a, b) => b.price - a.price);
  cardsLayout();
};
