const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/appGastos')

.then(db => console.log('Database is connected'))
.catch(err => console.log('err'))