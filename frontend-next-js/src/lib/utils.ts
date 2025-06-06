import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock user data for demonstration
export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "pending",
    role: "partner",
    createdAt: "2023-01-15T10:30:00Z",
    company: "Acme Inc.",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    website: "https://acme.example.com",
    description: "Acme Inc. is a leading provider of innovative solutions.",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "approved",
    role: "partner",
    createdAt: "2023-02-20T14:45:00Z",
    company: "Tech Solutions",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Somewhere, USA",
    website: "https://techsolutions.example.com",
    description: "Tech Solutions provides cutting-edge technology services.",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "rejected",
    role: "partner",
    createdAt: "2023-03-10T09:15:00Z",
    company: "Global Enterprises",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Nowhere, USA",
    website: "https://global.example.com",
    description: "Global Enterprises is a multinational corporation.",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    status: "pending",
    role: "partner",
    createdAt: "2023-04-05T16:20:00Z",
    company: "Innovative Solutions",
    phone: "+1 (555) 234-5678",
    address: "321 Elm St, Anywhere, USA",
    website: "https://innovative.example.com",
    description: "Innovative Solutions focuses on creative problem-solving.",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "approved",
    role: "partner",
    createdAt: "2023-05-12T11:10:00Z",
    company: "Brown & Associates",
    phone: "+1 (555) 876-5432",
    address: "654 Maple Ave, Somewhere Else, USA",
    website: "https://brown.example.com",
    description: "Brown & Associates provides consulting services.",
  },
]

export type User = (typeof mockUsers)[0]

// Helper function to safely compare strings
export function compareStrings(a: string | null | undefined, b: string | null | undefined): boolean {
  if (typeof a !== "string" || typeof b !== "string") {
    return false
  }
  return a > b
}

