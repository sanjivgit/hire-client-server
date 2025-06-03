import { NextRequest, NextResponse } from "next/server";

// Sample work history data
const workHistoryData = [
    {
        id: 1,
        serviceName: "Plumbing Repair",
        status: "completed",
        amount: 1200.5,
        userAddress: "123 Main St, New York, NY, 10001",
        userName: "John Doe",
        userProfilePic: "/uploads/profile-pics/profile.jpg",
        createdAt: "2024-05-15T10:30:00Z",
        updatedAt: "2024-05-16T15:45:00Z"
    },
    {
        id: 2,
        serviceName: "Electrical Installation",
        status: "pending",
        amount: 2500.75,
        userAddress: "456 Oak Ave, Boston, MA, 02108",
        userName: "Jane Smith",
        userProfilePic: null,
        createdAt: "2024-05-18T09:15:00Z",
        updatedAt: "2024-05-18T09:15:00Z"
    },
    {
        id: 3,
        serviceName: "Bathroom Remodeling",
        status: "completed",
        amount: 15000,
        userAddress: "789 Pine St, Chicago, IL, 60601",
        userName: "Robert Johnson",
        userProfilePic: "/uploads/profile-pics/robert.jpg",
        createdAt: "2024-05-10T14:20:00Z",
        updatedAt: "2024-05-12T18:30:00Z"
    },
    {
        id: 4,
        serviceName: "HVAC Maintenance",
        status: "cancelled",
        amount: 750.25,
        userAddress: "321 Elm St, San Francisco, CA, 94105",
        userName: "Sarah Williams",
        userProfilePic: "/uploads/profile-pics/sarah.jpg",
        createdAt: "2024-05-20T11:45:00Z",
        updatedAt: "2024-05-21T10:15:00Z"
    },
    {
        id: 5,
        serviceName: "Painting Service",
        status: "completed",
        amount: 3500,
        userAddress: "654 Maple Ave, Seattle, WA, 98101",
        userName: "Michael Brown",
        userProfilePic: null,
        createdAt: "2024-05-08T08:30:00Z",
        updatedAt: "2024-05-09T16:40:00Z"
    },
    {
        id: 6,
        serviceName: "Roof Repair",
        status: "pending",
        amount: 4750.5,
        userAddress: "987 Cedar Rd, Denver, CO, 80202",
        userName: "Emily Davis",
        userProfilePic: "/uploads/profile-pics/emily.jpg",
        createdAt: "2024-05-22T13:10:00Z",
        updatedAt: "2024-05-22T13:10:00Z"
    },
    {
        id: 7,
        serviceName: "Window Installation",
        status: "completed",
        amount: 2200,
        userAddress: "159 Birch Ln, Austin, TX, 78701",
        userName: "David Wilson",
        userProfilePic: null,
        createdAt: "2024-05-12T10:20:00Z",
        updatedAt: "2024-05-14T09:30:00Z"
    },
    {
        id: 8,
        serviceName: "Lawn Care",
        status: "completed",
        amount: 850,
        userAddress: "753 Spruce St, Miami, FL, 33101",
        userName: "Lisa Anderson",
        userProfilePic: "/uploads/profile-pics/lisa.jpg",
        createdAt: "2024-05-17T15:40:00Z",
        updatedAt: "2024-05-17T18:25:00Z"
    },
    {
        id: 9,
        serviceName: "Kitchen Renovation",
        status: "pending",
        amount: 18500.75,
        userAddress: "426 Walnut Ave, Portland, OR, 97201",
        userName: "Thomas Moore",
        userProfilePic: null,
        createdAt: "2024-05-21T09:50:00Z",
        updatedAt: "2024-05-21T09:50:00Z"
    },
    {
        id: 10,
        serviceName: "Flooring Installation",
        status: "completed",
        amount: 6750.5,
        userAddress: "842 Ash St, Atlanta, GA, 30303",
        userName: "Jennifer Lee",
        userProfilePic: "/uploads/profile-pics/jennifer.jpg",
        createdAt: "2024-05-14T12:15:00Z",
        updatedAt: "2024-05-16T14:30:00Z"
    },
    {
        id: 11,
        serviceName: "Appliance Repair",
        status: "cancelled",
        amount: 450,
        userAddress: "268 Oak St, Phoenix, AZ, 85001",
        userName: "William Taylor",
        userProfilePic: null,
        createdAt: "2024-05-18T14:25:00Z",
        updatedAt: "2024-05-19T10:10:00Z"
    },
    {
        id: 12,
        serviceName: "Plumbing Emergency",
        status: "completed",
        amount: 1800.25,
        userAddress: "573 Pine Ave, Philadelphia, PA, 19102",
        userName: "Jessica Martin",
        userProfilePic: "/uploads/profile-pics/jessica.jpg",
        createdAt: "2024-05-19T23:30:00Z",
        updatedAt: "2024-05-20T02:15:00Z"
    }
];

export async function GET(
    request: NextRequest
) {
    try {
        // Pagination parameters
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        // Calculate start and end indices
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Slice the data based on pagination
        const paginatedHistory = workHistoryData.slice(startIndex, endIndex);

        // Return the response
        return NextResponse.json({
            history: paginatedHistory,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(workHistoryData.length / limit),
                totalItems: workHistoryData.length,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        console.error("Error fetching partner work history:", error);
        return NextResponse.json(
            { error: "Failed to fetch partner work history" },
            { status: 500 }
        );
    }
} 