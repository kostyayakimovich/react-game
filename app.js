const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.use('/api/cong', require('./routes/results.routes'));
app.use('/api/pop', require('./routes/results.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'front', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000 || process.env.PORT;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log('start app'));
  } catch (error) {
    console.log('server error', error.message);
    process.exit(1);
  }
}
start();
