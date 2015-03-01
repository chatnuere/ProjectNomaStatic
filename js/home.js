/**
 * Created by ChatNoir on 26/02/15.
 */

var initSlider = function () {

    var updateSliderValue = function (event , ui) {
        object = $(ui.handle);
        object.html('< ' + Math.floor(ui.value) + '€ >');
        object.parent().find('.controlls').val(ui.value);
    };


    $(".styledSlider").each(function () {

        var value = parseInt($(this).find('input').val());
        var min = parseInt($(this).find('input').attr('min'));
        var max = parseInt($(this).find('input').attr('max'));
        var step = parseFloat($(this).find('input').attr('step'));
        $(this).slider({
            value       : value ,
            min         : min ,
            max         : max ,
            step        : step ,
            orientation : "horizontal" ,
            range       : "min" ,
            animate     : true ,
            slide       : function (event , ui) {
                updateSliderValue(event , ui)
            }

        });
    });

};


var initHomePage = function () {

    initSlider();

    /*
     *  Fonction d'update de la vidéo 1
     * */
    $('#childVideo').on('slide' , function (event , ui) {
        var video = document.getElementById('videotest');
        var timer = ui.value * 10;
        video.currentTime = timer * (video.duration / 100);
    });

    $('#MapChildrensSlider').on('slide' , function (event , ui) {
        var video = document.getElementById('MapChildrens');
        var timer = ui.value/1.5;
        video.currentTime = timer * (video.duration / 100);

        if(timer == 100){
            $('#videoMap aside ul').addClass('active')
        }else{
            $('#videoMap aside ul').removeClass('active')
        }
    });


    $(".owl-carousel").owlCarousel({
        jsonPath : 'js/article.json',
        jsonSuccess : customDataSuccess,
        items : 3,
        lazyLoad : true,
        navigation : true,
        rewindNav: false
    });

    function customDataSuccess(data){
        var content = "";
        for(var i in data["articles"]){

            var img            = data["articles"][i].img;
            var alt            = data["articles"][i].alt;
            var articleUrl     = data["articles"][i].articleUrl;
            var archiveLink    = data["articles"][i].archiveLink;
            var archiveText    = data["articles"][i].archiveText;
            var articleTitle   = data["articles"][i].articleTitle;
            var articlePreview = data["articles"][i].articlePreview;

            content +='<div class="articleCarousel item">'+
                    '<a href="'+articleUrl+'" class="simulatedCover">'+
                        '<img src="'+img+'" alt="'+alt+'">'+
                    '</a>'+
                    '<div class="content">'+
                        '<nav class="social">'+
                            '<p>Partager</p>'+
                            '<ul>'+
                                '<li><a target="_blank" href="http://twitter.com/intent/tweet/?url='+encodeURIComponent(articleUrl)+'&text='+articleTitle+'"><i class="icon-twitter"></i></a></li><!--'+
                             '--><li><a target="_blank" href=https://www.facebook.com/sharer/sharer.php?u="'+encodeURIComponent(articleUrl)+'"><i class="icon-facebook"></i></a></li><!--'+
                             '--><li><a href="mailto:?subject='+articleTitle+'&body='+articleUrl+'"><i class="icon-mail"></i></a></li>'+
                            '</ul>'+
                        '</nav>'+
                        '<p class="date"><a href="'+archiveLink+'">'+archiveText+'</a></p>'+
                        '<h4><a href="'+articleUrl+'">'+articleTitle+'</a></h4>'+

                        '<p class="preview"><a href="'+articleUrl+'">'+articlePreview+'</a></p></div></div>'


        }
        $(".owl-carousel").html(content);
    }


};

/*
 * Fonction nécessaire pour insérer le texte dans le handler du slider jqueryUi car l'event create proposé par jQueryUI apparait avant la création du handler
 * */
$('body').on('DOMNodeInserted' , '.ui-slider-handle' , function () {
    $(this).html('< ' + Math.floor($(this).parent().find('input').val()) + '€ >');
    $(this).css({top : ((-$(this).outerHeight() / 2) + ($(this).parent().outerHeight() / 2)) + 'px' , marginLeft : '-' + ($(this).outerWidth() / 2) + 'px'});
});


