const { RateLimiterMemory } = require("rate-limiter-flexible");

const opts = {
  points: 1, // Point budget.
  duration: 3, // Reset points consumption every 5 sec.
};

const rateLimiter = new RateLimiterMemory(opts);

module.exports = async (req, res, next) => {
  rateLimiter
    .consume(req.connection.remoteAddress)
    .then(() => {
      next();
    })
    .catch(() => {
      console.log(`Rejecting request due to rate limiting.`);
      res.status(429).send("<h2>Too Many Requests</h2>");
    });
};
