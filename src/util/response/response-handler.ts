import {Response} from "express";

export class ResponseHelper {
    /**
     * @function
     * @description An API response helper
     *
     * @param {Object} res Express response object
     * @param {Number} status HTTP status code
     * @param {Boolean} error Flag for error
     * @param {Object} data Response data object
     * @param {String} message Response message to client
     *
     * @returns {Object} Response from the server
     */


    static sendResponse(res: Response, status,error= false, data: any = false, message = '') {
        const statusObj = {
            200: 'Successful',
            201: 'Created Successfully',
            204: 'Ok',
            400: 'Invalid Request Format',
            401: 'Unauthorized Access',
            403: 'Forbidden',
            404: 'Resource Not Found',
            405: 'Method Not Allowed',
            500: 'Internal Server Error'
        };

        let response:any = { data: data || null, error: error ? true : false };

        if(response.data === true){
            response.data = {};
        }
        response.message = message ? message : statusObj[status];

        return res.status(status).json(response);
    }
}



