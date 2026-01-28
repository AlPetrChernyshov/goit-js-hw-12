import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import "css-loader/dist/loader.css";

const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader'); 

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="info">
                <p><b>Likes:</b> ${likes}</p>
                <p><b>Views:</b> ${views}</p>
                <p><b>Comments:</b> ${comments}</p>
                <p><b>Downloads:</b> ${downloads}</p>
            </div>
        </li>`;
    }).join('');

    galleryElement.innerHTML = markup;
    lightbox.refresh();
}

export function clearGallery() {
    galleryElement.innerHTML = '';
}

// Функції для керування css-loader
export function showLoader() {
    loaderElement.classList.add('is-active');
}

export function hideLoader() {
    loaderElement.classList.remove('is-active');
}