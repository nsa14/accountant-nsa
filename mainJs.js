(function (document, window, $) {
    'use strict';

    var Site = window.Site;
    $(document).ready(function () {
        Site.run();


        let loadData = fetchAllGroupAccount();
        // console.log(loadData);
        $('#main_data').html(loadData);

        var defaults = $.components.getDefaults("dataTable");

        var t = $('#exampleTableAdd').DataTable(defaults);
    });

    $('.observer-example').persianDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
        altField: '.observer-example-alt',
        autoClose: true
    });

    function fetchAllGroupAccount() {
        let groupLocalStorage = localStorage.getItem('account_name')||[];
        // alert(groupLocalStorage);
        if (groupLocalStorage.length<=0){
            alertify('گروهی برای نمایش رویداد یافت نشد', 'danger');
            return false;

        }
        var test = groupLocalStorage.split(",");
        let main_data_temp = [];
        // alert(test.length);
        for (var i = 0; i < test.length; i++) {
            // $.each(test, function (key, val) {
            // alert(key + val);
            // alert(test[i]);
            var sumMoney = parseInt(calculateFinalMoneyGroup(test[i]));
            // console.log('aaaa' + sumMoney);
            let _data = '<div class="col-sm-12 item_account" data-item_name="' + test[i] + '">\
          <!-- Widget -->\
          <div class="widget">\
            <div class="widget-content padding-30 bg-blue-600">\
              <div class="widget-watermark darker font-size-60 margin-15"><i class="icon wb-clipboard" aria-hidden="true"></i></div>\
              <div class="counter counter-md counter-inverse text-left">\
                <div class="counter-number-group">\
                  <span class="counter-number-related text-capitalize">' + test[i] + '</span><br>\
                  <span class="counter-number">\
                '+checkTaraz(sumMoney)+'\
                '+countItem(test[i])+'\
                  </span>\
                  </span>\
                </div>\
              </div>\
            </div>\
          </div>\
          <!-- End Widget -->\
        </div>';
            main_data_temp.push(_data);
            // });
        }
        return main_data_temp;
    }

    function alertify(message, type) {
        // $("#alertifyMessage").data("log-message", message);
        // $("#alertifyMessage").data("type", type);
        // $("#alertifyMessage").trigger("click");
        let mainBody = '<span class="label label-outline label-'+type+'">'+message+'</span>';
        // toastr.error(message);
        // toastr.success(message);
        bootbox.dialog({
            title: mainBody,
            message: " ",
        });
    }

    function checkTaraz(sumMoney){
        let ret = [];
        if (sumMoney>=0){
            ret.push('<span class="badge badge-success">تومان '+sumMoney.toLocaleString()+'</span>');
        }else{
            ret.push('<span class="badge badge-danger">تومان '+sumMoney.toLocaleString()+'</span>');
        }
        return ret;
    }

    function countItem(itemName){
        let ret = [];
        let localData = JSON.parse(localStorage.getItem(itemName))||[];
        // console.log(localData);
        if (localData.length>=0){
            var count = $.map(localData, function(n, i) { return i; }).length;
            ret.push('<span class="badge badge-info">تعداد:'+count+'</span>');
        }else{
            ret.push('<span class="badge badge-info">تعداد: 0</span>');
        }
        return ret;
    }




    function onChange(event) {
        // $('#imgupload').trigger('click');
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
        var fileName = $("#imgupload").val();

        if(fileName) { // returns true if the string is not empty
            // alert(fileName + " was selected");
            restoreBackup(event.target.result);
        } else { // no file was selected
            alertify('فایلی انتخاب نشده است', 'success');
        }
        // console.log(event.target.result);
        // var obj = JSON.parse(event.target.result);
        // console.log(obj);
    }




    $(document).on('click', '.btn_restpre_backup', function () {
        $('#imgupload').trigger('click');
        document.getElementById('imgupload').addEventListener('change', onChange);

    });



    $(document).on('click', '#show_list_item', function () {
        let txt_group_name = $('#txt_group_name').val();
        let loadLocal = JSON.parse(localStorage.getItem(txt_group_name))||[];

        let final = [];

        jQuery.each(loadLocal, function(index, item) {
            // do something with `item` (or `this` is also `item` if you like)
            let _row = '<tr>\n' +
                '                            <td>'+item.title+'</td>\n' +
                '                            <td>'+item.money.toLocaleString()+'</td>\n' +
                '                            <td>'+item.date+'</td>\n' +
                '                            <td>'+showTypeSpan(item.type)+'</td>\n' +
                '                            <td></td>\n' +
                '                        </tr>';
            final.push(_row);
        });

        // console.log(final);

        $('#showGroupTitle').html(' گروه انتخابی : '+txt_group_name);
        $('#showItem').html(final);
        $('#exampleNiftyFadeScaleShowListItem').modal({
            show: 'true'
        });
    });

    function showTypeSpan(type){
        let ret = [];
        if (type === 'add'){
            ret.push('<span class="badge badge-success">+</span>');
        }else{
            ret.push('<span class="badge badge-danger">-</span>');
        }
        return ret;
    }


    $(document).on('click', '.btn_backup', function () {

        let finalBck = [];
        // iterate localStorage
        for (let i = 0; i < localStorage.length; i++) {

            // set iteration key name
            const key = localStorage.key(i);

            // use key name to retrieve the corresponding value
            const value = localStorage.getItem(key);

            // console.log the iteration key and value
            finalBck.push({'KeyName': key , 'KeyValue':  value});
            // finalBck.push([key , value]);
            // console.log('Key: ' + key + ', Value: ' + value);

        }

        console.log(finalBck);
        // return false;
        DownloadJSON(finalBck);
        // return values;
    });

    function DownloadJSON(...finalbck) {
        //Build a JSON array containing Customer records.
        // var customers = new Array();
        // customers.push(["Customer Id", "Name", "Country"]);

        //Convert JSON Array to string.
        var json = JSON.stringify(finalbck);

        //Convert JSON string to BLOB.
        json = [json];
        var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

        //Check the Browser.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob1, "Customers.txt");
        } else {
            var url = window.URL || window.webkitURL;
            var link = url.createObjectURL(blob1);
            var a = $("<a />");
            var currentdate  = new Date();
            let fileDateSave = (currentdate.getDate()+ "-" + (currentdate.getMonth()+1)  + "-"+currentdate.getFullYear());
            // return false;
            a.attr("download", "nsa-"+fileDateSave+".json");
            a.attr("href", link);
            $("body").append(a);
            a[0].click();
            $("body").remove(a);
        }
    }


    function restoreBackup(fileName){
        // let bck = '[[{"KeyName":"ssss","KeyValue":"[{\\"id\\":9,\\"money\\":\\"500\\",\\"title\\":\\"minus 500\\",\\"date\\":\\"55\\",\\"type\\":\\"add\\"},{\\"id\\":7,\\"money\\":\\"500\\",\\"title\\":\\"minus 500\\",\\"date\\":\\"55\\",\\"type\\":\\"add\\"},{\\"id\\":5,\\"money\\":\\"500\\",\\"title\\":\\"minus 500\\",\\"date\\":\\"55\\",\\"type\\":\\"minus\\"},{\\"id\\":3,\\"money\\":\\"3\\",\\"title\\":\\"3\\",\\"date\\":\\"3\\",\\"type\\":\\"minus\\"},{\\"id\\":1,\\"money\\":\\"33\\",\\"title\\":\\"33\\",\\"date\\":\\"33\\",\\"type\\":\\"add\\"},{\\"id\\":2,\\"money\\":\\"44\\",\\"title\\":\\"44\\",\\"date\\":\\"44\\",\\"type\\":\\"add\\"},{\\"id\\":4,\\"money\\":\\"55\\",\\"title\\":\\"55\\",\\"date\\":\\"55\\",\\"type\\":\\"add\\"},{\\"id\\":6,\\"money\\":\\"120000\\",\\"title\\":\\"500 minus\\",\\"date\\":\\"500\\",\\"type\\":\\"minus\\"},{\\"id\\":8,\\"money\\":\\"500\\",\\"title\\":\\"minus 500\\",\\"date\\":\\"55\\",\\"type\\":\\"add\\"},{\\"id\\":10,\\"money\\":\\"120000\\",\\"title\\":\\"500 minus\\",\\"date\\":\\"500\\",\\"type\\":\\"add\\"}]"},{"KeyName":"account_name","KeyValue":"ssss,qqqq,wwwww"},{"KeyName":"wwwww","KeyValue":"[{\\"id\\":2,\\"money\\":\\"2\\",\\"title\\":\\"2\\",\\"date\\":\\"2\\",\\"type\\":\\"add\\"},{\\"id\\":1,\\"money\\":\\"22\\",\\"title\\":\\"22\\",\\"date\\":\\"22\\",\\"type\\":\\"add\\"},{\\"id\\":3,\\"money\\":\\"2\\",\\"title\\":\\"2\\",\\"date\\":\\"2\\",\\"type\\":\\"add\\"}]"}]]';
        let sArray = JSON.parse(fileName);

        $.each(sArray, function(i) {
            $.each(sArray[i], function(key, value) {
                // console.log(value.KeyName);
                // console.log(value.KeyValue);
                localStorage.setItem(value.KeyName, value.KeyValue);
            });
        });
        alertify('اطلاعات با موفقیت بازیابی شد', 'success');

    }

    $(document).on('click', '.item_account', function () {
        let item_name = $(this).data("item_name");
        $('#txt_group_name').val(item_name);
        $(".btn_add_pay").trigger("click");
        // alert(item_name);
    });

    // save1
    $(document).on('click', '#btn_save1', function () {

        // alertify();
        // alert('111');
        // return false;

        if (!localStorage.hasOwnProperty('account_name')) {
            localStorage.setItem("account_name", '');
        }


        let txt_account_name = $('#txt_account_name').val();
        if (txt_account_name.length ==0){
            alertify('فیلد ها رو وارد نمایید', 'danger');
            return false;
        }
        var newdata = {
            name: txt_account_name,
        };
        //   if (!localStorage.hasOwnProperty(txt_account_name)) {
        //     localStorage.setItem("account_name",'');
        //     alert('successfully');
        // }else{
        // const olddata = JSON.parse(localStorage.getItem("account_name"));
        var a = [];
        let count = localStorage.getItem('account_name');

        if (count) {   // checks if count is null, undefined, 0, false, NaN
            console.log('poooooor hast');
            a.push((localStorage.getItem('account_name')));
            // a.push(txt_account_name);
        } else {
            // console.log('null hast');
        }
        a.push(txt_account_name);
        localStorage.setItem('account_name', (a));


        // alert('has existed this name');
        // }

        // alert(localStorage.getItem('account_name'));

        $('#txt_account_name').val('');

        alertify('با موفقیت ثبت شد', 'success');

    });


    // btn_minus
    $(document).on('click', '#btn_minus', function () {

        let txt_group_name = $('#txt_group_name').val();
        let txt_money = $('#txt_money').val();
        let txt_title = $('#txt_title').val();
        let txt_date = $('#txt_date').val();


        const oldInfo = JSON.parse(localStorage.getItem(txt_group_name) || '[]');

        if (oldInfo.length > 0) {
            var lastElementId = oldInfo.reverse()[0].id + 1;
        } else {
            var lastElementId = 1;
        }

        const newArray = {
            id: lastElementId,
            money: txt_money,
            title: txt_title,
            date: txt_date,
            type: 'minus'
        };

        oldInfo.push(newArray);
        localStorage.setItem(txt_group_name, JSON.stringify(oldInfo));
        alertify('با موفقیت ثبت شد', 'success');
         $('#txt_money').val('');
         $('#txt_title').val('');
        $('#txt_date').val('');
        setTimeout(function() {
            location.reload();
        }, 5000);

    });

    // btn_add
    $(document).on('click', '#btn_add', function () {

        let txt_group_name = $('#txt_group_name').val();
        let txt_money = $('#txt_money').val();
        let txt_title = $('#txt_title').val();
        let txt_date = $('#txt_date').val();


        const oldInfo = JSON.parse(localStorage.getItem(txt_group_name) || '[]');

        if (oldInfo.length > 0) {
            var lastElementId = oldInfo.reverse()[0].id + 1;
        } else {
            var lastElementId = 1;
        }

        // console.log(lastElementId); //845
        // return false;

        // var lastElement = oldInfo.at(-1).id || 1;
// alert(lastElement);
        const newArray = {
            id: lastElementId,
            money: txt_money,
            title: txt_title,
            date: txt_date,
            type: 'add'
        };

        oldInfo.push(newArray);
        localStorage.setItem(txt_group_name, JSON.stringify(oldInfo));
        // console.log(oldInfo.reverse()[0].id); //845
        alertify('با موفقیت ثبت شد', 'success');

        $('#txt_money').val('');
        $('#txt_title').val('');
        $('#txt_date').val('');

        setTimeout(function() {
            location.reload();
        }, 5000);

    });


    function calculateFinalMoneyGroup(groupArraySelected) {
        if (!localStorage.hasOwnProperty(groupArraySelected)) {
            return 0;
        }

        let final112 = JSON.parse(localStorage.getItem(groupArraySelected));
//         let final112 = JSON.parse(groupArraySelected);
        var subAdd = [];
        var subMinus = [];
        // var item = final112.find(item => item.type === 'add');
        var result_add = $.grep(final112, function (e) {
            return e.type == 'add';
        });
        $.each(result_add, function (key, value) {
            subAdd.push(parseInt(value.money));
        });
        var result_minus = $.grep(final112, function (e) {
            return e.type == 'minus';
        });
        $.each(result_minus, function (key, value) {
            subMinus.push(parseInt(value.money));
        });


        // var ArrayOfInts = subAdd.map(Number); //Output: [1,2,3]
        let sumAddFinal = subAdd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        let sumMinusFinal = subMinus.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        // console.log(subMinus);
        return (parseFloat(sumAddFinal) - parseFloat(sumMinusFinal));
        // return false;
    }


    // let final11 = JSON.parse(localStorage.getItem('ssss'));
    // $.each(final11, function(key, value){
    //     console.log("key", key);
    //     console.log("value", value.money);
    // });
    // // return false;



    // $('#alertifyMessage').trigger("click");


})(document, window, jQuery);