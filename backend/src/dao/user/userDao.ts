import { generateRes } from "../../utils/generateRes";
const db = require("../../../db/models/index");

interface AddressDetails {
  address: string;
  pincode: string;
  state: string;
  city: string;
}

interface UpdateUserDetails {
  name?: string;
  profile_pic?: number;
  address?: AddressDetails;
}

interface BecomePartner {
  firstName: string;
  lastName: string;
  userId: string;
  serviceTypeId: number;
  serviceIds: number[];
  aadharImageId: number;
  additionalDocumentId: number;
}

class UserDao {
  private users: any;
  private partners: any;
  private services: any;
  private sequelize: any;

  constructor() {
    this.users = db.users;
    this.partners = db.partners;
    this.services = db.services;
    this.sequelize = db.sequelize;
  }

  getUserByUserId = async (userId: string) => {
    const rawQuery = `
    SELECT 
        u.id, 
        u.name, 
        u.phone,
        u.profile_pic,
        u.address,
        u.password,
        ft.token as fcm_token, 
        r.role AS role, 
        json_build_object(
          'id', p.id, 
          'first_name', p.first_name,
          'last_name', p.last_name,
          'aadhar_image_id', p.aadhar_image_id,
          'status', p.status,
          'additional_document_id', p.additional_document_id,
          'aadhar_number', p.aadhar_number,
          'service_type_id', p.service_type_id,
          'services', COALESCE(json_agg(
                json_build_object('id', s.id, 'name', s.name)
              ) FILTER (WHERE s.id IS NOT NULL), '[]'::json)
        ) AS partner
    FROM users u
    LEFT JOIN roles r ON u.id = r.user_id
    LEFT JOIN partners p ON u.id = p.user_id
    LEFT JOIN partner_services ps ON p.id = ps.partner_id
    LEFT JOIN services s ON ps.service_id = s.id
    LEFT JOIN fcm_tokens ft ON ft.user_id = u.id
    WHERE u.id = :userId
    GROUP BY u.id, u.name, u.phone, u.address::text, u.password, r.role, p.id, p.service_type_id, ft.token;
  `;

    const [user] = await this.sequelize.query(rawQuery, {
      replacements: { userId },
      type: this.sequelize.QueryTypes.SELECT,
    });

    const { password, ...userDetails } = user;

    // Transform the response to include `isPartner`
    const formattedUser = userDetails;

    formattedUser.isPartner = !!user.partner;

    return generateRes(formattedUser);
  };

  updateUserDetails = async (userId: string, details: UpdateUserDetails) => {
    const [updatedCount] = await this.users.update(details, {
      where: { id: userId },
    });

    if (updatedCount === 0) {
      return generateRes(null);
    }

    // Fetch and return updated user details
    const updatedUser = await this.getUserByUserId(userId);

    // Parse the address back to object if it exists
    if (updatedUser && updatedUser.address) {
      try {
        updatedUser.address = updatedUser.address;
      } catch (error) {
        console.error("Error parsing address:", error);
      }
    }

    return generateRes(updatedUser);
  };
}

export default UserDao;
