window.onload = function() {
    // 1. Get the specific record passed from the search page
    const storedData = localStorage.getItem('currentView');
    
    if (storedData) {
        const data = JSON.parse(storedData);

        // 2. Fill the text data using the correct Supabase column names
        // We use 'taman' for the Title since that's where your data is stored
        document.getElementById('tajuk').innerText = "TAJUK: " + (data.taman || "N/A");
        document.getElementById('pemaju').innerText = "PEMAJU: " + (data.pemaju || "N/A");
        document.getElementById('nofail').innerText = "NO. FAIL: " + (data.nofail || "N/A");
        document.getElementById('taman').innerText = "NAMA TAMAN: " + (data.taman || "N/A");

        // 3. Display the specific image for this record
        const imgElement = document.getElementById('certificateImage');
        if (data.image_url) {
            imgElement.src = data.image_url;
        } else {
            imgElement.alt = "Gambar tidak ditemui";
        }
    } else {
        alert("Tiada rekod dipilih!");
        window.location.href = 'index.html';
    }
};

function goHome() {
    window.location.href = 'index.html';
}

function printImage() {
    window.print(); 
}