# Zen Weather
![Logo](./public/logo.png "Zen Weather")

Zen Weather is an intuitive, smooth, and interactive weather application that provides **real-time weather updates**, **forecasts**, and **customizable settings** for a truly personalized experience.  

---

## ✨ Features

- **Real-Time Weather Updates** – Accurate, up-to-date weather data for your location or any searched city.
- **Interactive Weather Animations** – Dynamic icons and background effects that match current conditions.
- **Location Management** – Add, delete, and manage multiple saved locations.
- **Customizable Units** – Switch between Celsius/Fahrenheit, km/h or mph, and mbar or hPa.
- **Responsive UI** – Optimized for desktop, tablet, and mobile devices.
- **Smooth Transitions** – Beautiful animations powered by Framer Motion.

---

## 📂 Project Structure
```
zen-weather/
├── components/
│ ├── ui/ # UI components
│ ├── Home.jsx # Main weather dashboard
│ ├── Navbar.jsx # Top navigation bar
│ ├── LocationDialog.jsx # Manage and search locations
│ ├── Settings.jsx # User preferences dialog
│ ├── ForecastList.jsx # Weekly forecast display
│ ├── AQI.jsx # Air Quality Index display
│ └── Loader.jsx # Loading animations
│
├── hooks/ # Custom React hooks
│ ├── useLocation.jsx # Manage locations & local storage
│ ├── useSettings.jsx # Manage temperature/wind/pressure units
│ └── useWeather.jsx # Fetch & store weather data
│
├── app/ # Next.js app
│ ├── index.js # Main entry page
│ └── api/ # Backend API routes
│ 
└── public/ # Static assets (icons, images)
```
## 🚀 Installation

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **yarn** package manager

### Steps
```bash
# Clone the repository
git clone https://github.com/your-username/zen-weather.git
cd zen-weather

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```
## 🖥 Usage

### 1. Weather Dashboard
- View current weather, current forecasts, and future forecasts.
- Animations and elements adapt to the weather conditions.

### 2. Location Management
- Click 📍 in the navbar to open the location dialog.
- Search for a city or pick from saved locations.
- Add or delete saved cities.

### 3. Settings
- Click Settings to change units:
  - **Temperature**: Celsius / Fahrenheit
  - **Wind Speed**: km/h / mph
  - **Pressure**: mbar / hPa

---

## 🛠 Tech Stack
- **Next.js** – Frontend framework for server-side rendering & routing
- **Framer Motion** – Animations
- **Tailwind CSS** – Styling
- **Lucide Icons** – Icons
- **WeatherAPI** – Weather data source
- **Nominatim API** – Reverse geocoding

---

## 📦 Deployment
```bash
# Build the project
npm run build

# Start production server
npm start
```

Link : https://zen-weatherr.vercel.app/
