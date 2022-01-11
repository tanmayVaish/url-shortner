const express = require('express');
const { Urls } = require('./models');
const valid = require('valid-url');
const shortid = require('shortid');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('FUCK');
});

app.post('/shorten', async (req, res) => {
  console.log(JSON.stringify(req.body));
  const { url, short } = req.body;
  console.log(url)
  // res.send(req.body);
  
  if (!valid.isUri(url)) {
    res.send({
      status: 'failure',
      message: 'code fat gya!'
    })
    return;
  }
  // TODO: check if already URL exist 

  let short_url = (short) ? short : shortid.generate();

  const temp = await Urls.create({
    long_url: url,
    short: short_url,
  });

  if (temp) {
    res.send({
      status: 'success',
      message: `${req.headers.host}/${short_url}`,
    });
    return;
  }
  res.send({
    status: 'failed',
    message: 'Something Went Wrong!'
  });

 });
app.use('/:id', (req, res) => {
  res.send({
    status: 'kuch bhi',
    message: 'kuch bhi thoda jyada'
  })
  
  // TODO:
  // 1. Fetch URL using ID from DB.
  // 2. Redirect to the fetched URL.

})

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
