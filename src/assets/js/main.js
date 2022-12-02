$(document).ready(() => {
    const router = new Navigo('/');
    router.on('/page.html', function () {
        routeAjax(this.name);
    })
        .on('/bar.html', function () {
            routeAjax(this.name);
        })
        .on('/events.html', function () {
            routeAjax(this.name);
        })
        .on('/contacts.html', function () {
            routeAjax(this.name);
        })
        .on('/', () => {
            console.log('');
            $('.nav').removeClass('nav_hide');
            // change background to small
            $('.background').removeClass('background_small');
            $('.header__pagename').html('');
            $('.main-menu__item a').css('pointer-events', 'none');
            setTimeout(() => {
                $('.content').removeClass('active');
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
            }
        });
    }
});