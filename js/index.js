let searchBox = document.querySelector("#search-box");
let images = document.querySelectorAll(".container .image-container .image");

searchBox.oninput = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  $(".container .clear").addClass("active");
  images.forEach((hide) => (hide.style.display = "none"));
  let value = searchBox.value
    .toLowerCase()
    .replace(/ch/g, "tr")
    .replace(/s/g, "x")
    .replace(/gh/g, "g")
    .replace(/ả/g, "ã")
    .replace(/ẩ/g, "ẫ")
    .replace(/ẳ/g, "ẵ")
    .replace(/ẻ/g, "ẽ")
    .replace(/ể/g, "ễ")
    .replace(/ỉ/g, "ĩ")
    .replace(/ỏ/g, "õ")
    .replace(/ổ/g, "ỗ")
    .replace(/ở/g, "ỡ")
    .replace(/ủ/g, "ũ")
    .replace(/ử/g, "ữ")
    .replace(/ỷ/g, "ỹ");

  // let value = searchBox.value
  //   .normalize("NFD")
  //   .replace(/[\u0300-\u036f]/g, "")
  //   .replace(/đ/g, "d")
  //   .replace(/Đ/g, "D");

  images.forEach((filter) => {
    let title = filter
      .getAttribute("data-title")
      .toLowerCase()
      .replace(/ch/g, "tr")
      .replace(/s/g, "x")
      .replace(/gh/g, "g")
      .replace(/ả/g, "ã")
      .replace(/ẩ/g, "ẫ")
      .replace(/ẳ/g, "ẵ")
      .replace(/ẻ/g, "ẽ")
      .replace(/ể/g, "ễ")
      .replace(/ỉ/g, "ĩ")
      .replace(/ỏ/g, "õ")
      .replace(/ổ/g, "ỗ")
      .replace(/ở/g, "ỡ")
      .replace(/ủ/g, "ũ")
      .replace(/ử/g, "ữ")
      .replace(/ỷ/g, "ỹ");

    // let title = filter
    // .getAttribute("data-title")
    // .normalize("NFD")
    // .replace(/[\u0300-\u036f]/g, "")
    // .replace(/đ/g, "d")
    // .replace(/Đ/g, "D");
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
  window.scrollTo({ top: 0, behavior: "smooth" });
  $("#search-box").val("").focus();
  $(".container .clear").removeClass("active");
  $(".container .image-container > div").css({ display: "block" });
});

$("body").on("click", ".back-to-top", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("body").on("click", ".back-to-bottom", function () {
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  return false;
});
