// client/src/MapaUbicacion.jsx

import React from 'react';
import styles from './App.module.css';

const MapaUbicacion = ({ ubicacion, estadoCarga }) => {
    
    // Solo renderizar si la carga finalizó y hay datos de ubicación
    if (estadoCarga !== 'finalizado' || !ubicacion) {
        return null; 
    }

    const { latitud, longitud } = ubicacion;

    // 🛑 1. CONSTRUCCIÓN DE LA URL CORREGIDA
    // Usamos el formato https://maps.google.com/maps
    // El parámetro 'q' acepta la latitud y longitud.
    // El parámetro 'z' es el zoom.
    const mapaSrc = `https://maps.google.com/maps?q=${latitud},${longitud}&z=13&output=embed`;

    return (
        <div className={styles.mapCard}>
            
            <iframe className={styles.iframe}
                title="Mapa de Ubicación"
                src={mapaSrc} 
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default MapaUbicacion;