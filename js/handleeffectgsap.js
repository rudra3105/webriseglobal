gsap.registerPlugin(ScrollTrigger);
(function($) {
    ("use strict");

    /* changetext
  -------------------------------------------------------------------------*/
    var changetext = function() {
        if ($(".text-change-color").length > 0) {
            const textChanges = $(".text-change-color");
            if (textChanges.length === 0) return;
            textChanges.each((index, textChange) => {
                const split = new SplitText(textChange, {
                    type: "lines",
                    position: "relative",
                    linesClass: "split-line",
                });
                split.lines.forEach((line) => {
                    gsap.to(line, {
                        backgroundPositionX: "0%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: line,
                            start: "top center",
                            end: "bottom center",
                            scrub: true,
                        },
                    });
                });
            });
        }
    };

    /* stackElement
  -------------------------------------------------------------------------*/
    var stackElement = function() {
        if ($(".stack-element").length > 0) {
            let totalHeight;
            let scrollTriggerInstances = [];
            const updateTotalHeight = () => {
                totalHeight = $(".tabs-content-wrap").outerHeight();
                scrollTriggerInstances.forEach((instance) => {
                    instance.kill();
                });
                scrollTriggerInstances = [];
                document
                    .querySelectorAll(".element:not(:last-child)")
                    .forEach((element, index) => {
                        const tabHeight = element.offsetHeight;
                        totalHeight -= tabHeight;
                        const pinTrigger = ScrollTrigger.create({
                            trigger: element,
                            scrub: 1,
                            start: "top 30",
                            end: `+=${totalHeight}`,
                            pin: true,
                            pinSpacing: false,
                            animation: gsap.to(element, {
                                scale: 0.9,
                            }),
                        });
                        scrollTriggerInstances.push(pinTrigger);
                    });
            };
            updateTotalHeight();
            window.addEventListener("resize", () => {
                updateTotalHeight();
            });
        }
    };

    /* processBar
  -------------------------------------------------------------------------*/
    var processBar = function() {
        if ($(".section-progress").length > 0) {
            gsap.registerPlugin(ScrollToPlugin);
            const progressBar = document.querySelector(".progress-bar");
            const steps = document.querySelectorAll(".step");

            gsap.to(progressBar, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: ".section-progress",
                    start: $(".section-progress").hasClass("onepage") ?
                        "top 96" :
                        "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const stepIndex = Math.floor(
                            self.progress * steps.length
                        );
                        const progressWidth = parseFloat(
                            progressBar.style.width
                        );
                        if (progressWidth > 0) {
                            steps.forEach((step, index) => {
                                step.classList.toggle(
                                    "active",
                                    index <= stepIndex
                                );
                            });
                        }
                    },
                },
            });

            ScrollTrigger.create({
                trigger: ".progress-container",
                start: $(".section-progress").hasClass("onepage") ?
                    "top 96" :
                    "top 30",
                endTrigger: ".section-progress",
                end: "bottom center",
                pin: true,
                pinSpacing: false,
            });

            $(".step").on("click", function() {
                const targetSelector = $(this).data("target");
                const targetElement = $(targetSelector)[0];
                if (targetElement) {
                    gsap.to(window, {
                        duration: 0.3,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 240
                        },
                        ease: "linear",
                    });
                }
            });

            let totalHeight = $(
                ".section-progress .tabs-content-wrap"
            ).outerHeight();

            $(".section-progress .box-reporting").each(function() {
                const tabHeight = $(this).outerHeight();
                totalHeight -= tabHeight;
                gsap.to(this, {
                    scrollTrigger: {
                        trigger: this,
                        scrub: 1,
                        start: $(".section-progress").hasClass("onepage") ?
                            "top 96" :
                            "top 120",
                        end: `+=${totalHeight}`,
                        pin: this,
                        pinSpacing: false,
                    },
                });
            });
        }
    };

    /* animation_text
  -------------------------------------------------------------------------*/
    var animation_text = function() {
        if ($(".split-text").length > 0) {
            var st = $(".split-text");
            if (st.length === 0) return;
            gsap.registerPlugin(SplitText);
            st.each(function(index, el) {
                const $el = $(el);
                const $target =
                    $el.find("p, a").length > 0 ? $el.find("p, a")[0] : el;
                const hasClass = $el.hasClass.bind($el);
                const pxl_split = new SplitText($target, {
                    type: "words, chars",
                    lineThreshold: 0.5,
                    linesClass: "split-line",
                });
                let split_type_set = pxl_split.chars;
                gsap.set($target, {
                    perspective: 400
                });
                const settings = {
                    scrollTrigger: {
                        trigger: $target,
                        start: "-200 86%",
                        toggleActions: "play none none reverse",
                    },
                    duration: 0.9,
                    stagger: 0.02,
                    ease: "power3.out",
                };
                if (hasClass("effect-fade")) {
                    settings.opacity = 0;
                }
                if (hasClass("effect-right")) {
                    settings.opacity = 0;
                    settings.x = "50";
                }
                if (hasClass("effect-left")) {
                    settings.opacity = 0;
                    settings.x = "-50";
                }
                if (hasClass("effect-up")) {
                    settings.opacity = 0;
                    settings.y = "80";
                }
                if (hasClass("effect-down")) {
                    settings.opacity = 0;
                    settings.y = "-80";
                }
                if (hasClass("effect-rotate")) {
                    settings.opacity = 0;
                    settings.rotateX = "50deg";
                }
                if (hasClass("effect-scale")) {
                    settings.opacity = 0;
                    settings.scale = "0.5";
                }
                if (
                    hasClass("split-lines-transform") ||
                    hasClass("split-lines-rotation-x")
                ) {
                    pxl_split.split({
                        type: "lines",
                        lineThreshold: 0.5,
                        linesClass: "split-line",
                    });
                    split_type_set = pxl_split.lines;
                    settings.opacity = 0;
                    settings.stagger = 0.5;
                    if (hasClass("split-lines-rotation-x")) {
                        settings.rotationX = -120;
                        settings.transformOrigin = "top center -50";
                    } else {
                        settings.yPercent = 100;
                        settings.autoAlpha = 0;
                    }
                }
                if (hasClass("split-words-scale")) {
                    pxl_split.split({
                        type: "words"
                    });
                    split_type_set = pxl_split.words;
                    split_type_set.forEach((elw, index) => {
                        gsap.set(
                            elw, {
                                opacity: 0,
                                scale: index % 2 === 0 ? 0 : 2,
                                force3D: true,
                                duration: 0.1,
                                ease: "power3.out",
                                stagger: 0.02,
                            },
                            index * 0.01
                        );
                    });

                    gsap.to(split_type_set, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 86%",
                        },
                        rotateX: "0",
                        scale: 1,
                        opacity: 1,
                    });
                } else {
                    gsap.from(split_type_set, settings);
                }
            });
        }
    };

    /* scrolling_effect
  -------------------------------------------------------------------------*/
    var scrolling_effect = function() {
        if ($(".scrolling-effect").length > 0) {
            var st = $(".scrolling-effect");
            st.each(function(index, el) {
                var settings = {
                    scrollTrigger: {
                        trigger: el,
                        scrub: 3,
                        toggleActions: "play none none reverse",
                        start: "-200 bottom",
                        end: "bottom bottom",
                        delay: 3,
                    },
                    duration: 0.8,
                    ease: "power3.out",
                };
                if ($(el).hasClass("effectRight")) {
                    settings.opacity = 0;
                    settings.x = "80";
                }
                if ($(el).hasClass("effectLeft")) {
                    settings.opacity = 0;
                    settings.x = "-80";
                }
                if ($(el).hasClass("effectBottom")) {
                    settings.opacity = 0;
                    settings.y = "100";
                }
                if ($(el).hasClass("effectTop")) {
                    settings.opacity = 0;
                    settings.y = "-80";
                }
                if ($(el).hasClass("effectZoomIn")) {
                    settings.opacity = 0;
                    settings.scale = 0.5;
                }
                gsap.from(el, settings);
            });
        }
    };

    // Dom Ready
    $(function() {
        animation_text();
        scrolling_effect();
        changetext();
        stackElement();
        processBar();
    });
})(jQuery);