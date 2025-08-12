import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { FC } from "react"

export interface PaginationState {
    page: number
    limit: number
    total: number
    totalPages: number
}

interface CustomPaginationProps {
    pagination: PaginationState;
    onPageChange: (page: number) => void
}

const CustomPagination: FC<CustomPaginationProps> = ({ pagination, onPageChange }) => {
    const generatePageNumbers = () => {
        const pages = []
        const { page, totalPages } = pagination

        // Always show first page
        if (totalPages > 0) pages.push(1)

        // Show pages around current page
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
            if (!pages.includes(i)) pages.push(i)
        }

        // Always show last page
        if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                        Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="text-gray-600 hover:bg-gray-100"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                    </Button>

                    {generatePageNumbers().map((pageNum, index, array) => (
                        <div key={pageNum} className="flex items-center">
                            {index > 0 && array[index - 1] !== pageNum - 1 && <span className="px-2 text-gray-400">...</span>}
                            <Button
                                size="sm"
                                variant={pagination.page === pageNum ? "default" : "outline"}
                                onClick={() => onPageChange(pageNum)}
                                className={
                                    pagination.page === pageNum
                                        ? "bg-primary text-white hover:primary-700"
                                        : "text-gray-600 hover:bg-gray-100"
                                }
                            >
                                {pageNum}
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        className="text-gray-600 hover:bg-gray-100"
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CustomPagination