// (function ($) {
$(window).load(function () {
    show_account();
});
// })(jQuery);


// ---------------------------------------------


function alertify(message, type, refresh = true) {
    swal({
        title: message,
        text: "",
        html: true, // add this if you want to show HTML
        type: type // type can be error/warning/success
    });

    if (refresh) {
        setTimeout(function () {
            location.reload();
        }, 1200);
    }
}

let btn_insert_account = document.getElementById("btn_save1");
btn_insert_account.addEventListener("click", () => {
    let txt_account_name = $('#txt_account_name').val();
    // if (txt_account_name.length == 0) {
    //     alertify('فیلد ها رو وارد نمایید', 'error', false);
    //     return false;
    // }
    let currentUser = JSON.parse(localStorage.getItem("nsa_register")) || [];
    let data = {
        'switch_form': 'add_account',
        'txt_account_name': txt_account_name,
        'current_user_phone': currentUser.phone
    };
    // console.log('data send is : '+JSON.stringify(data));
    if (data.txt_account_name.length == 0) {
        alert('فیلد ها رو وارد نمایید');
        return false;
    }

    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        if (finalResult.status) {
            alertify(finalResult.message, 'success');
        } else {
            alertify(finalResult.message, 'error', false);
        }

    })()
    $('#txt_account_name').val('');

});

function show_account() {
    let userName;
    if (localStorage.getItem("nsa_register") !== null) {
        userName = JSON.parse(localStorage.getItem("nsa_register"));
        // $('#showusername').html((userName.phone));
    } else {
        return false;
    }
    let data = {
        'switch_form': 'show_account',
        'current_user_phone': userName.phone
    };
    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        if (finalResult.status) {
            console.log(finalResult.message.account_item);
            // drawListItem(finalResult.message);
        } else {
            console.log(finalResult.message);
        }

    })()
}

function countItem(dataLength) {
    let ret = [];
    if (parseInt(dataLength) >= 0) {
        ret.push('<span class="badge badge-dark"> تعداد ' + count + '</span>');
    } else {
        ret.push('<span class="badge badge-dark">تعداد: 0</span>');
    }
    return ret;
}

function drawListItem(data){
    let main_data_temp = [];
    alert(data.account_item);
    // alert(data.length);
    for (var i = 0; i < data.length; i++) {
        // var sumMoney = parseInt(calculateFinalMoneyGroup(test[i]));
        let _data = '<div class="col-sm-12 item_account animation-slide-top" data-plugin="appear"' +
            ' data-animate="slide-top" data-item_name_id="' + data[i]['id'] + '">\
          <!-- Widget -->\
          <div class="widget">\
            <div class="widget-content padding-20 bg-blue-700 border-radius">\
              <div class="widget-watermark darker font-size-60 margin-15"><i id="icon-animation" class="icon\
               wb-clipboard flip-vertical-left"\
               aria-hidden="true"></i></div>\
              <div class="counter counter-md counter-inverse text-left">\
                <div class="counter-number-group">\
                  <span class="counter-number-related text-capitalize">' + data[i]['account_name'] + '</span><br>\
                  <span class="counter-number">\
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
    $('#main_data').html(main_data_temp);
}

async function postAjax(data) {
    let results;

    await $.ajax({
        url: "database.php",
        method: "POST",
        data: data,
        success: function (dataReturn) {
            // console.log('result server is : '+JSON.stringify(dataReturn));
            results = JSON.parse(dataReturn);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
    return JSON.stringify(results);
}