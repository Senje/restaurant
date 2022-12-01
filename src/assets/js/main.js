$(document).ready(() => {
    const router = new Navigo('/');
    router.on('/page.html', function () {
        routeAjax(this.name);
    })
        .on('/', () => {
            $('.nav').removeClass('nav_hide');
            // change background to small
            $('.background').removeClass('background_small');
            $('.content').removeClass('active').html('');
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
                // Put content in page
                $('.content').addClass('active').html(getHtml);
                $('.nav').addClass('nav_hide');
                // change background to small
                $('.background').addClass('background_small');
            }
        });
    }
});