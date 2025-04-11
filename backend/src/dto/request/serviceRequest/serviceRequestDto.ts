class ServiceRequestDto {
  public service_id: number;
  public description?: string;
  public user_id: number;
  public fcm_token: string;
  
  constructor(data: any) {
    this.service_id = data.serviceId;
    this.description = data.description;
    this.user_id = data.user.id;
    this.fcm_token = data.user.fcm_token;
  }
}

export default ServiceRequestDto; 