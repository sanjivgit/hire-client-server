interface AcceptedServicesStatsResponse {
    totalPending: number;
    totalCompleted: number;
    totalCancelled: number;
}

class AcceptedServicesStatsDto {
    public totalPending: number;
    public totalCompleted: number;
    public totalCancelled: number;

    constructor(stats: AcceptedServicesStatsResponse) {
        this.totalPending = stats.totalPending;
        this.totalCompleted = stats.totalCompleted;
        this.totalCancelled = stats.totalCancelled;
    }
}

export default AcceptedServicesStatsDto; 