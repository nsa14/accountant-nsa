(function ($) {
    $(window).load(function () {
        show_account();
        // 10 secaound check push notification from database server
        // setInterval(function () {
        //     checkPushNotification();
        // }, 0000);
        checkPushNotification();
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
btn_insert_account_item.addEventListener("click", (e) => {

    checkRegister();

    let txt_account_id = $('#txt_account_id').val();
    let txt_money = $('#txt_money').val();
    let txt_type = e.currentTarget.dataset.type;
    let txt_title = $('#txt_title').val();
    let txt_date = $('#txt_date').val();

    if (txt_money.length <= 0 || txt_account_id.length <= 0) {
        alertify('فیلد ها رو کامل پر نمایید', 'error', false);
        return false;
    }
    let data = {
        'switch_form': 'add_sub_account',
        'txt_account_id': txt_account_id,
        'txt_money': txt_money,
        'txt_type': txt_type,
        'txt_title': txt_title,
        'txt_date': txt_date
    };

    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        if (finalResult.status) {
            alertify(finalResult.message, 'success');
        } else {
            alertify(finalResult.message, 'error', false);
        }

    })()
    $('#txt_money').val('');
    $('#txt_title').val('');

});


let btn_insert_account_item_minus = document.getElementById("btn_minus");
btn_insert_account_item_minus.addEventListener("click", (e) => {

    checkRegister();

    let txt_account_id = $('#txt_account_id').val();
    let txt_money = $('#txt_money').val();
    let txt_type = e.currentTarget.dataset.type;
    let txt_title = $('#txt_title').val();
    let txt_date = $('#txt_date').val();

    if (txt_money.length <= 0 || txt_account_id.length <= 0) {
        alertify('فیلد ها رو کامل پر نمایید', 'error', false);
        return false;
    }
    let data = {
        'switch_form': 'add_sub_account',
        'txt_account_id': txt_account_id,
        'txt_money': txt_money,
        'txt_type': txt_type,
        'txt_title': txt_title,
        'txt_date': txt_date
    };

    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        if (finalResult.status) {
            alertify(finalResult.message, 'success');
        } else {
            alertify(finalResult.message, 'error', false);
        }

    })()
    $('#txt_money').val('');
    $('#txt_title').val('');

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
                let registrar = {userid: finalResult.userId, username: data.txt_username, phone: data.txt_phone};
                localStorage.setItem("nsa_register", JSON.stringify(registrar));
                alertify(finalResult.message, 'success');
            }

        } else {
            alertify(finalResult.message, 'error', false);
        }

    })()

});

$("#form_notification").submit(function (event) {
    /* Stop form from submitting normally */
    event.preventDefault();

    /* Get from elements values */
    let values = $(this).serializeArray();
    let data = {};
    var options = $('#user_list :selected');
    var user_selected = $.map(options, function (option) {
        return option.value;
    });
    if (user_selected.length > 0) {
        data['usersSelected'] = user_selected;
    } else {
        return false;
    }


    $(values).each(function (index, obj) {
        data[obj.name] = obj.value;
    });


    if (data.txt_notification_message.length <= 5) {
        alert('متن را وارد نمایید', 'error');
        return false;
    }
    // console.log(data)
    // return false;

    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        // console.log('from php : '+JSON.stringify(finalResult));
        if (finalResult.status) {
            alertify(finalResult.message, 'success',);
        } else {
            alertify(finalResult.message, 'error', false);
        }

    })()

});


$(document).on('click', '.btn_login_modal', function () {
    let txt_phone = $('#txt_phone').val();
    let txt_password = $('#txt_password').val();
    if (txt_phone.length <= 10 || txt_password.length <= 5) {
        alertify('شماره موبایل و رمز عبور صحیح را وارد نمایید', 'error', false);
        return false;
    }
    let data = {
        'switch_form': 'check_login',
        'current_user_phone': txt_phone,
        'current_user_password': txt_password
    };

    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        if (finalResult.status) {
            let variable_data = finalResult.data;
            // console.log(' mmm : '+variable_data.userid);
            let registrar = {
                userid: variable_data.userid,
                username: variable_data.username,
                phone: variable_data.phone
            };
            // console.log(registrar);
            localStorage.setItem("nsa_register", JSON.stringify(registrar));
            alertify('خوش آمدید !', 'success');
        } else {
            alertify('مشخصات ورود صحیح نمی باشد', 'error', false);
            console.log('error ********** ' + JSON.stringify(finalResult.message));
            console.log('error **** ' + (finalResult.message));
        }
    })()
});

