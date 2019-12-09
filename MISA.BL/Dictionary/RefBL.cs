using MISA.DL;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL
{
    public class RefBL
    {
        private RefDL _refDL = new RefDL();
        /// <summary>
        /// Chức năng hàm: Phân trang trong Entity Framework
        /// Người tạo: Nguyễn Thế Anh 05/08/2019
        /// </summary>
        /// <returns>Danh sách khách phân theo kích thước trang</returns>
        public IEnumerable<Ref> GetPagingData(int _pageIndex, int _pageSize)
        {
            return _refDL.GetData().OrderBy(p => p.CustomerID)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
        }
        public IEnumerable<Ref> FilterData(int _searchType, string _searchValue)
        {
            var _refs = _refDL.GetData();
            switch (_searchType)
            {
                case 1:
                    _refs = _refs.Where(p => p.CustomerID.Contains(_searchValue));
                    break;
                case 2:
                    _refs = _refs.Where(p => p.CustomerName.Contains(_searchValue));
                    break;

                case 3:
                    _refs = _refs.Where(p => p.PhoneNumber.Contains(_searchValue));
                    break;
                case 4:
                    _refs = _refs.Where(p => p.RefBirthday.Contains(_searchValue));
                    break;
                case 5:
                    _refs = _refs.Where(p => p.GroupCustomers.Contains(_searchValue));
                    break;
                case 6:
                    _refs = _refs.Where(p => p.Notes.Contains(_searchValue));
                    break;
                case 7:
                    _refs = _refs.Where(p => p.Status.Contains(_searchValue));
                    break;
            }
            return _refs;
        }
    }
}
