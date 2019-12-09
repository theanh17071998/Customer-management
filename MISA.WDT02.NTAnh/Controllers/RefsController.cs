using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using MISA.BL;
using MISA.DL;
using MISA.Entities;
using MISA.WDT02.NTANH.Properties;
using MISACustomer.Entities;

namespace MISA.WDT02.NTANH.Controllers
{
    public class RefsController : ApiController
    {
        private RefDL _refDL = new RefDL();
        private RefBL _refBL = new RefBL();
        /// <summary>
        /// Thực hiện lấy danh sách danh sách khách hàng theo số trang
        /// Người tạo: Nguyễn Thế Anh
        /// Ngày tạo:  02/08/2019
        /// </summary>
        /// <returns>Danh sách Khách hàng</returns>

        [Route("refs/{pageIndex}/{pageSize}")]
        [HttpGet]
        public async Task<AjaxResult> GetRefs([FromUri] int pageIndex, int pageSize)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _refBL.GetPagingData(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.errorVN;
            }
            return ajaxResult;
        }

        /// <summary>
        /// Thực hiên lấy tất cả danh sách khách hàng có trong data
        /// </summary>
        /// <returns>danh sách khách hàng</returns>
        // GET: api/Refs 
        [Route("refs")]
        [HttpGet]

        public AjaxResult GetRefs()
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _refDL.GetData();
            }
            catch (Exception e)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = e;
            }
            return _ajaxResult;
        }
        /// <summary>
        /// Thhực hiện thêm mới 1 khách hàng
        /// Người tạo: Nguyễn Thế Anh
        /// Ngày tạo: 02/08/2019
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>

        [Route("refs/filtering/{searchType}/{searchValue}")]
        [HttpGet]
        public AjaxResult FilterRefs([FromUri] int searchType, string searchValue)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _refBL.FilterData(searchType, searchValue);

            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

     


        // POST: api/Refs
        [Route("refs")]
        [HttpPost]
        public AjaxResult Post([FromBody]Ref _ref)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _refDL.AddRef(_ref);

            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Thực hiện xóa một hay nhiều khách hàng
        /// Người tạo:Nguyễn Thế Anh
        /// Ngày tạo: 02/08/2019
        /// </summary>
        /// <returns>Danh sách Khách hàng</returns>

        [Route("refs")]
        [HttpDelete]
        public AjaxResult DeleteMutiple([FromBody] List<Guid> refids)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _refDL.DeleteMutiple(refids);

            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }
        /// <summary>
        /// Thực hiện  việc sửa thông tin một khách hàng
        /// Người tạo:Nguyễn Thế Anh
        /// Ngày tạo: 02/08/2019
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        [Route("refs")]
        [HttpPut]
        public AjaxResult Put([FromBody] Ref _ref)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _refDL.Put(_ref);

            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }
    }
}
    