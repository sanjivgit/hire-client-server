interface ReqBody {
  name: string;
  serviceTypeId: number;
}

class ServiceRequestDto {
  public name: string;
  public service_type_id: number;

  constructor(body: ReqBody) {
    this.name = body.name;
    this.service_type_id = body.serviceTypeId;
  }
}

export default ServiceRequestDto;
