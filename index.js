/**
 * index.js 
 * Handles saving multiple records to an array and clearing the form.
 */

function saveData() {
    const tajukInput = document.getElementById('tajuk');
    const pemajuInput = document.getElementById('pemaju');
    const nofailInput = document.getElementById('nofail');
    const tamanInput = document.getElementById('taman');
    const fileInput = document.getElementById('gambar');

    if (tajukInput.value.trim() === "") {
        alert("Sila masukkan TAJUK PERMOHONAN sebelum simpan.");
        return;
    }

    // 1. Fetch existing records or start a fresh array
    let allRecords = JSON.parse(localStorage.getItem('allRecords')) || [];

    const data = {
        id: Date.now(), // Unique ID for each record
        tajuk: tajukInput.value,
        pemaju: pemajuInput.value,
        nofail: nofailInput.value,
        taman: tamanInput.value,
        image: "" 
    };

    // Helper function to handle the final saving steps
    const finalizeSave = (recordData) => {
        allRecords.push(recordData); // Add to the list
        localStorage.setItem('allRecords', JSON.stringify(allRecords)); // Save the whole list
        alert("Data Berjaya Disimpan ke Sejarah!");
        clearForm();
    };

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            data.image = e.target.result;
            finalizeSave(data);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        finalizeSave(data);
    }
}

function clearForm() {
    document.getElementById('tajuk').value = "";
    document.getElementById('pemaju').value = "";
    document.getElementById('nofail').value = "";
    document.getElementById('taman').value = "";
    document.getElementById('gambar').value = "";
    console.log("Form cleared. Ready for next record.");
}