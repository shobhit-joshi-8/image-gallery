const galleryContainer = document.getElementById("gallery-container");
const galleryItem = document.getElementById("gallery-item");
const loadingElement = document.getElementById("loadingElement");

// ------------Defining FetchData-----------------
async function fetchData() {
  try {
    galleryContainer.style.display = "none";

    // ------------Calling API-----------------
    const response = await fetch("https://picsum.photos/v2/list?limit=100");
    const data = await response.json();
    const images = data;

    // ------------Storing Data in an Array-----------------
    const dataArray = [];
    images.forEach((item) => {
      dataArray.push(item);
    });

    galleryContainer.style.display = "flex";
    loadingElement.style.display = "none";
    bindData(dataArray);
  } catch (error) {
    console.log(error);
  }
}

// ------------Defining Function BindData-----------------
function bindData(dataArray) {
  // ------------Creating Gallery Card-----------------
  dataArray.forEach((images) => {
    const galleryItemClone = galleryItem.cloneNode(true);
    const galleryImage = galleryItemClone.querySelector("#gallery-image");
    galleryImage.src = images.download_url;

    galleryContainer.appendChild(galleryItemClone);

    // ------------Popup Close Button-----------------
    document.querySelector(".popup-image span").onclick = () => {
      document.querySelector(".popup-image").style.display = "none";
    };

    // ------------Popup Slider-----------------
    galleryImage.onclick = function (event) {
      console.log(event.target);
      document.querySelector(".popup-image").style.display = "block";

      const n = dataArray.length;
      const flexContainer = document.getElementById("flex-container");
      const leftButton = document.getElementById("left-btn");
      const rightButton = document.getElementById("right-btn");
      // const carouselNav = document.getElementById("carousel-nav");

      const containerWidth = 56;
      const flexContainerWith = n * containerWidth;
      flexContainer.style.width = flexContainerWith;

      for (let i = 0; i < n; i++) {
        const newImage = document.createElement("img");
        newImage.src = dataArray[i].download_url;
        newImage.classList.add("img-style");

        flexContainer.appendChild(newImage);
      }

      document.querySelector(".flex-container img").src =
        event.target.getAttribute("src");

      let currentPosition = 0;

      // ------------On clicking left button-----------------
      leftButton.addEventListener("click", () => {
        if (currentPosition > 0) {
          currentPosition--;
        } else {
          currentPosition = n - 1;
        }
        showImage();

        console.log("position is 0");
      });

      // ------------On clicking right button-----------------
      rightButton.addEventListener("click", () => {
        if (currentPosition < n - 1) {
          currentPosition++;
        } else {
          currentPosition = 0;
        }
        showImage();
      });

      // ------------Changing Position when a button is clicked-----------------
      function showImage() {
        const translateXDistance = -currentPosition * containerWidth;
        flexContainer.style.transform = `translateX(${translateXDistance}vw)`;
      }
    };
  });
  galleryItem.style.display = "none";
}

// ------------Calling Function fetchData-----------------
fetchData();
