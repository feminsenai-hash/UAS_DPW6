
// ==========================================
// UNIMOR MARKETPLACE - JAVASCRIPT
// ==========================================


// 1. DATA PRODUK
const produk = [
    { id: 1, nama: "Nasi Goreng", kategori: "Makanan", harga: 15000 },
    { id: 2, nama: "Roti Bakar", kategori: "Makanan", harga: 12000 },
    { id: 3, nama: "Kaos UNIMOR", kategori: "Fashion", harga: 75000 },
    { id: 4, nama: "Tas Kuliah", kategori: "Fashion", harga: 65000 },
    { id: 5, nama: "Headset", kategori: "Elektronik", harga: 85000 },
    { id: 6, nama: "Flashdisk", kategori: "Elektronik", harga: 45000 },
    { id: 7, nama: "Buku Pemrograman", kategori: "Buku", harga: 50000 },
    { id: 8, nama: "Jasa Desain Grafis", kategori: "Jasa", harga: 30000 }
];


// 2. KERANJANG BELANJA
let keranjang = [];


// 3. FORMAT HARGA RUPIAH
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}


// 4. MENAMBAHKAN PRODUK KE KERANJANG
function tambahKeranjang(id) {

    const item = produk.find(p => p.id === Number(id));

    if (!item) {
        alert("Produk tidak ditemukan!");
        return;
    }

    const sudahAda = keranjang.find(p => p.id === item.id);

    if (sudahAda) {
        sudahAda.jumlah++;
    } else {
        keranjang.push({
            ...item,
            jumlah: 1
        });
    }

    updateJumlahKeranjang();

    alert(item.nama + " berhasil ditambahkan ke keranjang!");
}


// 5. MEMPERBARUI JUMLAH KERANJANG
function updateJumlahKeranjang() {

    const jumlahKeranjang = document.getElementById("jumlahKeranjang");

    const jumlah = keranjang.reduce(
        (total, item) => total + item.jumlah, 0
    );

    if (jumlahKeranjang) {
        jumlahKeranjang.textContent = jumlah;
    }
}


// 6. MELIHAT KERANJANG
function lihatKeranjang() {

    const cartItems = document.getElementById("cartItems");
    const totalHarga = document.getElementById("totalHarga");

    if (!cartItems || !totalHarga) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (keranjang.length === 0) {

        cartItems.innerHTML = "<p>Keranjang masih kosong.</p>";

    } else {

        keranjang.forEach(item => {

            const subtotal = item.harga * item.jumlah;

            total += subtotal;

            const baris = document.createElement("div");

            baris.className = "cart-item";

            baris.innerHTML = `
                <div>
                    <h4>${item.nama}</h4>
                    <p>Harga: ${formatRupiah(item.harga)}</p>
                    <p>Jumlah: ${item.jumlah}</p>
                    <p>Subtotal: ${formatRupiah(subtotal)}</p>
                </div>

                <button onclick="hapusKeranjang(${item.id})">
                    Hapus
                </button>
            `;

            cartItems.appendChild(baris);

        });

    }

    totalHarga.textContent = "Total: " + formatRupiah(total);

    document.getElementById("cartModal").style.display = "flex";
}


// 7. MENGHAPUS PRODUK DARI KERANJANG
function hapusKeranjang(id) {

    keranjang = keranjang.filter(item => item.id !== Number(id));

    updateJumlahKeranjang();

    lihatKeranjang();
}


// 8. TOMBOL PESAN SEKARANG MENUJU LOGIN
function checkout() {

    if (keranjang.length === 0) {

        alert("Silakan pilih barang terlebih dahulu!");

        return;
    }

    // Tutup keranjang
    document.getElementById("cartModal").style.display = "none";

    // Buka login
    document.getElementById("loginModal").style.display = "flex";

}


// 9. MEMBUKA LOGIN
function bukaLogin() {

    document.getElementById("loginModal").style.display = "flex";

}


