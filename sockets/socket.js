const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Pericos'));
bands.addBand(new Band('Romeo Santos'));
bands.addBand(new Band('Mana'));

console.log(bands)

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado')

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente Desconectado')
     });

     client.on('mensaje', (payload)=>{
        console.log('Mensaje', payload)
        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
     })

     client.on('vote-band', (payload)=>{

      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands());
      
     })
     client.on('add-band', (payload)=>{

      bands.addBand(new Band(payload.name));
      io.emit('active-bands', bands.getBands());
      
     })
     client.on('delete-band', (payload)=>{

      bands.deleteBand(payload.id);
      io.emit('active-bands', bands.getBands());
      
     })
     
    /*  client.on('nuevo-mensaje', (payload)=>{
      //io.emit('nuevo-mensaje', payload); // emite a todos
      client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos a el que lo emitio
     }) */



  });