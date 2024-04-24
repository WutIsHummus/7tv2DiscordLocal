import axios, { AxiosRequestConfig } from 'axios'

const postData = async (url = '', data?: any, options?: any, strictOK: boolean = false) => {
    try {
        const config: AxiosRequestConfig = {
            ...options,
            method: 'PUT',
            proxy: false,
            url: url,
            data: data
        }

        console.log("postData - Axios config", config)


        const response = await axios(config)

        console.log("postData - response status", response.status)
        console.log("postData - response data", response.data)

        if (response.status >= 200 && response.status <= 299) {
            return response.data
        }

        if (response.data && response.status > 299) {
            return {
                isError: true,
                status: response.status,
                message: response.data
            }
        }

        return new Error('Bad Request')
    }
    catch (error: any) {
        console.error("postData - error", error.message)

        if (error.response) {
            const { response } = error
            const errors = response.data.fieldErrors ? response.data.fieldErrors : response.data

            return {
                isError: true,
                status: response.status,
                errors,
            }
        }

        if (error.Request) {
            return error.Request
        }

        return error.message
    }


}

export default postData