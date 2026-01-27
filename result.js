const record = JSON.parse(localStorage.getItem("selectedRecord"));

if (!record) {
    alert("Tiada rekod dipilih.");
    window.location.href = "specific search.html";
}

// Fill text
document.getElementById("tajuk").innerText = "Tajuk Permohonan: " + record.tajuk;
document.getElementById("pemaju").innerText = "Pemaju: " + record.pemaju;
document.getElementById("nofail").innerText = "No Fail: " + record.nofail;
document.getElementById("taman").innerText = "Nama Taman: " + record.taman;

// Fill image
const certImg = document.getElementById("certificateImage");
certImg.src = record.image;

// HOME
function goHome() {
    window.location.href = "index.html";
}

// 🖨 PRINT IMAGE ONLY (SAME PAGE)
function printImage() {
    const body = document.body;

    // Save original page
    const originalContent = body.innerHTML;

    // Replace body with image only
    body.innerHTML = `
        <div style="text-align:center;">
            <img src="${record.image}" style="width:100%;">
        </div>
    `;

    window.print();

    // Restore page after print
    body.innerHTML = originalContent;

    // Reload JS bindings
    location.reload();
}
