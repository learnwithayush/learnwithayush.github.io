document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("imageInput").addEventListener("change", handleImage);
});

function handleImage() {
    const input = document.getElementById("imageInput");
    const image = input.files[0];

    if (image) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.getElementById("resizedImage");
            img.src = e.target.result;
            img.style.display = "block";
        };

        reader.readAsDataURL(image);
    }
}

function resizeImage() {
    const pixelInput = document.getElementById("pixelInput");
    const sizeInput = document.getElementById("sizeInput");
    const downloadLink = document.getElementById("downloadLink");
    const resizedImage = document.getElementById("resizedImage");

    const pixelSize = parseInt(pixelInput.value);
    const sizeKB = parseInt(sizeInput.value) * 1024;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = resizedImage.src;

    image.onload = function () {
        const aspectRatio = image.width / image.height;
        const newWidth = pixelSize;
        const newHeight = pixelSize / aspectRatio;

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        canvas.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.style.display = "block";
        }, "image/jpeg", 0.7); // 0.7 is the quality of the image
    };

    downloadLink.addEventListener("click", function () {
        setTimeout(function () {
            URL.revokeObjectURL(downloadLink.href);
        }, 1500);
    });
}
