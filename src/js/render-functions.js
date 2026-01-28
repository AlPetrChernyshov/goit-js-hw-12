import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p><b>Likes</b><span>${likes}</span></p>
                <p><b>Views</b><span>${views}</span></p>
                <p><b>Comments</b><span>${comments}</span></p>
                <p><b>Downloads</b><span>${downloads}</span></p>
            </div>
        </li>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';
}

export function showLoader() {
    loader.classList.add('is-active');
}

export function hideLoader() {
    loader.classList.remove('is-active');
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.add('is-hidden');
}