'use strict';

// Global components list
let components = window.components = {};

components.fontAwesome = {
    selector: '[class*="fa-"]',
    styles: './components/font-awesome/font-awesome.css'
};

components.mdi = {
    selector: '[class*="mdi-"]',
    styles: './components/mdi/mdi.css'
};

components.pageReveal = {
    selector: '.page',
    init: function(nodes) {
        window.addEventListener('components:ready', function() {
            window.dispatchEvent(new Event('resize'));
            document.documentElement.classList.add('components-ready');

            nodes.forEach(function(node) {
                setTimeout(function() {
                    node.classList.add('page-revealed');
                }, 500);
            });
        }, {
            once: true
        });

        window.addEventListener('components:stylesReady', function() {}, {
            once: true
        });
    }
};

components.grid = {
    selector: '.container, .container-fluid, .row, [class*="col-"]',
    styles: './components/grid/grid.css'
};

components.section = {
    selector: 'section',
    styles: './components/section/section.css'
};

components.footer = {
    selector: 'footer',
    styles: './components/footer/footer.css'
};

components.button = {
    selector: '.btn',
    styles: './components/button/button.css'
};

components.link = {
    selector: '.link',
    styles: './components/link/link.css'
};

components.input = {
    selector: '.form-group, .input-group, .form-check, .custom-control, .form-control',
    styles: './components/input/input.css'
};

components.figure = {
    selector: '.figure',
    styles: './components/figure/figure.css'
};

components.position = {
    selector: '[class*="position-"], [class*="fixed-"], [class*="sticky-"]',
    styles: './components/position/position.css'
};

components.code = {
    selector: 'code',
    styles: [
        './components/code/code.css',
        'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:500&display=swap'
    ]
};

components.divider = {
    selector: '.divider',
    styles: './components/divider/divider.css'
};

components.effect = {
    selector: '.effect',
    styles: './components/effect/effect.css'
};

components.dropCap = {
    selector: '.drop-cap',
    styles: './components/drop-cap/drop-cap.css'
};

components.fontFamily = {
    selector: 'html',
    styles: 'https://fonts.googleapis.com/css?family=Lilita+One%7COpen+Sans:400,700%7CMontserrat:500&display=swap'
};

components.linearicons = {
    selector: '[class*="linearicons-"]',
    styles: './components/linearicons/linearicons.css'
};

components.intenseIcons = {
    selector: '[class*="int-"]',
    styles: './components/intense-icons/intense-icons.css'
};

components.intenseThin = {
    selector: '[class*="ith-"]',
    styles: './components/intense-thin/intense-thin.css'
};

components.currentDevice = {
    selector: 'html',
    script: './components/current-device/current-device.min.js'
};

components.rdNavbar = {
    selector: '.rd-navbar',
    styles: [
        './components/rd-navbar/rd-navbar.css'
    ],
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/util/util.min.js',
        './components/current-device/current-device.min.js',
        './components/rd-navbar/rd-navbar.min.js'
    ],
    dependencies: 'currentDevice',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                params = parseJSON(node.getAttribute('data-rd-navbar')),
                defaults = {
                    stickUpClone: false,
                    anchorNav: true,
                    autoHeight: false,
                    stickUpOffset: '1px',
                    responsive: {
                        0: {
                            layout: 'rd-navbar-fixed',
                            deviceLayout: 'rd-navbar-fixed',
                            focusOnHover: 'ontouchstart' in window,
                            stickUp: false
                        },
                        992: {
                            layout: 'rd-navbar-fixed',
                            deviceLayout: 'rd-navbar-fixed',
                            focusOnHover: 'ontouchstart' in window,
                            stickUp: false
                        },
                        1200: {
                            layout: 'rd-navbar-fullwidth',
                            deviceLayout: 'rd-navbar-fullwidth',
                            stickUp: false,
                        }
                    },
                    callbacks: {
                        onStuck: function() {
                            document.documentElement.classList.add('rd-navbar-stuck');
                        },
                        onUnstuck: function() {
                            document.documentElement.classList.remove('rd-navbar-stuck');
                        },
                        onDropdownToggle: function() {
                            if (this.classList.contains('opened')) {
                                this.parentElement.classList.add('overlaid');
                            } else {
                                this.parentElement.classList.remove('overlaid');
                            }
                        },
                        onDropdownClose: function() {
                            this.parentElement.classList.remove('overlaid');
                        },
                    }
                },
                xModeParams = {
                    stickUpClone: false,
                    anchorNav: false,
                    responsive: {
                        0: {
                            stickUp: false,
                            stickUpClone: false
                        },
                        992: {
                            stickUp: false,
                            stickUpClone: false
                        },
                        1200: {
                            stickUp: false,
                            stickUpClone: false
                        }
                    },
                    callbacks: {
                        onDropdownOver: function() {
                            return false;
                        }
                    }
                };

            new RDNavbar(node, Util.merge(window.xMode ? [defaults, params, xModeParams] : [defaults, params]));

            window.addEventListener('resize', function() {
                let
                    links = node.querySelectorAll('.navbar-navigation-root-link'),
                    handler = function() {
                        node.querySelector('.navbar-switch').multiSwitch.changeState(false);
                    };

                if (node.classList.contains('rd-navbar-fixed')) {
                    links.forEach(function(link) {
                        link.addEventListener('click', handler);
                    });
                } else {
                    links.forEach(function(link) {
                        link.removeEventListener('click', handler);
                    });
                }
            });
        })
    }
};

components.regula = {
    selector: '[data-constraints]',
    styles: './components/regula/regula.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/regula/regula.min.js'
    ],
    init: function(nodes) {
        let elements = $(nodes);

        // Custom validator - phone number
        regula.custom({
            name: 'PhoneNumber',
            defaultMessage: 'Invalid phone number format',
            validator: function() {
                if (this.value === '') return true;
                else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test(this.value);
            }
        });

        for (let i = 0; i < elements.length; i++) {
            let o = $(elements[i]),
                v;
            o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
            v = o.parent().find(".form-validation");
            if (v.is(":last-child")) o.addClass("form-control-last-child");
        }

        elements.on('input change propertychange blur', function(e) {
            let $this = $(this),
                results;

            if (e.type !== "blur")
                if (!$this.parent().hasClass("has-error")) return;
            if ($this.parents('.rd-mailform').hasClass('success')) return;

            if ((results = $this.regula('validate')).length) {
                for (let i = 0; i < results.length; i++) {
                    $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
                }
            } else {
                $this.siblings(".form-validation").text("").parent().removeClass("has-error")
            }
        }).regula('bind');

        let regularConstraintsMessages = [{
                type: regula.Constraint.Required,
                newMessage: "The text field is required."
            },
            {
                type: regula.Constraint.Email,
                newMessage: "The email is not a valid email."
            },
            {
                type: regula.Constraint.Numeric,
                newMessage: "Only numbers are required"
            },
            {
                type: regula.Constraint.Selected,
                newMessage: "Please choose an option."
            }
        ];


        for (let i = 0; i < regularConstraintsMessages.length; i++) {
            let regularConstraint = regularConstraintsMessages[i];

            regula.override({
                constraintType: regularConstraint.type,
                defaultMessage: regularConstraint.newMessage
            });
        }
    }
};

