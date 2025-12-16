import LocalizadorIP from "./Localizacion";
import Footer from "./Footer";
import styles from "./App.module.css"
import MapaUbicacion from "./MapaUbicacion";
import { useState, useEffect } from "react";

// URL de una API simple para obtener la IP pública
const URL_API_IP_PUBLICA = 'https://api.ipify.org?format=json';

// Función para obtener la IP del usuario
const obtenerIPUsuario = async () => {
    try {
        const respuesta = await fetch(URL_API_IP_PUBLICA);
        const data = await respuesta.json();
        // data.ip contendrá la IP pública (ej: 203.0.113.45)
        return data.ip; 
    } catch (error) {
        console.error("No se pudo obtener la IP del usuario:", error);
        // Retornar la IP de Google (8.8.8.8) como fallback si hay error de conexión
        return '8.8.8.8'; 
    }
};

const App = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const [ipInput, setIpInput] = useState(''); 
    const [ipBuscar, setIpBuscar] = useState(''); 
    const [ubicacion, setUbicacion] = useState(null); 
    const [estadoCarga, setEstadoCarga] = useState('inicializando');
    const [error, setError] = useState(null); 
    
    const esIPValida = (ip) => {
      const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      return regex.test(ip);
    };
    //inicializando el sistema
    useEffect(() => {
      const inicializarApp = async () => {
        setEstadoCarga('cargando');
        const ipDelUsuario = await obtenerIPUsuario();
        setIpInput(ipDelUsuario);
        setIpBuscar(ipDelUsuario); 
      };
        inicializarApp();
    }, []);
    
    useEffect(() => {
      if (!esIPValida(ipBuscar)) {
          setError('Formato de IP no válido.');
          setUbicacion(null);
          setEstadoCarga('error');
          return;
      }
      
      const fetchLocalizacion = async () => {
        setEstadoCarga('cargando');
        setError(null);
        setUbicacion(null);
  
        try {
          const respuesta = await fetch(`${BACKEND_URL}/api/localizar/${ipBuscar}`);
  
          if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.error || 'Error desconocido al contactar al servidor.');
          }
  
          const datos = await respuesta.json();
          
          setUbicacion(datos);
          setEstadoCarga('finalizado');
  
        } catch (err) {
          setError(`Error al localizar: ${err.message}`);
          setEstadoCarga('error');
        }
      };
      
      fetchLocalizacion();
  
    }, [ipBuscar]); 

    const manejarBusqueda = () => {
        if(esIPValida(ipInput)) {
            setIpBuscar(ipInput);
        } else {
            setError('Por favor, ingresa una dirección IP válida.');
        }
    };


  return (  
    <>
      <main className={styles.main}>
        <section className={styles.interface}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Localizador de IP</h1>
            <p className={styles.subtitle}>Este proyecto aplica el stack ERN <p className={styles.important}>(Express.js, React.js y Node.js).</p></p>
          </div>

          <LocalizadorIP 
            ipInput={ipInput}
            setIpInput={setIpInput}
            ipBuscar={ipBuscar}
            ubicacion={ubicacion}
            estadoCarga={estadoCarga}
            error={error}
            setError={setError}
            esIPValida={esIPValida}
            manejarBusqueda={manejarBusqueda}
          />
        </section>

        <MapaUbicacion 
          ubicacion={ubicacion} 
          estadoCarga={estadoCarga}
        />
      </main>  
      <Footer/>
    </>
  );
}
 
export default App;