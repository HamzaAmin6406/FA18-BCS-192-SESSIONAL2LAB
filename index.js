$(function () {
    loadproducts();
    $("#products").on("click", ".btn-danger", handledelete);
    $("#addBtn").click(addproduct);
  });
  function addproduct() {
    var name = $("#NAME").val();
    var price = $("#TO PAY").val();
    var color = $("#CLR").val();
    var department = $("#DPT").val();
    var description = $("#DCP").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/",
      method: "POST",
      data: { name, price, color, department, description },
      success: function (response) {
        console.log(response);
        loadproducts();
      },
    });
  }
  function loadproducts() {
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products",
      method: "GET",
      success: function (response) {
        console.log(response);
        var products = $("#PRODUCTS");
        products.empty();
        for (var i = 0; i < response.length; i++) {
          var pro = response[i];
          products.append(
            `<div class="product" data-id="${pro._id}"><h3>${pro.name}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button> <button class="btn btn-warning btn-sm float-right">Update</button>Price:${pro.price}</br>Color:${pro.color}</br>Department:${pro.department}</br>Description:${pro.description}</p> </div>`
          );
        }
      },
    });
  }
  
  function handledelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".product");
    let ID = parentDiv.attr("data-id");
    console.log(ID);
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + ID,
      method: "DELETE",
      success: function () {
        loadproducts();
      },
    });
  }
