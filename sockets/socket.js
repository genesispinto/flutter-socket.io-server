const {io} = require('../index');




//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado')

    //client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente Desconectado')
     });

/*      client.on('mensaje', (payload)=>{
        console.log('Mensaje', payload)
        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
     }) */

     
     
    /*  client.on('nuevo-mensaje', (payload)=>{
      //io.emit('nuevo-mensaje', payload); // emite a todos
      client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos a el que lo emitio
     }) */



  });