components.rdMailform = {
    selector: '.rd-mailform',
    styles: [
        './components/rd-mailform/rd-mailform.css',
        './components/intense-icons/intense-icons.css',
        './components/font-awesome/font-awesome.css',
        './components/mdi/mdi.css'
    ],
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/rd-mailform/rd-mailform.min.js',
    ],
    init: function(nodes) {
        let i, j, k,
            $captchas = $(nodes).find('.recaptcha'),
            msg = {
                'MF000': 'Successfully sent!',
                'MF001': 'Recipients are not set!',
                'MF002': 'Form will not work locally!',
                'MF003': 'Please, define email field in your form!',
                'MF004': 'Please, define type of your form!',
                'MF254': 'Something went wrong with PHPMailer!',
                'MF255': 'Aw, snap! Something went wrong.'
            };

        if ($captchas.length) {
            $.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
        }

        /**
         * @desc Check if all elements pass validation
         * @param {object} elements - object of items for validation
         * @param {object} captcha - captcha object for validation
         * @return {boolean}
         */
        function isValidated(elements, captcha) {
            let results, errors = 0;

            if (elements.length) {
                for (let j = 0; j < elements.length; j++) {

                    let $input = $(elements[j]);
                    if ((results = $input.regula('validate')).length) {
                        for (k = 0; k < results.length; k++) {
                            errors++;
                            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                        }
                    } else {
                        $input.siblings(".form-validation").text("").parent().removeClass("has-error");
                    }
                }

                if (captcha) {
                    if (captcha.length) {
                        return validateReCaptcha(captcha) && errors === 0
                    }
                }

                return errors === 0;
            }
            return true;
        }

        /**
         * @desc Validate google reCaptcha
         * @param {object} captcha - captcha object for validation
         * @return {boolean}
         */
        function validateReCaptcha(captcha) {
            let captchaToken = captcha.find('.g-recaptcha-response').val();

            if (captchaToken.length === 0) {
                captcha
                    .siblings('.form-validation')
                    .html('Please, prove that you are not robot.')
                    .addClass('active');
                captcha
                    .closest('.form-wrap')
                    .addClass('has-error');

                captcha.on('propertychange', function() {
                    let $this = $(this),
                        captchaToken = $this.find('.g-recaptcha-response').val();

                    if (captchaToken.length > 0) {
                        $this
                            .closest('.form-wrap')
                            .removeClass('has-error');
                        $this
                            .siblings('.form-validation')
                            .removeClass('active')
                            .html('');
                        $this.off('propertychange');
                    }
                });

                return false;
            }

            return true;
        }

        /**
         * @desc Initialize Google reCaptcha
         */
        window.onloadCaptchaCallback = function() {
            for (let i = 0; i < $captchas.length; i++) {
                let
                    $captcha = $($captchas[i]),
                    resizeHandler = (function() {
                        let
                            frame = this.querySelector('iframe'),
                            inner = this.firstElementChild,
                            inner2 = inner.firstElementChild,
                            containerRect = null,
                            frameRect = null,
                            scale = null;

                        inner2.style.transform = '';
                        inner.style.height = 'auto';
                        inner.style.width = 'auto';

                        containerRect = this.getBoundingClientRect();
                        frameRect = frame.getBoundingClientRect();
                        scale = containerRect.width / frameRect.width;

                        if (scale < 1) {
                            inner2.style.transform = 'scale(' + scale + ')';
                            inner.style.height = (frameRect.height * scale) + 'px';
                            inner.style.width = (frameRect.width * scale) + 'px';
                        }
                    }).bind($captchas[i]);

                grecaptcha.render(
                    $captcha.attr('id'), {
                        sitekey: $captcha.attr('data-sitekey'),
                        size: $captcha.attr('data-size') ? $captcha.attr('data-size') : 'normal',
                        theme: $captcha.attr('data-theme') ? $captcha.attr('data-theme') : 'light',
                        callback: function() {
                            $('.recaptcha').trigger('propertychange');
                        }
                    }
                );

                $captcha.after("<span class='form-validation'></span>");

                if ($captchas[i].hasAttribute('data-auto-size')) {
                    resizeHandler();
                    window.addEventListener('resize', resizeHandler);
                }
            }
        };

        for (i = 0; i < nodes.length; i++) {
            let
                $form = $(nodes[i]),
                formHasCaptcha = false;

            $form.attr('novalidate', 'novalidate').ajaxForm({
                data: {
                    "form-type": $form.attr("data-form-type") || "contact",
                    "counter": i
                },
                beforeSubmit: function(arr, $form, options) {
                    let
                        form = $(nodes[this.extraData.counter]),
                        inputs = form.find("[data-constraints]"),
                        output = $("#" + form.attr("data-form-output")),
                        captcha = form.find('.recaptcha'),
                        captchaFlag = true;

                    output.removeClass("active error success");

                    if (isValidated(inputs, captcha)) {

                        // veify reCaptcha
                        if (captcha.length) {
                            let captchaToken = captcha.find('.g-recaptcha-response').val(),
                                captchaMsg = {
                                    'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
                                    'CPT002': 'Something wrong with google reCaptcha'
                                };

                            formHasCaptcha = true;

                            $.ajax({
                                    method: "POST",
                                    url: "components/rd-mailform/reCaptcha.php",
                                    data: {
                                        'g-recaptcha-response': captchaToken
                                    },
                                    async: false
                                })
                                .done(function(responceCode) {
                                    if (responceCode !== 'CPT000') {
                                        if (output.hasClass("snackbar")) {
                                            output.html(`<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-check"></span>${captchaMsg[responceCode]}</div></div>`);
                                            // output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>');

                                            setTimeout(function() {
                                                output.removeClass("active");
                                            }, 3500);

                                            captchaFlag = false;
                                        } else {
                                            output.html(captchaMsg[responceCode]);
                                        }

                                        output.addClass("active");
                                    }
                                });
                        }

                        if (!captchaFlag) {
                            return false;
                        }

                        form.addClass('form-in-process');

                        if (output.hasClass("snackbar")) {
                            // output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
                            output.html(`<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon fa-circle-o-notch fa-spin"></span>Sending</div></div>`);
                            output.addClass("active");
                        }
                    } else {
                        return false;
                    }
                },
                error: function(result) {
                    let output = $("#" + $(nodes[this.extraData.counter]).attr("data-form-output")),
                        form = $(nodes[this.extraData.counter]);

                    output.text(msg[result]);
                    form.removeClass('form-in-process');

                    if (formHasCaptcha) {
                        grecaptcha.reset();
                    }
                },
                success: function(result) {
                    let form = $(nodes[this.extraData.counter]),
                        output = $("#" + form.attr("data-form-output")),
                        select = form.find('select');

                    form
                        .addClass('success')
                        .removeClass('form-in-process');

                    if (formHasCaptcha) {
                        grecaptcha.reset();
                    }

                    result = result.length === 5 ? result : 'MF255';
                    output.text(msg[result]);

                    if (result === "MF000") {
                        if (output.hasClass("snackbar")) {
                            // output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
                            output.html(`<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-check"></span>${msg[result]}</div></div>`);
                        } else {
                            output.addClass("active success");
                        }
                    } else {
                        if (output.hasClass("snackbar")) {
                            // output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
                            output.html(`<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-warning"></span>${msg[result]}</div></div>`);
                        } else {
                            output.addClass("active error");
                        }
                    }

                    form.clearForm();

                    if (select.length) {
                        select.select2("val", "");
                    }

                    form.find('input, textarea').trigger('blur');

                    setTimeout(function() {
                        output.removeClass("active error success");
                        form.removeClass('success');
                    }, 3500);
                }
            });
        }
    }
};

components.campaignMonitor = {
    selector: '.campaign-mailform',
    styles: './components/rd-mailform/rd-mailform.css',
    script: './components/jquery/jquery-3.6.0.min.js',
    init: function(nodes) {
        /**
         * @desc Check if all elements pass validation
         * @param {object} elements - object of items for validation
         * @param {object} captcha - captcha object for validation
         * @return {boolean}
         */
        function isValidated(elements, captcha) {
            let results, errors = 0;

            if (elements.length) {
                for (let j = 0; j < elements.length; j++) {

                    let $input = $(elements[j]);
                    if ((results = $input.regula('validate')).length) {
                        for (let k = 0; k < results.length; k++) {
                            errors++;
                            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                        }
                    } else {
                        $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                    }
                }

                if (captcha) {
                    if (captcha.length) {
                        return validateReCaptcha(captcha) && errors === 0
                    }
                }

                return errors === 0;
            }
            return true;
        }

        let $nodes = $(nodes);

        for (let i = 0; i < $nodes.length; i++) {
            let $campaignItem = $($nodes[i]);

            $campaignItem.on('submit', $.proxy(function(e) {
                e.preventDefault();

                let data = {},
                    url = this.attr('action'),
                    dataArray = this.serializeArray(),
                    $output = $("#" + $nodes.attr("data-form-output")),
                    $this = $(this);

                for (let i = 0; i < dataArray.length; i++) {
                    data[dataArray[i].name] = dataArray[i].value;
                }

                $.ajax({
                    data: data,
                    url: url,
                    dataType: 'jsonp',
                    error: function(resp, text) {
                        $output.html('Server error: ' + text);

                        setTimeout(function() {
                            $output.removeClass("active");
                        }, 4000);
                    },
                    success: function(resp) {
                        $output.html(resp.Message).addClass('active');

                        setTimeout(function() {
                            $output.removeClass("active");
                        }, 6000);
                    },
                    beforeSend: function(data) {
                        // Stop request if inputs are invalid
                        if (!isValidated($this.find('[data-constraints]')))
                            return false;

                        $output.html('Submitting...').addClass('active');
                    }
                });

                // Clear inputs after submit
                let inputs = $this[0].getElementsByTagName('input');
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
                    let label = document.querySelector('[for="' + inputs[i].getAttribute('id') + '"]');
                    if (label) label.classList.remove('focus', 'not-empty');
                }

                return false;
            }, $campaignItem));
        }
    }
};

