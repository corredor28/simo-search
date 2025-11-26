# SIMO Search - Unofficial Viewer

A modern, premium React application designed to query and visualize job offers from the [SIMO](https://simo.cnsc.gov.co/) (Sistema de apoyo para la Igualdad, el Mérito y la Oportunidad) platform in Colombia.

## 🚀 Features

- **Advanced Filtering**: Search by keyword, process type, entity, department, municipality, level, salary range, and OPEC number.
- **Smart Location Logic**: Automatically displays the relevant vacancy location based on your search filters.
- **Premium UI**: Built with a modern, responsive design using glassmorphism and smooth transitions.
- **Sortable Results**: Easily sort job offers by salary, ID, code, and more.
- **Real-time Data**: Connects directly to the SIMO public API (via proxy).

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **Styling**: Vanilla CSS (Premium Design System)
- **HTTP Client**: Axios

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/simo-search.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd simo-search
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## 🏃‍♂️ Running Locally

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

> **Note**: This project uses a Vite proxy to handle CORS requests to the SIMO API during development.

## 🤖 Credits

Developed in collaboration with **Antigravity**, an advanced AI coding assistant by **Google DeepMind**.

## ⚠️ Disclaimer

This is an unofficial viewer and is not affiliated with, endorsed by, or connected to the CNSC (Comisión Nacional del Servicio Civil) or the SIMO platform. It is intended for educational and personal use only.


## Deploy

This project is configured for deployment on **Netlify**.

1. Push this code to a GitHub repository.
2. Log in to [Netlify](https://www.netlify.com/) and click "Add new site" -> "Import an existing project".
3. Connect your GitHub repository.
4. Netlify will automatically detect the build settings (`npm run build`, `dist`). Click "Deploy".

The `netlify.toml` file handles the proxying to the SIMO API, so no extra configuration is needed.

Made with love in Bogotá, Colombia.
