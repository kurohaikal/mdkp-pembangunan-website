document.getElementById("searchBtn").addEventListener("click", searchRecord);

function searchRecord() {
    const tajuk = document.getElementById("tajuk").value.trim();
    const pemaju = document.getElementById("pemaju").value.trim();
    const nofail = document.getElementById("nofail").value.trim();
    const taman = document.getElementById("taman").value.trim();
    const error = document.getElementById("error");

    error.textContent = "";

    // ❌ All empty
    if (!tajuk && !pemaju && !nofail && !taman) {
        error.textContent = "Sila isi sekurang-kurangnya satu maklumat carian";
        return;
    }

    let foundRecord = null;

    // 🔍 Search through all saved records
    for (let key in localStorage) {
        if (key.startsWith("record_")) {
            const record = JSON.parse(localStorage.getItem(key));

            if (
                (!tajuk || record.tajuk === tajuk) &&
                (!pemaju || record.pemaju === pemaju) &&
                (!nofail || record.nofail === nofail) &&
                (!taman || record.taman === taman)
            ) {
                foundRecord = record;
                break;
            }
        }
    }

    // ❌ Not found
    if (!foundRecord) {
        error.textContent = "Rekod tidak dijumpai";
        return;
    }

    // ✅ Save & redirect
    localStorage.setItem("currentResult", JSON.stringify(foundRecord));
    window.location.href = "result.html";
}
