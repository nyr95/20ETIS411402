const trains = [
    {
      id: 1,
      name: "PrajwalGK Express Train",
      departureTime: "2023-08-28T22:30:00Z",
      seatAvailability: {
        sleeper: 50,
        AC: 30,
      },
      price: {
        sleeper: 40,
        AC: 60,
      },
      delayMinutes: 10,
    },
    {
      id: 2,
      name: "Shatabdi Local Train 1",
      departureTime: "2023-08-28T21:30:00Z",
      seatAvailability: {
        sleeper: 20,
        AC: 15,
      },
      price: {
        sleeper: 20,
        AC: 30,
      },
    },
    {
      id: 3,
      name: "Nizamuddin express",
      departureTime: "2023-08-28T20:30:00Z",
      seatAvailability: {
        sleeper: 60,
        AC: 40,
      },
      price: {
        sleeper: 50,
        AC: 70,
      },
      delayMinutes: 5,
    },
  ];
  
  module.exports = trains;
  
