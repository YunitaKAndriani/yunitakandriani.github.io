$(document).ready(function(){

	// Hide all sections initially
	$('#homeContent').hide();
	$('#aboutmeContent').hide();
	$('#academicContent').hide();
	$('#researchContent').hide();
	$('#blogContent').hide();

	// Options menu is hidden by default
	$('#theme').hide();
	$('#lan').hide();

	// ─── NAV: Home ───────────────────────────────────────────
	$('#home').click(function(e) {
		if (!$(e.currentTarget).hasClass('active')) {
			clearActiveLinks();
			activateLink(e);
			clearActiveDivs();
			activateDiv('#homeContent');
		}
	});

	// ─── NAV: About Me ───────────────────────────────────────
	$('#aboutme').click(function(e) {
		if (!$(e.currentTarget).hasClass('active')) {
			clearActiveLinks();
			activateLink(e);
			clearActiveDivs();
			activateDiv('#aboutmeContent');
		}
	});

	// ─── NAV: Academic ───────────────────────────────────────
	$('#academic').click(function(e) {
		if (!$(e.currentTarget).hasClass('active')) {
			clearActiveLinks();
			activateLink(e);
			clearActiveDivs();
			activateDiv('#academicContent');
		}
	});

	// ─── NAV: Research ───────────────────────────────────────
	$('#research').click(function(e) {
		if (!$(e.currentTarget).hasClass('active')) {
			clearActiveLinks();
			activateLink(e);
			clearActiveDivs();
			activateDiv('#researchContent');
		}
	});

	// ─── NAV: Blog ───────────────────────────────────────────
	$('#blog').click(function(e) {
		if (!$(e.currentTarget).hasClass('active')) {
			clearActiveLinks();
			activateLink(e);
			clearActiveDivs();
			activateDiv('#blogContent');
		}
	});

	// ─── Hero "About Me" button ───────────────────────────────
	$('#aboutmeBtn').click(function(e) {
		e.preventDefault();
		$('#aboutme').click();
	});

	// ─── BibTeX copy (FIX: was ".citation", now matches HTML class) ──
	$(document).on('click', '.citation', function(e) {
		e.preventDefault();
		// Navigate: <a.citation> → <span> → <div.pub-links> → next sibling <div.d-none>
		var bibtex = $(this).closest('.pub-links').next('.d-none')[0];
		if (bibtex) {
			navigator.clipboard.writeText(bibtex.innerText.trim())
				.then(() => toastr.success('BibTeX copied to clipboard'))
				.catch(() => toastr.error('Could not copy — please try manually'));
		}
	});

	// ─── Clickable blog cards ─────────────────────────────────
	$('.clickable').click(function(e) {
		window.open($(e.currentTarget)[0].childNodes[1].innerText, '_blank').focus();
	});

	// ─── Theme preference ─────────────────────────────────────
	if (localStorage.getItem('theme') === null) {
		localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Load the correct theme on startup
	if (localStorage.theme === 'dark') {
		loadTheme('dark');
		$('#theme').empty().append("<i class='fa-solid fa-sun'></i>");
	} else {
		loadTheme('light');
		$('#theme').empty().append("<i class='fa-solid fa-moon'></i>");
	}

	// ─── Options toggler ──────────────────────────────────────
	$('#options-toggler').click(function(e) {
		if (!$(e.currentTarget).hasClass('active')) {
			$(e.currentTarget).addClass('active');
			$('#theme').show('fast');
			$('#lan').show('fast');
		} else {
			$(e.currentTarget).removeClass('active');
			$('#theme').hide('fast');
			$('#lan').hide('fast');
		}
	});

	// ─── Toggle light / dark ─────────────────────────────────
	$('#theme').click(function() {
		if (localStorage.theme !== 'dark') {
			localStorage.theme = 'dark';
			loadTheme('dark');
			$('#theme').empty().append("<i class='fa-solid fa-sun'></i>");
		} else {
			localStorage.theme = 'light';
			loadTheme('light');
			$('#theme').empty().append("<i class='fa-solid fa-moon'></i>");
		}
	});

	// ─── Language switcher ───────────────────────────────────
	const langManager = new LanguageManager();

	$('#lan').click(function() {
		const newLang = langManager.getNextLanguage();
		langManager.setLanguage(newLang);
	});

	// ─── Initial state: show Home ─────────────────────────────
	$('#section-content').hide();
	$('#homeContent').show();
	$('#home').addClass('active');
	$('#leftPanel').hide();
});

// ─── Helpers ─────────────────────────────────────────────────

function loadTheme(theme) {
	$("link[href='assets/css/light.css']").remove();
	$("link[href='assets/css/dark.css']").remove();
	$('<link>').appendTo('head').attr({
		type: 'text/css',
		rel: 'stylesheet',
		href: `assets/css/${theme}.css`
	});
}

function clearActiveLinks() {
	$('#navbarList .nav-item .nav-link').removeClass('active');
}

function clearActiveDivs() {
	$('#aboutmeContent, #academicContent, #researchContent, #blogContent')
		.hide()
		.removeClass('active');
}

function activateLink(e) {
	$(e.target).addClass('active');
	const id = e.target.id;

	if (id === 'home') {
		$('#homeContent').show();
		$('#section-content').hide();
		return;
	}

	$('#homeContent').hide();
	$('#section-content').show();

	if (id === 'aboutme') {
		$('#leftPanel').show();
		$('#mainPanel')
			.removeClass('col-md-12')
			.addClass('col-md-8 offset-md-1');
	} else {
		$('#leftPanel').hide();
		$('#mainPanel')
			.removeClass('col-md-8 offset-md-1')
			.addClass('col-md-12');
	}
}

function activateDiv(divId) {
	if (divId !== '#homeContent') {
		$('#section-content').show();
	}
	$(divId).addClass('active').show();
	scrollToContent(divId);
}

// function scrollToContent(divId) {
// 	if ($(window).width() < 751) {
// 		$('html, body').animate({ scrollTop: $(divId).offset().top - 70 }, 250);
// 	}
// }

function scrollToContent(divId) {
	if ($(window).width() < 751) {
		// Option A: Use .scrollTop() for an instant jump
		$(window).scrollTop($(divId).offset().top - 70);
		
		// OR Option B: Keep .animate but set time to 0
		// $('html, body').animate({ scrollTop: $(divId).offset().top - 70 }, 0);
	}
}
