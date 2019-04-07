const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

let app = express();

app.set('port', 4000);

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);	
});

mongoose.connect('mongodb+srv://wolfcrusher:diablo3fan@vue-app-qa6qj.mongodb.net/test?retryWrites=true', {useNewUrlParser: true })
        .then(db => console.log('[OK] DB is connected'))
        .catch(err => console.error(err));

 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(morgan('dev'));
 app.use('/api/records', require('./routes/record.js'));
 app.use('/', express.static(path.join(__dirname, '../dist')))
