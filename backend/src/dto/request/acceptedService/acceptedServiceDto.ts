class AcceptedServiceDto {
  public partner_id: number;
  public service_request_id: number;
  public description?: string;
  public amount?: number;
  public status?: string;
  
  constructor(data: any) {
    // Partner ID can come from token (req.body.user.partner.id) or directly from request
    this.partner_id = data.user?.partner?.id;
    
    // Handle both camelCase and snake_case for service_request_id
    this.service_request_id = data.serviceRequestId;
    
    // Optional fields
    this.description = data.description;
    this.amount = data.amount;
    if(data.status) {
      this.status = data.status;
    }
  }
}

export default AcceptedServiceDto; 