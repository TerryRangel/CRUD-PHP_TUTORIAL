const usuario = localStorage.getItem('usuario')

if (!usuario) {
    window.location.href = 'index.html'
}

const tabla = document.getElementById('tablaUsuarios')

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

cargaUsuarios()