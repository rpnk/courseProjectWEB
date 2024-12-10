const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const checkAuth = require('./middlewares/checkAuth');

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const vehicleRoutes = require('./routes/vehicleRoutes');
app.use('/vehicles', checkAuth, vehicleRoutes);

const driverRoutes = require('./routes/driverRoutes');
app.use('/drivers', checkAuth, driverRoutes);

const tripRoutes = require('./routes/tripRoutes');
app.use('/trips', checkAuth, tripRoutes);

app.get('/dashboard', checkAuth, (req, res) => {
    res.render('dashboard');
});

app.get('/', (req, res) => {
    if (req.session.token) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/auth/login');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
