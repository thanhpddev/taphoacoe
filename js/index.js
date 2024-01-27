let searchBox = document.querySelector("#search-box");
let images = document.querySelectorAll(".container .image-container .image");

searchBox.oninput = () => {
  $(".container .clear").addClass("active");
  images.forEach((hide) => (hide.style.display = "none"));
  let value = searchBox.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

  images.forEach((filter) => {
    let title = filter
      .getAttribute("data-title")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
    if (
      value
        .toLowerCase()
        .split(" ")
        .every((item) => title.toLowerCase().includes(item))
    ) {
      filter.style.display = "block";
    }
    if (searchBox.value == "") {
      filter.style.display = "block";
    }
  });
};

//clear input
$("body").on("input", "#search-box", function () {
  if ($("#search-box").val()) {
    $(".container .clear").addClass("active");
  } else {
    $(".container .clear").removeClass("active");
  }
});

$("body").on("click", ".clear", function () {
  $("#search-box").val("").focus();
  $(".container .clear").removeClass("active");
  $(".container .image-container > div").css({ display: "block" });
});