components.mailchimp = {
    selector: '.mailchimp-mailform',
    styles: './components/rd-mailform/rd-mailform.css',
    script: './components/jquery/jquery-3.6.0.min.js',
    init: function(nodes) {
        let $nodes = $(nodes);

        for (let i = 0; i < $nodes.length; i++) {
            let
                $mailchimpItem = $($nodes[i]),
                $email = $mailchimpItem.find('input[type="email"]');

            // Required by MailChimp
            $mailchimpItem.attr('novalidate', 'true');
            $email.attr('name', 'EMAIL');

            $mailchimpItem.on('submit', $.proxy(function($email, event) {
                event.preventDefault();

                let
                    $this = this,
                    data = {},
                    url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
                    dataArray = $this.serializeArray(),
                    $output = $("#" + $this.attr("data-form-output"));

                for (let i = 0; i < dataArray.length; i++) {
                    data[dataArray[i].name] = dataArray[i].value;
                }

                $.ajax({
                    data: data,
                    url: url,
                    dataType: 'jsonp',
                    error: function(resp, text) {
                        $output.html('Server error: ' + text);

                        setTimeout(function() {
                            $output.removeClass("active");
                        }, 4000);
                    },
                    success: function(resp) {
                        $output.html(resp.msg).addClass('active');
                        $email[0].value = '';
                        var $label = $('[for="' + $email.attr('id') + '"]');
                        if ($label.length) $label.removeClass('focus not-empty');

                        setTimeout(function() {
                            $output.removeClass("active");
                        }, 6000);
                    },
                    beforeSend: function(data) {
                        var isValidated = (function() {
                            var results, errors = 0;
                            var elements = $this.find('[data-constraints]');
                            var captcha = null;
                            if (elements.length) {
                                for (var j = 0; j < elements.length; j++) {

                                    var $input = $(elements[j]);
                                    if ((results = $input.regula('validate')).length) {
                                        for (var k = 0; k < results.length; k++) {
                                            errors++;
                                            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                                        }
                                    } else {
                                        $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                                    }
                                }

                                if (captcha) {
                                    if (captcha.length) {
                                        return validateReCaptcha(captcha) && errors === 0
                                    }
                                }

                                return errors === 0;
                            }
                            return true;
                        })();

                        // Stop request if builder or inputs are invalid
                        if (!isValidated) return false;

                        $output.html('Submitting...').addClass('active');
                    }
                });

                return false;
            }, $mailchimpItem, $email));
        }
    }
};

components.multiswitch = {
    selector: '[data-multi-switch]',
    styles: './components/multiswitch/multiswitch.css',
    script: [
        './components/current-device/current-device.min.js',
        './components/multiswitch/multiswitch.js'
    ],
    dependencies: 'rdNavbar',
    init: function(nodes) {
        let click = device.ios() ? 'touchstart' : 'click';
        nodes.forEach(function(node) {
            if (node.tagName === 'A') {
                node.addEventListener(click, function(event) {
                    event.preventDefault();
                });
            }

            MultiSwitch(Object.assign({
                node: node,
                event: click,
            }, parseJSON(node.getAttribute('data-multi-switch'))));
        });
    }
};

components.swiper = {
    selector: '.swiper-container',
    styles: './components/swiper/swiper.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/swiper/swiper.min.js',
        './components/swiper/swiper-progress-circle.min.js',
        './components/util/util.min.js'
    ],
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                progress = new aProgressCircle({
                    node: node.querySelector('.swiper-progress')
                }),
                timer = new VirtualTimer({
                    onTick: function() {
                        progress.render(this.progress / this.duration * 360);
                    }
                }),
                params = parseJSON(node.getAttribute('data-swiper')),
                defaults = {
                    // Optional parameters
                    speed: 1000,
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionEnd: function() {
                            timer.reset();
                            timer.duration = this.originalParams.autoplay.delay - 100;
                            timer.start();
                        },
                        slideChangeTransitionStart: function() {
                            timer.stop();
                        }
                    }
                };

            new Swiper(node, Util.merge([defaults, params]));
        });
    }
};

components.owl = {
    selector: '.owl-carousel',
    styles: './components/owl-carousel/owl.carousel.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/owl-carousel/owl.carousel.min.js',
        './components/util/util.min.js'
    ],
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                params = parseJSON(node.getAttribute('data-owl')),
                defaults = {
                    items: 1,
                    margin: 30,
                    loop: true,
                    mouseDrag: true,
                    stagePadding: 0,
                    nav: false,
                    navText: [],
                    dots: false,
                    autoplay: true,
                    autoplayHoverPause: true
                };

            $(node).owlCarousel(Util.merge([defaults, params]));
        });
    }
};

components.slick = {
    selector: '.slick-slider',
    styles: './components/slick/slick.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/slick/slick.min.js'
    ],
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                breakpoint = {
                    sm: 576,
                    md: 768,
                    lg: 992,
                    xl: 1200,
                    xxl: 1600
                }, // slick slider uses desktop first principle
                responsive = [];

            // Making responsive parameters
            for (let key in breakpoint) {
                if (node.hasAttribute(`data-slick-${key}`)) {
                    responsive.push({
                        breakpoint: breakpoint[key],
                        settings: parseJSON(node.getAttribute(`data-slick-${key}`))
                    });
                }
            }

            $(node).slick({
                responsive: responsive
            });
        });
    }
};

components.counter = {
    selector: '[data-counter]',
    styles: './components/counter/counter.css',
    script: [
        './components/util/util.min.js',
        './components/counter/counter.min.js',
    ],
    init: function(nodes) {
        let observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                let node = entry.target;

                if (entry.isIntersecting) {
                    node.counter.run();
                    observer.unobserve(node);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 1.0
        });

        nodes.forEach(function(node) {
            aCounter(Object.assign({
                node: node,
                duration: 1000
            }, parseJSON(node.getAttribute('data-counter'))));

            observer.observe(node);
        })
    }
};

components.animate = {
    selector: '[data-animate]',
    styles: './components/animate/animate.css',
    script: './components/current-device/current-device.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let params = parseJSON(node.getAttribute('data-animate'));

            node.animate = function() {
                if (params.in.delay) node.style.animationDelay = params.in.delay;
                if (params.in.duration) node.style.animationDuration = params.in.duration;
                node.classList.remove('animated', params.out.class);
                node.classList.add('animated', params.in.class);
            };

            node.reanimate = function() {
                if (params.out.delay) node.style.animationDelay = params.out.delay;
                if (params.out.duration) node.style.animationDuration = params.out.duration;
                node.classList.remove('animated', params.in.class);
                node.classList.add('animated', params.out.class);
            };
        });
    }
};

components.lightgallery = {
    selector: '[data-lightgallery]',
    styles: './components/lightgallery/lightgallery.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/lightgallery/lightgallery.min.js',
        './components/util/util.min.js'
    ],
    init: function(nodes) {
        if (!window.xMode) {
            nodes.forEach(function(node) {
                node = $(node);
                let
                    defaults = {
                        thumbnail: true,
                        selector: '.lightgallery-item',
                        youtubePlayerParams: {
                            modestbranding: 1,
                            showinfo: 0,
                            rel: 0,
                            controls: 0
                        },
                        vimeoPlayerParams: {
                            byline: 0,
                            portrait: 0,
                            color: 'A90707'
                        }
                    },
                    options = parseJSON(node.attr('data-lightgallery'));

                node.lightGallery(Util.merge([defaults, options]));
            });
        }
    }
};

components.spinner = {
    selector: '[data-spinner]',
    styles: './components/spinner/spinner.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/jquery/jquery-ui.min.js'
    ],
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                params = parseJSON(node.getAttribute('data-spinner')),
                defaults = {
                    min: 0,
                    step: 1
                };

            $(node).spinner($.extend(defaults, params));
        });
    }
};

components.icon = {
    selector: '.icon',
    styles: './components/icon/icon.css'
};

components.logo = {
    selector: '.logo',
    styles: './components/logo/logo.css'
};

