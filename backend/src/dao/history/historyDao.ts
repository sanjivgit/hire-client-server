const db = require("../../../db/models/index");
import { Op, Sequelize, literal } from "sequelize";

interface HistoryFilters {
  serviceType?: 'request' | 'accept';
  status?: 'requested' | 'accepted' | 'completed' | 'cancelled';
  startDate?: Date;
  endDate?: Date;
  query?: string;
  userId: number;
  page?: number;
  limit?: number;
}

interface HistoryItem {
  id: number;
  type: 'request' | 'accept';
  service: {
    id: number;
    name: string;
  } | null;
  serviceType: {
    id: number;
    name: string;
  } | null;
  description: string | null;
  status: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
  } | null;
  partner: {
    id: number;
    firstName: string;
    lastName: string;
    user: {
      id: number;
      name: string;
      phone: string;
      email: string;
      address: string;
    };
  } | null;
}

interface ServiceRequest {
  id: number;
  description: string;
  created_at: string;
  updated_at: string;
  service: {
    id: number;
    name: string;
    service_type?: {
      id: number;
      name: string;
    };
  };
  user: {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  accepted_service?: {
    id: number;
    status: string;
    amount: number;
    partner: {
      id: number;
      first_name: string;
      last_name: string;
      user: {
        id: number;
        name: string;
        phone: string;
        email: string;
        address: string;
      };
    };
  };
}

interface AcceptedService {
  id: number;
  description?: string;
  status: string;
  amount: number;
  created_at: string;
  updated_at: string;
  service_request?: {
    id: number;
    description: string;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      name: string;
      phone: string;
      email: string;
      address: string;
    };
    service: {
      id: number;
      name: string;
      service_type: {
        id: number;
        name: string;
      };
    };
  };
  partner: {
    id: number;
    first_name: string;
    last_name: string;
    user: {
      id: number;
      name: string;
      phone: string;
      email: string;
      address: string;
    };
  };
}

class HistoryDao {
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

