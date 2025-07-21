if ($(".sw-auto").length > 0) {
    var tfSwAuto = $(".sw-auto");
    var preview = tfSwAuto.data("preview");
    var spacing = tfSwAuto.data("space");
    var loop = tfSwAuto.data("loop");
    var speed = tfSwAuto.data("speed");
    var delay = tfSwAuto.data("delay");
    var swiper = new Swiper(".sw-auto", {
        autoplay: {
            delay: 0,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        slidesPerView: preview,
        loop: loop,
        spaceBetween: spacing,
        speed: speed,
    });

    tfSwAuto.hover(
        function() {
            this.swiper.autoplay.stop();
        },
        function() {
            this.swiper.autoplay.start();
        }
    );
}

if ($(".sw-single").length > 0) {
    const tfSwCategories = $(".sw-single");
    var effect = tfSwCategories.data("effect");
    var loop = tfSwCategories.data("loop") || false;
    var swiperSlider = {
        slidesPerView: 1,
        loop: loop,
        navigation: {
            clickable: true,
            nextEl: ".sw-single-next",
            prevEl: ".sw-single-prev",
        },
        pagination: {
            el: ".sw-pagination-single",
            clickable: true,
        },
    };

    if (effect === "fade") {
        swiperSlider.effect = "fade";
        swiperSlider.fadeEffect = {
            crossFade: true,
        };
    }
    if (effect === "creative") {
        swiperSlider.effect = "creative";
        swiperSlider.creativeEffect = {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        };
    }
    var swiper = new Swiper(".sw-single", swiperSlider);
}

if ($(".sw-layout-1").length > 0) {
    $(".sw-layout-1").each(function() {
        var $this = $(this);
        var tfSwCategories = $(".sw-layout-1");
        var preview = tfSwCategories.data("preview");
        var tablet = tfSwCategories.data("tablet");
        var mobile = tfSwCategories.data("mobile");
        var mobileSm =
            tfSwCategories.data("mobile-sm") !== undefined ?
            tfSwCategories.data("mobile-sm") :
            mobile;
        var spacingLg = tfSwCategories.data("space-lg");
        var spacingMd = tfSwCategories.data("space-md");
        var spacing = tfSwCategories.data("space");
        var perGroup = tfSwCategories.data("pagination") || 1;
        var perGroupMd = tfSwCategories.data("pagination-md") || 1;
        var perGroupLg = tfSwCategories.data("pagination-lg") || 1;
        var loop =
            tfSwCategories.data("loop") !== undefined ?
            tfSwCategories.data("loop") :
            false;
        var swiper = new Swiper(".sw-layout-1", {
            slidesPerView: mobile,
            spaceBetween: spacing,
            speed: 1000,
            pagination: {
                el: ".sw-pagination-layout-3",
                clickable: true,
            },
            slidesPerGroup: perGroup,
            observer: true,
            observeParents: true,
            navigation: {
                clickable: true,
                nextEl: ".nav-next-layout-1",
                prevEl: ".nav-prev-layout-1",
            },
            loop: loop,
            breakpoints: {
                575: {
                    slidesPerView: mobileSm,
                    spaceBetween: spacing,
                    slidesPerGroup: perGroup,
                },
                768: {
                    slidesPerView: tablet,
                    spaceBetween: spacingMd,
                    slidesPerGroup: perGroupMd,
                },
                1200: {
                    slidesPerView: preview,
                    spaceBetween: spacingLg,
                    slidesPerGroup: perGroupLg,
                },
            },
        });
    });
}

if ($(".sw-layout").length > 0) {
    $(".sw-layout").each(function() {
        var tfSwCategories = $(this);
        var preview = tfSwCategories.data("preview");
        var tablet = tfSwCategories.data("tablet");
        var mobile = tfSwCategories.data("mobile");
        var mobileSm =
            tfSwCategories.data("mobile-sm") !== undefined ?
            tfSwCategories.data("mobile-sm") :
            mobile;
        var spacingLg = tfSwCategories.data("space-lg");
        var spacingMd = tfSwCategories.data("space-md");
        var spacing = tfSwCategories.data("space");
        var perGroup = tfSwCategories.data("pagination") || 1;
        var perGroupMd = tfSwCategories.data("pagination-md") || 1;
        var perGroupLg = tfSwCategories.data("pagination-lg") || 1;
        var grid = tfSwCategories.data("grid") || 1;
        var mdGrid = tfSwCategories.data("mdgrid") || 1;
        var lgGrid = tfSwCategories.data("lggrid") || 1;
        var loop = tfSwCategories.data("loop") || false;
        var swiperInstance;

        function initSwiper() {
            if (swiperInstance) swiperInstance.destroy(true, true);
            swiperInstance = new Swiper(tfSwCategories[0], {
                slidesPerView: mobile,
                spaceBetween: spacing,
                speed: 1000,
                grid: {
                    rows: grid,
                    fill: "row",
                },
                pagination: {
                    el: tfSwCategories.find(".sw-pagination-layout")[0],
                    clickable: true,
                },
                slidesPerGroup: perGroup,
                observer: true,
                observeParents: true,
                navigation: {
                    clickable: true,
                    nextEl: tfSwCategories.find(".nav-next-layout")[0],
                    prevEl: tfSwCategories.find(".nav-prev-layout")[0],
                },
                loop: loop,
                breakpoints: {
                    575: {
                        slidesPerView: mobileSm,
                        spaceBetween: spacing,
                        slidesPerGroup: perGroup,
                    },
                    768: {
                        slidesPerView: tablet,
                        spaceBetween: spacingMd,
                        slidesPerGroup: perGroupMd,
                        grid: {
                            rows: mdGrid,
                            fill: "row",
                        },
                    },
                    1200: {
                        slidesPerView: preview,
                        spaceBetween: spacingLg,
                        slidesPerGroup: perGroupLg,
                        grid: {
                            rows: lgGrid,
                            fill: "row",
                            gap: 48,
                        },
                    },
                },
            });
        }
        initSwiper();
        window.addEventListener("resize", function() {
            initSwiper();
        });
    });
}

if ($(".tf-sw-mobile").length > 0) {
    $(".tf-sw-mobile").each(function() {
        var swiperMb;
        var $this = $(this);
        var screenWidth = $this.data("screen");

        function initSwiper() {
            if (
                matchMedia(`only screen and (max-width: ${screenWidth}px)`)
                .matches
            ) {
                if (!swiperMb) {
                    var preview = $this.data("preview");
                    var spacing = $this.data("space");

                    swiperMb = new Swiper($this[0], {
                        slidesPerView: preview,
                        spaceBetween: spacing,
                        speed: 1000,
                        pagination: {
                            el: $this.find(".sw-pagination-mb")[0],
                            clickable: true,
                        },
                        navigation: {
                            nextEl: $this.find(".nav-prev-mb")[0],
                            prevEl: $this.find(".nav-next-mb")[0],
                        },
                    });
                }
            } else {
                if (swiperMb) {
                    swiperMb.destroy(true, true);
                    swiperMb = null;
                    $this.find(".swiper-wrapper").removeAttr("style");
                    $this.find(".swiper-slide").removeAttr("style");
                }
            }
        }

        initSwiper();
        window.addEventListener("resize", function() {
            initSwiper();
        });
    });
}

if ($(".sw-testimonial").length > 0) {
    var tfSwCategories = $(".sw-testimonial");
    var preview = tfSwCategories.data("preview");
    var tablet = tfSwCategories.data("tablet");
    var mobile = tfSwCategories.data("mobile");
    var mobileSm =
        tfSwCategories.data("mobile-sm") !== undefined ?
        tfSwCategories.data("mobile-sm") :
        mobile;
    var spacingLg = tfSwCategories.data("space-lg");
    var spacingMd = tfSwCategories.data("space-md");
    var spacing = tfSwCategories.data("space");
    var perGroup = tfSwCategories.data("pagination") || 1;
    var perGroupMd = tfSwCategories.data("pagination-md") || 1;
    var perGroupLg = tfSwCategories.data("pagination-lg") || 1;
    var loop =
        tfSwCategories.data("loop") !== undefined ?
        tfSwCategories.data("loop") :
        false;
    var swiper = new Swiper(".sw-testimonial", {
        slidesPerView: mobile,
        spaceBetween: spacing,
        speed: 1000,
        pagination: {
            el: ".sw-pagination-testimonial",
            clickable: true,
        },
        slidesPerGroup: perGroup,
        observer: true,
        observeParents: true,
        navigation: {
            clickable: true,
            nextEl: ".nav-next-testimonial",
            prevEl: ".nav-prev-testimonial",
        },
        loop: loop,
        breakpoints: {
            575: {
                slidesPerView: mobileSm,
                spaceBetween: spacing,
                slidesPerGroup: perGroup,
            },
            768: {
                slidesPerView: tablet,
                spaceBetween: spacingMd,
                slidesPerGroup: perGroupMd,
            },
            1200: {
                slidesPerView: preview,
                spaceBetween: spacingLg,
                slidesPerGroup: perGroupLg,
            },
        },
    });
}

if ($(".thumbs-slider").length > 0) {
    var direction = $(".tf-product-media-thumbs").data("direction");
    var thumbs = new Swiper(".tf-product-media-thumbs", {
        spaceBetween: 10,
        slidesPerView: "auto",
        freeMode: true,
        direction: "vertical",
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        breakpoints: {
            0: {
                direction: "horizontal",
            },
            767: {
                direction: "vertical",
                direction: direction,
            },
        },
        450: {
            direction: "vertical",
        },
    });
    var main = new Swiper(".tf-product-media-main", {
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".thumbs-next",
            prevEl: ".thumbs-prev",
        },
        thumbs: {
            swiper: thumbs,
        },
    });

    // color
    function updateActiveColorButton(activeIndex) {
        $(".color-btn").removeClass("active");

        var currentSlide = $(".tf-product-media-main .swiper-slide").eq(activeIndex);
        var currentColor = currentSlide.data("color");
        if (currentColor) {
            $(".color-btn[data-color='" + currentColor + "']").addClass("active");
            $('.value-currentColor').text(currentColor);
            $(".select-currentColor").text(currentColor);
        }
    }
    main.on('slideChange', function() {
        updateActiveColorButton(this.activeIndex);
    });

    // Function scroll to the correct slide and thumb
    function scrollToColor(color) {
        var matchingSlides = $(".tf-product-media-main .swiper-slide").filter(function() {
            return $(this).data("color") === color;
        });
        if (matchingSlides.length > 0) {
            var firstIndex = matchingSlides.first().index();
            main.slideTo(firstIndex, 1000, false);
            thumbs.slideTo(firstIndex, 1000, false);
        }
    }
    $(".color-btn").on("click", function() {
        var color = $(this).data("color");

        $(".color-btn").removeClass("active");
        $(this).addClass("active");

        scrollToColor(color);
    });
    updateActiveColorButton(main.activeIndex);

    // material
    function updateActiveOtherVariantBtn(activeIndex) {
        $(".other-variant-btn").removeClass("active");

        var currentSlide = $(".tf-product-media-main .swiper-slide").eq(activeIndex);
        var currentOtherVariant = currentSlide.data("other-variant");
        if (currentOtherVariant) {
            $(".other-variant-btn[data-other-variant='" + currentOtherVariant + "']").addClass("active");
            $('.value-currentVariant').text(currentOtherVariant);
            $(".select-currentVariant").text(currentOtherVariant);
        }
    }
    main.on('slideChange', function() {
        updateActiveOtherVariantBtn(this.activeIndex);
    });

    // Function scroll to the correct slide and thumb
    function scrollToOtherVariant(otherVariant) {
        var matchingSlides = $(".tf-product-media-main .swiper-slide").filter(function() {
            return $(this).data("other-variant") === otherVariant;
        });
        if (matchingSlides.length > 0) {
            var firstIndex = matchingSlides.first().index();
            main.slideTo(firstIndex, 1000, false);
            thumbs.slideTo(firstIndex, 1000, false);
        }
    }
    $(".other-variant-btn").on("click", function() {
        var otherVariant = $(this).data("other-variant");

        $(".other-variant-btn").removeClass("active");
        $(this).addClass("active");
        scrollToOtherVariant(otherVariant);
    });
    updateActiveOtherVariantBtn(main.activeIndex);

}