const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const genres = require('./Backend/routes/genres');
const movies = require('./Backend/routes/movies');
const tvShows = require('./Backend/routes/tvShows');
const auth = require('./Backend/routes/auth');
const tvEpisodes = require('./Backend/routes/tvEpisodes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
console.log(process.env.DATAB);
mongoose.connect(process.env.DATAB || "mongodb://localhost:27017/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false })
           // .then(() => console.log('Connected to MongoDB...'))
           // .catch(err => console.error('Could not connect to MongoDB...'));


           const con = mongoose.connection.on('open', () =>{
               console.log("connectedDB...")
           })
         
           mongoose.set('useCreateIndex', true);
           app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
        
            res.header(
                'Access-Control-Expose-Headers',
                'x-access-token, x-refresh-token'
            );
        
            next();
        });
        
app.use(cors());          
/*app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-control-Allow-Headers", "Origin, X-Request-With, Cotent-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
})*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images",  express.static(path.join("images")));
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/tvShows', tvShows);
app.use('/api/auth', auth);
app.use('/api/tvEpisodes', tvEpisodes);

app.use(express.static('./dist/dash-tube'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/app-tube/'}
  );
  });


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening at port ${port}...`))
