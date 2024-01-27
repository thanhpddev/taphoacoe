let searchBox = document.querySelector("#search-box");
let images = document.querySelectorAll(".container .image-container .image");

searchBox.oninput = () => {
  images.forEach((hide) => (hide.style.display = "none"));
  let value = searchBox.value;
  // let value = searchBox.value
  //   .normalize("NFD")
  //   .replace(/[\u0300-\u036f]/g, "")
  //   .replace(/đ/g, "d")
  //   .replace(/Đ/g, "D");
  console.log(value);
  images.forEach((filter) => {
    let title = filter.getAttribute("data-title");

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
