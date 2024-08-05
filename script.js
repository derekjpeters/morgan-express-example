document.addEventListener('DOMContentLoaded', () => {
    console.log('Frontend loaded.');

    // Function to make an API call
    const makeApiCall = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            const data = await response.text();
            console.log(`Response from ${endpoint}:`, data);
        } catch (error) {
            console.error(`Error calling ${endpoint}:`, error);
        }
    };

    // Event listeners for buttons to call different endpoints
    const routeButton = document.getElementById('routeButton');
    const endpointButton = document.getElementById('endpointButton');
    const customButton = document.getElementById('customButton');
    const protectedButton = document.getElementById('protectedButton');

    if (routeButton) {
        routeButton.addEventListener('click', () => {
            makeApiCall('/route');
        });
    }

    if (endpointButton) {
        endpointButton.addEventListener('click', () => {
            makeApiCall('/endpoint');
        });
    }

    if (customButton) {
        customButton.addEventListener('click', () => {
            makeApiCall('/custom');
        });
    }

    if (protectedButton) {
        protectedButton.addEventListener('click', () => {
            makeApiCall('/protected');
        });
    }
});
