export declare class Handler {
    [x: string]: any;
    constructor();
    success(response: any, responseData: any): Promise<any>;
    errorException(response: any, error: any): any;
    successResponse(responseData: any): Promise<{
        status: {
            code: number;
            header: string;
            description: string;
        };
        data: any;
    }>;
    erroresponse(code: any, responseData: any): Promise<{
        status: {
            code: any;
            header: string;
            description: any;
        };
        data: null;
    }>;
}
