function calculateSettingAsThemeString({
                                           localStorageTheme,
                                           systemSettingDark
                                       }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "dark";
    }

    return "light";
}

/**
 * Utility function to update the button text and aria-label.
 */
function updateButton({buttonEl, isDark}) {
    const newCta = isDark ? "Change to light theme" : "Change to dark theme";
    // use an aria-label if you are omitting text on the button
    // and using a sun/moon icon, for example
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
}

/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({theme}) {
    document.querySelector("html").setAttribute("data-theme", theme);
    if (theme === 'light') {
        $('meta[name=theme-color]').attr('content', '#ffffff');
        // const chk = document.querySelector('#checked');
        // chk.prop("checked", 'on');
    } else {
        $('meta[name=theme-color]').attr('content', '#1a202c');
        // const chk = document.querySelector('#checked');
        // chk.prop("checked", 'on');
    }
}

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({
    localStorageTheme,
    systemSettingDark
});

/**
 * 3. Update the theme setting and button text accoridng to current settings
 */
updateButton({buttonEl: button, isDark: currentThemeSetting === "dark"});
updateThemeOnHtmlEl({theme: currentThemeSetting});

/**
 * 4. Add an event listener to toggle the theme
 */
button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateButton({buttonEl: button, isDark: newTheme === "dark"});
    updateThemeOnHtmlEl({theme: newTheme});

    currentThemeSetting = newTheme;
});


