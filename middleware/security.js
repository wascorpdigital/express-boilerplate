const xss = require(`xss`);

exports.sanitiseHTMLStrings = (req, res, next) => {
    const keysToNotCheck = [`images`, `video`];

    if(req.body && Object.keys(req.body).length){
        for(let key in req.body){
            for(let i=0; i < (keysToNotCheck.length - 1); i++){
                if(key.toLowerCase() === keysToNotCheck[i].toLowerCase()){
                    break;
                }
                req.body[key] = req.body[key].split(`"`).join(`'`);
            }
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