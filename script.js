// Simple interactions: theme toggle, mobile nav, contact form demo
const texts = [
  "Beginner Network Administrator ",
  "Beginner Web Developer ",
  "Learning Network & Web Development "
];

const el = document.getElementById("typewriter");

let idx = 0;
let char = 0;
let deleting = false;
let done = false;

function type() {
  if (done) return;

  let current = texts[idx];

  if (!deleting) {
    // proses ngetik
    el.textContent = current.substring(0, char + 1);
    char++;

    if (char === current.length) {
      if (idx === texts.length - 1) {
        done = true; // stop di teks terakhir
        return;
      }
      setTimeout(() => deleting = true, ); // jeda sebelum hapus
    }
  } else {
    // proses hapus
    el.textContent = current.substring(0, char - 1);
    char--;

    if (char === 0) {
      deleting = false;
      idx++; // lanjut teks berikutnya
    }
  }

  setTimeout(type, deleting ? 60 : 60);
}

type();



/* =============== LINGKARAN ANIMASI =============== */
const circles = document.querySelectorAll(".outer-circle");

circles.forEach(circle => {
    let percent = circle.getAttribute("data-percent");
    let degree = percent * 3.6; // ubah % → derajat

    let current = 0;  
    let speed = 30;  // makin kecil makin cepat

    let anim = setInterval(() => {
        current++;

        let smallBlue = Math.min(current * 3.6, degree); 
        // warna biru muda gue kecilin area-nya

        circle.style.background = `
            conic-gradient(
                #4dc2ff ${smallBlue}deg,
                #1b1b1b ${smallBlue}deg
            )
        `;

        if (current >= percent) {
            clearInterval(anim);
        }
    }, speed);
});

// =========================
// ANIMASI BAR
const fills = document.querySelectorAll(".fill");

fills.forEach(fill => {
    let target = fill.getAttribute("data-fill");

    setTimeout(() => {
        fill.style.width = target + "%";
    }, 200);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});


document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const token = "8460626408:AAH1-67wDVP06frJylVhwLBj2F6Ep7lUtvU"; // Ganti token
const chat_id = "7508766509";  // Ganti chat_id Telegram tujuan

// Buat toast element
const toast = document.createElement('div');
toast.className = 'toast';
document.querySelector('.contact-form-wrapper').appendChild(toast);

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500); // hilang setelah 2,5 detik
}

document.getElementById("sendBtn").addEventListener("click", async () => {
    const name = document.getElementById("nameInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();

    if (!name || !message) {
        showToast("Nama dan pesan harus di isi!");
        return;
    }

    const text = `Pesan dari: ${name}\n\n${message}`;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chat_id,
                    text: text,
                }),
            }
        );

        const data = await response.json();

        if (data.ok) {
            showToast("Pesan berhasil dikirim!");
            document.getElementById("nameInput").value = "";
            document.getElementById("messageInput").value = "";
        } else {
            showToast("Gagal mengirim pesan: " + data.description);
        }
    } catch (error) {
        showToast("Terjadi kesalahan: " + error.message);
    }
});

// Ambil elemen header