components.badge = {
    selector: '.badge',
    styles: './components/badge/badge.css'
};

components.bradcrumb = {
    selector: '.breadcrumb',
    styles: './components/breadcrumb/breadcrumb.css'
};

components.thumbnailSmall = {
    selector: '.thumbnail-small',
    styles: './components/thumbnail-small/thumbnail-small.css'
};

components.price = {
    selector: '.price',
    styles: './components/price/price.css'
};

components.thumbnailUpShadow = {
    selector: '.thumbnail-up-shadow',
    styles: './components/thumbnail-up-shadow/thumbnail-up-shadow.css'
};

components.snackbar = {
    selector: '.snackbar',
    styles: './components/snackbar/snackbar.css'
};

components.rights = {
    selector: '.rights',
    styles: './components/rights/rights.css'
};

components.nav = {
    selector: '.nav',
    styles: './components/nav/nav.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/bootstrap/js/popper.js',
        './components/bootstrap/js/bootstrap.min.js'
    ],
    init: function(nodes) {
        nodes.forEach(function(node) {
            $(node).on('click', function(event) {
                event.preventDefault();
                $(this).tab('show');
            });

            $(node).find('a[data-toggle="tab"]').on('shown.bs.tab', function() {
                window.dispatchEvent(new Event('resize'));
            });
        });
    }
};

components.parallaxJs = {
    selector: '.parallax-js',
    styles: './components/mouse-parallax/parallax-js.css',
    script: './components/mouse-parallax/parallax-js.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            new Parallax(node);
        });
    }
};

components.tab = {
    selector: '.tab',
    styles: './components/tab/tab.css'
};

components.blurb = {
    selector: '.blurb',
    styles: [
        './components/media/media.css',
        './components/blurb/blurb.css'
    ]
};

components.person = {
    selector: '.person',
    styles: './components/person/person.css'
};

components.rating = {
    selector: '.rating',
    styles: './components/rating/rating.css'
};

components.quote = {
    selector: '.quote',
    styles: [
        './components/media/media.css',
        './components/quote/quote.css'
    ]
};

components.layout = {
    selector: '.layout',
    styles: './components/layout/layout.css'
};

components.layer = {
    selector: '.layer',
    styles: './components/layer/layer.css'
};

components.review = {
    selector: '.review',
    styles: './components/review/review.css'
};

components.partner = {
    selector: '.partner',
    styles: './components/partner/partner.css'
};

components.list = {
    selector: '.list',
    styles: [
        './components/list/list.css',
        './components/intense-icons/intense-icons.css'
    ]
};

components.media = {
    selector: '.media',
    styles: './components/media/media.css'
};

components.toTop = {
    selector: '.to-top',
    styles: './components/to-top/to-top.css',
    script: './components/jquery/jquery-3.6.0.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            node.addEventListener('mousedown', function() {
                this.classList.add('active');

                $('html, body').stop().animate({
                    scrollTop: 0
                }, 500, 'swing', (function() {
                    this.classList.remove('active');
                }).bind(this));
            });
        });

        document.addEventListener('scroll', function() {
            if (window.scrollY > window.innerHeight) {
                nodes.forEach(function(node) {
                    node.classList.add('show');
                });
            } else {
                nodes.forEach(function(node) {
                    node.classList.remove('show');
                });
            }
        });
    }
};

components.anchorLink = {
    selector: '[data-anchor-link]',
    script: './components/jquery/jquery-3.6.0.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                anchor = document.querySelector(node.getAttribute('href')),
                offset = 50;

            node.addEventListener('click', (event) => {
                event.preventDefault();
                let top = $(anchor).offset().top - offset;
                $('html, body').stop().animate({
                    scrollTop: top
                }, 500, 'swing');
            });
        });
    }
};

components.liveAnchor = {
    selector: '[data-live-anchor]',
    styles: './components/live-anchor/live-anchor.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/live-anchor/live-anchor.js'
    ],
    init: function(nodes) {
        nodes.forEach(function(node) {
            new LiveAnchor({
                link: node,
                anchor: node.getAttribute('href'),
                offset: 100
            });
        });
    }
};

components.banner = {
    selector: '.section-banner',
    styles: './components/banner/banner.css'
};

components.gmap = {
    selector: '.google-map-container',
    styles: './components/google-map/google-map.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/google-map/google-map.js'
    ],

    init: function(nodes) {
        nodes.forEach(function(node) {
            let key = 'AIzaSyBHij4b1Vyck1QAuGQmmyryBYVutjcuoRA';
            $.getScript('//maps.google.com/maps/api/js?' + (key ? 'key=' + key + '&' : '') + 'libraries=geometry,places&v=quarterly', function() {
                let geocoder = new google.maps.Geocoder;

                let zoom = parseInt(node.getAttribute("data-zoom"), 10) || 11;
                let styles = node.hasAttribute('data-styles') ? JSON.parse(node.getAttribute("data-styles")) : [];
                let center = node.getAttribute("data-center") || "New York";

                // Initialize map
                let map = new google.maps.Map(node.querySelectorAll(".google-map")[0], {
                    zoom: zoom,
                    styles: styles,
                    scrollwheel: false,
                    center: {
                        lat: 0,
                        lng: 0
                    }
                });

                // Add map object to map node
                node.map = map;
                node.geocoder = geocoder;
                node.keySupported = true;
                node.google = google;

                // Get Center coordinates from attribute
                getLatLngObject(center, null, node, function(location, markerElement, mapElement) {
                    mapElement.map.setCenter(location);
                });

                // Add markers from google-map-markers array
                let markerItems = node.querySelectorAll(".google-map-markers li");

                if (markerItems.length) {
                    let markers = [];
                    for (let j = 0; j < markerItems.length; j++) {
                        let markerElement = markerItems[j];
                        getLatLngObject(markerElement.getAttribute("data-location"), markerElement, node, function(location, markerElement, mapElement) {
                            let icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                            let activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
                            let info = markerElement.getAttribute("data-description") || "";
                            let infoWindow = new google.maps.InfoWindow({
                                content: '<div>' + info + '</div>'
                            });

                            markerElement.infoWindow = infoWindow;
                            let markerData = {
                                position: location,
                                map: mapElement.map
                            }
                            if (icon) {
                                markerData.icon = icon;
                            }
                            let marker = new google.maps.Marker(markerData);
                            markerElement.gmarker = marker;
                            markers.push({
                                markerElement: markerElement,
                                infoWindow: infoWindow
                            });
                            marker.isActive = false;
                            // Handle infoWindow close click
                            google.maps.event.addListener(infoWindow, 'closeclick', (function(markerElement, mapElement) {
                                let markerIcon = null;
                                markerElement.gmarker.isActive = false;
                                markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                                markerElement.gmarker.setIcon(markerIcon);
                            }).bind(this, markerElement, mapElement));


                            // Set marker active on Click and open infoWindow
                            google.maps.event.addListener(marker, 'click', (function(markerElement, mapElement) {
                                let markerIcon;
                                if (markerElement.infoWindow.getContent().length === 0) return;
                                let gMarker, currentMarker = markerElement.gmarker,
                                    currentInfoWindow;
                                for (let k = 0; k < markers.length; k++) {
                                    if (markers[k].markerElement === markerElement) {
                                        currentInfoWindow = markers[k].infoWindow;
                                    }
                                    gMarker = markers[k].markerElement.gmarker;
                                    if (gMarker.isActive && markers[k].markerElement !== markerElement) {
                                        gMarker.isActive = false;
                                        markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
                                        gMarker.setIcon(markerIcon);
                                        markers[k].infoWindow.close();
                                    }
                                }

                                currentMarker.isActive = !currentMarker.isActive;
                                if (currentMarker.isActive) {
                                    if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")) {
                                        currentMarker.setIcon(markerIcon);
                                    }

                                    currentInfoWindow.open(map, marker);
                                } else {
                                    if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")) {
                                        currentMarker.setIcon(markerIcon);
                                    }
                                    currentInfoWindow.close();
                                }
                            }).bind(this, markerElement, mapElement))
                        })
                    }
                }

            });
        });
    }
};

