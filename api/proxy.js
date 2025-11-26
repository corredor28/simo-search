import axios from 'axios';

export default async function handler(req, res) {
    // Get the path from the query parameter (set by vercel.json rewrite)
    // or fall back to the request URL if not rewritten (unlikely in this setup)
    const { path } = req.query;

    if (!path) {
        return res.status(400).json({ error: 'Path parameter is missing' });
    }

    const targetUrl = `https://simo.cnsc.gov.co${path}`;

    try {
        const response = await axios({
            method: req.method,
            url: targetUrl,
            headers: {
                // Mimic a browser to avoid 502/403 from upstream
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://simo.cnsc.gov.co/',
                'Origin': 'https://simo.cnsc.gov.co',
                ...req.headers, // Forward other headers
                host: 'simo.cnsc.gov.co', // Override host
            },
            params: req.query, // Forward query parameters
            data: req.body, // Forward body
        });

        // Forward the upstream status and data
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Proxy error:', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).send(error.response.data);
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(502).json({ error: 'Bad Gateway', details: error.message });
        }
    }
}
