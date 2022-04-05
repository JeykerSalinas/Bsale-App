const getData = async () => {
  const request = await fetch("http://localhost:3600/bsale/products");
  try {
    const data = await request.json();
    data.map((product) => {
      document.getElementById(
        "myData"
      ).innerHTML += `<div class="card col-12 col-md-6 col-lg-4 m-4 rounded" style="width: 18rem;">
      <img src="${product.url_image}" class="card-img-top" alt="${
        product.name
      }">
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

getData();

document.getElementById("myForm").addEventListener("submit", (e) => {
  console.log(e);
});
