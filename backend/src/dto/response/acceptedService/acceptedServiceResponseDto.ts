class AcceptedServiceResponseDto {
  public id: number;
  public description?: string;
  public amount?: number;
  public status: string;
  public partner: any;
  public serviceRequest: any;
  public createdAt: string;
  public updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.description = data.description;
    this.amount = data.amount;
    this.status = data.status;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    
    // Partner information
    if (data.partner) {
      this.partner = {
        id: data.partner.id,
        user: data.partner.user ? {
          id: data.partner.user.id,
          name: data.partner.user.name,
          phone: data.partner.user.phone,
          address: data.partner.user.address
        } : null,
        serviceType: data.partner.service_type ? {
          id: data.partner.service_type.id,
          name: data.partner.service_type.name
        } : null
      };
    }
    
    // Service Request information
    if (data.service_request) {
      this.serviceRequest = {
        id: data.service_request.id,
        description: data.service_request.description,
        createdAt: data.service_request.created_at,
        updatedAt: data.service_request.updated_at,
        user: data.service_request.user ? {
          id: data.service_request.user.id,
          name: data.service_request.user.name,
          phone: data.service_request.user.phone,
          address: data.service_request.user.address
        } : null,
        service: data.service_request.service ? {
          id: data.service_request.service.id,
          name: data.service_request.service.name,
          serviceType: data.service_request.service.service_type ? {
            id: data.service_request.service.service_type.id,
            name: data.service_request.service.service_type.name
          } : null
        } : null
      };
    }
  }
}

export default AcceptedServiceResponseDto; 