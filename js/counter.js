function isElementInViewport($el) {
    var top = $el.offset().top;
    var bottom = top + $el.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return bottom > viewportTop && top < viewportBottom;
}

if ($(".counter-scroll").length > 0) {
    $(window).on("scroll", function() {
        if ($(".odometer").length > 0) {
            if (isElementInViewport($(".odometer"))) {
                setTimeout(function() {
                    $(".count-1-1").html(26);
                    $(".count-1-2").html(22);
                    $(".count-1-3").html(296);
                }, 0);
            }
        }
        if ($(".odometer.count-2").length > 0) {
            if (isElementInViewport($(".odometer.count-2"))) {
                setTimeout(function() {
                    $(".count-2-1").html(260);
                    $(".count-2-2").html(400);
                    $(".count-2-3").html(1000);
                }, 0);
            }
        }
        if ($(".odometer.count-3").length > 0) {
            if (isElementInViewport($(".odometer.count-3"))) {
                setTimeout(function() {
                    $(".count-3-1").html(300);
                    $(".count-3-2").html(23);
                    $(".count-3-3").html(125);
                    $(".count-3-4").html(99);
                }, 0);
            }
        }
        if ($(".odometer.count-4").length > 0) {
            if (isElementInViewport($(".odometer.count-4"))) {
                setTimeout(function() {
                    $(".count-4-1").html(383);
                    $(".count-4-2").html(59);
                    $(".count-4-3").html(6);
                }, 0);
            }
        }
        if ($(".odometer.count-5").length > 0) {
            if (isElementInViewport($(".odometer.count-5"))) {
                setTimeout(function() {
                    $(".count-5-1").html(6950);
                }, 0);
            }
        }
        if ($(".odometer.count-6").length > 0) {
            if (isElementInViewport($(".odometer.count-6"))) {
                setTimeout(function() {
                    $(".count-6-1").html(16);
                    $(".count-6-2").html(12);
                    $(".count-6-3").html(196);
                    $(".count-6-4").html(55);
                }, 0);
            }
        }
    });
}