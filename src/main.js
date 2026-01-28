import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    query = event.currentTarget.elements['search-text'].value.trim();
    if (!query) return;

    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!" });
            hideLoader();
            return;
        }

        createGallery(data.hits);
        
        if (totalHits > 15) {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({ message: "Something went wrong!" });
    } finally {
        hideLoader();
        form.reset();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);
        
        const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });

        if (page * 15 >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({ message: "Error loading more images!" });
    } finally {
        hideLoader();
    }
});

