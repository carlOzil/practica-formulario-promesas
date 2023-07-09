
// VARIABLES --->>>

let form = document.querySelector('#multasForm');
let plate = document.querySelector('#plate');
let respuesta = document.querySelector('#msg');
let listaDatos = document.querySelector('#listaDatos')

const regExp = /^\d{3}-[A-Z]$/


// ARRAYS --->>>

const arrayUsuarios = [
    {
        matricula: '123-K',
        modelo: 'audi',
        propietario: 'Hector'
    },
    {
        matricula: '456-K',
        modelo: 'bmw',
        propietario: 'Rafael'
    },
    {
        matricula: '123-C',
        modelo: 'ford',
        propietario: 'Carlos'
    },
    {
        matricula: '456-C',
        modelo: 'renault',
        propietario: 'Elena'
    },
    {
        matricula: '123-B',
        modelo: 'volkswagen',
        propietario: 'Cristina'
    }]

const arrayMultas = [
    {
        matricula: '456-K',
        multas: ['multa1', 'multa3']
    },
    {
        matricula: '456-C',
        multas: ['multa1', 'multa2']
    },
    {
        matricula: '123-C',
        multas: ['multa3', 'multa4']
    },
    {
        matricula: '123-K',
        multas: ['multa2', 'multa3']
    }]

let multasMostradas = [];


// EVENTOS --->>>

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    validarPlate(plate.value);

});


// FUNCIONES --->>>

const validarPlate = (plate) => {

    if (plate === '') {
        respuesta.innerHTML = 'Introduzca su matrícula.';
        return false;
    };
    if (!regExp.test(plate)) {
        respuesta.innerHTML = 'Matrícula no válida, compruébela.';
        return;
    };
    if (regExp.test(plate)) {
        const tieneMulta = arrayMultas.find(multa => multa.matricula === plate)
        if (!tieneMulta) {
            respuesta.innerHTML = 'Matrícula válida, no tiene multas.'
        } else {
            respuesta.innerHTML = 'Mostrando sus multas a continuación.';
            limpiarLista();
            pintarDatos(plate);
        };
    };
};

const pintarDatos = (plate) => {

    const usuarioMultado = arrayUsuarios.find(multa => multa.matricula === plate);
    if (!multasMostradas.includes(usuarioMultado)) {
        multasMostradas.push(usuarioMultado);
        almacenarLocal(multasMostradas);
    }
    multasMostradas.forEach((item) => {

        listaDatos.innerHTML

        let fila = document.createElement('TR');
        let colMatricula = document.createElement('TD');
        let colModelo = document.createElement('TD');
        let colPropietario = document.createElement('TD');
        let colMultas = document.createElement('TD');

        colMatricula.append(item.matricula);
        colModelo.append(item.modelo);
        colPropietario.append(item.propietario);
        colMultas.append(pintarMultas(item.matricula));
        fila.append(colMatricula);
        fila.append(colModelo);
        fila.append(colPropietario);
        fila.append(colMultas);
        listaDatos.append(fila);

    })
};

const pintarMultas = (matricula) => {

    const listaMultas = arrayMultas.find(multa => multa.matricula === matricula);
    return listaMultas.multas
}

const limpiarLista = () => {
    if (listaDatos) {
        listaDatos.innerHTML = ''
    }
};

const almacenarLocal = (arrayMultas) => {

    localStorage.setItem('Multados', JSON.stringify(arrayMultas))
};
