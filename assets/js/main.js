$(document).ready(function(){

    // =========================
    // SECTION SYSTEM (FIXED)
    // =========================

    $('.section').hide();

    $('#homeContent').show().addClass('active');
    $('#home').addClass('active');
    $('#leftPanel').hide();

    $('#navbarList .nav-link').click(function(e){
        e.preventDefault();

        const id = $(this).attr('id');

        // active link
        $('#navbarList .nav-link').removeClass('active');
        $(this).addClass('active');

        // hide all sections
        $('.section').hide().removeClass('active');

        // show selected
        $('#' + id + 'Content').show().addClass('active');

        // left panel logic
        if(id === 'home'){
            $('#leftPanel').hide();
        } else {
            $('#leftPanel').show();
        }
    });

    // =========================
    // HOME BUTTONS
    // =========================

    $('#aboutmeBtn').click(function(e){
        e.preventDefault();
        $('#aboutme').click();
    });

    $('#publicationsBtn').click(function(e){
        e.preventDefault();
        $('#publications').click();
    });

    // =========================
    // PUBLICATIONS (COPY)
    // =========================

    $(document).on("click", "#citation", function(){
        var text = $(this).parent().parent().next()[0].innerHTML;
        navigator.clipboard.writeText(text);
        toastr.success('Citation copied');
    });

    // =========================
    // BLOG CLICK
    // =========================

    $('.clickable').click(function(e) {
        window.open($(e.currentTarget)[0].childNodes[1].innerText, '_blank').focus();
    });

    // =========================
    // THEME SYSTEM 🌙
    // =========================

    if(localStorage.getItem("theme") === null){
        localStorage.theme = "light";
        if (window.matchMedia('(prefers-color-scheme: dark)').matches)
            localStorage.theme = "dark";
    }

    // load theme
    function loadTheme(){
        $("link[data-theme]").remove();

        const themeFile = localStorage.theme === "dark"
            ? "assets/css/dark.css"
            : "assets/css/light.css";

        $('<link>')
            .appendTo('head')
            .attr({
                rel: 'stylesheet',
                href: themeFile,
                'data-theme': 'active'
            });
    }

    loadTheme();

    $('#theme').click(function(){
        localStorage.theme = (localStorage.theme === "dark") ? "light" : "dark";
        loadTheme();
    });

    // =========================
    // OPTIONS MENU
    // =========================

    $('#theme').hide();
    $('#lan').hide();

    $('#options-toggler').click(function(){
        $(this).toggleClass('active');
        $('#theme, #lan').toggle("fast");
    });

    // =========================
    // LANGUAGE 🌐
    // =========================

    const langManager = new LanguageManager();

    $('#lan').click(function() {
        const newLang = langManager.getNextLanguage();
        langManager.setLanguage(newLang);
    });

});