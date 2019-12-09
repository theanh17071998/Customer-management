
$(document).ready(function () {
  
    $('#dialog input.noti-border').blur(function () {
        var value = this.value;
        
        if (!value) {
           
            $(this).addClass('border-red');
            $(".noti").attr("style", "display:inline");
        }
        else {
            $(this).removeClass('border-red');
            $(".noti").attr("style", "display:none");
        }
    });
})


class Ref extends Base {
    constructor() {

        super();
        this.DatePicker();
        this.loadData();
       
        this.InitEvent();
        this.CheckAll();
      
       
    }

    /**Chức năng hàm: Khi bỏ chọn thì các nút edit, duplicate, delete sẽ bị làm mờ
     * Người tạo: Nguyễn Thế Anh
     * Ngày tạo: 03/08/2019
     * */
    SetStatusButtonToolbar() {
        var size = $(".main-table tbody tr.row-selected").length;
        if (size == 0) {
            
            $('.grid-master .toolbar button.edit').prop("disabled", true);
            $('.grid-master .toolbar button.duplicate').prop("disabled", true);
            $('.grid-master .toolbar button.delete').prop("disabled", true);
        }
    }
    /**
     * Chức năng hàm: Lấy ngày tự động
     * Người tạo: NTAnh
     * Ngày tạo: 03/08/2019
     *
     */

    DatePicker() {
        $(function () {
            $("#datepicker-add-customer").datepicker({
                dateFormat: 'dd/mm/yy',
                showOn: "button",
                buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
                buttonImageOnly: true,
            });
        });
        $(function () {
            $("#datepicker-edit-customer").datepicker({
                dateFormat: 'dd/mm/yy',
                showOn: "button",
                buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
                buttonImageOnly: true,
            });
        });
    }


    /**
    * Chức năng hàm: check tất cả phần tử có trong table
    * Người tạo: NTAnh
    * Ngày tạo: 03/08/2019
    *
    */
    CheckAll() {
        $('.main-table thead').on('click', '#check-all', function () {

            if ($(this).attr("check-all") == "no") {

                $(this).removeClass('uncheck-all');
                $(this).addClass('check-all');
                $(this).attr("check-all", "yes")
                $(".main-table tbody #check").attr("check", "yes")
                $(".main-table tbody #check").addClass('check');
                $(".main-table tbody #check").parent().addClass('row-selected');
                $('button.delete').prop('disabled', false);



            }
            else {
                $(this).removeClass('check-all');
                $(this).addClass('uncheck-all');
                $(this).attr("check-all", "no")
                $(".main-table tbody #check").attr("check", "no")
                $(".main-table tbody #check").removeClass('check');
                $(".main-table tbody #check").parent().removeClass('row-selected');
                $('button.view').prop('disabled', true);
                $('button.edit').prop('disabled', true);
                $('button.delete').prop('disabled', true);

            }

        });
    }

    /**
    * Chức năng hàm: check từng phần tử trong bảng, có thể check nhiều phần tử
    * Người tạo: NTAnh
    * Ngày tạo: 03/08/2019
    *
    */
    Check() {

        if ($(this).attr("check") == "no") {
            $(this).removeClass('uncheck');
            $(this).addClass('check');
            $(this).parent().addClass('row-selected');
            $(this).attr("check", "yes")
        }
        else {
            $(this).removeClass('check');
            $(this).addClass('uncheck');
            $(".main-table thead #check-all").addClass('uncheck-all');
            $(this).parent().removeClass('row-selected');
            $(this).attr("check", "no");
        }
    }
    /**
    * Chức năng hàm: Hàm thực hiện tất cả các hàm con trong file
    * Người tạo: NTAnh
    * Ngày tạo: 03/08/2019
    *
    */
    InitEvent() {
        $('.main-table tbody').on('click', 'tr', this.RowOnClick);
        $('.main-table tbody').on('click', '#check', this.Check);
        $('.toolbar').on('click', 'button.delete', this.ClickButtonDelete.bind(this));
        $('.toolbar').on('click', 'button.add-new', this.OpenDialogAdd);
        $('.toolbar').on('click', 'button.edit', this.OpenDialogEdit);
        $('.toolbar').on('click', 'button.duplicate', this.OpenDialogDuplicate);
        $('#dialog').on('click', 'button.right-save', this.AddNewRef.bind(this));
        $('#dialog').on('click', 'button.right-cancel', this.ClickButtonCancelAdd);
        $('#dialog').on('click', 'button.right-saveadd', this.OpenDialogSaveAdd);
        $('#dialog-edit').on('click', 'button.right-cancel', this.ClickButtonCancelEdit);
        $('#dialog-edit').on('click', 'button.right-save', this.EditRef.bind(this));
        $('#dialog-duplicate').on('click', 'button.right-cancel', this.ClickButtonCancelDuplicate);
        $('#dialog-duplicate').on('click', 'button.right-save', this.OpenDialogDuplicate.bind(this));
        $('.toolbar').on('click', 'button.view', this.OpenDialogView);
        $('.all-dialog .customer').on('click', 'button.search-cus', this.OpenDialogAddGroup);
         
    }
   
