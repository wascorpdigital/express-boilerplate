require(`dotenv`).config({ path: `./process.env` });
const Path = require(`path`);

const configObj = {
    entry: {
        common: [`babel-polyfill`, `./src/common.js`]
    },
    output: {
        filename: `[name]-bundle.js`,
        path: Path.resolve(__dirname, `public/scripts`)
    },
    module: {
        rules: [{
            test: /\.js$/,
            type: 'javascript/auto',
            exclude: /node_modules/,
            use: {
                loader: `babel-loader`,
                options: {
                    presets: [`env`],
                    plugins: [`transform-object-rest-spread`]
                }
            }
        }]
    }
}

if(process.env.MODE === `dev`) configObj.devtool = 'source-map';


module.exports = configObj;