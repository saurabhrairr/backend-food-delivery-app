const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const organizationRoutes = require('./routes/organizationRoutes');
const itemRoutes = require('./routes/itemRoutes');
const pricingRoutes = require('./routes/pricing');

const port =8000
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());



// database
mongoose.connect("mongodb://localhost:27017/fooddelivery",{
       useNewUrlParser: true,
       useUnifiedTopology: true
})

// port number
app.listen(port,()=>{

       console.log("`listen to "+port);

})



app.use('/organizations', organizationRoutes);
app.use('/items', itemRoutes);
app.use('/pricings', pricingRoutes);