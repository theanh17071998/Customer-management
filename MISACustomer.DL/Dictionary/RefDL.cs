using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISACustomer.Entities;

namespace MISA.DL
{
    public class RefDL
    {
        private MISAWDT02NTAnhContext db = new MISAWDT02NTAnhContext();
        public IEnumerable<Ref> GetData()
        {
            return db.Refs;
        }
        // Hàm thực hiện thêm mới một thông tin khách hàng.
        // Người tạo: Nguyễn Thế Anh 02/08/2019
        public void AddRef(Ref _ref)
        {

            _ref.RefID = Guid.NewGuid();
            db.Refs.Add(_ref);
            db.SaveChanges();
        }

        // Hàm thực hiện xóa thông tin một hay nhiều khách hàng
        // Người tạo: Nguyễn Thế Anh 02/08/2019
        public void DeleteMutiple(List<Guid> refids)
        {
            foreach (var refid in refids)
            {
                var refitem = db.Refs.Where(p => p.RefID == refid).FirstOrDefault();
                db.Refs.Remove(refitem);
            }
            db.SaveChanges();
        }


        // Hàm thực hiện sửa thông tin một khách hàng
        // Người tạo: Nguyễn Thế Anh 02/08/2019
        public void Put(Ref _ref)
        {
            var refs = db.Refs.Where(x => x.RefID == _ref.RefID).FirstOrDefault();
            refs.CustomerID = _ref.CustomerID;
            refs.CustomerName = _ref.CustomerName;
            refs.PhoneNumber = _ref.PhoneNumber;
            refs.RefBirthday = _ref.RefBirthday;
            refs.GroupCustomers = _ref.GroupCustomers;
            refs.Notes = _ref.Notes;
            refs.Status = _ref.Status;
            db.SaveChanges();

        }
    }
}
