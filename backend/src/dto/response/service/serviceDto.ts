
interface ServiceType {
  id: number;
  name: string;
}

interface ResponseService {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  service_type: ServiceType;
  icon_id: number;
}

class ServiceResponseDto {
  public id: number;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;
  public serviceType: ServiceType;
  public iconId: number;

  constructor(service: ResponseService) {
    this.id = service.id;
    this.name = service.name;
    this.serviceType = service.service_type;
    this.iconId = service.icon_id;
    this.createdAt = service.created_at;
    this.updatedAt = service.updated_at;
  }
}

export default ServiceResponseDto;
