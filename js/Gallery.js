
// As we are generating a static site there needs to be a helper file that specifies all the images we should pull it
// This comes with the benefit that the images can be called whatever we would like
// See GalleryList.json for images that are being polled
async function fetchImagesFromFolder(folderPath) {
    const response = await fetch(`img/gallery/GalleryList.json`);
    if (!response.ok) {
        throw new Error('Could not fetch image list');
    }
    const images = await response.json();
    return images.map(img => `${folderPath}/${img}`);
}

async function displayGallery(folderPath, containerId) {
    try {
        const imageUrls = await fetchImagesFromFolder(folderPath);
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        imageUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.style.maxWidth = '600px';
            // img.style.margin = '5px';
            container.appendChild(img);
        });
    } catch (err) {
        console.error(err);
    }
}

displayGallery('img/gallery/', 'gallery');