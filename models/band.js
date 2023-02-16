const {v4: uuidv4} = require ('uuid');


class Band{
    constructor(name = 'no-name'){
        this.name = name;
        this.votes =0;
        this.id =uuidv4(); // identificador unico
    }
}

module.exports = Band;