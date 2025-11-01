import { Link } from 'react-router-dom'
import "./diseño_principal.css"
import inicio from './db/inicio.json'

export default function Pagina_principal() {

    const seccion = inicio

    return (
        <>
                <div className='contenedor'>
                    <h1>THE FACTORY CHAMPIONS</h1>

                    <h2>¡Viví la experiencia de la Maratón!</h2>
                    <p>Sumate a uno de los eventos deportivos más esperados del año.
                        Ya seas principiante o corredor experimentado, esta es tu oportunidad de desafiarte,
                        compartir con otros y disfrutar de una jornada única.</p>

                    {seccion.map((seccion, index) => (
                        <div className="decoracion" key={index}>
                            <h3>{seccion.titulo}</h3>
                            <ul>
                                {seccion.items.map((items, i) => <li key={i}>{items}</li>)}
                            </ul>
                        </div>

                    ))}

                    <p>👉 No te quedes afuera. Los cupos son limitados.</p>
                    <p>Hacé clic en el botón de inscripción, completá tus datos y asegurá tu lugar en la línea de largada.</p>

                    <div className='boton_centrado'>
                        <Link to="./formulario" className='registrarse'>Registrarse</Link>
                    </div>
                </div>
        </>
    )
}