    /**
     * Hàm thực hiện thêm mới một thông tin khách hàng
     * Người tạo: Nguyễn Thế Anh 
     * Ngày tạo: 02/08/2019
     * */

    AddNewRef() {
        var me = this;
        var listInput = $('#dialog [property]');
        var object = {};
        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val();
            object[propertyName] = value;
        });
        object["Status"] = "Đang theo dõi";
        $.ajax({
            method: "POST",
            url: "/refs",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(object),
            success: function (res) {
                if (res.Success) {
                    $('#dialog').dialog('close')
                    me.loadData();
                }
                else {
                    alert(res.Message);
                }
            }
        });
    }
    /**
     * Hàm thực hiện xóa một hay nhều thông tin khách hàng
     * Người tạo: Nguyễn Thế Anh
     * Ngày tạo:02/08/2019
     * */

    ClickButtonDelete() {
        var me = this;
        var listRefID = [];
        var listRow = $('.row-selected');
      
        $.each(listRow, function (index, item) {
            var refid = $(item).data("recordID");
            listRefID.push(refid);   
        });
        $.ajax({
            method: "DELETE",
            url: '/refs',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(listRefID),
            success: function (res) {
                if (res.Success) {
                    me.loadData();
                    me.SetStatusButton();
                }
                else {
                    alert(res.Message);
                }
            },      
        });
    }

    /**
     * Hàm thực hiện sửa phiếu thu
     * Người tạo: Nguyễn Thế Anh
     * Ngày tạo: 30/07/2019
     * */
    EditRef() {
        var me = this;
        var listInput = $('#dialog-edit [property]');
        var object = {};
        $.each(listInput, function (index, item) {
           var propertyName = item.getAttribute('property');
            var value = $(this).val();
            object[propertyName] = value;
        });
        object["Status"] = "Đang theo dõi";
        object['refID'] = $('.row-selected').data('recordID');
        $.ajax({
            method: "PUT",
            url: "/refs",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(object),
            success: function (res) {
                if (res.Success) {
                    $('#dialog-edit').dialog('close')
                    me.loadData();
                }
                else {
                    alert(res.Message);
                }
            }
        });
    }

    /**
    * Hàm thực hiện sửa phiếu thu
    * Người tạo: Nguyễn Thế Anh
    * Ngày tạo: 30/07/2019
    * */
    DuplicateRef() {
        var me = this;
        var listInput = $('#dialog [property]');
        var object = {};
        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val();
            object[propertyName] = value;
        });
        object["Status"] = "Đang theo dõi";
        $.ajax({
            method: "POST",
            url: "/refs",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(object),
            success: function (res) {
                if (res.Success) {
                    $('#dialog').dialog('close')
                    me.loadData();        
                    me.OpenDialogAdd();

                }
                else {
                    alert(res.Message);
                }
            }
        });
    }
    /**
    * Hàm thực hiện đóng dialog thêm khách hàng khi thực hiện xong quá trình thêm mới.
    * Người tạo: Nguyễn Thế Anh
    * Ngày tạo: 30/07/2019
    * */
/**
* hàm thực hiện mở dialog nhân bản
* Người tạo: Nguyễn Thế Anh
* Ngày tao : 26/07/2019
* */

    OpenDialogDuplicate() {
        var x = $('.row-selected')
        var CustomerID = x.find("td:eq(1)").text();
        $('input[property="CustomerID"]').val(CustomerID);
        var CustomerName = x.find("td:eq(2)").text();
        $('input[property="CustomerName"]').val(CustomerName);
        var PhoneNumber = x.find("td:eq(3)").text();
        $('input[property="PhoneNumber"]').val(PhoneNumber);
        var RefBirthday = x.find("td:eq(4)").text();
        var parts = RefBirthday.split('/');
        var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
        RefBirthday = mydate.formatddMMyyyy();
        $('input[property="RefBirthday"]').val(RefBirthday);
        var GroupCustomers = x.find("td:eq(5)").text();
        $('input[property="GroupCustomers"]').val(GroupCustomers);
        var Notes = x.find("td:eq(6)").text();
        $('textarea[property="Notes"]').val(Notes);
        var Status = x.find("td:eq(7)").text();
        $('input[property="Status"]').val(Status);

        $('#dialog').dialog({
            modal: true, // làm mờ background và ko cho chọn ngoài dialog
            height: 595,
            width: 800,
        });
    }

/**
  * Hàm thực hiện đóng dialog thêm khách hàng khi thực hiện xong quá trình thêm mới.
  * Người tạo: Nguyễn Thế Anh
  * Ngày tạo: 30/07/2019
  * */
    ClickButtonCancelAdd() {
        $('#dialog').dialog('close');
    }

    /**
    * Hàm thực hiện đóng dialog khi thực hiện xong quá trình sửa
    * Người tạo: Nguyễn Thế Anh
    * Ngày tạo: 30/07/2019
    * */
    ClickButtonCancelEdit() {
        $('#dialog-edit').dialog('close');
    }

