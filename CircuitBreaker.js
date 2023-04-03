const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const EventTracking = require('./EventTracking');
const config = require('./config');

const event = EventTracking();

const createCircuitBreaker = () => {   /*createCircuitBreaker function returns an object with a healthcheck 
                                       method that is used to check the health status of an external service.*/
    let consecutiveFailedCalls = 0;
    let totalCalls = 0;

    return {
        healthcheck: async () => {
            const { port } = config;

            try {
                const response = await fetch(`http://localhost:${port}/servercheck`);
                const json = await response.json();
                event.healthcheckStatus(json.status);

                consecutiveFailedCalls = 0;
                totalCalls++;
            } catch (e) {
                event.healthcheckFailed(e.message);
                consecutiveFailedCalls++;
                totalCalls++;

                const failureRate = consecutiveFailedCalls / totalCalls;
                    /* In case the service call fails, it increments the consecutiveFailedCalls variable and 
                    calculates the failure rate.*/
                if (failureRate > 0.5) {
                    event.healthcheckFailed(`Circuit tripped (failure rate: ${failureRate})`);
                   /* If the failure rate exceeds a threshold of 0.5,the circuit breaker is tripped and the healthcheckFailed method of the event 
                    object is called with an error message indicating the circuit breaker is tripped.*/
                }
            }
        }
    }
}

module.exports = createCircuitBreaker;
