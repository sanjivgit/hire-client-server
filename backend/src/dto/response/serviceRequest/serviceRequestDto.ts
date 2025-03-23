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

class ServiceRequestResponseDto {
  public id: number;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
  public user: User;
  public service: Service;
  public acceptedService?: AcceptedService;

  constructor(serviceRequest: ResponseServiceRequest) {
    this.id = serviceRequest.id;
    this.description = serviceRequest.description;
    this.user = serviceRequest.user;
    this.service = serviceRequest.service;
    this.acceptedService = serviceRequest.accepted_service;
    this.createdAt = serviceRequest.created_at;
    this.updatedAt = serviceRequest.updated_at;
  }
}

export default ServiceRequestResponseDto; 