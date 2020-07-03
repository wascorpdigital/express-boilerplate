const router = require(`express`).Router(),
    request = require(`request-promise`),
    { sendMail } = require(`../handlers/mail`);


router.post(`/contact`, (req, res) => {
    if(!req.body[`g-recaptcha-response`]){
        req.flash(`error`, `Please check the box in the form to prove you're not a bot!`);
        return res.redirect(`/contact`);
    }

    request({
        uri: `https://www.google.com/recaptcha/api/siteverify`,
        qs: {
            secret: process.env.RECAPTCHA_V2_SECRET,
            response: req.body[`g-recaptcha-response`]
        },
        method: `POST`,
        json: true
    })
    .then(async (response) => {
        if(response.success){
            try{
                await sendMail(
                    process.env.ADMIN_EMAIL,
                    `New Contact Form Submission on ${process.env.BASE_URL}`,
                    `<p>Name: ${req.body.name}</p>
                    <p>Email: ${req.body.email}</p>
                    <p>Mobile: ${req.body.mobile}</p>
                    <p>Message: ${req.body.message}</p>`
                );
                
                req.flash(`success`, `Your submission has been received by us!`);
            }
            catch(err){
                console.log(err);
                return req.flash(`error`, `We couldn't submit your message. Please try again.`)
            }
            finally{
                return res.redirect(`/contact`);
            }
        }
        throw `Couldn't verify captcha`;
    })
    .catch((err) => {
        console.log(err);
        req.flash(`error`, `We couldn't submit your query. Please try again, and make sure to complete the Captcha`);
        return res.redirect(`/contact`);
    });
});


module.exports = router;