components.videoPlay = {
    selector: 'video',
    styles: './components/video-play/video-play.css',
    init: function(nodes) {
        nodes.forEach(function(node) {
            if (node.hasAttribute('data-btn')) {
                let btn = document.querySelector(node.getAttribute('data-btn'));

                if (btn) {
                    node.controls = false;

                    btn.addEventListener('click', function() {
                        if (node.paused) {
                            node.play();
                        } else {
                            node.pause();
                        }
                    });

                    node.addEventListener('play', function() {
                        btn.classList.add('pause');
                        btn.classList.remove('play');
                        this.controls = true;
                    }, false);

                    node.addEventListener('pause', function() {
                        btn.classList.add('play');
                        btn.classList.remove('pause');
                    }, false);
                }
            }
        })
    }
};

components.section1 = {
    selector: '.layer-1',
    script: './components/anime-js/anime.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                duration = 1000,
                delay = 100;
            node.animation = anime.timeline({
                easing: 'easeInQuad',
                duration: duration,
                autoplay: false
            }).add({
                targets: node.querySelector('.layer-item-1'),
                easing: 'easeOutCirc',
                d: [
                    'M991 -655H1691L1111 274H410L991 -655Z',
                    'M581 0H1281L701 929H0L581 0Z'
                ],
                opacity: [0, 1]
            }, delay * 3).add({
                targets: node.querySelector('.layer-item-2'),
                easing: 'easeOutCirc',
                d: [
                    'M925.929 264H1215L975.484 648H686L925.929 264Z',
                    'M685.929 648H975L735.484 1032H446L685.929 648Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-3'),
                easing: 'easeOutBack',
                d: [
                    'M1139 363L724 1031.5H849.5L1261.5 363H1139Z',
                    'M1364.5 0L949.5 668.5H1075L1487 0H1364.5Z'
                ],
                opacity: [0, 1]
            }, delay * 2).add({
                targets: node.querySelector('.layer-item-4'),
                easing: 'easeOutBack',
                d: [
                    'M609.763 566L321 1032H408.325L695 566H609.763Z',
                    'M720.763 386L432 852H519.325L806 386H720.763Z'
                ],
                opacity: [0, 1]
            }, delay).add({
                targets: node.querySelector('.layer-item-5'),
                easing: 'easeOutBack',
                d: [
                    'M1070.5 309L957 493H991.323L1104 309H1070.5Z',
                    'M1184.5 124L1071 308H1105.32L1218 124H1184.5Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-6'),
                easing: 'easeOutElastic',
                d: [
                    'M816.5 388L818.198 389.057L706.698 568.19L705 567.133L816.5 388Z',
                    'M713.826 552.669L715.524 553.726L604.023 732.859L602.325 731.802L713.826 552.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-7'),
                easing: 'easeInBounce',
                d: [
                    'M1151.22 123L1152.92 124.057L888.698 548.543L887 547.486C990.184 381.714 1048.04 288.772 1151.22 123Z',
                    'M883.826 552.669L885.524 553.726L621.304 978.212L619.607 977.155C722.791 811.383 780.642 718.441 883.826 552.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-8'),
                easing: 'easeInOutBounce',
                d: [
                    'M1140.22 155L1141.92 156.057C1038.73 321.829 980.882 414.771 877.698 580.543L876 579.486L1140.22 155Z',
                    'M923.826 502.669L925.524 503.726C822.34 669.498 764.488 762.44 661.304 928.212L659.607 927.155L923.826 502.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-9'),
                easing: 'easeOutBounce',
                d: [
                    'M1172.22 120L1173.92 121.057C1070.73 286.829 1012.88 379.771 909.698 545.543L908 544.486L1172.22 120Z',
                    'M933.826 502.669L935.524 503.726C832.34 669.498 774.488 762.44 671.304 928.212L669.607 927.155L933.826 502.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-10'),
                easing: 'easeInBounce',
                d: [
                    'M1552.5 -89L1554.2 -87.9431L1442.7 91.1899L1441 90.133C1484.54 20.1772 1508.96 -19.0442 1552.5 -89Z',
                    'M1413.83 132.669L1415.52 133.726L1304.02 312.859L1302.33 311.802C1345.87 241.846 1370.28 202.625 1413.83 132.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-11'),
                easing: 'easeOutBounce',
                d: [
                    'M1542.5 -58L1544.2 -56.9431C1500.65 13.0127 1476.24 52.2341 1432.7 122.19L1431 121.133L1542.5 -58Z',
                    'M1423.83 132.669L1425.52 133.726C1381.98 203.682 1357.57 242.903 1314.02 312.859L1312.33 311.802L1423.83 132.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-12'),
                easing: 'easeOutElastic',
                d: [
                    'M1396.53 -192L1398.23 -190.943L1239.7 63.7484L1238 62.6915C1299.91 -36.7717 1334.62 -92.5368 1396.53 -192Z',
                    'M1233.83 69.6693L1235.52 70.7261L1076.99 325.418L1075.29 324.361C1137.2 224.898 1171.92 169.132 1233.83 69.6693Z'
                ],
                opacity: [0, 1]
            }, 0);

            node.animate = function() {
                if (node.animation.direction === 'reverse') node.animation.reverse();
                node.animation.duration = duration + delay * 3;
                node.animation.restart();
            };

            node.reanimate = function() {
                if (node.animation.direction === 'normal') node.animation.reverse();
                node.animation.duration = duration / 3 + delay * 3;
                node.animation.restart();
            };
        });
    }
};

components.section2 = {
    selector: '.layer-2',
    script: './components/anime-js/anime.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                duration = 1000,
                delay = 100;
            node.animation = anime.timeline({
                easing: 'easeInQuad',
                duration: duration,
                autoplay: false
            }).add({
                targets: node.querySelector('.layer-item-1'),
                easing: 'easeOutCirc',
                d: [
                    'M1021 -713H1721L1141 216H440L1021 -713Z',
                    'M575 0H1275L695 929H-6L575 0Z'
                ],
                opacity: [0, 1]
            }, delay * 3).add({
                targets: node.querySelector('.layer-item-2'),
                easing: 'easeOutCirc',
                d: [
                    'M949.929 311H1239L999.484 695H710L949.929 311Z',
                    'M709.929 695H999L759.484 1079H470L709.929 695Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-3'),
                easing: 'easeOutBack',
                d: [
                    'M166 930L-249 1598.5H-123.5L288.5 930H166Z',
                    'M486.5 412L71.5 1080.5H197L609 412H486.5Z'
                ],
                opacity: [0, 1]
            }, delay * 2).add({
                targets: node.querySelector('.layer-item-4'),
                easing: 'easeOutBack',
                d: [
                    'M671.079 832L380 1301H468.025L757 832H671.079Z',
                    'M808.079 611L517 1080H605.025L894 611H808.079Z'
                ],
                opacity: [0, 1]
            }, delay).add({
                targets: node.querySelector('.layer-item-5'),
                easing: 'easeOutBack',
                d: [
                    'M96.5116 588L0 743H29.186L125 588H96.5116Z',
                    'M229.512 360L133 515H162.186L258 360H229.512Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-6'),
                easing: 'easeOutElastic',
                d: [
                    'M580.5 473L582.198 474.057C538.655 544.013 514.241 583.234 470.698 653.19L469 652.133L580.5 473Z',
                    'M426.826 722.669L428.524 723.726C384.98 793.682 360.567 832.903 317.023 902.859L315.325 901.802L426.826 722.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-7'),
                easing: 'easeInBounce',
                d: [
                    'M538.219 -6L539.917 -4.94312L275.698 419.543L274 418.486C377.184 252.714 435.035 159.772 538.219 -6Z',
                    'M166.826 592.669L168.524 593.726L-95.6953 1018.21L-97.3932 1017.16C5.79077 851.383 63.6419 758.441 166.826 592.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-8'),
                easing: 'easeInOutBounce',
                d: [
                    'M568.219 -38L569.917 -36.9431L305.698 387.543L304 386.486C407.184 220.714 465.035 127.772 568.219 -38Z',
                    'M206.826 542.669L208.524 543.726L-55.6953 968.212L-57.3932 967.155C45.7908 801.383 103.642 708.441 206.826 542.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-9'),
                easing: 'easeOutBounce',
                d: [
                    'M498.219 90L499.917 91.0569C396.733 256.829 338.882 349.771 235.698 515.543L234 514.486L498.219 90Z',
                    'M216.826 542.669L218.524 543.726C115.34 709.498 57.4887 802.44 -45.6953 968.212L-47.3932 967.155L216.826 542.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-10'),
                easing: 'easeInBounce',
                d: [
                    'M928.5 -97L930.198 -95.9431L818.698 83.1899L817 82.133C860.544 12.1772 884.957 -27.0442 928.5 -97Z',
                    'M746.826 192.669L748.524 193.726L637.023 372.859L635.325 371.802C678.869 301.846 703.282 262.625 746.826 192.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-11'),
                easing: 'easeOutBounce',
                d: [
                    'M886.5 -14L888.198 -12.9431L776.698 166.19L775 165.133C818.544 95.1772 842.957 55.9558 886.5 -14Z',
                    'M756.826 192.669L758.524 193.726L647.023 372.859L645.325 371.802C688.869 301.846 713.282 262.625 756.826 192.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-12'),
                easing: 'easeOutElastic',
                d: [
                    'M450.531 23L452.229 24.0569L293.697 278.748L291.999 277.691C353.91 178.228 388.62 122.463 450.531 23Z',
                    'M271.826 310.669L273.524 311.726L114.992 566.418L113.294 565.361C175.205 465.898 209.916 410.132 271.826 310.669Z'
                ],
                opacity: [0, 1]
            }, 0);

            node.animate = function() {
                if (node.animation.direction === 'reverse') node.animation.reverse();
                node.animation.duration = duration + delay * 3;
                node.animation.restart();
            };

            node.reanimate = function() {
                if (node.animation.direction === 'normal') node.animation.reverse();
                node.animation.duration = duration / 3 + delay * 3;
                node.animation.restart();
            };
        });
    }
};

