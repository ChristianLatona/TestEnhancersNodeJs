export interface Error {
    code: string;
    description: string;
}

export interface BusinessError {
    error: Error;
}