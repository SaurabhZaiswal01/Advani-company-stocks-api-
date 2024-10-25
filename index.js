const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const stocks = require('./stocks.js');
const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

// Q1 Get the stocks sorted by pricing
app.get('/stocks/sort/pricing', (request, response) => {
  let sortedStocks = [...stocks];
  const { pricing } = request.query;

  if (pricing == 'low-to-high') {
    sortedStocks.sort((a, b) => a.price - b.price);
  } else if (pricing == 'high to low') {
    sortedStocks.sort((a, b) => b.price - a.price);
  }

  response.json({ stocks: sortedStocks });
});

// Q2 Get the stocks sorted based on their Growth
app.get('/stocks/sort/growth', (request, response) => {
  let sortedStocks = [...stocks];
  const { growth } = request.query;

  if (growth === 'low-to-high') {
    sortedStocks.sort((a, b) => a.growth - b.growth);
  } else if (growth === 'high-to-low') {
    sortedStocks.sort((a, b) => b.growth - a.growth);
  }
  response.json({ stocks: sortedStocks });
});

// Q3 Filter the stocks based on the 2 Stock Exchange (NSE and BSE)
function filterByExchange(stock, exchange) {
  return stock.exchange.toLowerCase() === exchange.toLowerCase();
}

app.get('/stocks/filter/exchange', (request, response) => {
  const { exchange } = request.query;
  const filteredStocks = stocks.filter((stock) =>
    filterByExchange(stock, exchange)
  );
  response.json({ stocks: filteredStocks });
});

// Q4 Filter the stocks based on the Industrial Sector
function filterByIndustry(stock, industry) {
  return stock.industry.toLowerCase() === industry.toLowerCase();
}

app.get('/stocks/filter/industry', (request, response) => {
  const { industry } = request.query;
  const filteredStocks = stocks.filter((stock) =>
    filterByIndustry(stock, industry)
  );
  response.json({ stocks: filteredStocks });
});

// Q5 Send all available stocks
app.get('/stocks', (request, response) => {
  response.json({ stocks: stocks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
