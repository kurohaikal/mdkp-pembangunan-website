/**
 * index.js 
 * Handles saving data from the input page and clearing the form.
 */

function saveData() {
    // 1. Get references to the input elements
    const tajukInput = document.getElementById('tajuk');
    const pemajuInput = document.getElementById('pemaju');
    const nofailInput = document.getElementById('nofail');
    const tamanInput = document.getElementById('taman');
    const fileInput = document.getElementById('gambar');

    // 2. Validate: Ensure the user at least entered a Title
    if (tajukInput.value.trim() === "") {
        alert("Sila masukkan TAJUK PERMOHONAN sebelum simpan.");
        return;
    }

    // 3. Create a data object
    const data = {
        tajuk: tajukInput.value,
        pemaju: pemajuInput.value,
        nofail: nofailInput.value,
        taman: tamanInput.value,
        image: "" // Placeholder for the image string
    };

    // 4. Handle the File Upload (Image)
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        // This runs once the image is finished being converted to text
        reader.onload = function(e) {
            data.image = e.target.result; // The Base64 string of the image
            
            // Save to LocalStorage
            localStorage.setItem('savedRecord', JSON.stringify(data));
            
            alert("Data Berjaya Disimpan!");
            clearForm(); // Clear the UI
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // Save text data only if no image is selected
        localStorage.setItem('savedRecord', JSON.stringify(data));
        alert("Data Disimpan (Tanpa Gambar).");
        clearForm();
    }
}

/**
 * Resets all input fields to empty
 */
function clearForm() {
    document.getElementById('tajuk').value = "";
    document.getElementById('pemaju').value = "";
    document.getElementById('nofail').value = "";
    document.getElementById('taman').value = "";
    document.getElementById('gambar').value = ""; // Resets file picker
    
    // Optional: Log to console to confirm
    console.log("Form has been cleared for the next entry.");
}