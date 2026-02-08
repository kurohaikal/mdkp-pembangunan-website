

async function saveData() {
    const tajukInput = document.getElementById('tajuk');
    const pemajuInput = document.getElementById('pemaju');
    const nofailInput = document.getElementById('nofail');
    const tamanInput = document.getElementById('taman');
    const fileInput = document.getElementById('gambar');

    if (tajukInput.value.trim() === "") {
        alert("Sila masukkan TAJUK PERMOHONAN sebelum simpan.");
        return;
    }

    let imageUrl = "";

    // 2. Upload Image to Supabase Storage first
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Upload to a bucket named 'photos' (You need to create this in Supabase!)
        const { error: uploadError } = await _supabase.storage
            .from('photos')
            .upload(filePath, file);

        if (uploadError) {
            alert("Gagal memuat naik gambar: " + uploadError.message);
            return;
        }

        // Get the public URL for the image
        const { data: urlData } = _supabase.storage
            .from('photos')
            .getPublicUrl(filePath);
        
        imageUrl = urlData.publicUrl;
    }

    // 3. Save everything to the Database Table
    const { data, error } = await _supabase
        .from('my_items')
        .insert([{
            name: tajukInput.value,
            pemaju: pemajuInput.value,
            nofail: nofailInput.value,
            taman: tamanInput.value,
            image_url: imageUrl // Saving the link, not the whole file
        }]);

    if (error) {
        alert("Gagal menyimpan data: " + error.message);
    } else {
        alert("Data Berjaya Disimpan ke Cloud!");
        clearForm();
    }
}

function clearForm() {
    document.getElementById('tajuk').value = "";
    document.getElementById('pemaju').value = "";
    document.getElementById('nofail').value = "";
    document.getElementById('taman').value = "";
    document.getElementById('gambar').value = "";
}