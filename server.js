import express from 'express';

const app = express();

app.get('/api/success', (req, res) => {
  res.json({ 
    message: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/fail', (req, res) => {
  res.status(500).json({ error: 'NO OK' });
});

app.get('/api/delay', async (req, res) => {
  const seconds = parseInt(req.query.seconds) || 1;
  const delay = seconds * 1000;
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  res.json({ 
    message: 'OK',
  });
});

app.get('/api/random-fail', (req, res) => {
  const failureRate = parseInt(req.query.percentage) || 50;
  const randomValue = Math.random() * 100;
  if (randomValue < failureRate) {
    res.status(500).json({ 
      error: 'NO OK',
    });
  } else {
    res.json({ 
      message: 'OK',
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/protected', (req, res) => {
  const header = req.headers.authorization;
  
  if (!header) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = header.replace('Bearer ', '');
  
  if (token !== 'ABC') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  res.json({ 
    message: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));