$(document).on('click', '.item_account', function () {
    let item_name = $(this).data("item_name");
    let sum_add_type = $(this).data("sum_add_type") ?? 0;
    let sum_minus_type = $(this).data("sum_minus_type") ?? 0;
    $('#txt_account_id').val($(this).data("item_name_id"));
    $('#show_group_name').html('<span class="label label-outline label-default rtl">نام حساب:' +
        ' ' + item_name + '</span>');
    $('#show_taraz_group').html(calculateFinalMoneyGroupTypes(sum_add_type, sum_minus_type));

    // alert(parseInt(sum_add_type));
    // alert(Math.abs(sum_minus_type));

    generate_chart('نمودار دریافت و پرداخت ها', 'دریافتی ها', Math.abs(sum_add_type), 'پرداختی ها', Math.abs(sum_minus_type));

    // show modal
    $(".btn_add_pay").trigger("click");
});


$(document).on('click', '#show_list_item', function () {
    $(".spinner-container").css("display", "block");
    let txt_account_id = $('#txt_account_id').val();
    if (txt_account_id.length <= 0) {
        return false;
    }
    let data = {
        'switch_form': 'show_account_sub_items',
        'current_account_id': txt_account_id
    };
    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        if (finalResult.status) {
            // data_sub_account_items = JSON.stringify(finalResult.message);
            let data_sub_account_items = [];
            data_sub_account_items.push(JSON.stringify(finalResult.message));
            // console.log('BBBBB : ' + data_sub_account_items);
            // return false;
            let final = [];
            $.each((finalResult.message), function (key, data) {
                // console.log(key);
                // console.log(data.id);
                // $.each(data, function (index, item) {
                // console.log(item.id);
                let _row = '<tr>\n' +
                    '                            <td>' + data.title + '</td>\n' +
                    '                            <td>' + data.money.toLocaleString() + '</td>\n' +
                    '                            <td>' + data.fa_date + '</td>\n' +
                    '                            <td>' + showTypeSpan(data.type) + '</td>\n' +
                    '                            <td><button class="btn btn-pure btn-danger icon wb-trash"' +
                    ' id="btn_del_sel" data-account_id="' + finalResult.account_id + '" data-money="' + data.money + '" data-id="' + data.id + '"></button></td>\n' +
                    '                        </tr>';
                final.push(_row);
                // })
            })

            $('#showGroupTitle').html(' حساب انتخابی : ' + finalResult.account_name);
            $('#showItem').html(final);
            $('#exampleNiftyFadeScaleShowListItem').modal({
                show: 'true'
            });

        } else {
            console.log('error ********** ' + JSON.stringify(finalResult.message));
            console.log('error **** ' + (finalResult.message));
        }
    })()
    $(".spinner-container").css("display", "none");
});


$(document).on('click', '.btn_delete_group', function () {
    let accountId = $('#txt_account_id').val();
    let groupNameSelected = $('#show_group_name').text();
    if (confirm(" آیا از حذف " + groupNameSelected + " و داده های آن اطمینان دارید? ")) {
        let data = {
            'switch_form': 'delete_account_with_subs',
            'current_account_id': accountId
        };
        (async () => {
            let finalResult = JSON.parse(await postAjax(data));
            if (finalResult.status) {
                alertify(finalResult.message, 'success');
            } else {
                console.log('error ********** ' + JSON.stringify(finalResult.message));
                console.log('error **** ' + (finalResult.message));
            }
        })()
    } else {
        return false;
    }
});

$(document).on('click', '#btn_add_account', function () {
    $('#exampleNiftyFadeScale').modal({
        show: 'true'
    });

    $('#xexampleNiftyFadeScale').find("input[name='txt_account_name']").each(function () {
        $("input[name='txt_account_name']").focus();
    })

    // $('#txt_account_name').focus();
    // $('#txt_account_name').select();
    // $('#txt_account_name').trigger('click');
});

