class FcmTokenDto {
  token: string;
  device_id?: string;
  is_active?: boolean;

  constructor(data: any) {
    this.token = data.token;
    this.device_id = data.device_id;
    this.is_active = data.is_active !== undefined ? data.is_active : true;
  }
}

export default FcmTokenDto; 