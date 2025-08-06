import { Op } from "sequelize";
import { generateRes, generateResForPagination } from "../../utils/generateRes";
const db = require("../../../db/models/index");

interface PartnerHistoryQuery {
    partnerId: number;
    page?: number;
    limit?: number;
    search?: string;
}

class PartnerHistoryDao {
    private sequelize: any;
    private accepted_services: any;
    private service_requests: any;
    private services: any;
    private users: any;
    private partners: any;
    private service_types: any;
    private partner_services: any;

    constructor() {
        this.sequelize = db.sequelize;
        this.accepted_services = db.accepted_services;
        this.service_requests = db.service_requests;
        this.services = db.services;
        this.users = db.users;
        this.partners = db.partners;
        this.service_types = db.service_types;
        this.partner_services = db.partner_services;
    }

    getPartnerWorkingHistory = async (query: PartnerHistoryQuery) => {
        try {
            const partnerId = query.partnerId;
            const page = query.page || 1;
            const limit = query.limit || 10;
            const offset = (page - 1) * limit;

            if (isNaN(partnerId) || partnerId <= 0) {
                throw new Error("Invalid partner ID");
            }

            // Using Sequelize's query parameters to prevent SQL injection
            const queryParams = {
                partnerId,
                limit,
                offset,
                search: query.search ? `%${query.search}%` : null
            };

            // Using raw SQL query with parameterized queries
            const query_sql = `
                SELECT 
                    as2.id,
                    as2.status,
                    as2.amount,
                    as2.created_at,
                    as2.updated_at,
                    u.address,
                    s.name as service_name,
                    u.name as user_name,
                    u.profile_pic as user_profile_pic
                FROM accepted_services as2
                JOIN service_requests sr ON as2.service_request_id = sr.id
                JOIN services s ON sr.service_id = s.id
                JOIN users u ON sr.user_id = u.id
                WHERE as2.partner_id = :partnerId
                ${queryParams.search ? 'AND (s.name ILIKE :search OR u.address ILIKE :search OR u.name ILIKE :search)' : ''}
                ORDER BY as2.created_at DESC
                LIMIT :limit OFFSET :offset
            `;

            const count_sql = `
                SELECT COUNT(*) as total
                FROM accepted_services as2
                JOIN service_requests sr ON as2.service_request_id = sr.id
                JOIN services s ON sr.service_id = s.id
                JOIN users u ON sr.user_id = u.id
                WHERE as2.partner_id = :partnerId
                ${queryParams.search ? 'AND (s.name ILIKE :search OR u.address ILIKE :search OR u.name ILIKE :search)' : ''}
            `;

            // Execute the queries with parameters
            const [rows, countResult] = await Promise.all([
                this.sequelize.query(query_sql, {
                    replacements: queryParams,
                    type: this.sequelize.QueryTypes.SELECT
                }),
                this.sequelize.query(count_sql, {
                    replacements: queryParams,
                    type: this.sequelize.QueryTypes.SELECT
                })
            ]);

            const count = parseInt(countResult[0]?.total || '0');
            const totalPages = Math.ceil(count / limit);

            return generateResForPagination(
                rows,
                count,
                page,
                limit,
                {
                    totalPages: totalPages
                });
        } catch (error) {
            console.error("Error in getPartnerWorkingHistory:", error);
            throw error;
        }
    };

    getPartnerWorkStats = async (partnerId: number) => {
        try {
            if (isNaN(partnerId) || partnerId <= 0) {
                throw new Error("Invalid partner ID");
            }

            // Using Sequelize's query parameters to prevent SQL injection
            const queryParams = {
                partnerId
            };

            // Using raw SQL query with parameterized queries
            const query_sql = `
                SELECT 
                    COALESCE(SUM(as2.amount), 0) as total_amount,
                    COUNT(CASE WHEN as2.status = 'completed' THEN 1 ELSE NULL END) as completed_count,
                    COUNT(CASE WHEN as2.status = 'accepted' THEN 1 ELSE NULL END) as pending_count,
                    COUNT(CASE WHEN as2.status = 'cancelled' THEN 1 ELSE NULL END) as cancelled_count,
                    p.id as partner_id,
                    p.first_name,
                    p.last_name,
                    p.status as partner_status,
                    u.name as user_name,
                    u.profile_pic,
                    u.email,
                    st.name as service_type_name
                FROM accepted_services as2
                JOIN partners p ON as2.partner_id = p.id
                JOIN users u ON p.user_id = u.id
                JOIN service_types st ON p.service_type_id = st.id
                WHERE as2.partner_id = :partnerId
                GROUP BY p.id, p.first_name, p.last_name, p.status, u.name, u.profile_pic, u.email, st.name
            `;

            // Execute the query with parameters
            const result = await this.sequelize.query(query_sql, {
                replacements: queryParams,
                type: this.sequelize.QueryTypes.SELECT
            });

            if (result.length === 0) {
                // If no services found, get partner info only
                const partnerSql = `
                    SELECT 
                        p.id as partner_id,
                        p.first_name,
                        p.last_name,
                        p.status as partner_status,
                        u.name as user_name,
                        u.profile_pic,
                        u.email,
                        st.name as service_type_name
                    FROM partners p 
                    JOIN users u ON p.user_id = u.id
                    JOIN service_types st ON p.service_type_id = st.id
                    WHERE p.id = :partnerId
                `;

                const partnerInfo = await this.sequelize.query(partnerSql, {
                    replacements: queryParams,
                    type: this.sequelize.QueryTypes.SELECT
                });

                if (partnerInfo.length === 0) {
                    throw new Error("Partner not found");
                }

                return {
                    ...partnerInfo[0],
                    total_amount: 0,
                    completed_count: 0,
                    pending_count: 0,
                    cancelled_count: 0
                };
            }

            return result[0];
        } catch (error) {
            console.error("Error in getPartnerWorkStats:", error);
            throw error;
        }
    };