components.section4 = {
    selector: '.layer-4',
    script: './components/anime-js/anime.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                duration = 1000,
                delay = 100;
            node.animation = anime.timeline({
                easing: 'easeInQuad',
                duration: duration,
                autoplay: false
            }).add({
                targets: node.querySelector('.layer-item-1'),
                easing: 'easeOutCirc',
                d: [
                    'M1029 -718H1729L1149 211H448L1029 -718Z',
                    'M581 0H1281L701 929H0L581 0Z'
                ],
                opacity: [0, 1]
            }, delay * 3).add({
                targets: node.querySelector('.layer-item-2'),
                easing: 'easeOutCirc',
                d: [
                    'M989.929 159H1279L1039.48 543H750L989.929 159Z',
                    'M685.929 647H975L735.484 1031H446L685.929 647Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-3'),
                easing: 'easeOutBack',
                d: [
                    'M885.568 830L216 1910H418.484L1083.21 830H885.568Z',
                    'M1398.57 -1L729 1079H931.484L1596.21 -1H1398.57Z'
                ],
                opacity: [0, 1]
            }, delay * 2).add({
                targets: node.querySelector('.layer-item-4'),
                easing: 'easeOutBack',
                d: [
                    'M372.219 978L85 1441.82H171.858L457 978H372.219Z',
                    'M725.219 381L438 844.817H524.858L810 381H725.219Z'
                ],
                opacity: [0, 1]
            }, delay).add({
                targets: node.querySelector('.layer-item-5'),
                easing: 'easeOutBack',
                d: [
                    'M889.688 455L787 620.552H818.054L920 455H889.688Z',
                    'M1042.69 207L940 372.552H971.054L1073 207H1042.69Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-6'),
                easing: 'easeOutElastic',
                d: [
                    'M841.5 353L843.198 354.057L731.698 533.19L730 532.133L841.5 353Z',
                    'M663.826 631.669L665.524 632.726L554.023 811.859L552.325 810.802L663.826 631.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-7'),
                easing: 'easeInBounce',
                d: [
                    'M1218.22 15L1219.92 16.0569L955.698 440.543L954 439.486L1218.22 15Z',
                    'M883.826 551.669L885.524 552.726L621.304 977.212L619.607 976.155L883.826 551.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-8'),
                easing: 'easeInOutBounce',
                d: [
                    'M1296.22 -95L1297.92 -93.9431L1033.7 330.543L1032 329.486L1296.22 -95Z',
                    'M923.826 501.669L925.524 502.726L661.304 927.212L659.607 926.155L923.826 501.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-9'),
                easing: 'easeOutBounce',
                d: [
                    'M1252.22 -10L1253.92 -8.94312C1150.73 156.829 1092.88 249.771 989.698 415.543L988 414.486L1252.22 -10Z',
                    'M933.826 501.669L935.524 502.726L671.304 927.212L669.607 926.155L933.826 501.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-10'),
                easing: 'easeInBounce',
                d: [
                    'M1768.13 -251L1769.82 -249.943L1135.7 768.823L1134 767.766L1768.13 -251Z',
                    'M1574.83 59.6692L1576.52 60.7261L942.398 1079.49L940.7 1078.44L1574.83 59.6692Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-11'),
                easing: 'easeOutBounce',
                d: [
                    'M1983.13 -580L1984.82 -578.943L1350.7 439.823L1349 438.766L1983.13 -580Z',
                    'M1584.83 59.6692L1586.52 60.7261L952.398 1079.49L950.7 1078.44L1584.83 59.6692Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-12'),
                easing: 'easeOutElastic',
                d: [
                    'M1291.53 -176L1293.23 -174.943L1134.7 79.7484L1133 78.6915C1194.91 -20.7717 1229.62 -76.5368 1291.53 -176Z',
                    'M1103.83 128.669L1105.52 129.726L946.992 384.418L945.294 383.361L1103.83 128.669Z'
                ],
                opacity: [0, 1]
            }, 0);

            node.animate = function() {
                if (node.animation.direction === 'reverse') node.animation.reverse();
                node.animation.duration = duration + delay * 3;
                node.animation.restart();
            };

            node.reanimate = function() {
                if (node.animation.direction === 'normal') node.animation.reverse();
                node.animation.duration = duration / 3 + delay * 3;
                node.animation.restart();
            };
        });
    }
};

components.section5 = {
    selector: '.layer-5',
    script: './components/anime-js/anime.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                duration = 1000,
                delay = 100;
            node.animation = anime.timeline({
                easing: 'easeInQuad',
                duration: duration,
                autoplay: false
            }).add({
                targets: node.querySelector('.layer-item-1'),
                easing: 'easeOutCirc',
                d: [
                    'M1644 -845H2344L1764 84H1063L1644 -845Z',
                    'M1115 1H1815L1235 930H534L1115 1Z'
                ],
                opacity: [0, 1]
            }, delay * 3).add({
                targets: node.querySelector('.layer-item-2'),
                easing: 'easeOutCirc',
                d: [
                    'M610.929 -185H900L660.484 199H371L610.929 -185Z',
                    'M271.929 357H561L321.484 741H32L271.929 357Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-3'),
                easing: 'easeOutBack',
                d: [
                    'M366.614 940L-48 1609H77.3833L489 940H366.614Z',
                    'M691.614 412L277 1081H402.383L814 412H691.614Z'
                ],
                opacity: [0, 1]
            }, delay * 2).add({
                targets: node.querySelector('.layer-item-4'),
                easing: 'easeOutBack',
                d: [
                    'M156.219 849L-131 1311.93H-44.1423L241 849H156.219Z',
                    'M333.219 563L46 1025.93H132.858L418 563H333.219Z'
                ],
                opacity: [0, 1]
            }, delay).add({
                targets: node.querySelector('.layer-item-5'),
                easing: 'easeOutBack',
                d: [
                    'M429.688 466L327 632.033H358.054L460 466H429.688Z',
                    'M586.688 207L484 373.033H515.054L617 207H586.688Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-6'),
                easing: 'easeInBounce',
                d: [
                    'M971.219 122L972.917 123.057L708.698 547.543L707 546.486L971.219 122Z',
                    'M637.826 654.669L639.524 655.726L375.304 1080.21L373.607 1079.16L637.826 654.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-7'),
                easing: 'easeInOutBounce',
                d: [
                    'M705.219 32L706.917 33.0569L442.698 457.543L441 456.486L705.219 32Z',
                    'M317.826 654.669L319.524 655.726L55.3047 1080.21L53.6068 1079.16L317.826 654.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-8'),
                easing: 'easeOutBounce',
                d: [
                    'M651.219 136L652.917 137.057L388.698 561.543L387 560.486L651.219 136Z',
                    'M327.826 654.669L329.524 655.726L65.3047 1080.21L63.6068 1079.16L327.826 654.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-9'),
                easing: 'easeInBounce',
                d: [
                    'M519.5 113L521.198 114.057L409.698 293.19L408 292.133L519.5 113Z',
                    'M357.826 372.669L359.524 373.726L248.023 552.859L246.325 551.802L357.826 372.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-10'),
                easing: 'easeOutBounce',
                d: [
                    'M594.5 12L596.198 13.0569L484.698 192.19L483 191.133L594.5 12Z',
                    'M367.826 372.669L369.524 373.726L258.023 552.859L256.325 551.802L367.826 372.669Z'
                ],
                opacity: [0, 1]
            }, 0);

            node.animate = function() {
                if (node.animation.direction === 'reverse') node.animation.reverse();
                node.animation.duration = duration + delay * 3;
                node.animation.restart();
            };

            node.reanimate = function() {
                if (node.animation.direction === 'normal') node.animation.reverse();
                node.animation.duration = duration / 3 + delay * 3;
                node.animation.restart();
            };
        });
    }
};

