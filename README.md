# 🏐 Volleyball Expert System

**Volleyball Expert System** adalah sebuah sistem pakar berbasis web yang mengaplikasikan metode logika _forward chaining_ untuk mengidentifikasi pelanggaran (foul) pada pertandingan bola voli secara otomatis.

Dikembangkan menggunakan _tech stack_ modern (Laravel 13, React 19, Inertia.js v3, TailwindCSS v4, dan terintegrasi standar Laravel Breeze), aplikasi ini tidak hanya menawarkan UI/UX yang elegan baik di mode terang maupun gelap tetapi juga interaktivitas _real-time_ yang sangat responsif.

### Fitur Utama:

- **Inference Engine Interaktif**: Pengguna / wasit bisa mencentang fakta lapangan yang diamati (misalnya: "Pemain belakang melakukan smash di area depan") yang kemudian dieksekusi oleh sistem pakar untuk menghasilkan kesimpulan pelanggaran apa yang terjadi (misalnya: "Attack Hit Fault - Back-Row").
- **Admin Knowledge Base Panel**: Dashboard admin berkeamanan tinggi bagi pakar untuk memanipulasi _Rules_ (aturan) maupun _Facts_ (fakta logis) secara _live_ tanpa perlu memodifikasi coding bawaan (CRUD support).
- **Dynamic Seeder**: Dilengkapi dengan sistem parser CSV yang cerdas (untuk `facts.csv` dan `rules.csv`), sehingga inisiasi data basis pengetahuan (_knowledge base_) dapat dilakukan dengan cepat.

---

## 🛠 Panduan Instalasi (Dengan MySQL Database)

Untuk menjalankan aplikasi ini secara lokal (Local Development), pastikan sistem Anda sudah terpasang:

- **PHP 8.4+**
- **Composer**
- **Node.js (versi terbaru) & NPM**
- **MySQL Server** (XAMPP, Laragon, MySQL Workbench, atau Laravel Herd Pro)

Berikut ini adalah langkah-langkah komprehensif mulai dari melakukan _cloning_ repositori hingga aplikasi siap berjalan di browser:

### 1. Clone Repositori

Langkah pertama adalah mendapatkan salinan kode dari repositori GitHub. Buka Terminal/Command Prompt, arahkan ke folder lokal Anda, dan jalankan perintah:

```bash
git clone https://github.com/dafwa/volleyball-expert-system.git
cd volleyball-expert-system
```

### 2. Install Dependensi PHP (Backend)

Install seluruh _library_ dan kerangka dasar Laravel menggunakan Composer:

```bash
composer install
```

### 3. Install Dependensi Frontend (NPM)

Install React, Inertia, TailwindCSS, dan _library_ JavaScript/Typescript lainnya:

```bash
npm install
```

### 4. Konfigurasi Environment & Node

Salin file konfigurasi utama dari format bawaan:

```bash
cp .env.example .env
```

_Catatan untuk Windows: Jika `cp` error melalui cmd, jalankan `copy .env.example .env`_

Buka file `.env` yang baru saja terbuat dan atur environment database ke MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=volleyball_expert_db
DB_USERNAME=root
DB_PASSWORD=
```

_(Sesuaikan nama database `DB_DATABASE`, `DB_USERNAME`, dan password dengan kredensial server MySQL di komputer Anda)_

**Sangat Penting!** Pastikan Anda juga membuat database kosong sesuai nama di atas (misalnya `volleyball_expert_db`) melalui PhpMyAdmin, DBeaver, atau Terminal MySQL terlebih dahulu.

### 5. Generate Key & Setup Database

Tautkan enkripsi keamanan aplikasi, jalankan struktur tabel otomatis (Migrations), dan suntik basis datanya menggunakan Engine CSV bawaan sistem (Seeder):

```bash
php artisan key:generate
php artisan migrate:fresh --seed
```

### 6. Jalankan Proses Frontend (Vite)

Jalankan kompilasi dev server agar Asset React `.tsx` dan TailwindCSS Anda diluncurkan. Buka tab Terminal **baru/terpisah** (biarkan tetap menyala):

```bash
npm run dev
```

### 7. Jalankan Local Server (Pilih Salah Satu)

Buka tab Terminal **baru** dan jalankan server _built-in_ dari Laravel:

```bash
php artisan serve
```

Buka browser dan ketik alamat: **`http://127.0.0.1:8000`**

_(Jika Anda menggunakan **Laravel Herd**, Anda tidak perlu menggunakan artisan serve. Anda cukup mengetikkan alamat `http://volleyball-expert-system.test` di browser)._

---

### Selesai! 🎉

Aplikasi **Volleyball Expert System** Anda sudah siap digunakan. Anda bisa mengunjungi `/` untuk mencoba Engine inference utamanya, dan ke routing `/login` untuk masuk menuju pengaturan administratif!
