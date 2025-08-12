export const generateRes = (
  data: any
) => {

  if (!data || data.length == 0) null;

  if (data && (!(data.length > 0))) return data;

};

export const generateResForPagination = (
  data: any,
  totalItems?: number,
  page?: number,
  limit?: number,
  others?: any,
) => {
  delete others?.total

  return {
    currentPage: page,
    totalItems,
    itemsPerPage: limit,
    totalPages: totalItems && limit ? Math.ceil(totalItems / limit) : 0,
    others,
    data,
  };
}
