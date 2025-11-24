# Laravel Vuetify Starter Kit

A **feature‑rich** starter kit that combines the power of **Laravel** with the elegance of **Vuetify** (Vue 3). It provides a solid foundation for building modern, responsive, and beautifully designed web applications with a seamless developer experience. This is a community‑maintained Laravel starter kit; see the official Laravel starter kit documentation for more details.

---

## ✨ Features

- **Laravel 12** backend with API resources, authentication scaffolding, and robust routing.
- **Vuetify 3** UI components with auto‑imported kebab‑case syntax for a clean component structure.
- **Vue 3** composition API and TypeScript support.
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
- **API** – Example API routes are defined in `routes/api.php`. Extend them as needed.
- **Docker** – Run `docker-compose up -d` to spin up a containerised environment (see `docker-compose.yml`).

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Ensure code passes linting (`npm run lint` and `composer lint`).
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