localStorage.setItem("clickCounter", "0");
(async function (document, window, $) {
    'use strict';

    let Site = window.Site;
    $(document).ready(function ($) {
        Site.run();

        getOS();
        let today = new Date().toLocaleDateString('fa-IR');
        $('#dateTime').html('امروز : ' + today);

        // var desiredHeight = $("body").height() - $("top").height();
        let desiredHeight = $(".page").height();
        $(".panel").css("min-height", desiredHeight);

        let defaults = $.components.getDefaults("dataTable");
        let t = $('#exampleTableAdd').DataTable(defaults);

    });


    // $(document).on('click', '.page-content', function (){
    //     $('.collapse').toggle().css('height', '100px');
    //     // $('#site-navbar-collapse').css('height', '1px');
    //     // $('#site-navbar-collapse').removeClass().addClass('navbar-collapse navbar-collapse-toolbar collapse in');
    // });

    document.querySelector('.first-button').addEventListener('click', function () {

        document.querySelector('.animated-icon1').classList.toggle('open');
    });


    $(document).on('click', '.btn_restore_backup', function () {
        $('#imgupload').trigger('click');
        document.getElementById('imgupload').addEventListener('change', onChange);

    });


    // $(document).on('click', '#show_list_item', function () {
    //     let txt_group_name = $('#txt_group_name').val();
    //     if (localStorage.getItem(txt_group_name).length <= 0) {
    //         return false;
    //     }
    //     let loadLocal = JSON.parse(localStorage.getItem(txt_group_name)) || [];
    //
    //     let final = [];
    //
    //     jQuery.each(loadLocal, function (index, item) {
    //         // do something with `item` (or `this` is also `item` if you like)
    //         let _row = '<tr>\n' +
    //             '                            <td>' + item.title + '</td>\n' +
    //             '                            <td>' + item.money.toLocaleString() + '</td>\n' +
    //             '                            <td>' + item.date + '</td>\n' +
    //             '                            <td>' + showTypeSpan(item.type) + '</td>\n' +
    //             '                            <td><button class="btn btn-pure btn-danger icon wb-trash"' +
    //             ' id="btn_del_sel" data-money="' + item.money + '" data-id="' + item.id + '" data-grname="' + txt_group_name + '"></button></td>\n' +
    //             '                        </tr>';
    //         final.push(_row);
    //     });
    //
    //     // console.log(final);
    //
    //     $('#showGroupTitle').html(' حساب انتخابی : ' + txt_group_name);
    //     $('#showItem').html(final);
    //     $('#exampleNiftyFadeScaleShowListItem').modal({
    //         show: 'true'
    //     });
    // });


    // $(document).on('click', '#btn_del_sel', function () {
    //     let itemId = $(this).data('id');
    //     let groupName = $(this).data('grname');
    //     let money = $(this).data('money');
    //     if (confirm(" آیا از حذف سطر با مبلغ : " + money + " اطمینان دارید? ")) {
    //         btn_delete_item_sel(groupName, itemId);
    //     } else {
    //         return false;
    //     }
    // });


    $(document).on('click', '#send', function () {
        sendNotification();
    });

    const sendNotification = async () => {
        if (window.Notification) {
            await Notification.requestPermission((status) => {
                // alert('Status of the request:'+ status);
                if (status === 'granted') {
                    showNotification('نوتیفیکیشن با موفقیت فعال شد ');
                    localStorage.setItem('nsa_notification_status', 'enabled');
                    $('#send').css('display', 'none');
                }
            });
        }

        // if (Notification.permission === 'granted') {
        //     // alert(' نوتیفیکیشن فعال شد');
        //     showNotification('نوتیفیکیشن با موفقیت فعال شد ');
        //     localStorage.setItem('nsa_notification_status', 'enabled');
        //
        // } else {
        //     if (Notification.permission !== 'denied') {
        //         const permission = await Notification.requestPermission();
        //         alert('قبلا نوتیفیکیشن را فعال نموده اید!');
        //         $('#send').css('display', 'none');
        //         // if (permission === 'granted') {
        //         //     showNotification('تست می باشد');
        //         // }
        //     }
        // }
    };

    const registration = await navigator.serviceWorker.getRegistration();

    function showNotification(title) {
        if ('showNotification' in registration) {
            // registration.showNotification(title);
            setTimeout(function () {
                registration.showNotification(title);
            }, 1000);
        } else {
            // new Notification(title);
            setTimeout(function () {
                new Notification(title);
            }, 5000);
        }
    }


    $(document).on('click', '#btn_save_notif', function () {
        var txt_notif = $('#txt_notif').val();
        localStorage.setItem('nsa_notification', txt_notif);
        alertify('به درستی ثبت شد', 'success');

    });

    $(document).on('click', '#popup-site', function () {
        $('#modalIframe').modal({
            show: 'true'
        });
    });

    $(document).on('click', '.btn_backup', function () {

        let finalBck = [];
        // iterate localStorage
        for (let i = 0; i < localStorage.length; i++) {

            // set iteration key name
            const key = localStorage.key(i);

            // use key name to retrieve the corresponding value
            const value = localStorage.getItem(key);

            // console.log the iteration key and value
            finalBck.push({'KeyName': key, 'KeyValue': value});
            // finalBck.push([key , value]);
            // console.log('Key: ' + key + ', Value: ' + value);

        }

        console.log(finalBck);
        // return false;
        DownloadJSON(finalBck);
        // return values;
    });


    // $(document).on('click', '.item_account', function () {
    //     // let item_name = $(this).data("item_name");
    //     // $('#txt_group_name').val(item_name);
    //     // $('#show_group_name').html('<span class="label label-outline label-default rtl">نام حساب:' +
    //     //     ' ' + item_name + '</span>');
    //     // $('#show_taraz_group').html(calculateFinalMoneyGroupTypes(item_name));
    //     // let chartData = (calculateFinalMoneyGroupTypesChart(item_name));
    //     // $(".btn_add_pay").trigger("click");
    //
    //     // var varChartData = chartData.split(",");
    //     // generate_chart('نمودار دریافت و پرداخت ها', 'دریافتی ها', varChartData[0], 'پرداختی ها', varChartData[1]);
    //     // alert(item_name);
    // });


    // $("#form_register").submit(function (event) {
    //     /* Stop form from submitting normally */
    //     event.preventDefault();
    //
    //     /* Get from elements values */
    //     let values = $(this).serializeArray();
    //     let data = {};
    //     $(values).each(function (index, obj) {
    //         data[obj.name] = obj.value;
    //     });
    //
    //     if (data.txt_phone.length <= 10) {
    //         alert('شماره موبایل صحیح را وارد نمایید', 'error');
    //         return false;
    //     }
    //
    //     // let finalResult222 = (sendAjaxDataForm2Server(data));
    //
    //     (async () => {
    //         let finalResult = JSON.parse(await sendAjaxDataForm2Server(data));
    //         if (finalResult.status) {
    //             let registrar = {username: data.txt_username, phone: data.txt_phone};
    //             localStorage.setItem("nsa_register", JSON.stringify(registrar));
    //             alertify(finalResult.message, 'success');
    //         } else {
    //             alertify(finalResult.message, 'error', false);
    //         }
    //
    //     })()
    //
    // });

    // save1
    $(document).on('click', '#btn_save11111', function () {

        // alertify();
        // alert('111');
        // return false;

        // if (!localStorage.hasOwnProperty('account_name')) {
        //     localStorage.setItem("account_name", '');
        // }
        //
        //
        // let txt_account_name = $('#txt_account_name').val();
        // if (txt_account_name.length == 0) {
        //     alertify('فیلد ها رو وارد نمایید', 'error', false);
        //     return false;
        // }
        //
        //
        // let hasExist = localStorage.getItem('account_name');
        // if ((hasExist.indexOf(txt_account_name) >= 0)) {
        //     alertify('این نام وجود دارد. لطفا نام دیگری را بنویسید', 'error', false);
        //     return false;
        // }
        //
        //
        // var newdata = {
        //     name: txt_account_name,
        // };
        // //   if (!localStorage.hasOwnProperty(txt_account_name)) {
        // //     localStorage.setItem("account_name",'');
        // //     alert('successfully');
        // // }else{
        // // const olddata = JSON.parse(localStorage.getItem("account_name"));
        // var a = [];
        // let count = localStorage.getItem('account_name');
        //
        // if (count) {   // checks if count is null, undefined, 0, false, NaN
        //     // console.log('poooooor hast');
        //     a.push((localStorage.getItem('account_name')));
        //     // a.push(txt_account_name);
        // } else {
        //     // console.log('null hast');
        // }
        // a.push(txt_account_name);
        // localStorage.setItem('account_name', (a));
        //
        //
        // $('#txt_account_name').val('');
        //
        // alertify('با موفقیت ثبت شد', 'success');


    });


    // $(document).on('click', '.btn_delete_group', function () {
    //     let groupNameSelected = $('#txt_group_name').val();
    //     if (confirm(" آیا از حذف این حساب " + groupNameSelected + " و داده های آن اطمینان دارید? ")) {
    //         if (groupNameSelected.length > 1) {
    //             // localStorage.setItem(groupNameSelected, '');
    //             localStorage.removeItem(groupNameSelected);
    //
    //             let groupLocalStorage = localStorage.getItem('account_name') || [];
    //             if (groupLocalStorage.length <= 0) {
    //                 console.log('not data');
    //                 return false;
    //             }
    //             var var1 = groupLocalStorage.split(",");
    //             let newArray = jQuery.grep(var1, function (value) {
    //                 return value != groupNameSelected;
    //             });
    //
    //             localStorage.setItem('account_name', newArray);
    //
    //             alertify('حساب حذف شد!', 'success');
    //
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         return false;
    //     }
    // });


    // btn_minus
    // $(document).on('click', '#btn_minus', function () {
    //
    //     let txt_group_name = $('#txt_group_name').val();
    //     let txt_money = $('#txt_money').val();
    //     let txt_title = $('#txt_title').val();
    //     let txt_date = $('#txt_date').val();
    //
    //     if (txt_money.length <= 0) {
    //         alertify('فیلد ها رو کامل پر نمایید', 'error', false);
    //         return false;
    //     }
    //
    //     let txt_money2 = txt_money.replace(/,/g, ''),
    //         asANumber = +txt_money2;
    //
    //
    //     const oldInfo = JSON.parse(localStorage.getItem(txt_group_name) || '[]');
    //
    //     if (oldInfo.length > 0) {
    //         var lastElementId = oldInfo.reverse()[0].id + 1;
    //     } else {
    //         var lastElementId = 1;
    //     }
    //
    //     const newArray = {
    //         id: lastElementId,
    //         money: txt_money2,
    //         title: txt_title,
    //         date: txt_date,
    //         type: 'minus'
    //     };
    //
    //     oldInfo.push(newArray);
    //
    //     localStorage.setItem(txt_group_name, JSON.stringify(oldInfo));
    //
    //     alertify('با موفقیت ثبت شد', 'success');
    //
    //     $('#txt_money').val('');
    //     $('#txt_title').val('');
    //
    //
    // });

    // $(document).on('click', '.btn_refresh', function () {
    //     location.reload();
    // });

    $(document).on('click', '.btn-popover-install-pwa', function () {
        $('.popover-install-pwa').css('display','none');
    });

    $(document).on('click', '.btn_delete_data', function () {
        if (confirm("آیا از خارج شدن اکانت خود اطمینان دارید?")) {
            localStorage.clear();
            location.reload();
        } else {
            return false;
        }
    });

    $(document).on('click', '#tap10Bar', function () {

        //Check to see if the localstorage variable exists. If it does not, this is the first time coming to the page, and we need to initalize it to 0
        if (localStorage.getItem("clickCounter") === null) {
            // Store
            localStorage.setItem("clickCounter", "0");
        }

        // Get the value from local storage
        var value = parseInt(localStorage.getItem("clickCounter"));

        // Incrememtnt the count by 1
        var newValue = value + 1
        if (newValue > 10) {
            // alert('okay');

            $('#exampleNiftyNotification').modal({
                show: 'true'
            });

            let data = {
                'switch_form': 'user_list'
            };
            (async () => {
                let finalResult = JSON.parse(await postAjax(data));
                // console.log(' $$ '+JSON.stringify(finalResult));
                // console.log(' $$ '+(finalResult.status));
                // console.log(' $$ '+JSON.stringify(finalResult.usersList));
                if (finalResult.status) {
                    $('#user_list').html(finalResult.usersList);
                } else {
                    alertify(finalResult.message, 'error', false);
                }
            })()
        }

        //Write the value back to local storage
        localStorage.setItem("clickCounter", newValue);

    });

//     // btn_add
//     $(document).on('click', '#btn_add', function () {
//
//         let txt_group_name = $('#txt_group_name').val();
//         let txt_money = $('#txt_money').val();
//         let txt_title = $('#txt_title').val();
//         let txt_date = $('#txt_date').val();
//
//         let txt_money2 = txt_money.replace(/,/g, ''),
//             asANumber = +txt_money2;
//
//         if (txt_money.length <= 0) {
//             alertify('فیلد ها رو کامل پر نمایید', 'error', false);
//             return false;
//         }
//
//
//         const oldInfo = JSON.parse(localStorage.getItem(txt_group_name) || '[]');
//
//         if (oldInfo.length > 0) {
//             var lastElementId = oldInfo.reverse()[0].id + 1;
//         } else {
//             var lastElementId = 1;
//         }
//
//         // console.log(lastElementId); //845
//         // return false;
//
//         // var lastElement = oldInfo.at(-1).id || 1;
// // alert(lastElement);
//         const newArray = {
//             id: lastElementId,
//             money: txt_money2,
//             title: txt_title,
//             date: txt_date,
//             type: 'add'
//         };
//
//         oldInfo.push(newArray);
//         localStorage.setItem(txt_group_name, JSON.stringify(oldInfo));
//         // console.log(oldInfo.reverse()[0].id); //845
//         alertify('با موفقیت ثبت شد', 'success');
//
//         $('#txt_money').val('');
//         $('#txt_title').val('');
//
//
//     });


    function calculateFinalMoneyGroup(groupArraySelected) {
        if (!localStorage.hasOwnProperty(groupArraySelected) || localStorage.getItem(groupArraySelected).length <= 0) {
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

//     function calculateFinalMoneyGroupTypes(groupArraySelected) {
//         if (!localStorage.hasOwnProperty(groupArraySelected) || localStorage.getItem(groupArraySelected).length <= 0) {
//             return 0;
//         }
//
//         let final112 = JSON.parse(localStorage.getItem(groupArraySelected));
// //         let final112 = JSON.parse(groupArraySelected);
//         var subAdd = [];
//         var subMinus = [];
//         // var item = final112.find(item => item.type === 'add');
//         var result_add = $.grep(final112, function (e) {
//             return e.type == 'add';
//         });
//         $.each(result_add, function (key, value) {
//             subAdd.push(parseInt(value.money));
//         });
//         var result_minus = $.grep(final112, function (e) {
//             return e.type == 'minus';
//         });
//         $.each(result_minus, function (key, value) {
//             subMinus.push(parseInt(value.money));
//         });
//
//
//         // var ArrayOfInts = subAdd.map(Number); //Output: [1,2,3]
//         let sumAddFinal = subAdd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//         let sumMinusFinal = subMinus.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//
//         // console.log(subMinus);
//         // return (parseFloat(sumAddFinal) +','+ parseFloat(sumMinusFinal));
//         return ('تراز ' + '<span class="badge badge-success">' + (sumAddFinal.toLocaleString()) + '</span> ' + ' <span' +
//             ' class="badge' +
//             ' badge-danger">' + (sumMinusFinal.toLocaleString()) + '</span>' + '  تومان ');
//         // return false;
//     }

//     function calculateFinalMoneyGroupTypesChart(groupArraySelected) {
//         if (!localStorage.hasOwnProperty(groupArraySelected) || localStorage.getItem(groupArraySelected).length <= 0) {
//             return 0;
//         }
//
//         let final112 = JSON.parse(localStorage.getItem(groupArraySelected));
// //         let final112 = JSON.parse(groupArraySelected);
//         var subAdd = [];
//         var subMinus = [];
//         // var item = final112.find(item => item.type === 'add');
//         var result_add = $.grep(final112, function (e) {
//             return e.type == 'add';
//         });
//         $.each(result_add, function (key, value) {
//             subAdd.push(parseInt(value.money));
//         });
//         var result_minus = $.grep(final112, function (e) {
//             return e.type == 'minus';
//         });
//         $.each(result_minus, function (key, value) {
//             subMinus.push(parseInt(value.money));
//         });
//
//
//         let sumAddFinal = subAdd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//         let sumMinusFinal = subMinus.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//
//         return (sumAddFinal + ',' + sumMinusFinal);
//     }

    function DownloadJSON(...finalbck) {
        //Build a JSON array containing Customer records.
        // var customers = new Array();
        // customers.push(["Customer Id", "Name", "Country"]);

        //Convert JSON Array to string.
        var json = JSON.stringify(finalbck);

        //Convert JSON string to BLOB.
        json = [json];
        var blob1 = new Blob(json, {type: "text/plain;charset=utf-8"});

        //Check the Browser.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob1, "Customers.txt");
        } else {
            var url = window.URL || window.webkitURL;
            var link = url.createObjectURL(blob1);
            var a = $("<a />");
            var currentdate = new Date();
            let fileDateSave = (currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear());
            // return false;
            a.attr("download", "nsa-" + fileDateSave + ".json");
            a.attr("href", link);
            $("body").append(a);
            a[0].click();
            $("body").remove(a);
        }
    }

    function btn_delete_item_sel(groupName, itemId) {
        console.log(groupName);
        console.log(itemId);
        console.log(JSON.parse(localStorage.getItem(groupName)));
        // return false;
        let old_data = JSON.parse(localStorage.getItem(groupName)) || [];
        // const index = old_data.indexOf(itemId);
        // const new_data = old_data.splice(index, 1);
        // const new_data = arr.splice( old_data.indexOf(itemId), 1 )
        let newData = old_data.filter(function (obj) {
            return obj.id !== itemId;
        });
        // console.log(newData);
        // return false;
        localStorage.setItem(groupName, JSON.stringify(newData));
        location.reload();
    }

    // function showTypeSpan(type) {
    //     let ret = [];
    //     if (type === 'add') {
    //         // <span className="label label-table label-success">Active</span>
    //         ret.push('<span class="label label-table label-success"> A </span>');
    //     } else {
    //         ret.push('<span class="label label-table label-danger"> M </span>');
    //     }
    //     return ret;
    // }

    function restoreBackup(fileName) {
        // let bck = '[[{"KeyName":"ssss","KeyValue":"[{\\"id\\":9,\\"money\\":\\"500\\",\\"title\\":\\"minus 500\\",\\"date\\":\\"55\\",\\"type\\":\\"add\\"},{\\"id\\":7,\\"money\\":\\"500\\",\\"title\\":\\"minus 500\\",\\"date\\":\\"55\\",\\"type\\":\\"add\\"},{\\"id\\":5,\\"money\\":\\"500\\",\\"title\\":\\"minus 500\\",\\"date\\":\\"55\\",\\"type\\":\\"minus\\"},{\\"id\\":3,\\"money\\":\\"3\\",\\"title\\":\\"3\\",\\"date\\":\\"3\\",\\"type\\":\\"minus\\"},{\\"id\\":1,\\"money\\":\\"33\\",\\"title\\":\\"33\\",\\"date\\":\\"33\\",\\"type\\":\\"add\\"},{\\"id\\":2,\\"money\\":\\"44\\",\\"title\\":\\"44\\",\\"date\\":\\"44\\",\\"type\\":\\"add\\"},{\\"id\\":4,\\"money\\":\\"55\\",\\"title\\":\\"55\\",\\"date\\":\\"55\\",\\"type\\":\\"add\\"},{\\"id\\":6,\\"money\\":\\"120000\\",\\"title\\":\\"500 minus\\",\\"date\\":\\"500\\",\\"type\\":\\"minus\\"},{\\"id\\":8,\\"money\\":\\"500\\",\\"title\\":\\"minus 500\\",\\"date\\":\\"55\\",\\"type\\":\\"add\\"},{\\"id\\":10,\\"money\\":\\"120000\\",\\"title\\":\\"500 minus\\",\\"date\\":\\"500\\",\\"type\\":\\"add\\"}]"},{"KeyName":"account_name","KeyValue":"ssss,qqqq,wwwww"},{"KeyName":"wwwww","KeyValue":"[{\\"id\\":2,\\"money\\":\\"2\\",\\"title\\":\\"2\\",\\"date\\":\\"2\\",\\"type\\":\\"add\\"},{\\"id\\":1,\\"money\\":\\"22\\",\\"title\\":\\"22\\",\\"date\\":\\"22\\",\\"type\\":\\"add\\"},{\\"id\\":3,\\"money\\":\\"2\\",\\"title\\":\\"2\\",\\"date\\":\\"2\\",\\"type\\":\\"add\\"}]"}]]';
        let sArray = JSON.parse(fileName);

        $.each(sArray, function (i) {
            $.each(sArray[i], function (key, value) {
                // console.log(value.KeyName);
                // console.log(value.KeyValue);
                localStorage.setItem(value.KeyName, value.KeyValue);
            });
        });
        alertify('اطلاعات با موفقیت بازیابی شد', 'success');


    }

    function fetchAllGroupAccount() {
        let groupLocalStorage = localStorage.getItem('account_name') || [];
        // alert(groupLocalStorage);
        if (groupLocalStorage.length <= 0) {
            alertify('حسابی برای نمایش رویداد یافت نشد', 'error', false);
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
            // console.log('aaaa : ' + sumMoney);

            let _data = '<div class="col-sm-12 item_account animation-slide-top" data-plugin="appear" data-animate="slide-top" data-item_name="' + test[i] + '">\
          <!-- Widget -->\
          <div class="widget">\
            <div class="widget-content padding-20 bg-blue-700 border-radius">\
              <div class="widget-watermark darker font-size-60 margin-15"><i id="icon-animation" class="icon\
               wb-clipboard flip-vertical-left"\
               aria-hidden="true"></i></div>\
              <div class="counter counter-md counter-inverse text-left">\
                <div class="counter-number-group">\
                  <span class="counter-number-related text-capitalize">' + test[i] + '</span><br>\
                  <span class="counter-number">\
                ' + checkTaraz(sumMoney) + '\
                ' + countItem(test[i]) + '\
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

    function alertify(message, type, refresh = true) {
        // $("#alertifyMessage").data("log-message", message);
        // $("#alertifyMessage").data("type", type);
        // $("#alertifyMessage").trigger("click");
        // let mainBody = '<span style="text-align: center;" class="label label-outline label-' + type + '">' + message + '</span>';
        // toastr.error(mainBody);
        // toastr.success(message);

        // var d =bootbox.dialog({
        //     title: mainBody,
        //     message: " ",
        //     centerVertical: true,
        // });


        // $("#exampleBasic").data("title", {mainBody});
        // $("#exampleBasic").trigger("click");

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


        // bootbox.alert(mainBody).find('.modal-content').css({
        //     'margin-top': function (){
        //         var w = $( window ).height();
        //         var b = $(".modal-dialog").height();
        //         // should not be (w-h)/2
        //         var h = (w-b)/2;
        //         return h+"px";
        //     }
        // });

    }

    function checkTaraz(sumMoney) {
        let ret = [];
        if (sumMoney >= 0) {
            ret.push('<span class="badge badge-success"> تراز: ' + sumMoney.toLocaleString() + ' تومان  </span> ');
        } else {
            ret.push('<span class="badge badge-danger"> تراز: ' + sumMoney.toLocaleString() + ' تومان  </span> ');
        }
        return ret;
    }

    function countItem(itemName) {
        // console.log(itemName);
        // return false;
        let ret = [];
        let dataLocal = localStorage.getItem(itemName) || 0;
        if (dataLocal.length <= 0) {
            ret.push('<span class="badge badge-dark"> تعداد: 0</span>');
            return ret;
        }

        let localData = JSON.parse(localStorage.getItem(itemName)) || [];
        // console.log(localData);
        if (localData.length >= 0) {
            var count = $.map(localData, function (n, i) {
                return i;
            }).length;
            ret.push('<span class="badge badge-dark"> تعداد ' + count + '</span>');
        } else {
            ret.push('<span class="badge badge-dark">تعداد: 0</span>');
        }
        return ret;
    }


    function onChange(event) {
        // $('#imgupload').trigger('click');
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event) {
        var fileName = $("#imgupload").val();

        if (fileName) { // returns true if the string is not empty
            // alert(fileName + " was selected");
            restoreBackup(event.target.result);
        } else { // no file was selected
            alertify('فایلی انتخاب نشده است', 'success');
        }
        // console.log(event.target.result);
        // var obj = JSON.parse(event.target.result);
        // console.log(obj);
    }

    $('.observer-example').persianDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
        altField: '.observer-example-alt',
        autoClose: true
    });

    $('#txt_money').keyup(function (event) {
        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) return;

        // format number
        $(this).val(function (index, value) {
            return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });

    });

    async function sendAjaxDataForm2Server(data) {
        let responseGet;
        let ajaxRequest = $.ajax({
            url: "database.php",
            type: "post",
            data: data
        });

        /*  Request can be aborted by ajaxRequest.abort() */
        await ajaxRequest.done(function (response, textStatus, jqXHR) {
            responseGet = JSON.parse(response);
            // responseGet = JSON.parse((response));
            // if (responseGet.status){
            //     alertify(responseGet.message, 'success');
            // }else{
            //     alertify(responseGet.message, 'error', false);
            // }
        });

        /* On failure of request this function will be called  */
        ajaxRequest.fail(function () {
            alertify('error fetch', 'error', false);
        });


        console.log(' tt : ' + JSON.stringify(responseGet));

        // return ajaxRequest.promise();

        return JSON.stringify(responseGet);
    }


})(document, window, jQuery);


