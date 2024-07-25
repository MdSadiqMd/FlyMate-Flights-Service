class AppError extends Error {
    statusCode: number;
    explanation: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.explanation = message;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError;
