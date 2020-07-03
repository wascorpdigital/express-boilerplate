const mongoose = require(`mongoose`),
    mongooseValidationErrorTransform = require(`mongoose-validation-error-transform`);

mongoose.plugin(mongooseValidationErrorTransform); // for better validation error messages (cheap fix)
mongoose.set(`runValidators`, true); // to run validate operators on update operations too

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: false,
    dbName: process.env.DB_NAME
})
.then((data) => console.log(`DB connected`))
.catch((err) => {
    console.log(`DB not connected`);
    console.log(err);
});