components.section6 = {
    selector: '.layer-6',
    script: './components/anime-js/anime.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                duration = 1000,
                delay = 100;
            node.animation = anime.timeline({
                easing: 'easeInQuad',
                duration: duration,
                autoplay: false
            }).add({
                targets: node.querySelector('.layer-item-1'),
                easing: 'easeOutCirc',
                d: [
                    'M1579 -743H2279L1699 186H998L1579 -743Z',
                    'M1114 1H1814L1234 930H533L1114 1Z'
                ],
                opacity: [0, 1]
            }, delay * 3).add({
                targets: node.querySelector('.layer-item-2'),
                easing: 'easeOutCirc',
                d: [
                    'M1695.93 114H1985L1745.48 498H1456L1695.93 114Z',
                    'M1377.93 626H1667L1427.48 1010H1138L1377.93 626Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-3'),
                easing: 'easeOutBack',
                d: [
                    'M1251.61 991L837 1660H962.383L1374 991H1251.61Z',
                    'M1713.61 230L1299 899H1424.38L1836 230H1713.61Z'
                ],
                opacity: [0, 1]
            }, delay * 2).add({
                targets: node.querySelector('.layer-item-4'),
                easing: 'easeOutBack',
                d: [
                    'M378.358 891L95 1348H180.69L462 891H378.358Z',
                    'M570.358 581L287 1038H372.69L654 581H570.358Z'
                ],
                opacity: [0, 1]
            }, delay).add({
                targets: node.querySelector('.layer-item-5'),
                easing: 'easeOutBack',
                d: [
                    'M102.688 589L0 754H31.054L133 589H102.688Z',
                    'M284.688 277L182 442H213.054L315 277H284.688Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-6'),
                easing: 'easeInBounce',
                d: [
                    'M1827.5 385L1829.2 386.057L1717.7 565.19L1716 564.133L1827.5 385Z',
                    'M1662.83 652.669L1664.52 653.726L1553.02 832.859L1551.33 831.802L1662.83 652.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-7'),
                easing: 'easeInOutBounce',
                d: [
                    'M986.219 83L987.917 84.0569L723.698 508.543L722 507.486C825.184 341.714 883.035 248.772 986.219 83Z',
                    'M692.826 556.669L694.524 557.726L430.305 982.212L428.607 981.155C531.791 815.383 589.642 722.441 692.826 556.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-8'),
                easing: 'easeInBounce',
                d: [
                    'M830.219 -4L831.917 -2.94312L720.416 176.19L718.719 175.133L830.219 -4Z',
                    'M626.826 322.669L628.524 323.726L517.023 502.859L515.325 501.802L626.826 322.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-9'),
                easing: 'easeOutBounce',
                d: [
                    'M800.5 59L802.198 60.0569L690.698 239.19L689 238.133L800.5 59Z',
                    'M636.826 322.669L638.524 323.726L527.023 502.859L525.325 501.802L636.826 322.669Z'
                ],
                opacity: [0, 1]
            }, 0);

            node.animate = function() {
                if (node.animation.direction === 'reverse') node.animation.reverse();
                node.animation.duration = duration + delay * 3;
                node.animation.restart();
            };

            node.reanimate = function() {
                if (node.animation.direction === 'normal') node.animation.reverse();
                node.animation.duration = duration / 3 + delay * 3;
                node.animation.restart();
            };
        });
    }
};

components.section7 = {
    selector: '.layer-7',
    script: './components/anime-js/anime.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                duration = 1000,
                delay = 100;
            node.animation = anime.timeline({
                easing: 'easeInQuad',
                duration: duration,
                autoplay: false
            }).add({
                targets: node.querySelector('.layer-item-1'),
                easing: 'easeOutCirc',
                d: [
                    'M1648 -853H2348L1768 76H1067L1648 -853Z',
                    'M1114 1H1814L1234 930H533L1114 1Z'
                ],
                opacity: [0, 1]
            }, delay * 3).add({
                targets: node.querySelector('.layer-item-2'),
                easing: 'easeOutCirc',
                d: [
                    'M599.929 171H889L649.484 555H360L599.929 171Z',
                    'M270.929 696H560L320.484 1080H31L270.929 696Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-3'),
                easing: 'easeOutBack',
                d: [
                    'M48.3582 1003L-235 1460H-149.31L132 1003H48.3582Z',
                    'M283.358 623L0 1080H85.6902L367 623H283.358Z'
                ],
                opacity: [0, 1]
            }, delay * 2).add({
                targets: node.querySelector('.layer-item-4'),
                easing: 'easeOutBack',
                d: [
                    'M1029.69 989L927 1154H958.054L1060 989H1029.69Z',
                    'M1183.69 729L1081 894H1112.05L1214 729H1183.69Z'
                ],
                opacity: [0, 1]
            }, delay).add({
                targets: node.querySelector('.layer-item-5'),
                easing: 'easeOutBack',
                d: [
                    'M1427.61 971L1013 1640H1138.38L1550 971H1427.61Z',
                    'M1772.61 412L1358 1081H1483.38L1895 412H1772.61Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-6'),
                easing: 'easeInBounce',
                d: [
                    'M999.219 74L1000.92 75.0569L736.698 499.543L735 498.486L999.219 74Z',
                    'M636.826 654.669L638.524 655.726L374.304 1080.21L372.607 1079.16L636.826 654.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-7'),
                easing: 'easeInOutBounce',
                d: [
                    'M1695.22 203L1696.92 204.057L1432.7 628.543L1431 627.486L1695.22 203Z',
                    'M1413.83 654.669L1415.52 655.726L1151.3 1080.21L1149.61 1079.16L1413.83 654.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-8'),
                easing: 'easeOutBounce',
                d: [
                    'M1785.22 74L1786.92 75.0569L1522.7 499.543L1521 498.486L1785.22 74Z',
                    'M1423.83 654.669L1425.52 655.726L1161.3 1080.21L1159.61 1079.16L1423.83 654.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-9'),
                easing: 'easeInBounce',
                d: [
                    'M623.5 172L625.198 173.057L513.698 352.19L512 351.133C555.544 281.177 579.957 241.956 623.5 172Z',
                    'M336.826 632.669L338.524 633.726L227.023 812.859L225.325 811.802C268.869 741.846 293.282 702.625 336.826 632.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-10'),
                easing: 'easeOutBounce',
                d: [
                    'M519.5 354L521.198 355.057L409.698 534.19L408 533.133L519.5 354Z',
                    'M346.826 632.669L348.524 633.726L237.023 812.859L235.325 811.802L346.826 632.669Z'
                ],
                opacity: [0, 1]
            }, 0);

            node.animate = function() {
                if (node.animation.direction === 'reverse') node.animation.reverse();
                node.animation.duration = duration + delay * 3;
                node.animation.restart();
            };

            node.reanimate = function() {
                if (node.animation.direction === 'normal') node.animation.reverse();
                node.animation.duration = duration / 3 + delay * 3;
                node.animation.restart();
            };
        });
    }
};

