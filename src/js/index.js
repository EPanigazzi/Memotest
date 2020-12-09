let turnos = 0;
let $primerCuadro = null;
const $tablero = document.querySelector("#tablero");
const $cuadros = $tablero.querySelectorAll(".cuadro");
const $mensajeFinJuego = document.querySelector("#fin-juego");

const configurarJuego = () => {
    const coloresBase = [
        "rojo",
        "azul",
        "verde",
        "amarillo",
        "negro",
        "blanco",
    ];
    const coloresRepetidos = coloresBase.concat(coloresBase);
    configurarCuadros($cuadros, coloresRepetidos);
    manejarEventos($tablero);
};

const manejarEventos = ($tablero) => {
    $tablero.onclick = (e) => {
        const $elemento = e.target;
        if ($elemento.classList.contains("cuadro")) {
            manejarClickCuadro($elemento);
        }
    };
};

const configurarCuadros = ($cuadros, colores) => {
    const coloresRandom = colores.sort(() => {
        return 0.5 - Math.random();
    });

    coloresRandom.forEach((color, i) => {
        $cuadros[i].classList.add(color);
    });
};

const manejarClickCuadro = ($cuadroActual) => {
    mostrarCuadro($cuadroActual);

    if ($primerCuadro === null) {
        $primerCuadro = $cuadroActual;
    } else {
        if ($primerCuadro === $cuadroActual) {
            return;
        }

        turnos++;

        if (cuadrosIguales($primerCuadro, $cuadroActual)) {
            eliminarCuadro($primerCuadro);
            eliminarCuadro($cuadroActual);
        } else {
            ocultarCuadro($primerCuadro);
            ocultarCuadro($cuadroActual);
        }

        $primerCuadro = null;
    }
};

const cuadrosIguales = ($cuadro1, $cuadro2) => {
    return $cuadro1.className === $cuadro2.className;
};

const mostrarCuadro = ($cuadro) => {
    $cuadro.style.opacity = "1";
};

const ocultarCuadro = ($cuadro) => {
    setTimeout(() => {
        $cuadro.style.opacity = "0";
    }, 500);
};

const eliminarCuadro = ($cuadro) => {
    setTimeout(() => {
        $cuadro.parentElement.classList.add("completo");
        $cuadro.remove();
        evaluarFinJuego();
    }, 500);
};

const evaluarFinJuego = () => {
    if (document.querySelectorAll(".cuadro").length === 0) {
        $tablero.style.display = "none";
        $mensajeFinJuego.querySelector(
            "strong"
        ).textContent = turnos.toString();
        $mensajeFinJuego.style.display = "block";
    }
};

configurarJuego();
