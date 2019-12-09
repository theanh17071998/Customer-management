using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISACustomer.Entities
{
   
        public class Ref
        {
            public Guid RefID { get; set; }
            public string CustomerID { get; set; }
            public string CustomerName { get; set; }
            public string PhoneNumber { get; set; }
            public DateTime RefBirthday { get; set; }
            public string GroupCustomers { get; set; }
            public string Notes { get; set; }
            public string Status { get; set; }
            public string Address { get; set; }
            public string Email { get; set; }
            public string CardMemberID { get; set; }
            public string CardLevel { get; set; }
            public string PassportID { get; set; }
            public string CompanyName { get; set; }
            public string TaxID { get; set; }


        
    

    }
}
