const express = require('express');
const { Urls } = require('./models');
const valid = require('valid-url');
const shortid = require('shortid');

const app = express();
app.use(express.urlencoded());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('FUCK');
});

app.post('/shorten', async (req, res) => {
  const { long_url, short } = req.body;
  console.log(long_url);
  if (!valid.isUri(long_url)) {
    res.send({
      status: 'failure',
      message: 'Url not Valid!',
    });
    return;
  }

  let short_url = shortid.generate();

  const temp = await Urls.create({
    long_url: long_url,
    short_url: short_url,
  });

  if (temp) {
    res.send({
      status: 'success',
      message: `${req.headers.host}/${short_url}`,
    });
    return;
  }

  res.send({
    status: 'failure',
    message: 'Tera Kat Gya',
  });
});

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
