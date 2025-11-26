const axios = require('axios');

exports.handler = async function (event, context) {
    const { path } = event.queryStringParameters;

    if (!path) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Path parameter is missing' })
        };
    }

    const targetUrl = `https://simo.cnsc.gov.co${path}`;

    try {
        const response = await axios({
            method: event.httpMethod,
            url: targetUrl,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://simo.cnsc.gov.co/',
                'Origin': 'https://simo.cnsc.gov.co',
                'Host': 'simo.cnsc.gov.co'
            },
            params: event.queryStringParameters,
            data: event.body
        });

        return {
            statusCode: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Allow CORS for our app
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error('Proxy error:', error.message);
        if (error.response) {
            return {
                statusCode: error.response.status,
                body: JSON.stringify(error.response.data)
            };
        } else {
            return {
                statusCode: 502,
                body: JSON.stringify({ error: 'Bad Gateway', details: error.message })
            };
        }
    }
};
