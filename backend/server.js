const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

//endpoint for upload

app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/../frontend/src/assets/imgsPerfil/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });//move
})

app.listen(5000, () => console.log('Server running on port 5000'));