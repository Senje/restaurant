$(document).ready(() => {
    const router = new Navigo('/');
    router.on('page.html', function () {
        routeAjax(this.name);
    })
        .on('bar.html', function () {
            routeAjax(this.name);
        })
        .on('events.html', function () {
            routeAjax(this.name);
        })
        .on('contacts.html', function () {
            routeAjax(this.name);
        })
        .on('/', () => {
            console.log('');
            $('.nav').removeClass('nav_hide');
            // change background to small
            $('.background').removeClass('background_small');
            $('.header__pagename').html('');
            $('.main-menu__item a').css('pointer-events', 'none');
            $('.content').removeClass('active');
            setTimeout(() => {
                $('.main-menu__item a').removeAttr('style');
            }, 1000);
        });
    router.resolve();
    function routeAjax(name) {
        $.ajax({
            url: name,
            method: 'get',
            dataType: 'html',
            success: function (data) {
                // Find page content and get HTML
                const getHtml = $(data).find('.content').html();
                // Get Header
                const getHeader = $(data).find('.pageName').html();

                // Put header
                $('.header__pagename').html(getHeader);
                // Put content in page
                $('.content').addClass('active').html(getHtml);
                $('.nav').addClass('nav_hide');
                // change background to small
                $('.background').addClass('background_small');
                // change phone mask
                phoneMask();
                // slider
                sliders();
            }
        });
    }

    // sliders
    function sliders() {
        $('#slider-menu, #slider-breakfast, #slider-bar').slick({
            arrows: false,
            dots: true,
        });
    }
    // Mask for phone inputs
    function phoneMask() {
        const prefixNumber = (str) => {
            if (str === "7") {
                return "7 (";
            }
            if (str === "8") {
                return "8 (";
            }
            if (str === "9") {
                return "7 (9";
            }
            return "7 (";
        };
        // ======================================
        $('.input-phone').on("input", function () {
            const value = this.value.replace(/\D+/g, "");
            const numberLength = 11;

            let result;
            if (this.value.includes("+8") || this.value[0] === "8") {
                result = "";
            } else {
                result = "+";
            }

            //
            for (let i = 0; i < value.length && i < numberLength; i++) {
                switch (i) {
                    case 0:
                        result += prefixNumber(value[i]);
                        continue;
                    case 4:
                        result += ") ";
                        break;
                    case 7:
                        result += "-";
                        break;
                    case 9:
                        result += "-";
                        break;
                    default:
                        break;
                }
                result += value[i];
            }
            this.value = result;
        });

    }

});