components.section8 = {
    selector: '.layer-8',
    script: './components/anime-js/anime.min.js',
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                duration = 1000,
                delay = 100;
            node.animation = anime.timeline({
                easing: 'easeInQuad',
                duration: duration,
                autoplay: false
            }).add({
                targets: node.querySelector('.layer-item-1'),
                easing: 'easeOutCirc',
                d: [
                    'M1617 -797H2317L1737 132H1036L1617 -797Z',
                    'M1119 0H1819L1239 929H538L1119 0Z'
                ],
                opacity: [0, 1]
            }, delay * 3).add({
                targets: node.querySelector('.layer-item-2'),
                easing: 'easeOutCirc',
                d: [
                    'M601.929 175H891L651.484 559H362L601.929 175Z',
                    'M275.929 696H565L325.484 1080H36L275.929 696Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-3'),
                easing: 'easeOutBack',
                d: [
                    'M1296.57 895L627 1975H829.484L1494.21 895H1296.57Z',
                    'M1850.57 -1L1181 1079H1383.48L2048.21 -1H1850.57Z'
                ],
                opacity: [0, 1]
            }, delay * 2).add({
                targets: node.querySelector('.layer-item-4'),
                easing: 'easeOutBack',
                d: [
                    'M54.2186 994L-233 1456.93H-146.142L139 994H54.2186Z',
                    'M287.219 618L0 1080.93H86.8577L372 618H287.219Z'
                ],
                opacity: [0, 1]
            }, delay).add({
                targets: node.querySelector('.layer-item-5'),
                easing: 'easeOutBack',
                d: [
                    'M872.688 480L770 645H801.054L903 480H872.688Z',
                    'M1020.69 225L918 390H949.054L1051 225H1020.69Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-6'),
                easing: 'easeInBounce',
                d: [
                    'M2068.22 -391L2069.92 -389.943L1805.7 34.5427L1804 33.4858C1907.18 -132.286 1965.04 -225.228 2068.22 -391Z',
                    'M1740.83 137.669L1742.52 138.726L1478.3 563.212L1476.61 562.155C1579.79 396.383 1637.64 303.441 1740.83 137.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-7'),
                easing: 'easeInOutBounce',
                d: [
                    'M1805.22 25L1806.92 26.0569L1542.7 450.543L1541 449.486C1644.18 283.714 1702.04 190.772 1805.22 25Z',
                    'M1413.83 657.669L1415.52 658.726L1151.3 1083.21L1149.61 1082.16C1252.79 916.383 1310.64 823.441 1413.83 657.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-8'),
                easing: 'easeOutBounce',
                d: [
                    'M1717.5 184L1719.2 185.057C1616.01 350.829 1558.16 443.771 1454.98 609.543L1453.28 608.486L1717.5 184Z',
                    'M1423.83 657.669L1425.52 658.726C1322.34 824.498 1264.49 917.44 1161.3 1083.21L1159.61 1082.16L1423.83 657.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-9'),
                easing: 'easeInBounce',
                d: [
                    'M1388.5 212L1390.2 213.057L1278.7 392.19L1277 391.133C1320.54 321.177 1344.96 281.956 1388.5 212Z',
                    'M1106.83 665.669L1108.52 666.726L997.023 845.859L995.325 844.802C1038.87 774.846 1063.28 735.625 1106.83 665.669Z'
                ],
                opacity: [0, 1]
            }, 0).add({
                targets: node.querySelector('.layer-item-10'),
                easing: 'easeOutBounce',
                d: [
                    'M1296.5 376L1298.2 377.057C1254.65 447.013 1230.24 486.234 1186.7 556.19L1185 555.133L1296.5 376Z',
                    'M1116.83 665.669L1118.52 666.726C1074.98 736.682 1050.57 775.903 1007.02 845.859L1005.33 844.802L1116.83 665.669Z'
                ],
                opacity: [0, 1]
            }, 0);

            node.animate = function() {
                if (node.animation.direction === 'reverse') node.animation.reverse();
                node.animation.duration = duration + delay * 3;
                node.animation.restart();
            };

            node.reanimate = function() {
                if (node.animation.direction === 'normal') node.animation.reverse();
                node.animation.duration = duration / 3 + delay * 3;
                node.animation.restart();
            };
        });
    }
};

components.blobMorphing = {
    selector: '.blob-morphing',
    script: './components/anime-js/anime.min.js',
    init: function() {
        anime({
            targets: document.querySelectorAll('.blob-morphing path'),
            direction: 'alternate',
            easing: 'easeInOutCubic',
            duration: 5000,
            loop: true,
            d: [
                'M5 58.5C9.5 74.5 17.5 91.5 36.5 104C55.5 116.5 83.5 110 104.5 99.5C125.5 89 106 40.9998 90.5 21.5C75 2.00023 46 8.4999 27.5 10.0002C9 11.5004 0.499997 42.5 5 58.5Z',
                'M24 26C12 39.0004 6.5 60.9997 11.5 82.4999C16.5 104 44.4486 118.793 68 116.5C91.5514 114.207 106.136 76.9919 109.5 57.5C112.864 38.0081 93.5 5.50029 74.5 5.5C55.5 5.49971 36 12.9996 24 26Z',
                'M16 41C5.5 56 4.5 91 15 107C25.5 123 67.5 108.5 88.5 98C109.5 87.5 119 42.9997 113 22.4997C107 1.9997 78.5 12.9997 60 14.5C41.5 16.0003 26.5 26 16 41Z',
                'M37.0096 23.0069C21.3087 29.8865 0.000244141 36.7659 0.000244141 60.8441C0.000244141 84.9223 41.4956 110.147 65.047 107.854C88.5985 105.561 112.15 79.1894 115.514 59.6976C118.879 40.2057 104.299 27.5932 86.3555 18.4206C68.4115 9.24789 52.7106 16.1274 37.0096 23.0069Z'
            ]
        })
    }
};

components.fullpage = {
    selector: '.fullpage',
    styles: './components/fullpage/fullpage.css',
    script: [
        './components/jquery/jquery-3.6.0.min.js',
        './components/fullpage/fullpage.min.js',
        './components/util/util.min.js'
    ],
    init: function(nodes) {
        nodes.forEach(function(node) {
            let
                timerId = null,
                animationIsFinished = false,
                state = null,
                newState = null,
                defaults = {
                    menu: '.fullpage-navigation',
                    anchors: ['home', 'home-2', 'home-3', 'about', 'plan-your-visit', 'our-animals', 'ticket-prices', 'contacts'],
                    navigation: true,
                    navigationPosition: 'left',
                    easingcss3: 'ease-in',
                    afterLoad: function(anchorLink, index) {
                        let
                            section = node.children[index - 1],
                            animations = section.querySelectorAll('[data-animate], .layer');

                        if (animations.length) {
                            animations.forEach(function(node) {
                                node.animate();
                            });
                        }

                        animationIsFinished = false;
                    },
                    onLeave: function(index, nextIndex) {
                        if (!animationIsFinished && !timerId) {
                            let
                                section = node.children[index - 1],
                                animations = section.querySelectorAll('[data-animate], .layer');

                            if (animations.length) {
                                animations.forEach(function(node) {
                                    node.reanimate();
                                });
                            }

                            timerId = setTimeout(function() {
                                animationIsFinished = true;
                                $.fn.fullpage.moveTo(nextIndex);
                                timerId = null;
                            }, 600);
                        }

                        return animationIsFinished;
                    }
                },
                mobile = {
                    navigation: false,
                    paddingTop: '60px'
                },
                resizeHandler = function() {
                    if (window.matchMedia("( min-width: 1200px )").matches) {
                        newState = 'desktop';
                    } else {
                        newState = 'mobile';
                    }

                    if (state !== newState) {
                        if (document.documentElement.classList.contains('fp-enabled')) $.fn.fullpage.destroy('all');
                        state = newState;

                        switch (state) {
                            case 'desktop':
                                $(node).fullpage(defaults);
                                break;
                            case 'mobile':
                                $(node).fullpage(Object.assign(defaults, mobile));
                                break;
                        }
                    }
                };

            resizeHandler();
            window.addEventListener('resize', resizeHandler);
        });
    }
};

/**
 * Wrapper to eliminate json errors
 * @param {string} str - JSON string
 * @returns {object} - parsed or empty object
 */
function parseJSON(str) {
    try {
        if (str) return JSON.parse(str);
        else return {};
    } catch (error) {
        return {};
    }
}

/**
 * Returns version of IE or false, if browser is not Internet Explorer
 * @see {@link https://gist.github.com/gaboratorium/25f08b76eb82b1e7b91b01a0448f8b1d}
 * @returns {number|boolean}
 */
function detectIE() {
    let
        ua = window.navigator.userAgent,
        msie = ua.indexOf('MSIE '),
        trident = ua.indexOf('Trident/'),
        edge = ua.indexOf('Edge/');

    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        let rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    return false;
}

// Main
window.addEventListener('load', function() {
    new ZemezCore({
        components,
        onError: function(error) {
            setTimeout(() => {
                if (detectIE() < 12) {
                    let
                        script = document.createElement('script');
                    script.src = './components/base/support.js';

                    document.querySelector('head').appendChild(script);
                }

                throw new Error(error);
            }, 1000)
        }
    });
});