  // Alternative implementation using raw SQL query
  getUserServiceHistoryRaw = async (filters: HistoryFilters) => {
    try {
      // Set default pagination values
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const offset = (page - 1) * limit;

      // Build date range filter
      let dateFilter = '';
      if (filters.startDate) {
        dateFilter += ` AND combined.updated_at >= '${filters.startDate.toISOString()}'`;
      }
      if (filters.endDate) {
        dateFilter += ` AND combined.updated_at <= '${filters.endDate.toISOString()}'`;
      }

      // Build status filter
      let statusFilter = '';
      if (filters.status) {
        statusFilter = ` AND combined.status = '${filters.status.toLowerCase()}'`;
      }
      // Build query filter
      let queryFilter = '';
      if (filters.query) {
        const searchTerm = filters.query.replace(/'/g, "''"); // Escape single quotes
        queryFilter = ` AND (
          combined.service_name ILIKE '%${searchTerm}%' OR 
          combined.service_type_name ILIKE '%${searchTerm}%' OR
          combined.customer_name ILIKE '%${searchTerm}%' OR
          combined.partner_user_name ILIKE '%${searchTerm}%'
        )`;
      }

      // Build service type filter
      let serviceTypeFilter = '';
      if (filters.serviceType === 'request') {
        serviceTypeFilter = ` AND combined.type = 'request'`;
      } else if (filters.serviceType === 'accept') {
        serviceTypeFilter = ` AND combined.type = 'accept'`;
      }

      // Get partner ID for this user
      const partner = await this.partners.findOne({
        where: { user_id: filters.userId },
        attributes: ['id']
      });

      const partnerId = partner ? partner.id : -1; // Use -1 if no partner found to avoid empty results

      // SQL query to get combined results
      const query = `
        WITH combined AS (
          -- Service Requests made by the user
          SELECT 
            sr.id, 
            'request' as type,
            sr.description as request_description,
            as2.description as accept_description,
            sr.created_at as created_at,
            sr.created_at as request_created_at,
            sr.updated_at as request_updated_at,
            as2.created_at as accept_created_at,
            as2.updated_at as accept_updated_at,
            s.id as service_id,
            s.name as service_name,
            st.id as service_type_id,
            st.name as service_type_name,
            as2.status,
            as2.amount as price,
            -- Customer details (requester)
            u.id as customer_id,
            u.name as customer_name,
            u.profile_pic as customer_profile_pic_id,
            u.phone as customer_phone,
            u.email as customer_email,
            u.address as customer_address,
            -- Partner details (acceptor)
            p.id as partner_id,
            p.first_name as partner_first_name,
            p.last_name as partner_last_name,
            pu.id as partner_user_id,
            pu.name as partner_user_name,
            pu.profile_pic as partner_user_profile_pic_id,
            pu.phone as partner_user_phone,
            pu.email as partner_user_email,
            pu.address as partner_user_address
          FROM service_requests sr
          JOIN users u ON sr.user_id = u.id
          JOIN services s ON sr.service_id = s.id
          JOIN service_types st ON s.service_type_id = st.id
          LEFT JOIN accepted_services as2 ON sr.id = as2.service_request_id
          LEFT JOIN partners p ON as2.partner_id = p.id
          LEFT JOIN users pu ON p.user_id = pu.id
          WHERE sr.user_id = :userId

          UNION ALL

          -- Accepted Services by the user as partner
          SELECT 
            as1.id,
            'accept' as type,
            as1.description as accept_description,
            sr.description as request_description,
            as1.created_at as created_at,
            as1.created_at as accept_created_at,
            as1.updated_at as accept_updated_at,
            sr.created_at as request_created_at,
            sr.updated_at as request_updated_at,
            s.id as service_id,
            s.name as service_name,
            st.id as service_type_id,
            st.name as service_type_name,
            as1.status,
            as1.amount as price,
            -- Customer details (requester)
            u.id as customer_id,
            u.name as customer_name,
            u.profile_pic as customer_profile_pic_id,
            u.phone as customer_phone,
            u.email as customer_email,
            u.address as customer_address,
            -- Partner details (acceptor)
            p.id as partner_id,
            p.first_name as partner_first_name,
            p.last_name as partner_last_name,
            pu.id as partner_user_id,
            pu.name as partner_user_name,
            pu.profile_pic as partner_user_profile_pic_id,
            pu.phone as partner_user_phone,
            pu.email as partner_user_email,
            pu.address as partner_user_address
          FROM accepted_services as1
          JOIN service_requests sr ON as1.service_request_id = sr.id
          JOIN users u ON sr.user_id = u.id
          JOIN services s ON sr.service_id = s.id
          JOIN service_types st ON s.service_type_id = st.id
          JOIN partners p ON as1.partner_id = p.id
          JOIN users pu ON p.user_id = pu.id
          WHERE as1.partner_id = :partnerId
        )
        SELECT 
          *,
          COUNT(*) OVER() as total_count
        FROM combined
        WHERE 1=1
        ${dateFilter}
        ${statusFilter}
        ${queryFilter}
        ${serviceTypeFilter}
        ORDER BY created_at DESC
        LIMIT :limit OFFSET :offset
      `;

      // Execute the query
      const results = await this.sequelize.query(query, {
        replacements: {
          userId: filters.userId,
          partnerId,
          limit,
          offset
        },
        type: this.sequelize.QueryTypes.SELECT
      });

      // Format the results
      const totalCount = results.length > 0 ? parseInt(results[0].total_count) : 0;

      const formattedResults = results.map((item: any) => ({
        id: item.id,
        type: item.type,
        service: {
          id: item.service_id,
          name: item.service_name
        },
        serviceType: {
          id: item.service_type_id,
          name: item.service_type_name
        },
        requestDescription: item.request_description,
        acceptDescription: item.accept_description,
        status: item.status,
        price: item.price,
        requestCreatedAt: item.request_created_at,
        requestUpdatedAt: item.request_updated_at,
        acceptCreatedAt: item.accept_created_at,
        acceptUpdatedAt: item.accept_updated_at,
        customer: {
          id: item.customer_id,
          name: item.customer_name,
          profilePicId: item.customer_profile_pic_id,
          phone: item.customer_phone,
          email: item.customer_email,
          address: item.customer_address
        },
        partner: item.partner_id ? {
          id: item.partner_id,
          firstName: item.partner_first_name,
          lastName: item.partner_last_name,
          user: {
            id: item.partner_user_id,
            name: item.partner_user_name,
            profilePicId: item.partner_user_profile_pic_id,
            phone: item.partner_user_phone,
            email: item.partner_user_email,
            address: item.partner_user_address
          }
        } : null
      }));

      return {
        count: totalCount,
        rows: formattedResults
      };
    } catch (error) {
      throw error;
    }
  }
}

export default HistoryDao; 