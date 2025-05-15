const triggerBtn = document.getElementById('trigger-input');
const fileInput = document.getElementById('thumbnail');
const previewContainer = document.getElementById('thumbnail-preview-container');
const preview = document.getElementById('thumbnail-preview');
const deletePreview = document.getElementById('delete-preview');

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.toggle('hidden');
            triggerBtn.classList.toggle('hidden');
            deletePreview.classList.toggle('hidden');
        }
        reader.readAsDataURL(file);
    }
});

deletePreview.addEventListener('click', () => {
    preview.src = '#';
    preview.classList.toggle('hidden');
    fileInput.value = '';
    deletePreview.classList.toggle('hidden');
    triggerBtn.classList.toggle('hidden');
});