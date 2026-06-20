// DOM Element Nodes
const fileGrid = document.getElementById('fileGrid');
const newFolderBtn = document.getElementById('newFolderBtn');
const fileInput = document.getElementById('fileInput');

// Central array state to store our file metadata
let items = [
    { id: 1, name: "Documents", type: "folder", meta: "Folder" },
    { id: 2, name: "Project_Specs.pdf", type: "file", meta: "2.4 MB" }
];

// Initialize and render default state items
renderItems();

// 1. Event Listener: Create New Virtual Folder
newFolderBtn.addEventListener('click', () => {
    const folderName = prompt("Enter folder name:", "Untitled Folder");
    if (folderName && folderName.trim() !== "") {
        items.push({
            id: Date.now(),
            name: folderName.trim(),
            type: "folder",
            meta: "Folder"
        });
        renderItems();
    }
});

// 2. Event Listener: Handle File Upload Parsing
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        items.push({
            id: Date.now() + i, // Unique ID generator stub
            name: files[i].name,
            type: "file",
            meta: formatFileSize(files[i].size)
        });
    }
    renderItems();
    fileInput.value = ''; // Flush input tracking state
});

// 3. Helper Function: Formats raw bytes to human readable sizes
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 4. Core Render Engine: Updates grid view layout state matching data array
function renderItems() {
    fileGrid.innerHTML = ''; // Clear layout

    if (items.length === 0) {
        fileGrid.innerHTML = `<p style="grid-column: 1/-1; color: #94a3b8; text-align: center;">Drive is empty. Upload or create an item!</p>`;
        return;
    }

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'file-item';
        
        // Pick appropriate graphic design emoji depending on type
        const icon = item.type === 'folder' ? '📁' : '📄';

        itemCard.innerHTML = `
            <button class="delete-btn" onclick="deleteItem(${item.id})">&times;</button>
            <div class="item-icon">${icon}</div>
            <div class="item-name" title="${item.name}">${item.name}</div>
            <div class="item-meta">${item.meta}</div>
        `;
        
        fileGrid.appendChild(itemCard);
    });
}

// 5. Action: Delete Item Function mapping explicit arrays
window.deleteItem = function(id) {
    items = items.filter(item => item.id !== id);
    renderItems();
};