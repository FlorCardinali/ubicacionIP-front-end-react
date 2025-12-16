# 📍 Localizador de IP con Mapa Interactivo

Este es un proyecto Full-Stack desarrollado con el stack ERN (Express, React, Node) que permite a los usuarios buscar y visualizar la ubicación geográfica de cualquier dirección IP pública, mostrando el resultado en un mapa interactivo.

---

## 🌟 Características Principales

* **Geolocalización Asíncrona:** El Frontend llama a un API Gateway (Backend Express) que consulta una API externa para obtener datos de ubicación (País, Ciudad, Coordenadas).
* **Diseño Moderno y Responsivo:** Implementado con **Tailwind CSS** para un desarrollo rápido y escalable. Utiliza un tema oscuro (Dark Mode) con gradientes de color.
* **Visualización con Google Maps:** La latitud y longitud obtenidas se muestran inmediatamente en un mapa incrustado (`<iframe>`).
* **Separación de Lógica:** La aplicación usa el patrón *Lifting State Up* para gestionar el estado de la aplicación desde el componente principal (`App.jsx`), permitiendo que los componentes hermanos (`LocalizadorIP` y `MapaUbicacion`) compartan datos sin acoplamiento.
* **Manejo de Errores Robustos:** Implementación de manejo de excepciones en el Backend para IPs reservadas/inválidas (ej. 254.x.x.x) y manejo de errores de conexión.

---

## 🚀 Tecnologías Utilizadas

### Frontend (client/)
* **React.js:** Librería principal de la interfaz de usuario.
* **Vite:** Herramienta de *bundling* rápido.
* **Tailwind CSS (v4):** Para el diseño y estilos.

### Backend (server/)
* **Node.js & Express:** Servidor API Gateway.
* **`node-fetch`:** Para realizar llamadas HTTP a la API externa.
* **`dotenv`:** Para la gestión segura de variables de entorno (API Keys).
* **`cors`:** Para gestionar la política de *Cross-Origin Resource Sharing* entre el Frontend y el Backend.

---

## ⚙️ Instalación y Configuración

El proyecto está dividido en dos repositorios separados: `server/` (Backend) y `client/` (Frontend). Ambos deben ejecutarse simultáneamente.

### 1. Variables de Entorno

Crea un archivo llamado `.env` en la raíz de la carpeta **`server/`** y añade tu clave de API para la geolocalización: