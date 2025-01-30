import axios from "axios";

async function indicabLogin() {
   
    try {
        const response = await axios.post(process.env.API_URL+'login', {
            email: process.env.API_USERNAME,
            password: process.env.API_PASSWORD
        });

       
        return {
            success : true,
            data : response.data.data
        }
    } catch (error) {
        console.log(error)
        return {
            success : false,
            data : null
        }
    }
}

export default indicabLogin;