// 10. MENUTUP MODAL
function tutupModal(id) {

    document.getElementById(id).style.display = "none";

}


// 11. PENCARIAN PRODUK
function cariProduk() {

    const input = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const semuaProduk = document.querySelectorAll(".product-card");

    let ditemukan = 0;

    semuaProduk.forEach(card => {

        const nama = card.querySelector("h3").textContent.toLowerCase();

        const kategori = card.querySelector(".category").textContent.toLowerCase();

        if (nama.includes(input) || kategori.includes(input)) {

            card.style.display = "";

            ditemukan++;

        } else {

            card.style.display = "none";

        }

    });

    if (ditemukan === 0) {
        alert("Produk tidak ditemukan!");
    }

}


// 12. FILTER KATEGORI
function filterKategori(kategori) {

    const semuaProduk = document.querySelectorAll(".product-card");

    document.getElementById("searchInput").value = "";

    semuaProduk.forEach(card => {

        const namaKategori = card.querySelector(".category")
            .textContent.trim();

        if (kategori === "Semua" || namaKategori === kategori) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// 13. LOGIN DAN KIRIM PESAN KE WHATSAPP ADMIN
function login() {

    const nama = document.getElementById("namaLogin").value.trim();

    const email = document.getElementById("emailLogin").value.trim();

    const alamat = document.getElementById("alamatLogin").value.trim();

    const status = document.getElementById("loginStatus");

    // GANTI DENGAN NOMOR WHATSAPP ADMIN
    const nomorAdmin = "6282147509317";


    // VALIDASI DATA
    if (nama === "" || email === "" || alamat === "") {

        status.textContent = "Semua data wajib diisi!";

        status.style.color = "red";

        return;
    }

    if (!email.includes("@") || !email.includes(".")) {

        status.textContent = "Email tidak valid!";

        status.style.color = "red";

        return;
    }

    if (keranjang.length === 0) {

        status.textContent = "Keranjang masih kosong!";

        status.style.color = "red";

        return;
    }


    // MEMBUAT RINCIAN PESANAN
    let daftarPesanan = "";

    let total = 0;

    keranjang.forEach((item, index) => {

        const subtotal = item.harga * item.jumlah;

        total += subtotal;

        daftarPesanan +=
            (index + 1) + ". " + item.nama + "\n" +
            "Jumlah: " + item.jumlah + "\n" +
            "Harga: " + formatRupiah(item.harga) + "\n" +
            "Subtotal: " + formatRupiah(subtotal) + "\n\n";

    });


    // MEMBUAT PESAN WHATSAPP
    const pesan =
        "*PESANAN UNIMOR MARKETPLACE*\n\n" +

        "*DATA MAHASISWA*\n" +
        "Nama: " + nama + "\n" +
        "Email: " + email + "\n" +
        "Alamat: " + alamat + "\n\n" +

        "*DAFTAR BARANG PESANAN*\n\n" +
        daftarPesanan +

        "*TOTAL PEMBAYARAN: " + formatRupiah(total) + "*\n\n" +

        "Mohon konfirmasi pesanan saya. Terima kasih.";


    // MEMBUKA WHATSAPP
    const urlWhatsApp =
        "https://wa.me/" + nomorAdmin +
        "?text=" + encodeURIComponent(pesan);

    window.open(urlWhatsApp, "_blank");

}


// 14. MENUTUP MODAL KETIKA KLIK DI LUAR
window.addEventListener("click", function(event) {

    const cartModal = document.getElementById("cartModal");

    const loginModal = document.getElementById("loginModal");

    if (event.target === cartModal) {
        tutupModal("cartModal");
    }

    if (event.target === loginModal) {
        tutupModal("loginModal");
    }

});


// 15. MENJALANKAN SAAT HALAMAN DIBUKA
document.addEventListener("DOMContentLoaded", function() {

    updateJumlahKeranjang();

});
