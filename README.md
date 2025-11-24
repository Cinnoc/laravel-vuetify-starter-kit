# Laravel Vuetify Starter Kit

A **feature‑rich** starter kit that combines the power of **Laravel** with the elegance of **Vuetify** (Vue 3). It provides a solid foundation for building modern, responsive, and beautifully designed web applications with a seamless developer experience. This is a community‑maintained Laravel starter kit; see the official Laravel starter kit documentation for more details.

---

## ✨ Features

- **Laravel 12**
- **Vuetify 3**
- **Vue 3**
- Ready‑to‑use **dark mode** and **responsive layout**.

---

## 📦 Prerequisites

Make sure you have the following installed on your machine:

- **PHP >= 8.2**
- **Composer**
- **Node.js >= 20** (with npm or Yarn)
- **Laravel Installer** (optional, but handy)

---

## 🚀 Installation

### Option 1: Using Laravel Installer (Recommended)

```bash
laravel new my-app --using=cinnoc/laravel-vuetify-starter-kit
cd my-app
php artisan serve
```

The application will be available at `http://127.0.0.1:8000`.

### Option 2: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/chibyk101/laravel-vuetify-starter-kit.git
cd laravel-vuetify-starter-kit

# Install PHP dependencies
composer install

# Install Node dependencies
npm install   # or `yarn`

# Copy environment file and generate app key
cp .env.example .env
php artisan key:generate

# Run migrations (optional – set up your DB first)
php artisan migrate

# Build assets and start the dev server
npm run dev   # Vite dev server
php artisan serve   # Laravel dev server (http://127.0.0.1:8000)
```

The application will be available at `http://localhost:8000`.

---

## 🛠️ Usage

- **Authentication** – Register, login, password reset, and two‑factor authentication are already wired up.
- **Vuetify components** – All components are auto‑imported; use kebab‑case tags directly in your `.vue` files.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Ensure code passes linting (`npm run lint`).
4. Submit a Pull Request with a clear description of changes.

---

## 📜 License

This project is open‑source and available under the **MIT License**.

---

## 🙏 Acknowledgements

- **Laravel** – https://laravel.com/
- **Vuetify** – https://vuetifyjs.com/
- **Vue 3** – https://vuejs.org/

---

*Happy coding!*
