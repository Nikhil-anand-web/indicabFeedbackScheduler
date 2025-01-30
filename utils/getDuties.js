import axios from "axios";
import indicabLogin from "./indicabLogin.js";

export default async function getDuties(criteria,start,end) {
    try {
        // Log in and get authentication tokens
        const loginResponse = await indicabLogin();
       
        if (!loginResponse.success) {
            throw new Error("Login failed");
        }

        // Construct headers for the API request
        const headers = {
            "X-User-Id": loginResponse.data.userId,
            "X-Auth-Token": loginResponse.data.authToken,
        };
  
        // Define the request body
        const requestBody = {
            criteria: criteria,
            start: start,
            end: end,
        };

        // Make the API request to get duties
        const getDutiesResponse = await axios.post(
            `${process.env.API_URL}duties`, 
            requestBody,
            { headers }
        );

        // Check if the response contains the expected data
        if (!getDutiesResponse || !getDutiesResponse.data) {
            throw new Error("Invalid response data");
        }

        console.log(getDutiesResponse.data)

        // Return the data from the response
        return getDutiesResponse.data;

    } catch (error) {
        console.error("Error in getDuties:", error); // Log error with more context
        return { success: false, error: error.message }; // Return a structured error response
    }
}
