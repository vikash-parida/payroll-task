const paginationWithFromToAndSort = (searchParameter, fromParameter, toParameter, sortParamater, orderByParamater) => {
    let search = (typeof searchParameter == "undefined" ) ? "" : searchParameter;
    let from = (typeof fromParameter == "undefined" ) ? 1 : fromParameter;
    let to = (typeof toParameter == "undefined") ? 1000 : toParameter;
    let sort = (typeof sortParamater == "undefined") ? "updatedAt" : sortParamater
    let orderby = (typeof orderByParamater == "undefined") ? "DESC" : orderByParamater
  
    let pageSize = Number((to - from) + 1);
    let offset = Number(from - 1);
  
    return { search, offset, pageSize, sort, orderby };
  }

  module.exports = {
    paginationWithFromToAndSort:paginationWithFromToAndSort
  }