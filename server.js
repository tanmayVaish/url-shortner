const express = require('express');
const { Urls } = require('./models');
const valid = require('valid-url');
const shortid = require('shortid');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.send('404');
});

app.post('/shorten', async (req, res) => {
  const { url, short } = req.body;
  // validatinng URL
  if (!valid.isUri(url)) {
    res.send({
      status: 'failure',
      message: 'code fat gya!',
    });
    return;
  }

  // checking if URL with its short version exists
  const check = await Urls.findOne({
    where:{long_url: url}
  })
  if(check) {
    return res.status(200).json({
      status:'failure',
      message: 'Url already exist'
    });
  }
  
  // creating short url
  let short_url = short ? short : shortid.generate();
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
    message: 'Something Went Wrong!',
  });
});


app.use('/:id', async (req, res) => {
  
  const { id } = req.params;
  // find long_url with short_url equal to id
  const temp = await Urls.findOne({
    where: {
      short: id,
    },
  })

  if(!temp) return;
  res.redirect(temp.long_url);

  // TODO: how many times the short url has been clicked
});

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));