/**
* Hàm thực hiện đóng dialog khi thực hiện xong quá nhân bản
* Người tạo: Nguyễn Thế Anh
* Ngày tạo: 30/07/2019
* */
    ClickButtonCancelDuplicate() {
        $('#dialog-duplicate').dialog('close');
    }

    /**
     * hàm thực hiện mở dialog thêm mới phiếu thu, chi
     * Người tạo: Nguyễn Thế Anh
     * Ngày tao : 26/07/2019
     * */
    OpenDialogAdd() {

        $('#dialog').dialog({
            modal: true, // làm mờ background và ko cho chọn ngoài dialog
            height: 595,
            width: 800,
        });
        $('input').val('');
        $('textarea').val('');

    }

    /**
     * Hàm thực hiện mở dialog thêm mới group khách hàng
     * Người tạo: Nguyễn Thế Anh
     * Ngày tạo: 02/08/2019
     * */
    OpenDialogAddGroup() {
        $('#dialog-Add-Group').dialog({
            modal: true,
            height: 375,
            width: 500,
        });
    }

    /**
     * Hàm thực hiện đẩy dữ liệu vào thẻ input trong dialog-edit, mở dialog sửa phiếu thu
     * Người tạo:  Nguyễn Thế Anh
     * Ngày tạo: 29/07/2019
     * 
     * * */
    OpenDialogEdit() {
        var x = $('.row-selected')      
        //var parts = _refDate.split('/');
        //var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
        //_refDate = mydate.formatddMMyyyy();
         //var parts_total = _total.split('.');
        //var temp = '';
        //for (var i = 0; i < parts_total.length; i++) {
        //    temp += parts_total[i];
        //}
        //_total = temp;
        var CustomerID = x.find("td:eq(1)").text();
        $('input[property="CustomerID"]').val(CustomerID);
        var CustomerName = x.find("td:eq(2)").text();
        $('input[property="CustomerName"]').val(CustomerName);
        var PhoneNumber = x.find("td:eq(3)").text();
        $('input[property="PhoneNumber"]').val(PhoneNumber);
        var RefBirthday = x.find("td:eq(4)").text(); 
        var parts = RefBirthday.split('/');
        var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
        RefBirthday = mydate.formatddMMyyyy();
        $('input[property="RefBirthday"]').val(RefBirthday);
        var GroupCustomers = x.find("td:eq(5)").text();
        $('input[property="GroupCustomers"]').val(GroupCustomers);
        var Notes = x.find("td:eq(6)").text();
        $('textarea[property="Notes"]').val(Notes);
        var Status = x.find("td:eq(7)").text();
        $('input[property="Status"]').val(Status);

        $('#dialog-edit').dialog({
            modal: true, // làm mờ background và ko cho chọn ngoài dialog
            height: 595,
            width: 800,
        });
    }

    /**
    * Hàm thực hiện mở dialog lưu và thêm mới.
    * Chi tiết: dữ liệu khách hàng đã được lưu lại và dialog vẫn mở.
    * Người tạo:  Nguyễn Thế Anh
    * Ngày tạo: 02/08/2019
    *
    * * */
    OpenDialogSaveAdd() {
        var me = this;
        var listInput = $('#dialog [property]');
        var object = {};
        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val();
            object[propertyName] = value;
        });
        object["Status"] = "Đang theo dõi";
        $.ajax({
            method: "POST",
            url: "/refs",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(object),
            success: function (res) {
                if (res.Success) { 
                    $('#dialog').dialog('close');
                    me.loadData();
                    me.OpenDialogAdd(); 
                }
                else {
                    alert(res.Message);
                }
              
            }
        });
    }


    /**Chức năng hàm: Set trạng thái hiển thị của các nút trong toolbar
     * Người tạo: Nguyễn Thế Anh
     * Ngày tạo: 31/07/2019
     * */
    RowOnClick() {

        //$('.main-table tbody tr').removeClass("row-selected");
        //$(this).addClass("row-selected");

        var size = $(".main-table tbody tr.row-selected").length;
        if (size > 1) {
            $('.grid-master .toolbar button.view').prop("disabled", true);
            $('.grid-master .toolbar button.edit').prop("disabled", true);
            $('.grid-master .toolbar button.duplicate').prop("disabled", true);
        }
        if (size == 1) {
            $('.grid-master .toolbar button.view').prop("disabled", false);
            $('.grid-master .toolbar button.edit').prop("disabled", false);
            $('.grid-master .toolbar button.duplicate').prop("disabled", false);
            $('.grid-master .toolbar button.delete').prop("disabled", false);
        }
        if (size == 0) {
            $('.grid-master .toolbar button.view').prop("disabled", true);
            $('.grid-master .toolbar button.edit').prop("disabled", true);
            $('.grid-master .toolbar button.duplicate').prop("disabled", true);
            $('.grid-master .toolbar button.delete').prop("disabled", true);
        }
       

    }
    loadData() {
        super.loadData();
    }
}

var ref = new Ref();