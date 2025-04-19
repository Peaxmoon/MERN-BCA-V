import express from 'express'
import colors from 'colors'

// test object
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});


// port
const PORT = 8080;

// run listen
app.listen(PORT, () => {
    console.log(colors.bgCyan.red(`Server Running in ${PORT}`));
})

