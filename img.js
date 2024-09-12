const photoInput = document.getElementById('photoInput');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const photoContainer = document.getElementById('photoContainer');

// Menangani klik tombol untuk membuka dialog file
addPhotoBtn.addEventListener('click', () => {
    photoInput.click();
});

// Menangani perubahan pada input file
photoInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                uploadPhoto(file);
                addPhotoToGallery(file);
            } else {
                alert('Please select valid image files.');
            }
        });
    }
});

// Fungsi untuk menambahkan foto ke galeri
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

    reader.onerror = function() {
        alert('Error reading file.');
    };

    reader.readAsDataURL(file);
}

// Fungsi untuk mengunggah foto ke server
function uploadPhoto(file) {
    const formData = new FormData();
    formData.append('photo', file);

    fetch('/upload', { // Pastikan endpoint ini sesuai dengan rute server Anda
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Upload successful:', data);
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
}

document.getElementById('addPhotoBtn').addEventListener('click', function() {
    const input = document.getElementById('photoInput');
    const file = input.files[0];
    
    const formData = new FormData();
    formData.append('photo', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Upload Successful!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const app = express();
// const PORT = 3000;

// // Setup multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
//     }
// });

// const upload = multer({ storage: storage });

// // Static files (frontend)
// app.use(express.static('public'));

// // Route untuk upload file
// app.post('/upload', upload.single('photo'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send({ message: 'No file uploaded.' });
//     }
//     res.send({
//         message: 'File uploaded successfully!',
//         file: req.file
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// document.getElementById('uploadBtn').addEventListener('click', function() {
//     const input = document.getElementById('photoInput');
//     const file = input.files[0];
    
//     const formData = new FormData();
//     formData.append('photo', file);

//     fetch('/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert('Upload Successful!');
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });


// //suro gpt buat metode crud
// document.addEventListener('DOMContentLoaded', () => {
//     loadPhotos();

//     // Upload photo
//     document.getElementById('upload-form').addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('photo', document.getElementById('photo').files[0]);

//         const response = await fetch('/photo', {
//             method: 'POST',
//             body: formData
//         });

//         if (response.ok) {
//             loadPhotos(); // Reload photos
//         } else {
//             alert('Failed to upload photo.');
//         }
//     });

//     const upload = multer({
//         storage: storage,
//         limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal 5MB
//         fileFilter: (req, file, cb) => {
//             const allowedTypes = /jpeg|jpg|png|gif/;
//             const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//             const mimeType = allowedTypes.test(file.mimetype);
    
//             if (extName && mimeType) {
//                 return cb(null, true);
//             } else {
//                 cb(new Error('Only images are allowed!'));
//             }
//         }
//     });
    

//     // Load and display photos
//     async function loadPhotos() {
//         const response = await fetch('/photo');
//         const photos = await response.json();
//         const gallery = document.getElementById('photo-gallery');
//         gallery.innerHTML = '';

//         photos.forEach(photo => {
//             const img = document.createElement('img');
//             img.src = photo.path;
//             img.alt = photo.filename;
//             gallery.appendChild(img);
//         });
//     }
// });
