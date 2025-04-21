export const generateRes = (
  data: any
) => {

  if (!data || data.length == 0) null;

  if (data && (!(data.length > 0))) return data;

};

export const generateResForPagination = (
  data: any,
  count?: number,
  page?: number,
  limit?: number,
  others?: any,
) => {
  delete others?.total

  return {
    currentPage: page,
    count,
    totalPage: count && limit ? Math.ceil(count / limit) : 0,
    others,
    data,
  };
}
