(function ($) {
    $(window).load(function () {
        show_account();
    });
})(jQuery);


// ------------------- ELEMENT ID --------------------------


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

let btn_insert_account_item = document.getElementById("btn_add");
btn_insert_account_item.addEventListener("click", () => {
    let txt_account_name = $('#txt_account_name').val();
    // if (txt_account_name.length == 0) {
    //     alertify('فیلد ها رو وارد نمایید', 'error', false);
    //     return false;
    // }

    checkRegister();

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

$("#form_register").submit(function (event) {
    /* Stop form from submitting normally */
    event.preventDefault();

    /* Get from elements values */
    let values = $(this).serializeArray();
    let data = {};
    $(values).each(function (index, obj) {
        data[obj.name] = obj.value;
    });

    if (data.txt_phone.length <= 10) {
        alert('شماره موبایل صحیح را وارد نمایید', 'error');
        return false;
    }

    // let finalResult222 = (sendAjaxDataForm2Server(data));

    (async () => {
        let finalResult = JSON.parse(await postAjax(data));

        if (finalResult.status) {
            if (finalResult.data === 'duplicated') {
                alertify(finalResult.message, 'warning', false);
            } else {
                let registrar = {username: data.txt_username, phone: data.txt_phone};
                localStorage.setItem("nsa_register", JSON.stringify(registrar));
                alertify(finalResult.message, 'success');
            }

        } else {
            alertify(finalResult.message, 'error', false);
        }

    })()

});


$(document).on('click', '.btn_login_modal', function () {
    alert(22);
});


// --------------------------- FUNCTIONS ------------------


function show_account() {
    let userName;
    if (localStorage.getItem("nsa_register") !== null) {
        userName = JSON.parse(localStorage.getItem("nsa_register"));
        // $('#showusername').html((userName.phone));
        $('#btn_register').css('display', 'none');
    } else {
        $('#main_data').html('<div class="alert alert-danger text-center alert-dismissible" role="alert">\n' +
            '   لطفا ابتدا ثبت نام نمایید \n' +
            ' </div>');
        let registrar = {username: data.txt_username, phone: data.txt_phone};
        localStorage.setItem("nsa_register", JSON.stringify(registrar));

        return false;
    }
    let data = {
        'switch_form': 'show_account',
        'current_user_phone': userName.phone
    };
    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        if (finalResult.status) {
            // console.log('********** ' + JSON.stringify(finalResult.message));
            // console.log('**** ' +  JSON.stringify(finalResult));
            drawListItem(finalResult.message);
        } else {
            console.log('error ********** ' + JSON.stringify(finalResult.message));
            console.log('error **** ' + (finalResult.message));
        }
    })()
}

function checkRegister() {
    let currentUser = JSON.parse(localStorage.getItem("nsa_register")) || [];
    if (currentUser.phone.length <= 10) {
        alertify('ابتدا ثبت نام نمایید', 'error', false);
        return false;
    }
}

function countItem(dataLength) {
    let ret = [];
    if (parseInt(dataLength) >= 0) {
        ret.push('<span class="badge badge-dark"> تعداد ' + dataLength + '</span>');
    } else {
        ret.push('<span class="badge badge-dark">تعداد: 0</span>');
    }
    return ret;
}

function countMoney(sumMoney) {
    let ret = [];
    if (parseFloat(sumMoney) >= 0) {
        ret.push('<span class="badge badge-success"> تراز: ' + sumMoney.toLocaleString() + ' تومان  </span> ');
    } else {
        ret.push('<span class="badge badge-danger"> تراز: ' + sumMoney.toLocaleString() + ' تومان  </span> ');
    }
    return ret;
}

function drawListItem(dataMain) {
    let main_data_temp = [];
    // alert(data.account_item);
    let data = dataMain.account_item;
    let accountSubCount = dataMain.account_item_value_count;
    let accountSumMoney = dataMain.account_sum_money;
    // alert(data.length);
    for (let i = 0; i < data.length; i++) {
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
                ' + countMoney(accountSumMoney) + '\
                ' + countItem(accountSubCount) + '\
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

async function postAjax(data) {
    let results;

    await $.ajax({
        url: "database.php",
        method: "POST",
        data: data,
        success: function (dataReturn) {
            console.log('result postAjax : ' + (dataReturn));
            // console.log('result server is 2 : ' + (dataReturn));
            results = JSON.parse(dataReturn);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
    return JSON.stringify(results);
}