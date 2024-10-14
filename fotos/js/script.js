document.addEventListener("DOMContentLoaded", function() {
    const folderView = document.querySelector('.folder-view');
    
    function loadFolders() {
        const folders = [
            { title: 'Culto de Santa Ceia', date: '13/10/2024 | Noite', path: 'fotos/13-10 NOITE' },
            { title: 'Culto de Santa Ceia', date: '13/10/2024 | Manhã', path: 'fotos/13-10 MANHÃ' },
            { title: 'Culto de Primícias', date: '06/10/2024 | Noite', path: 'fotos/06-10 NOITE' },
            { title: 'Culto de Primícias', date: '06/10/2024 | Manhã', path: 'fotos/06-10 MANHÃ' },
            { title: 'Culto da Família', date: '29/09/2024 | Noite', path: 'fotos/29-09 NOITE' },
            { title: 'Culto da Família', date: '29/09/2024 | Manhã', path: 'fotos/29-09 MANHÃ' }
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
