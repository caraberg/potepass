

/*bilde etter valg*/
const uploadInput = document.getElementById("uploadImage");
const previewImage = document.getElementById("previewImage");
const uploadText = document.querySelector(".upload-text");

uploadInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      previewImage.setAttribute("src", this.result);
      previewImage.style.display = "block";
      uploadText.style.display = "none";
    });

    reader.readAsDataURL(file);
  }
});

/*add dog button*/
document.getElementById("addDogBtn").addEventListener("click", () => {
  alert("Åpne skjema for å legge til hund");
});

