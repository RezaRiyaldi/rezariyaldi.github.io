# Reza Riyaldi Portfolio

Portfolio pribadi Reza Riyaldi yang difokuskan sebagai **Backend Engineer / Backend Developer**. Website ini dibangun sebagai static site dan tetap kompatibel dengan **GitHub Pages** tanpa proses build tambahan.

## Overview

Situs ini adalah **multi-page static site** dengan struktur:

- `index.html` — Hero section dengan positioning backend engineer
- `about.html` — About + Expertise
- `experience.html` — Experience timeline + Education
- `projects.html` — Project showcase + Tech stack
- `contact.html` — Contact form (Web3Forms + hCaptcha) + link profesional

## Tech Stack

- HTML5
- Tailwind CSS CDN
- Vanilla JavaScript
- Google Fonts Poppins
- GitHub Pages
- Web3Forms (contact form → email)
- hCaptcha (anti-spam)

## Contact Form

Form di `contact.html` mengirim pesan ke email pribadi melalui **Web3Forms** dengan proteksi **hCaptcha**.

### Setup Web3Forms

1. Daftar gratis di [web3forms.com](https://web3forms.com) dan verifikasi email.
2. Ambil **Access Key** dari dashboard.
3. Buka `contact.html` dan ganti nilai `access_key` pada hidden input:

   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```

### Setup hCaptcha

1. Daftar di [hcaptcha.com](https://www.hcaptcha.com) dan buat site baru.
2. **Site Key** (public) — sudah terpasang di `contact.html` pada `data-sitekey`:

   ```html
   <div class="h-captcha" data-sitekey="YOUR_HCAPTCHA_SITE_KEY"></div>
   ```

3. **Secret Key** (private) — paste di **Web3Forms dashboard → Settings → Captcha**. Jangan pernah taruh secret key di file HTML.

> Catatan: Site key dan secret key harus berasal dari **site hCaptcha yang sama**. Tanpa secret key di Web3Forms, submit akan gagal dengan error "Could not validate hCaptcha".

## WhatsApp Shortcut

Floating button WhatsApp tersedia di semua halaman, mengarah ke `https://wa.me/6285695186848`. Untuk mengganti nomor, cari `wa.me/` di semua file HTML.

## Assets Used

- `asset/img/profile.png` untuk foto profile utama
- `asset/img/brand.svg` untuk brand mark
- `asset/img/iconMe.png` untuk favicon
- `asset/file/cv_reza.pdf` untuk tombol download CV

## Live Deployment

Repository ini bisa langsung dijalankan di GitHub Pages karena tidak membutuhkan build step.

## Run Locally

Cukup buka `/` di browser, atau jalankan server statis sederhana seperti:

```bash
python3 -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000
```

## Notes

- Website ini sengaja tidak menggunakan Bootstrap, jQuery, atau AOS.
- Tailwind dipakai lewat CDN agar tetap ringan dan mudah dideploy ke GitHub Pages.
- Konten project dibuat konservatif supaya tidak ada klaim yang berlebihan.
- Jika ingin mengganti CV, cukup replace file di `asset/file/cv_reza.pdf`.

## Folder Structure

```text
/
index.html
about.html
experience.html
projects.html
contact.html
asset/
  css/
    style.css
  file/
    cv_reza.pdf
  img/
    brand.svg
    iconMe.png
    profile.png
  js/
    script.js
icofont/
```

## Contact

- LinkedIn: https://www.linkedin.com/in/reza-riyaldi-798b52319/
- GitHub: https://github.com/RezaRiyaldi
- Email: rezairawan978@gmail.com
- WhatsApp: https://wa.me/6285695186848
