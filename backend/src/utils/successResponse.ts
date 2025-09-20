export class SuccessResponse {
  static send(res: any, data: any, message?: string, statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      message: message || 'Operation completed successfully',
      data: data
    });
  }

  static created(res: any, data: any, message?: string) {
    return this.send(res, data, message || 'Resource created successfully', 201);
  }

  static ok(res: any, data: any, message?: string) {
    return this.send(res, data, message || 'Operation completed successfully', 200);
  }

  static noContent(res: any, message?: string) {
    return res.status(204).json({
      success: true,
      message: message || 'Operation completed successfully'
    });
  }
}
