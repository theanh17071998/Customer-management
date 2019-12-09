class Base {
    constructor() {
        this.SetStatusButton();
    }
    getData() {
        var fakeData = [];
       
        $.ajax({
            method: "GET",
            url: '/refs',
            async: false,
            success: function (res) {
                if (res.Success) {
                    fakeData = res.Data;
                }
                else {
                    alert(res.Message);
                }
            },

        });
      
        return fakeData;
      
    }


    loadData() {
        var data = this.getData();
       
        var fields = $('.main-table th[fieldName]');
        $('.main-table tbody').empty();
        $.each(data, function (index, item) {
          
            var rowHTML = $('<tr></tr>').data("recordID", item["RefID"]);
          
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var value = item[fieldName];
                var cls = "text-left";

                if (fieldName === "RefBirthday") {
                    /**
                     * Chuyển value từ dạng String sang date
                     * Người tao: Nguyễn Thế Anh
                     * Ngày tạo: 29/07/2019
                     * */

                    var parts = value.slice(0, 10).split('-');
                    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
                    value = mydate;
                    // value = new Date();
                }

                var type = $.type(value);
                switch (type) {
                    case "date": value = value.formatddMMyyyy();
                        cls = "text-center";
                        break;
                    case "number": value = value.formatMoney();
                        cls = "text-right";
                        break;
                }
                if (fieldName) {
                    rowHTML.append('<td  class= "{1}">{0}</td>'.format(value, cls));

                }
                else {
                    rowHTML.append('<td id="check" check="no" class = "uncheck"></td>');
                }
            });
            $('.main-table tbody').append(rowHTML);
        });
    }
    SetStatusButton() {
        var sizeTable = $(".main-table tbody tr").length;
        $('.toolbar-item button.delete').prop("disabled", true);

        if (sizeTable == 0) {
            // $('.toolbar-item button').attr('style', 'opacity:0.5');
            $('.toolbar-item button.delete').prop("disabled", true);
        }
    }

}