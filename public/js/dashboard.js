const usuario = localStorage.getItem('usuario')

if (!usuario) {
    window.location.href = 'index.html'
}

const tabla = document.getElementById('tablaUsuarios')
const crearForm= document.getElementById('crearUsuarioForm')

const cargaUsuarios = async () => {
    try {
        const res = await fetch('http://localhost:8888/crud-php_tutorial/backend/index.php/usuarios')
        const usuarios = await res.json()
        console.log('@@ usuarios => ', usuarios)
        tabla.innerHTML = ''
        usuarios.data.forEach((item) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${item.usuario}</td>
            <td>${item.nombre} ${item.apaterno} ${item.amaterno}</td>
            <td>${item.rol}</td>
            <td>
            <button class="btn btn-warning btn-sm" onclick="abrirEditar(${item})">
            Editar
            </button>
            |
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${item.id})">
            Borrar
            </button>
            </td>

            `
            tabla.appendChild(tr)
        })
    } catch (error) {
        mostrarAlerta(error, 'error')
    }
}

const eliminarUsuario = async id => {
    const confirmation = confirm('¿Estas seguro?')
    if (confirmation) {
        try {
            const response = await fetch(`http://localhost:8888/crud-php_tutorial/backend/index.php/usuario/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            mostrarAlerta(result.message || 'Usuario Eliminado', 'success')
            cargaUsuarios()
        } catch (error) {
            mostrarAlerta(error, 'error')
        }
    }
}

crearForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(crearForm)
    const dataObj = Object.fromEntries(formData.entries())

    try {
        const response = await fetch('http://localhost:8888/crud-php_tutorial/backend/index.php/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        })

        const result = await response.json()

        if (result.message === 'success' && result.data === 'Usuario creado exitosamente') {
            mostrarAlerta('Usuario creado exitosamente', 'success')
            crearForm.reset()
            bootstrap.Modal.getInstance(document.getElementById('crearModal')).hide()
            cargaUsuarios()
        } else {
            mostrarAlerta(result.message || 'Error al crear el usuario', 'error')
        }
    } catch (error) {
        mostrarAlerta(error, 'error')
    }
})

cargaUsuarios()