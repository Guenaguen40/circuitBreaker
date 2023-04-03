const CircuitBreaker = require('./CircuitBreaker')
const EventTracking = () => {
    return {
        healthcheckStatus: status => {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] Status: ${status}`);
            console.log("...................................");
        },
        healthcheckFailed: message => {   //shows up incase the circuitbreaker is tripped 
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] Connection failed ${message}`);
            console.log("..........................................");
        }
    };
};

module.exports = EventTracking;
