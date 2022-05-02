const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

var subscriptionKey = "c566481a197748ed9743455bd9c93e9d";
var location = "eastus";
var azureUrl = "https://api.cognitive.microsofttranslator.com";




exports.getAllLanguages = (req, res) => {
    axios({
        baseURL: azureUrl,
        url: '/languages',
        method: 'get',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
        },
        responseType: 'json'
    }).then(response => {
        var sendData = JSON.stringify(response.data.translation, null, 4);
        res.status = 200;
        return res.send(sendData);
    })
};

exports.translate = (req, res) => {
    var translateText = req.body.text;
    var from = req.body.from;
    var to = req.body.to;
    axios({
        baseURL: azureUrl,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': from,
            'to': to
        },
        data: [{
            'text': translateText
        }],
        responseType: 'json'
    }).then(response => {
        console.log(response);
        var sendData = JSON.stringify(response.data, null, 4);
        res.status = 200;
        return res.send(sendData)
    })
    .catch(err => {
        console.log(err);
    })
};
