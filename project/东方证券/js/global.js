$(function () {
    $(".col-do,.nav_btn").on('touchstart', function () {
        $(".my_nav .col-do,.my_nav .nav_btn").removeClass("nav_clicked");
        $(this).addClass("nav_clicked");
    });
    //radiobox
    $(".radio_father").on('touchstart', function () {
        $(this).parent().find(".radio_father").removeClass("radio_checked");
        $(this).addClass("radio_checked");
    });
    //advice.html next step1
    $(".advice_next").on('touchstart', function () {
        pop_window1("advice_window1");
        
    });
    $(".advice_next2").on('touchstart', function () {
        pop_window1("advice_window2");
    });
    function pop_window1(winId) {
        var $pop = $("#" + winId);
        var dheight = $(document).height();
        $pop.css({ "display": "block", "height": dheight - 60 });
        $pop.animate({ "top": "60px" },'slow');
    }
    $(".cancle1").on("touchstart", function () {
        canclePopWindow("advice_window", "advice_window1");
    });
    $(".cancle2").on("touchstart", function () {
        //$(".advice_window2 .radio_father").removeClass("radio_checked");
        //$("#advice_window2").css({ "display": "none", "top": "0" });
        canclePopWindow("advice_window2","advice_window2");
    });
    function canclePopWindow(radioRowfatherClass,windowId) {
        $pop = $("#" + windowId);
        $radioRow = $("." + radioRowfatherClass + " .radio_father");
        $radioRow.removeClass("radio_checked");
        $pop.css({ "display": "none", "top": "0" });
    }
    //
    $(".right_list").on("touchstart", function () {
        pop_window1("sx_advice_window1");
    });
    $(".sx_row").on("touchstart", function () {
        $(".sx_row").removeClass("sx_row_on");
        $(this).toggleClass("sx_row_on");
    });
    //待办列表tab切换
    $('#workflow-tab a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    })
});