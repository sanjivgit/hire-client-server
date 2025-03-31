interface ReqBody {
  name: string;
  serviceTypeId: number;
  iconId: number;
}

class ServiceRequestDto {
  public name: string;
  public service_type_id: number;
  public icon_id: number;

  constructor(body: ReqBody) {
    this.name = body.name;
    this.service_type_id = body.serviceTypeId;
    this.icon_id = body.iconId;
  }
}

export default ServiceRequestDto;
