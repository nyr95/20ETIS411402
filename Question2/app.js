// app.js
const express = require('express');
const moment = require('moment');
const trains = require('./data');

const app = express();
const port = 3000;

const REGISTERED_COMPANIES = {
    '20ETIS411402': 'dfuwMF', // Replace with your company's roll number and access code
  };
  

// Middleware to verify company registration
const verifyCompany = (req, res, next) => {
    const rollNumber = req.headers['x-company-roll-number'];
    const accessCode = req.headers['x-access-code'];
  
    if (REGISTERED_COMPANIES[rollNumber] === accessCode) {
      next(); // Company is registered,
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
app.use(verifyCompany);
// Function to simulate changes in prices and seat availability based on market conditions
function adjustMarketConditions(train) {
  const demandFactor = Math.random() * 0.5 + 0.75; // Simulate demand changes (75% to 125%)
  const supplyFactor = Math.random() * 0.5 + 0.75; // 
  
  train.price.sleeper *= demandFactor;
  train.price.AC *= demandFactor;
  
  train.seatAvailability.sleeper *= supplyFactor;
  train.seatAvailability.AC *= supplyFactor;
  
  return train;
}

app.get('/trains', (req, res) => {
  const currentTime = moment().add(30,'m');
  const next12Hours = currentTime.clone().add(12, 'hours');

  const availableTrains = trains.filter(train => {
    const departureTime = moment(train.departureTime);
    return departureTime.isBetween(currentTime, next12Hours);
  });

  const sortedTrains = availableTrains
    .map(train => adjustMarketConditions(train)) // Adjust prices and seat availability
    .sort((a, b) => {
        // Sort by ascending price
        if (a.price.sleeper + a.price.AC < b.price.sleeper + b.price.AC) {
            return -1;
          } else if (a.price.sleeper + a.price.AC > b.price.sleeper + b.price.AC) {
            return 1;
          }
      
          // Sort by descending tickets
          const totalTicketsA = a.seatAvailability.sleeper + a.seatAvailability.AC;
          const totalTicketsB = b.seatAvailability.sleeper + b.seatAvailability.AC;
          if (totalTicketsA > totalTicketsB) {
            return -1;
          } else if (totalTicketsA < totalTicketsB) {
            return 1;
          }
      
          // Sort by descending departure time (after considering delays in minutes)
          const departureTimeA = moment(a.departureTime).add(a.delayMinutes || 0, 'minutes');
          const departureTimeB = moment(b.departureTime).add(b.delayMinutes || 0, 'minutes');
          if (departureTimeA.isAfter(departureTimeB)) {
            return -1;
          } else if (departureTimeA.isBefore(departureTimeB)) {
            return 1;
          }
      
          return 0;
        });

  const response = sortedTrains.map(train => {
    const { id, name, seatAvailability, price } = train;
    return {
      id,
      name,
      departureTime: train.departureTime,
      seatAvailability,
      price,
    };
  });

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
