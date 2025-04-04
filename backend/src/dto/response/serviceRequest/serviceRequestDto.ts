interface User {
  id: number;
  name: string;
  phone: string;
  address?: any;
}

interface ServiceType {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
  service_type: ServiceType;
}

interface AcceptedService {
  id: number;
  partner_id: number;
  service_request_id: number;
  amount: number;
  description: string;
  status: string;
  partner: Partner;
  created_at: Date;
  updated_at: Date;
}

interface ResponseServiceRequest {
  id: number;
  user_id: number;
  service_id: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  service: Service;
  accepted_service?: AcceptedService;
}

interface Partner {
  id: number;
  first_name: string;
  last_name: string;
  user: User;
}

class ServiceRequestResponseDto {
  public id: number;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
  public user: User;
  public service: ServiceDto;
  public acceptedService: AcceptedServiceDto | null;

  constructor(serviceRequest: ResponseServiceRequest) {
    this.id = serviceRequest.id;
    this.description = serviceRequest.description;
    this.user = serviceRequest.user;
    this.service = new ServiceDto(serviceRequest.service);
    this.acceptedService = serviceRequest.accepted_service ? new AcceptedServiceDto(serviceRequest.accepted_service) : null;
    this.createdAt = serviceRequest.created_at;
    this.updatedAt = serviceRequest.updated_at;
  }
}

class AcceptedServiceDto {
  public id: number;
  public partnerId: number;
  public serviceRequestId: number;
  public amount: number;
  public description: string;
  public status: string;
  public partner: PartnerDto;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(acceptedService: AcceptedService) {
    this.id = acceptedService.id;
    this.partnerId = acceptedService.partner_id;
    this.serviceRequestId = acceptedService.service_request_id;
    this.amount = acceptedService.amount;
    this.description = acceptedService.description;
    this.status = acceptedService.status;
    this.partner = new PartnerDto(acceptedService.partner);
    this.createdAt = acceptedService.created_at;
    this.updatedAt = acceptedService.updated_at;
  }
}

class PartnerDto {
  public id: number;
  public firstName: string;
  public lastName: string;
  public user: User;

  constructor(partner: Partner) {
    this.id = partner.id;
    this.firstName = partner.first_name;
    this.lastName = partner.last_name;
    this.user = partner.user;
  }
}


class ServiceDto {
  public id: number;
  public name: string;
  public serviceType: ServiceType;

  constructor(service: Service) {
    this.id = service.id;
    this.name = service.name;
    this.serviceType = service.service_type;
  }
}


export default ServiceRequestResponseDto; 