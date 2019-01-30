module.exports = {
  /**
   * @method 通用响应方法
   * y为string时，表示为errorMessage，x、z分别表示为errorCode、data
   * y不为string时，表示接口成功，x表示为data
   */
  response: (x, y, z) =>
    typeof y !== 'string'
      ? {
          succeed: true,
          errorCode: '0000000',
          errorMessage: '',
          data: x || null
        }
      : {
          succeed: false,
          errorCode: x,
          errorMessage: y,
          data: z || null
        },

  /**
   * @method 返回通用分页对象
   * @param {Number} currPageNo 当前页
   * @param {Number} pageSize 每页条数
   * @param {Number} recordCount 总记录数
   */
  getPageInfo: (currPageNo, pageSize, recordCount = 0) => ({
    currPageNo: currPageNo,
    pageSize: pageSize,
    pageCount: Math.ceil(recordCount / pageSize),
    recordCount: recordCount
  }),

  /**
   * @method 线程等待
   * @param {Number} timeountMS 毫秒
   */
  sleep: timeountMS =>
    new Promise(resolve => {
      setTimeout(resolve, timeountMS);
    })
};
