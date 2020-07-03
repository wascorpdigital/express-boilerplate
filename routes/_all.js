const express = require(`express`),
    router = express.Router(),
    securityMiddleware = require(`../middleware/security`);


// Local variables
router.use((req, res, next) => {
    res.locals.errMsgs = req.flash(`error`);
    res.locals.successMsgs = req.flash(`success`);
    res.locals.isLoggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.cartSession = req.session.cart;
    next();
});


router.use(securityMiddleware.sanitiseHTMLStrings);
router.use(securityMiddleware.escapeBodyHTML);


// Routes
const indexRoutes = require(`./index`),
    authRoutes = require(`./auth`);


router.use(indexRoutes);
router.use(authRoutes);


module.exports = router;