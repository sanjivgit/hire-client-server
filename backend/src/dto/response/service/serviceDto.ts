
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
}

class ServiceResponseDto {
  public id: number;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;
  public serviceType: ServiceType;

  constructor(service: any) {
    this.id = service.id;
    this.name = service.name;
    this.serviceType = service.service_type;
    this.createdAt = service.created_at;
    this.updatedAt = service.updated_at;
  }
}

export default ServiceResponseDto;