(function () {

    var filtering = $('#exampleFootableFiltering');
    filtering.footable().on('footable_filtering', function (e) {
        var selected = $('#filteringStatus').find(':selected').val();
        e.filter += (e.filter && e.filter.length > 0) ? ' ' +
            selected : selected;
        e.clear = !e.filter;
    });

    // Filter status
    $('#filteringStatus').change(function (e) {
        e.preventDefault();
        filtering.trigger('footable_filter', {
            filter: $(this).val()
        });
    });

    // Search input
    $('#filteringSearch').on('input', function (e) {
        e.preventDefault();
        filtering.trigger('footable_filter', {
            filter: $(this).val()
        });
    });
})();


function getOS() {

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    if (!isMobile) {
        // alert('نسخه مخصوص موبایل می باشد.آنرا نصب نمایید');
    $('#popover-install-pwa-ios').css('display', 'flex');
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
        // console.log("This is running as standalone.");
    } else {
        // $('#popover-install-pwa-android').css('display', 'flex');

        const userAgent = window.navigator.userAgent,
            platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
            macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        let os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (/Linux/.test(platform)) {
            os = 'Linux';
        }
        // alert(os);
        if (os == 'Android') {
            $('#popover-install-pwa-android').css('display', 'flex');
        } else if (os == 'iOS') {
            $('#popover-install-pwa-ios').css('display', 'flex');
        }


    }
}

