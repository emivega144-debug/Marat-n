import { useState } from "react";
import "./formulario.css";

export default function Formulario() {
  const [productos, setProductos] = useState({});

  const precios = {
    gorra: 1500,
    gafas: 3200,
    medias: 800,
    auriculares: 4500,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const producto = name.replace("cantidad_", "");

    if (value === "") {
      setProductos({ ...productos, [producto]: "" });
    } else if (Number(value) < 1) {
      const nuevoEstado = { ...productos };
      delete nuevoEstado[producto];
      setProductos(nuevoEstado);
    } else {
      setProductos({ ...productos, [producto]: Number(value) });
    }
  };

  const productosSeleccionados = Object.entries(productos).filter(
    ([_, cantidad]) => Number(cantidad) > 0
  );

  const totalCarrito = productosSeleccionados.reduce(
    (acc, [nombre, cantidad]) => acc + precios[nombre] * Number(cantidad),
    0
  );

  return (
    <>
      <form
        id="miformulario"
        action="https://formspree.io/f/xgvnznzw"
        method="POST"
      >
        <h1>Formulario de Inscripción - Maratón</h1>

        <div className="formularioh3">
          <h3>Datos personales</h3>
        </div>

        <div id="parrafos">
          <label htmlFor="nombre">
            Nombre completo:
            <input type="text" id="nombre" name="nombre" required />
          </label>

          <label htmlFor="telefono">
            Teléfono:
            <input type="text" id="telefono" name="telefono" required />
          </label>

          <label htmlFor="email">
            Ingrese su email:
            <input type="email" id="email" name="email" required />
          </label>

          <div className="formularioh3">
            <h3>¿Padece alguna enfermedad crónica?</h3>
          </div>

          <div className="casillero">
            <label htmlFor="enf_cronica_si">
              <input type="radio" id="enf_cronica_si" name="enf_cronica" value="Sí" required /> Sí
            </label>

            <label htmlFor="enf_cronica_no">
              <input type="radio" id="enf_cronica_no" name="enf_cronica" value="No" /> No
            </label>
          </div>
        </div>

        <label htmlFor="especificar_enf" className="centrar1">
          Si respondió “Sí”, especificar:
          <input id="especificar_enf" name="especificar_enf" type="text" />
        </label>

        <div className="formularioh3">
          <h3>¿Está bajo tratamiento médico actualmente?</h3>
        </div>

        <div className="casillero">
          <label htmlFor="tratamiento_si">
            <input type="radio" id="tratamiento_si" name="tratamiento" value="Sí" required /> Sí
          </label>
          <br />
          <label htmlFor="tratamiento_no">
            <input type="radio" id="tratamiento_no" name="tratamiento" value="No" /> No
          </label>
        </div>

        <label htmlFor="medicacion">
          Medicación:
          <br />
          <input id="medicacion" name="medicacion" type="text" />
        </label>

        <label htmlFor="alergias">
          Alergias (medicamentos, alimentos, etc.):
          <input id="alergias" name="alergias" type="text" />
        </label>

        <label htmlFor="grupo_sangre">
          Grupo sanguíneo:
          <input id="grupo_sangre" name="grupo_sangre" type="text" />
        </label>

        <div className="formularioh3">
          <h3>Contacto de emergencia</h3>
        </div>

        <label htmlFor="emerg_nombre">
          Nombre y apellido:
          <input id="emerg_nombre" name="emerg_nombre" type="text" required />
        </label>

        <label htmlFor="emerg_telefono">
          Teléfono:
          <input id="emerg_telefono" name="emerg_telefono" type="tel" required />
        </label>

        <label htmlFor="emerg_vinculo">
          Vínculo:
          <input id="emerg_vinculo" name="emerg_vinculo" type="text" />
        </label>

        <div className="formularioh3">
          <h3>Productos adicionales</h3>
        </div>

        <p>Elige los productos que deseas comprar:</p>

        {["gorra", "gafas", "medias", "auriculares"].map((prod) => (
          <div key={prod} className="producto-item">
            <label htmlFor={`check_${prod}`} className="producto-label">
              <input
                type="checkbox"
                id={`check_${prod}`}
                checked={productos.hasOwnProperty(prod)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setProductos({ ...productos, [prod]: 1 });
                  } else {
                    const nuevoEstado = { ...productos };
                    delete nuevoEstado[prod];
                    setProductos(nuevoEstado);
                  }
                }}
              />
              {prod.charAt(0).toUpperCase() + prod.slice(1)} (${precios[prod]})
            </label>

            {productos.hasOwnProperty(prod) && (
              <>
                <label htmlFor={`cantidad_${prod}`}>
                  Cantidad:
                  <input
                    type="number"
                    min="1"
                    step="1"
                    id={`cantidad_${prod}`}
                    name={`cantidad_${prod}`}
                    value={productos[prod] ?? ""}
                    onChange={handleChange}
                    className="producto-cantidad"
                  />
                </label>
                <input type="hidden" name={`producto_${prod}`} value="Sí" />
              </>
            )}
          </div>
        ))}

        {productosSeleccionados.length > 0 && (
          <div className="carrito">
            <h4>Mini Carrito:</h4>
            <ul>
              {productosSeleccionados.map(([nombre, cantidad]) => (
                <li key={nombre}>
                  {nombre.charAt(0).toUpperCase() + nombre.slice(1)}: {cantidad} × ${precios[nombre]} = ${precios[nombre] * cantidad}
                </li>
              ))}
            </ul>
            <p><strong>Total: ${totalCarrito}</strong></p>
            <input type="hidden" name="total_carrito" value={totalCarrito} />
          </div>
        )}

        <div className="formularioh3">
          <h3>Declaración y aceptación</h3>
        </div>

        <p>
          Declaro bajo juramento que los datos proporcionados son verídicos y
          que me encuentro en condiciones físicas adecuadas para participar en
          la Maratón.
        </p>
        <p>
          Eximo a la organización, sponsors y autoridades de cualquier
          responsabilidad por accidentes, lesiones o daños que pudieran ocurrir
          durante la competencia.
        </p>
        <p>
          Acepto el reglamento oficial de la carrera y autorizo el uso de mi
          imagen en fotografías y videos tomados durante el evento para fines
          promocionales.
        </p>

        <p>
          <label htmlFor="acepta">
            <input type="checkbox" id="acepta" name="acepta" required /> Acepto y firmo la declaración
          </label>
        </p>

        <p>
          <button type="submit">Enviar inscripción</button>
        </p>
      </form>
    </>
  );
}