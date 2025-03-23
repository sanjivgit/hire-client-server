class ServiceRequestDto {
  public service_id: number;
  public description?: string;
  public user_id: number;
  
  constructor(data: any) {
    this.service_id = data.serviceId;
    this.description = data.description;
    this.user_id = data.user.id;
  }
}

export default ServiceRequestDto; 