$(document).on('click', '#btn_del_sel', function () {
    let accountId = $(this).data('account_id');
    let itemId = $(this).data('id');
    let money = $(this).data('money');
    if (confirm(" آیا از حذف سطر با مبلغ : " + money + " اطمینان دارید? ")) {
        let data = {
            'switch_form': 'delete_subAccount_item',
            'current_account_id': accountId,
            'current_sub_account_id': itemId
        };
        (async () => {
            let finalResult = JSON.parse(await postAjax(data));
            if (finalResult.status) {
                alertify(finalResult.message, 'success');
            } else {
                console.log('error ********** ' + JSON.stringify(finalResult.message));
                console.log('error **** ' + (finalResult.message));
            }
        })()
    } else {
        return false;
    }
});


// --------------------------- FUNCTIONS ------------------


function show_account() {
    // $(".spinner-container").css("display", "block");
    let userName;
    if (localStorage.getItem("nsa_register") !== null) {
        userName = JSON.parse(localStorage.getItem("nsa_register"));
        // $('#showusername').html((userName.phone));
        $('#btn_register').css('display', 'none');
    } else {
        $('#main_data').html('<div data-target="#exampleNiftyFadeScaleRegister" data-toggle="modal" class="alert' +
            ' alert-danger text-center alert-dismissible" role="alert">\n' +
            '   لطفا ابتدا ثبت نام نمایید \n' +
            ' </div>');
        $('#btn_add_account').css('display', 'none');
        $('#btn_exit').css('display', 'none');
        // let registrar = {username: data.txt_username, phone: data.txt_phone};
        // localStorage.setItem("nsa_register", JSON.stringify(registrar));
        return false;
    }
    // alert('userName.userid : '+userName.userid);

    let data = {
        'switch_form': 'show_account',
        'current_user_id': userName.userid
    };

    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        if (finalResult.status) {
            // console.log('**********AA: ' + JSON.stringify(finalResult.message));
            // return false;
            // console.log('**** ' +  JSON.stringify(finalResult));
            // console.log('**** ' +  JSON.stringify(finalResult));
            // alert(JSON.stringify(finalResult.message.account_item));

            if (parseInt(finalResult.existCount) <= 0 || finalResult.listItems[0].listSubAccount.length <= 0) {
                $('#main_data').html('<div data-target="#exampleNiftyFadeScale" data-toggle="modal" class="alert' +
                    ' alert-warning text-center' +
                    ' alert-dismissible" role="alert">\n' +
                    '   هنوز حسابی تعریف نکرده اید! \n' +
                    ' </div>');
            } else {
                drawListItem(finalResult.listItems);
            }
        } else {
            console.log('error ********** ' + JSON.stringify(finalResult));
            // console.log('error **** ' + (finalResult));
        }
    })()
    // $(".spinner-container").css("display", "none");
}

function checkRegister() {
    let currentUser = JSON.parse(localStorage.getItem("nsa_register")) || [];
    if (currentUser.phone.length <= 9) {
        alertify('ابتدا ثبت نام نمایید', 'error', false);
        return false;
    }
}

