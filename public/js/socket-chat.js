var socket = io();

var params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('sala')) {
    // console.log('hey')
    window.location = 'index.html'
    throw new Error('Name and room are required')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')

}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario , function(resp) {
        console.log('Usuarios conectados: ', resp)
        // console.log(''resp)
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

 
// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cambios cuando usurio entra o sale del chat

socket.on('listaPersona', function(personas) {

    console.log(personas);

});

// mensajes privados /Accion de escuchar del cliente

socket.on('mensajePrivado', function (mensaje) {
    console.log('mensaje privado', mensaje)
})