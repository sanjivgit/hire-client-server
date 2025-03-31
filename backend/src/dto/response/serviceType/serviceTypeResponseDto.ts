interface ServiceData {
  id: number;
  name: string;
  service_type_id?: number;
  icon_id?: number;
  created_at?: string;
  updated_at?: string;
  service_type?: {
    id: number;
    name: string;
  };
  icon?: {
    id: number;
    url: string;
  };
}

class ServiceResponseDto {
  public id: number;
  public name: string;
  public serviceTypeId?: number;
  public iconId?: number;
  public createdAt?: string;
  public updatedAt?: string;
  public serviceType?: {
    id: number;
    name: string;
  };
  public icon?: {
    id: number;
    url: string;
  };

  constructor(data: ServiceData) {
    this.id = data.id;
    this.name = data.name;
    this.serviceTypeId = data.service_type_id;
    this.iconId = data.icon_id;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    
    // Map nested objects
    if (data.service_type) {
      this.serviceType = {
        id: data.service_type.id,
        name: data.service_type.name
      };
    }
    
    if (data.icon) {
      this.icon = {
        id: data.icon.id,
        url: data.icon.url
      };
    }
  }
}

interface ServiceTypeData {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  services?: ServiceData[];
}

class ServiceTypeResponseDto {
  public id: number;
  public name: string;
  public createdAt?: string;
  public updatedAt?: string;
  public services?: ServiceResponseDto[];

  constructor(data: ServiceTypeData) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    
    // Convert services array if present
    if (data.services && Array.isArray(data.services)) {
      this.services = data.services.map(service => new ServiceResponseDto(service));
    }
  }

  /**
   * Helper method to transform multiple service types
   * @param data Array of service type data
   * @returns Array of ServiceTypeResponseDto instances
   */
  static transformList(data: ServiceTypeData[]): ServiceTypeResponseDto[] {
    return data.map(item => new ServiceTypeResponseDto(item));
  }
}

export { ServiceTypeResponseDto, ServiceResponseDto }; 