const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const XLSX = require('xlsx');
const workbook = XLSX.readFile("C:/Users/ASUS/Documents/Broadcast Whatsapp/sample.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

const timer = ms => new Promise(res => setTimeout(res, ms))

// Generate QR Code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    async function kirim() { 
        for (var i = 0; i < data.length; i++) {
            const number = data[i]["WA"];
            const chatId = number.substring(1) + "@c.us";
            try {
                const txt = "Selamat pagi calon petugas ST2023 \nSaudara diundang untuk seleksi wawancara pada: \nHari/Tanggal  : " + data[i]["Hari"] + "\nTempat	          : " + data[i]["Tempat"] + "\nJam                  : " +data[i]["Jam"] + "\n \nBerkas yang perlu dibawa agar didownload pada link http://s.bps.go.id/5102syaratST2023. Harap membaca dengan seksama *FILE PETUNJUK* pada link tersebut. Calon petugas harus memiliki akun SOBAT, jika belum harap segera install aplikasi SOBAT dari playstore dan melakukan registrasi. Berikut link tutorial pendaftaran akun SOBAT: https://www.youtube.com/watch?v=M84krAiiEd8";
                
                // Kirim pesan
                client.sendMessage(chatId, txt);

                // Menampilkan log 
                console.log(i + " Nomor WA: " + data[i]["WA"] + " berhasil terkirim");
            } catch (error) {
                // Menampilkan log 
                console.log(i + " Nomor WA: " + data[i]["WA"] + " gagal");            
            }
            // Kasih Jeda random antara 9000 ms sampai 12000 ms
            const rand = Math.floor(Math.random() * 3000) + 9000;
            
            await timer(rand); 
        }
    }

    kirim();
});

client.initialize();
