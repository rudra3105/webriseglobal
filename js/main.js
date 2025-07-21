/**
 * 
 * handleFooter
 * tecko_button
 * selectImages
 * parallaxImage
 * infiniteslide
 * accordionActive
 * hoverActive
 * hoverTabs
 * optimizedTabsHandle
 * changeValue
 * rangePrice
 * tabs
 * totalPriceVariant
 * filterTab
 * wowAnimation
 * rangeTwoPrice
 * goTop
 * loadItem
 * cursorCustom
 * handleSidebarFilter
 
**/

(function($) {
    ("use strict");

    /* footer accordion
  -------------------------------------------------------------------------*/
    var handleFooter = function() {
        var footerAccordion = function() {
            var args = {
                duration: 250
            };
            $(".footer-heading-mobile").on("click", function() {
                $(this).parent(".footer-col-block").toggleClass("open");
                if (!$(this).parent(".footer-col-block").is(".open")) {
                    $(this).next().slideUp(args);
                } else {
                    $(this).next().slideDown(args);
                }
            });
        };

        function handleAccordion() {
            if (matchMedia("only screen and (max-width: 767px)").matches) {
                if (!$(".footer-heading-mobile").data("accordion-initialized")) {
                    footerAccordion();
                    $(".footer-heading-mobile").data(
                        "accordion-initialized",
                        true
                    );
                }
            } else {
                $(".footer-heading-mobile").off("click");
                $(".footer-heading-mobile")
                    .parent(".footer-col-block")
                    .removeClass("open");
                $(".footer-heading-mobile").next().removeAttr("style");
                $(".footer-heading-mobile").data(
                    "accordion-initialized",
                    false
                );
            }
        }
        handleAccordion();
        window.addEventListener("resize", function() {
            handleAccordion();
        });
    };

    /* tecko_button
  -------------------------------------------------------------------------*/
    var tecko_button = () => {
        $(".tf-btn").each(function() {
            var button_width = $(this).outerWidth();
            $(this).css("--tecko-button-width", button_width + "px");
        });
        $(".tf-btn")
            .on("mouseenter", function(e) {
                var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                $(this).find(".bg-effect").css({
                    top: relY,
                    left: relX
                });
            })
            .on("mouseout", function(e) {
                var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                $(this).find(".bg-effect").css({
                    top: relY,
                    left: relX
                });
            });
    };

    /* selectImages
  -------------------------------------------------------------------------*/
    var selectImages = function() {
        if ($(".image-select").length > 0) {
            const selectIMG = $(".image-select");
            selectIMG.find("option").each((idx, elem) => {
                const selectOption = $(elem);
                const imgURL = selectOption.attr("data-thumbnail");
                if (imgURL) {
                    selectOption.attr(
                        "data-content",
                        `<img src="${imgURL}" /> ${selectOption.text()}`
                    );
                }
            });
            selectIMG.selectpicker();
        }
    };

    /* header_sticky
  -------------------------------------------------------------------------------------*/
    const headerFixed = function() {
        let lastScrollTop = 0;
        const delta = 5;
        const $header = $(".header-sticky");
        let didScroll = false;
        const navbarHeight = $header.outerHeight();
        $(window).on("scroll", function() {
            didScroll = true;
            const scrollTop = $(this).scrollTop();
            if (scrollTop < navbarHeight * 5) {
                $header.removeClass("is-sticky");
            }
        });
        setInterval(function() {
            if (didScroll) {
                const st = $(window).scrollTop();
                if (st > navbarHeight) {
                    if (st > lastScrollTop + delta) {
                        $header.removeClass("is-sticky");
                    } else if (st < lastScrollTop - delta) {
                        $header.addClass("is-sticky");
                    }
                } else {
                    $header.removeClass("is-sticky");
                }
                lastScrollTop = st;
                didScroll = false;
            }
        }, 0);
    };

    /* headerFixed
  -------------------------------------------------------------------------------------*/
    var headerFixed2 = function() {
        if ($(".header-fixed").length) {
            const $header = $(".header-fixed");
            const navbarHeight = $header.outerHeight();

            $(window).on("scroll", function() {
                const scrollTop = $(this).scrollTop();
                $header.toggleClass("is-fixed", scrollTop >= 350);
            });
        }

        $(".inner-link").click(function() {
            $(this)
                .closest(".navigation")
                .find("li.inner-link")
                .removeClass("current-menu");
            $(this).addClass("current-menu");
        });

        window.addEventListener("scroll", function() {
            let current = "";
            const sections = document.querySelectorAll(".section-one-page");
            const navLinks = document.querySelectorAll(".inner-link ");

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("current-menu");
                if (
                    link.querySelector("a").getAttribute("href") ===
                    `#${current}`
                ) {
                    link.classList.add("current-menu");
                }
            });
        });
    };

    /* accordionActive
  -------------------------------------------------------------------------------------*/
    var accordionActive = function() {
        if ($(".action_click").length > 0) {
            var isProcessing = false;
            $(".action").click(function() {
                if (isProcessing) {
                    return;
                }
                isProcessing = true;
                $(".action_click")
                    .not($(this).closest(".action_click"))
                    .removeClass("active");
                $(this).closest(".action_click").toggleClass("active");
                setTimeout(function() {
                    isProcessing = false;
                }, 500);
            });
        }
    };
    /* parallaxImage 
  -------------------------------------------------------------------------------------*/
    var parallaxImage = function() {
        if ($(".parallax-img").length > 0) {
            let effectparallax = $(".parallax-img");
            let style = effectparallax.data("style") || "up";
            let scale = effectparallax.data("scale") || 1.3;
            $(".parallax-img").each(function() {
                new SimpleParallax(this, {
                    delay: 0.6,
                    orientation: style,
                    scale: scale,
                    transition: "cubic-bezier(0,0,0,1)",
                    customContainer: "",
                    customWrapper: "",
                });
            });
        }
    };

    /* infiniteslide 
  -------------------------------------------------------------------------------------*/
    var infiniteslide = function() {
        if ($(".infiniteslide").length > 0) {
            $(".infiniteslide").each(function() {
                var $this = $(this);
                var style = $this.data("style") || "left";
                var clone = $this.data("clone") || 4;
                $this.infiniteslide({
                    direction: style,
                    clone: clone,
                });
            });
        }
    };

    /* hoverActive 
  -------------------------------------------------------------------------------------*/
    var hoverActive = function() {
        $(".wrap-box-hover-active").each(function(index) {
            var $container = $(this);
            var containerId = `hover-container-${index}`;
            $container.attr("data-hover-id", containerId);
            var $hoverItems = $container.find(".item-hover");
            if (
                $container.find(".item-hover.is-active").length === 0 &&
                $hoverItems.length > 0
            ) {
                $hoverItems.first().addClass("is-active");
            }
            $container.on("mouseenter", ".item-hover", function() {
                var $activeItem = $container.find(".item-hover.is-active");
                if ($activeItem.length > 0 && $activeItem[0] !== this) {
                    $activeItem.removeClass("is-active");
                }
                $(this).addClass("is-active");
            });
        });
    };

    /* hoverTabs 
  -------------------------------------------------------------------------------------*/
    var hoverTabs = function() {
        $(".tabs-hover-wrap").each(function() {
            const $wrapper = $(this);
            const $tabBtns = $wrapper.find(".item");
            const $tabContents = $wrapper.find(".tab-content");
            let hoverTimer;
            $tabBtns
                .on("mouseenter", function() {
                    const $this = $(this);
                    hoverTimer = setTimeout(function() {
                        const tabId = $this.data("tab");
                        if (!$this.hasClass("active")) {
                            $tabBtns.removeClass("active");
                            $this.addClass("active");
                            $tabContents.removeClass("active");
                            $wrapper.find(`#${tabId}`).addClass("active");
                        }
                    }, 100);
                })
                .on("mouseleave", function() {
                    clearTimeout(hoverTimer);
                });
            $tabBtns.first().addClass("active");
            $tabContents.first().addClass("active");
        });
    };

    /* optimizedTabsHandle 
  -------------------------------------------------------------------------------------*/
    const optimizedTabsHandle = () => {
        const $scope = $(".wrap-switch-tabs-content");
        const $toggleSlide = $scope.find(".toggle-slide");
        const $tabItems = $scope.find(".tabs-content-switch .tab-item");
        const initialWidth = $scope
            .find(".switch-button-item.is-active")
            .outerWidth();
        $toggleSlide.width(initialWidth);
        $scope.on("click", ".switch-button-item", function(e) {
            e.preventDefault();
            const $clickedTab = $(this);
            const targetData = $clickedTab.data("title");
            $scope.find(".tab-title-text").toggleClass("is-active");
            $scope
                .find(".switch-button-item.is-active")
                .removeClass("is-active");
            $clickedTab.addClass("is-active");
            $toggleSlide
                .width($clickedTab.outerWidth())
                .css({
                    left: this.offsetLeft
                });
            $tabItems.removeClass("is-active");
            $(targetData.target).addClass("is-active");
        });
    };

    /* changeValue 
  -------------------------------------------------------------------------------------*/
    var changeValue = function() {
        if ($(".tf-dropdown-sort").length > 0) {
            $(".select-item").click(function(event) {
                $(this)
                    .closest(".tf-dropdown-sort")
                    .find(".text-sort-value")
                    .text($(this).find(".text-value-item").text());
                $(this)
                    .closest(".dropdown-menu")
                    .find(".select-item.active")
                    .removeClass("active");
                $(this).addClass("active");
                var color = $(this).data("value-color");
                $(this)
                    .closest(".tf-dropdown-sort")
                    .find(".btn-select")
                    .find(".current-color")
                    .css("background", color);
            });
        }
    };

    /* tabs
  -------------------------------------------------------------------------*/
    var tabs = function() {
        $(".widget-tabs").each(function() {
            $(this)
                .find(".widget-menu-tab")
                .children(".item-title")
                .on("click", function() {
                    var liActive = $(this).index();
                    var contentActive = $(this)
                        .siblings()
                        .removeClass("active")
                        .parents(".widget-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive);
                    contentActive.addClass("active").fadeIn("slow");
                    contentActive.siblings().removeClass("active");
                    $(this)
                        .addClass("active")
                        .parents(".widget-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive);
                });
        });
    };
    /* rangePrice
  -------------------------------------------------------------------------*/
    var rangePrice = function() {
        $(".widget-size").each(function() {
            var $rangeInput = $(this).find(".range-input input");
            var $progress = $(this).find(".progress-size");
            var $maxPrice = $(this).find(".max-size");

            $rangeInput.on("input", function() {
                var maxValue = parseInt($rangeInput.val(), 10);

                var percentMax = (maxValue / $rangeInput.attr("max")) * 100;
                $progress.css("width", percentMax + "%");

                $maxPrice.html(maxValue);
            });
        });
    };

    /* totalPriceVariant
  ------------------------------------------------------------------------------------- */
    var totalPriceVariant = function() {
        $(".tf-product-info-list,.tf-cart-item,.tf-mini-cart-item").each(
            function() {
                var productItem = $(this);
                var basePrice =
                    parseFloat(
                        productItem.find(".price-on-sale").data("base-price")
                    ) ||
                    parseFloat(
                        productItem
                        .find(".price-on-sale")
                        .text()
                        .replace("$", "")
                    );
                var quantityInput = productItem.find(".quantity-product");

                productItem
                    .find(".color-btn, .size-btn")
                    .on("click", function() {
                        var newPrice =
                            parseFloat($(this).data("price")) || basePrice;
                        quantityInput.val(1);
                        productItem
                            .find(".price-on-sale")
                            .text(
                                "$" +
                                newPrice
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            );
                        updateTotalPrice(newPrice, productItem);
                    });

                productItem.find(".btn-increase").on("click", function() {
                    var currentQuantity = parseInt(quantityInput.val());
                    quantityInput.val(currentQuantity + 1);
                    updateTotalPrice(null, productItem);
                });

                productItem.find(".btn-decrease").on("click", function() {
                    var currentQuantity = parseInt(quantityInput.val());
                    if (currentQuantity > 1) {
                        quantityInput.val(currentQuantity - 1);
                        updateTotalPrice(null, productItem);
                    }
                });

                function updateTotalPrice(price, scope) {
                    var currentPrice =
                        price ||
                        parseFloat(
                            scope.find(".price-on-sale").text().replace("$", "")
                        );
                    var quantity = parseInt(
                        scope.find(".quantity-product").val()
                    );
                    var totalPrice = currentPrice * quantity;
                    scope
                        .find(".total-price")
                        .text(
                            "$" +
                            totalPrice
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        );
                }
            }
        );
    };

    /* filterTab
  -------------------------------------------------------------------------------------*/
    var filterTab = function() {
        if ($(".tf-btns-filter").length > 0) {
            var $btnFilter = $(".tf-btns-filter").click(function() {
                const $parent = $(".parent > div");
                if (this.id === "all") {
                    $parent.show();
                } else {
                    const $el = $parent.filter("." + this.id);
                    $el.fadeIn();
                    $parent.not($el).hide();
                }
                $btnFilter.removeClass("is--active");
                $(this).addClass("is--active");
            });
        }
    };

    /* wowAnimation
  -------------------------------------------------------------------------------------*/
    var wowAnimation = () => {
        if ($(".wow").length > 0) {
            var wow = new WOW({
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: false,
                live: true,
            });
            wow.init();
        }
    };

    /* goTop
  -------------------------------------------------------------------------------------*/
    var goTop = function() {
        if ($("div").hasClass("progress-wrap")) {
            var progressPath = document.querySelector(".progress-wrap path");
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition =
                progressPath.style.WebkitTransition = "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition =
                progressPath.style.WebkitTransition =
                "stroke-dashoffset 10ms linear";
            var updateprogress = function() {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateprogress();
            $(window).scroll(updateprogress);
            var offset = 200;
            var duration = 0;
            jQuery(window).on("scroll", function() {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery(".progress-wrap").addClass("active-progress");
                } else {
                    jQuery(".progress-wrap").removeClass("active-progress");
                }
            });
            jQuery(".progress-wrap").on("click", function(event) {
                event.preventDefault();
                jQuery("html, body").animate({
                    scrollTop: 0
                }, duration);
                return false;
            });
        }
    };

    /* Range Two Price
  -------------------------------------------------------------------------------------*/
    var rangeTwoPrice = function() {
        if ($("#price-value-range").length > 0) {
            var skipSlider = document.getElementById("price-value-range");
            var skipValues = [
                document.getElementById("price-min-value"),
                document.getElementById("price-max-value"),
            ];

            var min = parseInt(skipSlider.getAttribute("data-min"));
            var max = parseInt(skipSlider.getAttribute("data-max"));
            var start = parseInt(skipSlider.getAttribute("data-start"));

            noUiSlider.create(skipSlider, {
                start: [start, max],
                connect: true,
                step: 1,
                range: {
                    min: min,
                    max: max,
                },
                format: {
                    from: function(value) {
                        return parseInt(value);
                    },
                    to: function(value) {
                        return parseInt(value);
                    },
                },
            });

            skipSlider.noUiSlider.on("update", function(val, e) {
                skipValues[e].innerText = val[e];
            });
        }
        if ($("#price-value-range-2").length > 0) {
            var skipSlider = document.getElementById("price-value-range-2");
            var skipValues = [
                document.getElementById("price-min-value-2"),
                document.getElementById("price-max-value-2"),
            ];

            var min = parseInt(skipSlider.getAttribute("data-min"));
            var max = parseInt(skipSlider.getAttribute("data-max"));
            var start = parseInt(skipSlider.getAttribute("data-start"));

            noUiSlider.create(skipSlider, {
                start: [start, max],
                connect: true,
                step: 1,
                range: {
                    min: min,
                    max: max,
                },
                format: {
                    from: function(value) {
                        return parseInt(value);
                    },
                    to: function(value) {
                        return parseInt(value);
                    },
                },
            });

            skipSlider.noUiSlider.on("update", function(val, e) {
                skipValues[e].innerText = val[e];
            });
        }
    };

    /* loadItem
    -------------------------------------------------------------------------------------*/
    var loadItem = function() {
        const gridInitialItems = 9;
        const listInitialItems = 4;
        const gridItemsPerPage = 3;
        const listItemsPerPage = 2;

        let listItemsDisplayed = listInitialItems;
        let gridItemsDisplayed = gridInitialItems;

        function hideExtraItems(layout, itemsDisplayed) {
            layout.find(".loadItem").each(function(index) {
                if (index >= itemsDisplayed) {
                    $(this).addClass("hidden");
                }
            });
            if (layout.is("#listLayout")) updateLastVisible(layout);
            checkLoadMoreButton(layout); // Kiểm tra trạng thái nút sau khi ẩn
        }

        function showMoreItems(layout, itemsPerPage, itemsDisplayed) {
            const hiddenItems = layout.find(".loadItem.hidden");

            setTimeout(function() {
                hiddenItems.slice(0, itemsPerPage).removeClass("hidden");
                if (layout.is("#listLayout")) updateLastVisible(layout);
                checkLoadMoreButton(layout); // Kiểm tra trạng thái nút sau khi hiển thị thêm
            }, 600);

            return itemsDisplayed + itemsPerPage;
        }

        function updateLastVisible(layout) {
            layout.find(".loadItem").removeClass("last-visible");
            layout
                .find(".loadItem")
                .not(".hidden")
                .last()
                .addClass("last-visible");
        }

        function checkLoadMoreButton(layout) {
            if (layout.is("#listLayout")) {
                const displayedItems = layout
                    .find(".loadItem")
                    .not(".hidden").length;
                if (displayedItems > listInitialItems) {
                    $("#loadMoreListBtn").hide();
                } else {
                    $("#loadMoreListBtn").show();
                }
            } else if (layout.is("#gridLayout")) {
                const displayedItems = layout
                    .find(".loadItem")
                    .not(".hidden").length;
                if (displayedItems > gridInitialItems) {
                    $("#loadMoreGridBtn").hide();
                } else {
                    $("#loadMoreGridBtn").show();
                }
            }
        }

        hideExtraItems($("#listLayout"), listItemsDisplayed);
        hideExtraItems($("#gridLayout"), gridItemsDisplayed);

        $("#loadMoreListBtn").on("click", function() {
            listItemsDisplayed = showMoreItems(
                $("#listLayout"),
                listItemsPerPage,
                listItemsDisplayed
            );
        });

        $("#loadMoreGridBtn").on("click", function() {
            gridItemsDisplayed = showMoreItems(
                $("#gridLayout"),
                gridItemsPerPage,
                gridItemsDisplayed
            );
        });
    };

    /* cursorCustom
    -------------------------------------------------------------------------------------*/
    var cursorCustom = function() {
        if ($(".custom-cursor").length > 0) {
            var cursor = $(".custom-cursor");
            var title = $(".process-title");
            var widget_content = $(".area-cursor-custom");

            function moveCursor(event) {
                var widget_content_offset_left = widget_content.offset().left;
                var widget_content_offset_top =
                    widget_content.offset().top - $(window).scrollTop();
                cursor[0].style.top = `${
                    event.clientY - widget_content_offset_top - 60
                }px`;
                cursor[0].style.left = `${
                    event.clientX - widget_content_offset_left - 60
                }px`;
                cursor[0].style.opacity = `1`;
                cursor[0].style.transform = `scale(1)`;
            }

            widget_content[0].onmousemove = (event) => {
                moveCursor(event);
            };

            widget_content[0].onpointermove = (event) => {
                moveCursor(event);
            };
            widget_content[0].onmouseleave = (event) => {
                cursor[0].style.opacity = `0`;
                cursor[0].style.transform = `scale(0.3)`;
            };
            title.each(function(index, element) {
                $(this).on({
                    mouseenter: function() {
                        cursor.addClass("disable");
                    },
                    mouseleave: function() {
                        cursor.removeClass("disable");
                    },
                });
            });
        }
    };

    /* handleSidebarFilter
    -------------------------------------------------------------------------------------*/
    var handleSidebarFilter = function() {
        $(".filterShop").click(function() {
            if ($(window).width() <= 1200) {
                $(".sildebar-fiiler,.overlay-filter").addClass("show");
            }
        });
        $(".close-filter ,.overlay-filter").click(function() {
            $(".sildebar-fiiler,.overlay-filter").removeClass("show");
        });
    };

    /* preloader
  -------------------------------------------------------------------------------------*/
    var preloader = function() {
        $("#loading").fadeOut("slow", function() {
            $(this).remove();
        });
    };

    // Dom Ready
    $(function() {
        handleFooter();
        headerFixed2();
        tecko_button();
        headerFixed();
        selectImages();
        parallaxImage();
        infiniteslide();
        accordionActive();
        hoverActive();
        hoverTabs();
        optimizedTabsHandle();
        changeValue();
        rangePrice();
        tabs();
        totalPriceVariant();
        filterTab();
        wowAnimation();
        rangeTwoPrice();
        goTop();
        loadItem();
        cursorCustom();
        handleSidebarFilter();
        preloader();
    });
})(jQuery);