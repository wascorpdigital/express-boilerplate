const cloudinary = require(`cloudinary`).v2,
    FileType = require(`file-type`);

exports.uploadToCloudinary = async (array, file, folder) => {
    const optionsObj = {
        folder: folder,
        use_filename: true
    };
    if(await (await FileType.fromFile(file)).mime.split(`/`)[0] === `video`){
        optionsObj.resource_type = `video`;
    }

    await cloudinary.uploader.upload(file, optionsObj, function(err, response){
        if(err){
            return console.log(`Cloudinary Error: ${err}`);
        }

        return array.push(response.secure_url);
    });
}