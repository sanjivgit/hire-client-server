class FcmTokenResponseDto {
  id: number;
  user_id: number;
  token: string;
  device_id?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(data: any) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.token = data.token;
    this.device_id = data.device_id;
    this.is_active = data.is_active;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

export default FcmTokenResponseDto; 