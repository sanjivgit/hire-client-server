const db = require("../../../db/models/index");
import { Sequelize } from "sequelize";

class NotificationsDao {
  private sequelize: any;
  private serviceRequests: any;
  private acceptedServices: any;
  private services: any;
  private serviceTypes: any;
  private partners: any;
  private users: any;

  constructor() {
    this.sequelize = db.sequelize;
    this.serviceRequests = db.service_requests;
    this.acceptedServices = db.accepted_services;
    this.services = db.services;
    this.serviceTypes = db.service_types;
    this.partners = db.partners;
    this.users = db.users;
  }

  /**
   * Get notifications based on location matching and accepted service requests
   * @param userId User ID of the API requester
   * @param page Page number for pagination
   * @param limit Number of results per page
   * @returns Paginated list of notifications
   */
  getNotifications = async (
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<{ rows: any[]; count: number }> => {
    try {
      // Calculate offset for pagination
      const offset = (page - 1) * limit;

      // First, get the user's address details
      const user = await this.users.findByPk(userId);

      if (!user || !user.address) {
        return { rows: [], count: 0 };
      }

      // Parse the address
      let userAddress;
      try {
        userAddress = typeof user.address === 'string' 
          ? JSON.parse(user.address) 
          : user.address;
      } catch (error) {
        console.error("Error parsing user address:", error);
        return { rows: [], count: 0 };
      }

      // Extract pincode and city for matching
      const userPincode = userAddress.pincode || '';
      const userCity = userAddress.city || '';

      if (!userPincode && !userCity) {
        return { rows: [], count: 0 };
      }

      // Raw SQL query to get notifications
      const query = `
        WITH combined_results AS (
          -- 1. Get service requests from other users in the same location
          SELECT 
            sr.id,
            'request' as type,
            sr.description,
            sr.created_at,
            sr.updated_at,
            sr.user_id as customer_id,
            sr.service_id,
            NULL as partner_id,
            NULL as accept_description,
            NULL as accept_created_at,
            NULL as accept_updated_at,
            NULL as accept_status,
            NULL as accept_amount,
            NULL as accepted_service_id
          FROM 
            service_requests sr
          JOIN 
            users u ON sr.user_id = u.id
          LEFT JOIN 
            accepted_services ac ON sr.id = ac.service_request_id
          WHERE 
            sr.user_id != :userId
            AND ac.id IS NULL
            AND (
              (u.address->>'pincode' = :userPincode AND :userPincode != '')
              OR 
              (LOWER(u.address->>'city') = LOWER(:userCity) AND :userCity != '')
            )
          
          UNION ALL
          
          -- 2. Get the user's own service requests and their acceptance details
          SELECT 
            sr.id,
            CASE WHEN ac.id IS NULL THEN 'request' ELSE 'accept' END as type,
            sr.description,
            sr.created_at,
            sr.updated_at,
            sr.user_id as customer_id,
            sr.service_id,
            ac.partner_id,
            ac.description as accept_description,
            ac.created_at as accept_created_at,
            ac.updated_at as accept_updated_at,
            ac.status as accept_status,
            ac.amount as accept_amount,
            ac.id as accepted_service_id
          FROM 
            service_requests sr
          LEFT JOIN 
            accepted_services ac ON sr.id = ac.service_request_id
          WHERE 
            sr.user_id = :userId
            AND ac.id IS NOT NULL
        )
        
        SELECT 
          cr.*,
          
          -- Customer details
          cu.id as customer_id,
          cu.name as customer_name,
          cu.email as customer_email,
          cu.phone as customer_phone,
          cu.profile_pic as customer_profile_pic,
          cu.address as customer_address,
          
          -- Service details
          s.id as service_id,
          s.name as service_name,
          
          -- Service type details
          st.id as service_type_id,
          st.name as service_type_name,
          
          -- Partner details (if any)
          p.id as partner_id,
          p.first_name as partner_first_name,
          p.last_name as partner_last_name,
          p.status as partner_status,
          p.user_id as partner_user_id,
          
          -- Partner user details (if any)
          pu.id as partner_user_id,
          pu.name as partner_user_name,
          pu.email as partner_user_email,
          pu.phone as partner_user_phone,
          pu.profile_pic as partner_user_profile_pic,
          pu.address as partner_user_address,
          
          -- Count for pagination
          COUNT(*) OVER() as total_count
        FROM
          combined_results cr
        JOIN
          users cu ON cr.customer_id = cu.id
        JOIN
          services s ON cr.service_id = s.id
        JOIN
          service_types st ON s.service_type_id = st.id
        LEFT JOIN
          partners p ON cr.partner_id = p.id
        LEFT JOIN
          users pu ON p.user_id = pu.id
        ORDER BY
          cr.created_at DESC
        LIMIT :limit OFFSET :offset
      `;

      // Execute the query
      const results = await this.sequelize.query(query, {
        replacements: {
          userId,
          userPincode,
          userCity,
          limit,
          offset
        },
        type: this.sequelize.QueryTypes.SELECT
      });

      // Format the results
      const totalCount = results.length > 0 ? parseInt(results[0].total_count) : 0;
      
      const formattedResults = results.map((item: any) => {
        // Parse addresses from JSON strings if needed
        let customerAddress;
        try {
          customerAddress = typeof item.customer_address === 'string' 
            ? JSON.parse(item.customer_address) 
            : item.customer_address;
        } catch (error) {
          customerAddress = {};
        }

        let partnerAddress;
        try {
          if (item.partner_user_address) {
            partnerAddress = typeof item.partner_user_address === 'string'
              ? JSON.parse(item.partner_user_address)
              : item.partner_user_address;
          }
        } catch (error) {
          partnerAddress = {};
        }

        // Format the notification data
        return {
          id: item.id,
          type: item.type,
          description: item.description,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          
          // Include acceptance details if available
          acceptance: item.accepted_service_id ? {
            id: item.accepted_service_id,
            description: item.accept_description,
            status: item.accept_status,
            amount: item.accept_amount,
            createdAt: item.accept_created_at,
            updatedAt: item.accept_updated_at
          } : null,
          
          // Customer details
          customer: {
            id: item.customer_id,
            name: item.customer_name,
            email: item.customer_email,
            phone: item.customer_phone,
            profilePic: item.customer_profile_pic,
            address: customerAddress
          },
          
          // Service details
          service: {
            id: item.service_id,
            name: item.service_name,
            serviceType: {
              id: item.service_type_id,
              name: item.service_type_name
            }
          },
          
          // Partner details if applicable
          partner: item.partner_id ? {
            id: item.partner_id,
            firstName: item.partner_first_name,
            lastName: item.partner_last_name,
            status: item.partner_status,
            user: {
              id: item.partner_user_id,
              name: item.partner_user_name,
              email: item.partner_user_email,
              phone: item.partner_user_phone,
              profilePic: item.partner_user_profile_pic,
              address: partnerAddress
            }
          } : null
        };
      });

      return {
        rows: formattedResults,
        count: totalCount
      };
    } catch (error) {
      console.error("Error in getNotifications DAO:", error);
      throw error;
    }
  };
}

export default NotificationsDao; 