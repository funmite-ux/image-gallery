// =========================================
// GET ELEMENTS FROM HTML
// =========================================

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


// =========================================
// STORE GALLERY IMAGES
// =========================================

const images = Array.from(galleryItems).map((item) => {
    return {
        src: item.querySelector("img").src,
        alt: item.querySelector("img").alt,
        category: item.dataset.category
    };
});


// Keep track of the currently displayed image
let currentIndex = 0;


// =========================================
// OPEN LIGHTBOX
// =========================================

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentIndex = index;

        showImage(currentIndex);

        lightbox.classList.add("active");

        // Prevent the page from scrolling
        document.body.style.overflow = "hidden";
    });

});


// =========================================
// DISPLAY IMAGE
// =========================================

function showImage(index) {

    lightboxImage.src = images[index].src;
    lightboxImage.alt = images[index].alt;

}


// =========================================
// NEXT IMAGE
// =========================================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    // Go back to the first image
    // when we reach the end
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);
});


// =========================================
// PREVIOUS IMAGE
// =========================================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    // Go to the last image
    // when we go before the first
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    showImage(currentIndex);
});


// =========================================
// CLOSE LIGHTBOX
// =========================================

closeBtn.addEventListener("click", closeLightbox);


function closeLightbox() {

    lightbox.classList.remove("active");

    // Allow page scrolling again
    document.body.style.overflow = "";
}


// =========================================
// CLOSE WHEN CLICKING BACKGROUND
// =========================================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// =========================================
// KEYBOARD NAVIGATION
// =========================================

document.addEventListener("keydown", (event) => {

    // Only work when lightbox is open
    if (!lightbox.classList.contains("active")) {
        return;
    }

    // Escape = close
    if (event.key === "Escape") {
        closeLightbox();
    }

    // Right arrow = next
    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    // Left arrow = previous
    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

});


// =========================================
// IMAGE FILTERS
// =========================================

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        const filter = button.dataset.filter;


        // Show/hide images
        galleryItems.forEach((item) => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});