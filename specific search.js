// specific search.js

// 1. Run this as soon as the page loads to build the History Sidebar
window.onload = function() {
    displayHistory();
};

/**
 * Grabs all records from LocalStorage and builds the left-hand sidebar.
 */
function displayHistory() {
    const historyList = document.getElementById('historyList');
    // Retrieve the array of all records saved from index.js
    const records = JSON.parse(localStorage.getItem('allRecords')) || [];

    historyList.innerHTML = ""; // Clear existing list items

    if (records.length === 0) {
        historyList.innerHTML = "<p style='color:white; font-size:14px; text-align:center; padding:10px;'>Tiada rekod disimpan.</p>";
        return;
    }

    // Loop through the list to create clickable record boxes
    records.forEach((rec, index) => {
        const item = document.createElement('div');
        item.className = "history-item";
        
        // Display Title and No. Fail to distinguish between same-title records
        item.innerText = `${rec.tajuk} (${rec.nofail})`; 
        
        // When clicked, fill the form and "prime" the search button with this specific ID
        item.onclick = function() {
            fillForm(rec);
            // We store the Unique ID on the button so the search logic knows which one to pick
            document.getElementById('searchBtn').setAttribute('data-selected-id', rec.id);
            
            // Clear any old error messages
            document.getElementById('error').innerText = "";
        };
        
        historyList.appendChild(item);
    });
}

/**
 * Fills the input boxes with the data from the selected history item.
 */
function fillForm(data) {
    document.getElementById('tajuk').value = data.tajuk;
    document.getElementById('pemaju').value = data.pemaju;
    document.getElementById('nofail').value = data.nofail;
    document.getElementById('taman').value = data.taman;
}

/**
 * Handles the Search button click.
 */
document.getElementById('searchBtn').addEventListener('click', function() {
    const errorMsg = document.getElementById('error');
    const allRecords = JSON.parse(localStorage.getItem('allRecords')) || [];
    
    // Check if we have a specific ID selected from the sidebar
    const selectedId = this.getAttribute('data-selected-id');

    if (selectedId) {
        // FIND BY UNIQUE ID (Solves the duplicate title problem)
        const foundData = allRecords.find(item => item.id == selectedId);

        if (foundData) {
            openRecord(foundData);
            return;
        }
    }

    // FALLBACK: If user typed manually instead of clicking history, search by Tajuk
    const searchVal = document.getElementById('tajuk').value.trim().toLowerCase();
    if (!searchVal) {
        errorMsg.innerText = "Sila pilih rekod dari history atau masukkan tajuk.";
        errorMsg.style.color = "orange";
        return;
    }

    const foundByText = allRecords.find(item => item.tajuk.toLowerCase().includes(searchVal));

    if (foundByText) {
        openRecord(foundByText);
    } else {
        errorMsg.innerText = "Tiada rekod dijumpai.";
        errorMsg.style.color = "red";
    }
});

/**
 * Saves the selected record to 'currentView' and redirects to result page.
 */
function openRecord(data) {
    const errorMsg = document.getElementById('error');
    localStorage.setItem('currentView', JSON.stringify(data));
    
    errorMsg.innerText = "Rekod tepat ditemui! Membuka...";
    errorMsg.style.color = "green";

    setTimeout(() => {
        window.location.href = 'result.html';
    }, 800);
}