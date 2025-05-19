document.addEventListener("DOMContentLoaded", function() {
    const folderView = document.querySelector('.folder-view');
    
    function loadFolders() {
        const folders = [
            { title: 'Série - Ainda Há Lugar Na Mesa', date: '18/05/2025 | Noite', path: 'fotos/18-05 NOITE' },
            { title: 'Série - Ainda Há Lugar Na Mesa', date: '18/05/2025 | Manhã', path: 'fotos/18-05 MANHÃ' },
            { title: 'Série - Ainda Há Lugar Na Mesa', date: '11/05/2025 | Noite', path: 'fotos/11-05 NOITE' },
            { title: 'Série - Ainda Há Lugar Na Mesa', date: '11/05/2025 | Manhã', path: 'fotos/11-05 MANHÃ' },
            { title: 'Série - Ainda Há Lugar Na Mesa', date: '04/05/2025 | Noite', path: 'fotos/04-05 NOITE' },
            { title: 'Série - Ainda Há Lugar Na Mesa', date: '04/05/2025 | Manhã', path: 'fotos/04-05 MANHÃ' },
            { title: 'Série - O Amor Amou', date: '27/04/2025 | Noite', path: 'fotos/27-04 NOITE' },
            { title: 'Série - O Amor Amou', date: '27/04/2025 | Manhã', path: 'fotos/27-04 MANHÃ' },
            { title: 'Série - O Amor Amou', date: '20/04/2025 | Noite', path: 'fotos/20-04 NOITE' },
            { title: 'Série - O Amor Amou', date: '20/04/2025 | Manhã', path: 'fotos/20-04 MANHÃ' }
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
