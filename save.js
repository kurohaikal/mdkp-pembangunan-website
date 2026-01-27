function saveData() {
    const tajuk = document.getElementById("tajuk").value;
    const pemaju = document.getElementById("pemaju").value;
    const nofail = document.getElementById("nofail").value;
    const taman = document.getElementById("taman").value;
    const file = document.getElementById("gambar").files[0];

    if (!file || !nofail) {
        alert("No Fail dan gambar wajib diisi.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const record = {
            tajuk,
            pemaju,
            nofail,
            taman,
            image: reader.result
        };

        const records = JSON.parse(localStorage.getItem("records")) || [];

        const index = records.findIndex(r => r.nofail === nofail);
        if (index !== -1) {
            records[index] = record;
        } else {
            records.push(record);
        }

        localStorage.setItem("records", JSON.stringify(records));
        localStorage.setItem("selectedRecord", JSON.stringify(record));

        // ✅ Navigate only AFTER file is loaded
        window.location.href = "result.html";
    };

    // 🔑 This triggers onload
    reader.readAsDataURL(file);
}