    getServiceHistoryById = async (serviceHistoryId: number) => {
        try {
            if (isNaN(serviceHistoryId) || serviceHistoryId <= 0) {
                throw new Error("Invalid service history ID");
            }

            // Using Sequelize's query parameters to prevent SQL injection
            const queryParams = {
                serviceHistoryId
            };

            // 1. Query for Work Details and basic relationships
            const workDetailsQuery = `
                SELECT 
                    as2.id as service_history_id,
                    as2.status,
                    as2.amount,
                    as2.description,
                    as2.created_at as service_created_at,
                    as2.updated_at as service_updated_at,
                    as2.partner_id,
                    sr.id as service_request_id,
                    sr.description as request_description,
                    sr.user_id as requester_id,
                    s.id as service_id,
                    s.name as service_name
                FROM accepted_services as2
                JOIN service_requests sr ON as2.service_request_id = sr.id
                JOIN services s ON sr.service_id = s.id
                WHERE as2.id = :serviceHistoryId
            `;

            const workDetails = await this.sequelize.query(workDetailsQuery, {
                replacements: queryParams,
                type: this.sequelize.QueryTypes.SELECT
            });

            if (workDetails.length === 0) {
                throw new Error("Service history not found");
            }

            const workDetailData = workDetails[0];
            const partnerId = workDetailData.partner_id;
            const requesterId = workDetailData.requester_id;

            // 2. Query for Partner Details
            const partnerDetailsQuery = `
                SELECT 
                    p.id as partner_id,
                    p.first_name,
                    p.last_name,
                    p.status as partner_status,
                    p.created_at as partner_created_at,
                    pu.name as partner_name,
                    pu.email as partner_email,
                    pu.phone as partner_phone,
                    pu.profile_pic as partner_profile_pic,
                    st.name as service_type_name,
                    (
                        SELECT COUNT(*) 
                        FROM accepted_services 
                        WHERE partner_id = p.id AND status = 'completed'
                    ) as total_completed_tasks
                FROM partners p 
                JOIN users pu ON p.user_id = pu.id
                JOIN service_types st ON p.service_type_id = st.id
                WHERE p.id = :partnerId
            `;

            // 3. Query for User Details
            const userDetailsQuery = `
                SELECT 
                    u.id as user_id,
                    u.name as user_name,
                    u.email as user_email,
                    u.phone as user_phone,
                    u.profile_pic as user_profile_pic,
                    u.address as user_address,
                    u.created_at as user_created_at,
                    (
                        SELECT COUNT(*) 
                        FROM service_requests 
                        WHERE user_id = u.id
                    ) as total_requests
                FROM users u
                WHERE u.id = :requesterId
            `;

            // 4. Query for Partner Services
            const partnerServicesQuery = `
                SELECT 
                    s.id as service_id,
                    s.name as service_name
                FROM partner_services ps
                JOIN services s ON ps.service_id = s.id
                WHERE ps.partner_id = :partnerId
            `;

            // Execute all queries in parallel
            const [partnerDetails, userDetails, partnerServices] = await Promise.all([
                this.sequelize.query(partnerDetailsQuery, {
                    replacements: { partnerId },
                    type: this.sequelize.QueryTypes.SELECT
                }),
                this.sequelize.query(userDetailsQuery, {
                    replacements: { requesterId },
                    type: this.sequelize.QueryTypes.SELECT
                }),
                this.sequelize.query(partnerServicesQuery, {
                    replacements: { partnerId },
                    type: this.sequelize.QueryTypes.SELECT
                })
            ]);

            if (partnerDetails.length === 0) {
                throw new Error("Partner not found");
            }

            if (userDetails.length === 0) {
                throw new Error("User not found");
            }

            // Combine all data
            return {
                workDetails: {
                    id: workDetailData.service_history_id,
                    status: workDetailData.status,
                    amount: workDetailData.amount,
                    description: workDetailData.description || workDetailData.request_description,
                    createdAt: workDetailData.service_created_at,
                    updatedAt: workDetailData.service_updated_at,
                    serviceName: workDetailData.service_name,
                    serviceRequestId: workDetailData.service_request_id
                },
                partnerDetails: {
                    id: partnerDetails[0].partner_id,
                    name: partnerDetails[0].partner_name,
                    firstName: partnerDetails[0].first_name,
                    lastName: partnerDetails[0].last_name,
                    email: partnerDetails[0].partner_email,
                    phone: partnerDetails[0].partner_phone,
                    profilePic: partnerDetails[0].partner_profile_pic,
                    status: partnerDetails[0].partner_status,
                    createdAt: partnerDetails[0].partner_created_at,
                    serviceType: partnerDetails[0].service_type_name,
                    totalCompletedTasks: parseInt(partnerDetails[0].total_completed_tasks) || 0,
                    services: partnerServices
                },
                userDetails: {
                    id: userDetails[0].user_id,
                    name: userDetails[0].user_name,
                    email: userDetails[0].user_email,
                    phone: userDetails[0].user_phone,
                    profilePic: userDetails[0].user_profile_pic,
                    address: userDetails[0].user_address,
                    createdAt: userDetails[0].user_created_at,
                    totalRequests: parseInt(userDetails[0].total_requests) || 0
                }
            };
        } catch (error) {
            console.error("Error in getServiceHistoryById:", error);
            throw error;
        }
    };
}

export default PartnerHistoryDao; 