function showTypeSpan(type) {
    let ret = [];
    if (type === 'add') {
        // <span className="label label-table label-success">Active</span>
        ret.push('<span class="label label-table label-success">دریافت</span>');
    } else if (type === 'minus') {
        ret.push('<span class="label label-table label-danger">پرداخت</span>');
    }
    return ret;
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

function generate_chart(title, data1N, data1V, data2N, data2V) {
    var donut_chart = c3.generate({
        bindto: '#exampleC3Donut',
        data: {
            columns: [
                [data1N, data1V],
                [data2N, data2V],
            ],
            type: 'donut'
        },
        color: {
            pattern: [$.colors("primary",
                500), $.colors("red", 400)]
        },
        legend: {
            position: 'center'
        },
        donut: {
            label: {
                show: true
            },
            width: 50,
            title: title,
            onclick: function (d, i) {
            },
            onmouseover: function (d, i) {
            },
            onmouseout: function (d, i) {
            }
        }
    });
}

async function showPushNotification(title, message, userid) {
    const registration = await navigator.serviceWorker.getRegistration();

    if ('showNotification' in registration) {
        await registration.showNotification(title, {
            body: message,
        });
    } else {
        new Notification(title, {
            body: message,
        });
    }
    // localStorage.removeItem('nsa_notification');
    // set push notification db to send
    let data = {
        'switch_form': 'setPushNotificationToRead',
        'user_id': userid,
    };
    let finalResult = JSON.parse(await postAjax(data));
    // if (finalResult.status) {
    //     alertify(finalResult.message, 'success',false);
    // } else {
    //     alertify(finalResult.message, 'error', false);
    // }

}

function checkPushNotification() {
    let userName;
    if (localStorage.getItem("nsa_register") !== null) {
        userName = JSON.parse(localStorage.getItem("nsa_register"));
    }
    // alert(userName.userid);
    if (userName.length <= 0) {
        return false;
    }
    let data = {
        'switch_form': 'checkPushNotification',
        'userId': userName.userid,
    };
    (async () => {
        let finalResult = JSON.parse(await postAjax(data));
        // console.log(' MMM : '+ finalResult.message);
        if (finalResult.status) {
            try {
                await showPushNotification(finalResult.title, finalResult.message, userName.userid);
            } catch (err) {
                // handle rejection
                console.error(err)
            }
        }
    })()
}

function calculateFinalMoneyGroupTypes(sumAddFinal, sumMinusFinal) {
    return ('تراز ' + '<span class="text-success">' + (sumAddFinal.toLocaleString()) + '</span> ' + ' <span' +
        ' class="text-danger">' + (sumMinusFinal.toLocaleString()) + '</span>' + '  تومان ');
    // return ('تراز ' + '<span class="badge badge-success">' + (sumAddFinal.toLocaleString()) + '</span> ' + ' <span' +
    //     ' class="badge' +
    //     ' badge-danger">' + (sumMinusFinal.toLocaleString()) + '</span>' + '  تومان ');
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
    let ListItems = (dataMain);
    // console.log(' ////drawListItem////// ' + JSON.stringify(ListItems));
    // let accountSubCount = dataMain.account_item_value_count;
    // let accountSumMoney = dataMain.account_sum_money;
    // let sum_add_type = dataMain.account_sum_add;
    // let sum_minus_type = dataMain.account_sum_minus;
    // // alert(data.length);

    // console.log(' ::each 1:: ' + JSON.stringify(ListItems[0]));
    // return false;


    $(ListItems).each(function (i, val) {
        // console.log(' ::each 1:: ' + JSON.stringify(val));
        // console.log(' ::each 2:: ' + JSON.stringify(val.listSubAccount));
        let _data = '<div class="col-sm-12 item_account animation-slide-top" data-plugin="appear"' +
            ' data-animate="slide-top" data-sum_add_type="' + val.account_sum_add + '" data-sum_minus_type="' + val.account_sum_minus + '" data-item_name="' + val.listSubAccount.account_name + '"' +
            ' data-item_name_id="' + val.listSubAccount.id + '">\
      <!-- Widget -->\
      <div class="widget">\
        <div class="widget-content padding-20 bg-blue-700 border-radius">\
          <div class="widget-watermark darker font-size-60 margin-15"><i id="icon-animation" class="icon\
           wb-clipboard flip-vertical-left"\
           aria-hidden="true"></i></div>\
          <div class="counter counter-md counter-inverse text-left">\
            <div class="counter-number-group">\
              <span class="counter-number-related text-capitalize">' + val.listSubAccount.account_name + '</span><br>\
                  </span>\
                  <span class="counter-number">\
                ' + countMoney(val.account_sum_money) + '\
                ' + countItem(val.account_item_value_count) + '\
                  </span>\
                </div>\
              </div>\
            </div>\
          </div>\
          <!-- End Widget -->\
        </div>';
        main_data_temp.push(_data);
        // $.each(val.listSubAccount, function (key, value) {
        //     var key = Object.keys(val)[0];  // get the key name
        //     var value = val[key];   // from the key name you can get the value
        // });
    });


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
        }, 1000);
    }
}

async function postAjax(data) {
    let results;

    await $.ajax({
        url: "database.php",
        method: "POST",
        data: data,
        success: function (dataReturn) {
            // console.log('result postAjax : ' + (dataReturn));
            // console.log('result server is 2 : ' + (dataReturn));
            // console.log(' RR = '+dataReturn);
            try {
                results = JSON.parse(dataReturn);
            } catch (e) {
                $('#main_data').html('<div class="alert alert-danger text-center alert-dismissible" role="alert">\n' +
                    '   خطا! ارتباط اینترنت خود را بررسی نمایید. \n' +
                    ' </div>');
                return console.error(e); // error in the above string (in this case, yes)!
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // alert("Status: " + textStatus);
            // alert("Error: " + errorThrown);
            alertify('اتصال خود با اینترنت را چک نمایید', 'warning', false);
        }
    });
    return JSON.stringify(results);
}