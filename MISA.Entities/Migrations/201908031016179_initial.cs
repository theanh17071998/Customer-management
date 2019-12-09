namespace MISA.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Refs",
                c => new
                    {
                        RefID = c.Guid(nullable: false, defaultValueSql: "newid()", identity:true),
                        CustomerID = c.String(nullable:false),
                        CustomerName = c.String(nullable:false),
                        PhoneNumber = c.String(nullable: false),
                        RefBirthday = c.String(),
                        GroupCustomers = c.String(),
                        Notes = c.String(),
                        Status = c.String(),
                        Address = c.String(),
                        Email = c.String(),
                        CardMemberID = c.String(),
                        CardLevel = c.String(),
                        PassportID = c.String(),
                        CompanyName = c.String(),
                        TaxID = c.String(),
                    })
                .PrimaryKey(t => t.RefID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Refs");
        }
    }
}
