// Import the CircuitBreaker module
const CircuitBreaker = require('./CircuitBreaker');

// Create a new instance of the CircuitBreaker
const circuitBreaker = CircuitBreaker();

// Defines a helper function to wait for a specified amount of time 
const wait = time => {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    });
};

// Main function to continuously perform health checks using CircuitBreaker (on loop)
(async () => {
    while (true) {
        // Performs a health check using CircuitBreaker
        await circuitBreaker.healthcheck();

        // Waits for a specified amount of time before performing the next health check
        await wait(4000);
    }
})();
