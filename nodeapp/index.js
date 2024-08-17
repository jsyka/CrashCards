const express = require('express');
const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 5001; // Port where the server will run

const endpoint = process.env['VISION_ENDPOINT'];
const key = process.env['VISION_KEY'];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ['Caption', 'Read'];
const imageUrl = 'https://media.npr.org/assets/img/2010/12/22/thank-you-note_custom-f7bd9bdabacad41f8c92f3a4e2beae5cc1261413.jpg';

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoint
app.get('/api/analyze-image', async (req, res) => {
  try {
    const result = await client.path('/imageanalysis:analyze').post({
      body: {
        url: imageUrl
      },
      queryParameters: {
        features: features
      },
      contentType: 'application/json'
    });

    const iaResult = result.body;

    let response = {};
    if (iaResult.captionResult) {
      response.caption = {
        text: iaResult.captionResult.text,
        confidence: iaResult.captionResult.confidence
      };
    }
    if (iaResult.readResult) {
      response.textBlocks = iaResult.readResult.blocks;
    }

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
