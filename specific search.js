// Variable to store the record you actually click in the sidebar
let selectedRecord = null;

window.onload = function() {
    displayHistory(); 
};

async function displayHistory() {
    const historyList = document.getElementById('historyList');
    const { data: records, error } = await _supabase
        .from('my_items')
        .select('*');

    historyList.innerHTML = ""; 

    if (error || !records || records.length === 0) {
        historyList.innerHTML = "<p style='color:white; text-align:center;'>Tiada rekod.</p>";
        return;
    }

    // Sort manually to show newest at top
    records.sort((a, b) => b.id - a.id);

    records.forEach((rec) => {
        const item = document.createElement('div');
        item.className = "history-item";
        item.innerText = `${rec.taman || 'No Name'} (${rec.nofail || 'No Fail'})`; 
        
        item.onclick = function() {
            // 1. Fill the form boxes
            fillForm(rec);
            // 2. IMPORTANT: Lock this specific record so the Search button knows exactly which one to open
            selectedRecord = rec;
            
            // Visual feedback: highlight selected item
            document.querySelectorAll('.history-item').forEach(el => el.style.background = "transparent");
            item.style.background = "rgba(255,255,255,0.2)";
        };
        
        historyList.appendChild(item);
    });
}

function fillForm(data) {
    document.getElementById('tajuk').value = data.taman || ""; 
    document.getElementById('pemaju').value = data.pemaju || "";
    document.getElementById('nofail').value = data.nofail || "";
    document.getElementById('taman').value = data.taman || "";
}

// The Search button now opens the SPECIFIC record you clicked
document.getElementById('searchBtn').addEventListener('click', function() {
    const errorMsg = document.getElementById('error');
    
    if (selectedRecord) {
        // If you clicked an item in history, open that exact one
        openRecord(selectedRecord);
    } else {
        // If you just typed in the box without clicking history, show an error
        errorMsg.innerText = "Sila klik rekod dari History terlebih dahulu.";
        errorMsg.style.color = "yellow";
    }
});

function openRecord(data) {
    // This passes the UNIQUE ID and UNIQUE IMAGE_URL to the result page
    localStorage.setItem('currentView', JSON.stringify(data));
    window.location.href = 'result.html';
}