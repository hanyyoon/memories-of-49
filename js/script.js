// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus(); 
    e.preventDefault();
};

// klik di luar sidebar untuk menghilangkan menu
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');

document.addEventListener('click', function(e){
    if(!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active'); 
    }

    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active'); 
    }
});

// Event listener untuk menangani pencarian
document.querySelector('#search-box').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = document.querySelector('#search-box').value.toLowerCase();

        // Logika untuk mengarahkan ke halaman kelas sesuai input
        switch (query) {
            case 'class a':
                window.location.href = "../about/kelasA.html"
                break;
            case 'class b':
                window.location.href = "../about/kelasB.html";
                break;
            case 'class c':
                window.location.href = "../about/kelasC.html";
                break;
            case 'class d':
                window.location.href = "../about/kelasD.html";
                break;
            case 'class e':
                window.location.href = "../about/kelasE.html";
                break;
            case 'class f':
                window.location.href = "../about/kelasF.html";
                break;
            case 'class g':
                window.location.href = "../about/kelasG.html";
                break;
            case 'class h':
                window.location.href = "../about/kelasH.html";
                break;
            case'home':
                window.location.href = "../index.html#home"
            
            default:
                window.location.href = `search-results.html?query=${query}`;
        }
    }
});

const photoInput = document.getElementById('photoInput');
        const addPhotoBtn = document.getElementById('addPhotoBtn');
        const photoContainer = document.getElementById('photoContainer');

        addPhotoBtn.addEventListener('click', () => {
            photoInput.click();
        });

        photoInput.addEventListener('change', (event) => {
            const files = event.target.files;
            if (files) {
                Array.from(files).forEach(file => {
                    if (file.type.startsWith('image/')) {
                        addPhotoToGallery(file);
                    } else {
                        alert('Please select valid image files.');
                    }
                });
            }
        });

        function addPhotoToGallery(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Memory photo';
                
                photoItem.appendChild(img);
                photoContainer.appendChild(photoItem);
            };
            reader.readAsDataURL(file);
        }