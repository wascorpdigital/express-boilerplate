// Environment variables
require(`dotenv`).config({path: `process.env`});

// Requiring packages
const express = require(`express`),
    app = express(),
    helmet = require(`helmet`),
    morgan = require(`morgan`),
    bodyParser = require(`body-parser`),
    mongoose = require(`mongoose`),
    session = require(`express-session`),
    flash = require(`connect-flash`),
    MongoStore = require(`connect-mongo`)(session),
    passport = require(`passport`);


// DB setup
require(`./config/mongoose`);


// Get all models
require(`./models/user`);
require(`./models/order`);
require(`./models/product`);
require(`./models/collection`);
require(`./models/newslettersubcriber`);


// Setting security headers
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard({ action: `sameorigin` }));
app.use(helmet.ieNoOpen());
app.use(helmet.hidePoweredBy({ setTo: 'PHP/7.1.31' })); // showing false value
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy({ policy: `no-referrer-when-downgrade` }));
app.use(helmet.xssFilter());


// Passport Configuration
require(`./config/passport`);


// App setup
app.set(`view engine`, `ejs`);
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '350mb'
}));
app.use(bodyParser.json({
    extended: true,
    limit: '350mb'
}));
app.use(express.static(__dirname + `/public`));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 3 * 24 * 60 * 60 // 3 days
    }),
    cookie: {maxAge: 2 * 24 * 60 * 60 * 1000} // 3 days
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

if(process.env.MODE.toLowerCase() === `dev`) app.use(morgan('dev')); // logging http activity


// Routes
const routes = require(`./routes/_all`);
app.use(routes);


// handling 404 errors
app.use((req, res, next) => {
    const err = new Error(`Resource not found`);
    err.status = 404;
    next(err)
});


// handling all other errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    if(process.env.MODE.toLowerCase() === `prod`){
        return res.render(`error`, {
            docTitle: `Something went wrong`
        });
    }
    else{
        next(err);
    }
});


// Server setup
app.listen(process.env.PORT, () => console.log(`Server listening on ${ process.env.PORT }`));