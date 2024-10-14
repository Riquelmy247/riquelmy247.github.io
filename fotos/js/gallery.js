document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder');
    const title = urlParams.get('title');
    const galleryView = document.querySelector('.gallery-view');
    const backButton = document.querySelector('.back-button');
    
    if (title) {
        backButton.innerHTML = `&lt; ${title}`;
    }

    function loadPhotos() {
        const photoLimit = 1000;
        const photos = [];
        
        for (let i = 1; i <= photoLimit; i++) {
            const photoPath = `${folder}/foto${i}.jpg`;
            checkPhotoExists(photoPath)
                .then(exists => {
                    if (exists) {
                        photos.push({ name: `foto${i}.jpg`, path: photoPath });
                        addPhotoToGallery({ name: `foto${i}.jpg`, path: photoPath });
                    }
                })
                .catch(err => console.error(err));
        }
    }

    function checkPhotoExists(photoPath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = photoPath;
        });
    }

    function addPhotoToGallery(photo) {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        photoDiv.innerHTML = `
            <img src="${photo.path}" alt="${photo.name}">
        `;
        photoDiv.addEventListener('click', () => {
            expandPhoto(photo);
        });
        galleryView.appendChild(photoDiv);
    }

    function expandPhoto(photo) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${photo.path}" alt="${photo.name}">
                <a href="${photo.path}" download class="download-btn">Baixar</a>
                <span class="close">&times;</span>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeModal = modal.querySelector('.close');
        closeModal.addEventListener('click', () => {
            modal.remove();
        });
    }

    loadPhotos();
});
