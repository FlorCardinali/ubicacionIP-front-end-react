// client/src/LocalizadorIP.jsx

import React from 'react'; 
import styles from "./App.module.css"

// IMPORTANTE: Asegúrate de que todas estas props se estén pasando desde App.jsx
function LocalizadorIP({ 
    ipInput, setIpInput, ipBuscar, ubicacion, estadoCarga, 
    error, setError, esIPValida, manejarBusqueda, setEstadoCarga 
}) 
{
    const renderResultados = () => {
        if (estadoCarga === 'cargando') {
            return <p className={styles.estado}>Localizando IP {ipBuscar}... 🛰️</p>;
        }
        
        if (estadoCarga === 'error') {
            // Muestra el error que viene del padre
            return <p className={`${styles.estado} ${styles.error}`} >❌ {error}</p>;
        }

        if (estadoCarga === 'finalizado' && ubicacion) {
            // Muestra la tarjeta de ubicación
            return (
                <div className={styles.tarjetaUbicacion}>
                    <h2 className={styles.ubicationTitle}>Ubicación Encontrada</h2>
                    <p><strong>IP Consultada:</strong> {ubicacion.ip}</p>
                    <p><strong>País:</strong> {ubicacion.pais}</p>
                    <p><strong>Ciudad:</strong> {ubicacion.ciudad}</p>
                    <p><strong>Coordenadas:</strong> {ubicacion.latitud}, {ubicacion.longitud}</p>
                </div>
            );
        }
        
        // Mensaje inicial o estado vacío
        return <p className="mensaje-inicial">Introduce una IP (ej: 1.1.1.1) para localizarla.</p>;
    };

    return (
        <div className={styles.inputAndCardCcontainer}>
            
            {/* Caja de Búsqueda */}
            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Escribe la dirección IP (ej: 8.8.8.8)"
                    value={ipInput}
                    onChange={(e) => {
                        setIpInput(e.target.value);
                        setError(null);
                        setEstadoCarga(''); 
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter') manejarBusqueda(); }}
                    disabled={estadoCarga === 'cargando'}
                />
                <button 
                    onClick={manejarBusqueda}
                    disabled={estadoCarga === 'cargando' || !esIPValida(ipInput)}
                >
                    {estadoCarga === 'cargando' ? 'Localizando...' : 'Localizar IP'}
                </button>
            </div>
            {renderResultados()}
        </div>
    );
}

export default LocalizadorIP;