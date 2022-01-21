const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '80037031fc0f4b6eb00cb2860e1274bc'
   });
const handleApiCall = (req,res) =>{
    app.models
        .predict("2cf7739e65bfc63c1537f65e7ef3ae87", req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json("Error happened when trying to get the API response"))
}

const handleImage = (req, res, db) => {
    const { id, cars} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', cars)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {handleImage, handleApiCall};