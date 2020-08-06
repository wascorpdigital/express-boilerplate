const xss = require(`xss`);

exports.sanitiseHTMLStrings = (req, res, next) => {
    const keysToNotCheck = [];

    if(req.body && Object.keys(req.body).length){
        for(let key in req.body){
            if(keysToNotCheck.includes(key.toLowerCase())) break;
            else req.body[key] = req.body[key].split(`"`).join(`'`);
        }
    }
    next();
}

exports.escapeBodyHTML = (req, res, next) => {
    if(req.body && Object.keys(req.body).length){
        for(let key in req.body){
            req.body[key] = xss(req.body[key]);
        }
    }
    next();
};