import axios, { AxiosRequestConfig } from 'axios'

const getData = async(url: string, options?: any) => {
    try {
        const config: AxiosRequestConfig = {
            ...options,
            method: "GET",
            proxy: false
        }

        const response = await axios.get(url, config)

        if (response.status >= 200 && response.status <= 299) {
            return response.data
        }

        return new Error('Bad Request')
    }
    catch (error: any) {
        console.error("postData - error", error.message)

        if (error.response) {
           

            return {
                isError: true,
                status: error.response.status,
                errors: error.response.data.fieldErrors
                ? error.response.fieldErrors
                : error.response.data
            }
        }

        if (error.Request) {
            return error.Request
        }

        return error.message
    }
}

export default getData