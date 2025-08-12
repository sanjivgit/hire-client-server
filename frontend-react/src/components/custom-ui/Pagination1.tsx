import type { FC } from "react";
import { Button } from "../ui/button"

interface PaginationProps {
    isLoading: boolean;
    setCurrentPage: (value: number) => void;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    pagination: {
        currentPage: number;
        itemsPerPage: number;
        totalPages: number;
        totalItems: number;
    }
}

const PaginationComponent: FC<PaginationProps> = ({ pagination, isLoading, handlePreviousPage, setCurrentPage, handleNextPage }) => {
    return (
        <div>
            {pagination && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} partners
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.currentPage <= 1 || isLoading}
                                onClick={handlePreviousPage}
                            >
                                Previous
                            </Button>

                            {pagination.totalPages <= 5 ? (
                                // Show all page numbers if 5 or fewer
                                [...Array(pagination.totalPages)].map((_, i) => (
                                    <Button
                                        key={i + 1}
                                        variant={pagination.currentPage === i + 1 ? "default" : "outline"}
                                        size="sm"
                                        disabled={isLoading}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </Button>
                                ))
                            ) : (
                                // Show limited page numbers with ellipsis for many pages
                                <>
                                    <Button
                                        variant={pagination.currentPage === 1 ? "default" : "outline"}
                                        size="sm"
                                        disabled={isLoading}
                                        onClick={() => setCurrentPage(1)}
                                    >
                                        1
                                    </Button>

                                    {pagination.currentPage > 3 && <span className="mx-1">...</span>}

                                    {pagination.currentPage > 2 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={isLoading}
                                            onClick={() => setCurrentPage(pagination.currentPage - 1)}
                                        >
                                            {pagination.currentPage - 1}
                                        </Button>
                                    )}

                                    {pagination.currentPage !== 1 && pagination.currentPage !== pagination.totalPages && (
                                        <Button
                                            variant="default"
                                            size="sm"
                                            disabled={isLoading}
                                        >
                                            {pagination.currentPage}
                                        </Button>
                                    )}

                                    {pagination.currentPage < pagination.totalPages - 1 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={isLoading}
                                            onClick={() => setCurrentPage(pagination.currentPage + 1)}
                                        >
                                            {pagination.currentPage + 1}
                                        </Button>
                                    )}

                                    {pagination.currentPage < pagination.totalPages - 2 && <span className="mx-1">...</span>}

                                    <Button
                                        variant={pagination.currentPage === pagination.totalPages ? "default" : "outline"}
                                        size="sm"
                                        disabled={isLoading}
                                        onClick={() => setCurrentPage(pagination.totalPages)}
                                    >
                                        {pagination.totalPages}
                                    </Button>
                                </>
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.currentPage >= pagination.totalPages || isLoading}
                                onClick={handleNextPage}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaginationComponent