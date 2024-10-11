document.addEventListener("DOMContentLoaded", function() {
    const folderView = document.querySelector('.folder-view');
    
    function loadFolders() {
        const folders = [
            { title: 'Culto da Família', date: '08/10/2024', path: 'fotos/08102024' },
            { title: 'Santa Ceia', date: '10/10/2024', path: 'fotos/10102024' }
        ];
        
        folders.forEach(folder => {
            const folderDiv = document.createElement('div');
            folderDiv.classList.add('folder');
            const folderImage = `${folder.path}/foto1.jpg`;

            folderDiv.innerHTML = `
                <div class="folder-info">
                    <img src="${folderImage}" onerror="this.onerror=null; this.src='path/to/folder-icon.png'" class="folder-image">
                    <div class="text-info">
                        <h2 class="title">${folder.title}</h2>
                        <p class="date">${folder.date}</p>
                    </div>
                </div>
            `;

            folderDiv.addEventListener('click', () => {
                window.location.href = `gallery.html?folder=${folder.path}&title=${folder.title}`;
            });
            folderView.appendChild(folderDiv);
        });
    }
  
    loadFolders();
});