// var mouseY = 0;
// var startMouseY = 0;
// $('body').on('mousedown', function (ev) {
//     mouseY = ev.pageY;
//     startMouseY = mouseY;
//     $(document).mousemove(function (e) {
//         if (e.pageY > mouseY) {
//             var d = e.pageY - startMouseY;
//             console.log("d: " + d);
//             if (d >= 200)
//                 location.reload();
//             $('body').css('margin-top', d/4 + 'px');
//         }
//         else
//             $(document).unbind("mousemove");
//
//
//     });
// });
// $('body').on('mouseup', function () {
//     $('body').css('margin-top', '0px');
//     $(document).unbind("mousemove");
// });
// $('body').on('mouseleave', function () {
//     $('body').css('margin-top', '0px');
//     $(document).unbind("mousemove");
// });


(function ($) {

    // setInterval(showNotification, 9000);

    $.fn.refresh_pwa = function () {
        window.location.reload();
        // $(".loader22").css("display","block");
        // alert('loading ...');
    };

}(jQuery));


window.onclick = function (event) {
    if (event.target.id === 'btn_refresh') {
        // $("#loading").show();
        $(".spinner-container").css("display", "block");
        // alert('loading ...');
        $().refresh_pwa();
    }
}


function doMagicStartup() {

    showUserName();
    setDayLightCheckBox();


    function showUserName() {
        if (localStorage.getItem("nsa_register") !== null) {
            let userName = JSON.parse(localStorage.getItem("nsa_register"));
            $('#showusername').html((userName.username));
        }

        let nsa_notification_status = localStorage.getItem('nsa_notification_status') || '';
        if (nsa_notification_status === 'enabled') {
            $('#send').css('display', 'none');
        } else {
            $('#send').css('display', 'block');
        }

    }

    function setDayLightCheckBox() {
        const theme = document.querySelector("html").getAttribute("data-theme");
        if (theme === 'light') {
            $('input:checkbox').prop('checked', true);

        } else {
            $('input:checkbox:checked').prop('checked', false);
        }
    }

    // async function showNotification2(title) {
    //     // const title = 'سلام دوست عزیز';
    //
    //     const registration = await navigator.serviceWorker.getRegistration();
    //
    //     if ('showNotification' in registration) {
    //         await registration.showNotification("پیغام جدید", {
    //             body: title,
    //         });
    //     } else {
    //         // new Notification(title);
    //         new Notification("پیغام جدید", {
    //             body: title,
    //         });
    //     }
    //     localStorage.removeItem('nsa_notification');
    // }
    //
    // function sendNotification(title) {
    //     if (Notification.permission === 'granted') {
    //         showNotification2(title);
    //     }
    // }

    // var magic = function () {
    //     // alert('test');
    //     if (!localStorage.hasOwnProperty('nsa_notification')) {
    //         return false;
    //     }
    //     if (localStorage.getItem('nsa_notification').length <= 0) {
    //         return false;
    //     }
    //     let loadLocal = localStorage.getItem('nsa_notification');
    //     // alert('title : '+loadLocal);
    //     sendNotification(loadLocal);
    // };
    //
    // setInterval(magic, 10000);
    // magic();
}

doMagicStartup();



