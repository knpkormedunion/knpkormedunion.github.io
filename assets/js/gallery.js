const galleryBlock = document.querySelector('.gallery');
const getVal = (elem, style) => parseInt(window.getComputedStyle(elem).getPropertyValue(style));
const getHeight = (item) => item.querySelector('.gallery__content').getBoundingClientRect().height;

const setImageSizes = galleryItem => {
    const altura = getVal(galleryBlock, 'grid-auto-rows');
    const gap = getVal(galleryBlock, 'grid-row-gap');
    const galleryItemHeight = getHeight(galleryItem);
    galleryItem.style.gridRowEnd = `span ${Math.ceil((galleryItemHeight + gap) / (altura + gap))}`;
}

const openModal = galleryItem => {
    galleryItem.classList.toggle('gallery__item_active');
}

galleryBlock.querySelectorAll('img').forEach(item => {
    if (!item.complete) {
        item.addEventListener('load', (event) => setImageSizes(event.target.parentElement.parentElement));
    }
    else {
        setImageSizes(item.parentElement.parentElement);
    }
});

galleryBlock.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => openModal(item));
});

window.addEventListener('unload', () => {
    galleryBlock.querySelectorAll('img').forEach(item => {
        item.removeEventListener('load', (event) => setImageSizes(event.target.parentElement.parentElement));
    });

    galleryBlock.querySelectorAll('.gallery__item').forEach(item => {
        item.removeEventListener('click', () => openModal(item));
    });
});
