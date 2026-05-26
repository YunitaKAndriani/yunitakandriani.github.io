$(document).ready(function () {

	// Options menu hidden by default
	$('#theme').hide();
	$('#lan').hide();

	// ─── Smooth scroll for nav links ─────────────────────────
	$('#navbarList .nav-link').on('click', function (e) {
		const href = $(this).attr('href');
		if (!href || href === '#') return;

		const target = $(href);
		if (target.length) {
			e.preventDefault();
			const navHeight = $('#top-nav').outerHeight() || 70;
			$('html, body').animate({
				scrollTop: target.offset().top - navHeight - 16
			}, 400);
		}
	});

	// ─── Highlight active nav on scroll ──────────────────────
	const sections = ['homeContent', 'aboutmeContent', 'academicContent', 'researchContent', 'blogContent'];
	const navIds   = ['nav-home', 'nav-aboutme', 'nav-academic', 'nav-research', 'nav-blog'];

	function updateActiveNav() {
		const navHeight = $('#top-nav').outerHeight() || 70;
		const scrollY = $(window).scrollTop() + navHeight + 20;

		let active = 0;
		sections.forEach(function (id, i) {
			const el = $('#' + id);
			if (el.length && el.offset().top <= scrollY) {
				active = i;
			}
		});

		$('#navbarList .nav-link').removeClass('active');
		$('#' + navIds[active]).addClass('active');
	}

	$(window).on('scroll', updateActiveNav);
	updateActiveNav();

	// ─── BibTeX copy ─────────────────────────────────────────
	$(document).on('click', '.citation', function (e) {
		e.preventDefault();
		var bibtex = $(this).closest('.pub-links').next('.d-none')[0];
		if (bibtex) {
			navigator.clipboard.writeText(bibtex.innerText.trim())
				.then(() => toastr.success('BibTeX copied to clipboard'))
				.catch(() => toastr.error('Could not copy — please try manually'));
		}
	});

	// ─── Theme preference ─────────────────────────────────────
	if (localStorage.getItem('theme') === null) {
		localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	if (localStorage.theme === 'dark') {
		loadTheme('dark');
		$('#theme').empty().append("<i class='fa-solid fa-sun'></i>");
	} else {
		loadTheme('light');
		$('#theme').empty().append("<i class='fa-solid fa-moon'></i>");
	}

	// ─── Options toggler ──────────────────────────────────────
	$('#options-toggler').click(function () {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$('#theme').show('fast');
			$('#lan').show('fast');
		} else {
			$(this).removeClass('active');
			$('#theme').hide('fast');
			$('#lan').hide('fast');
		}
	});

	// ─── Toggle light / dark ─────────────────────────────────
	$('#theme').click(function () {
		if (localStorage.theme !== 'dark') {
			localStorage.theme = 'dark';
			loadTheme('dark');
			$(this).empty().append("<i class='fa-solid fa-sun'></i>");
		} else {
			localStorage.theme = 'light';
			loadTheme('light');
			$(this).empty().append("<i class='fa-solid fa-moon'></i>");
		}
	});

	// ─── Language switcher ───────────────────────────────────
	const langManager = new LanguageManager();
	$('#lan').click(function () {
		const newLang = langManager.getNextLanguage();
		langManager.setLanguage(newLang);
	});

});

// ─── Helpers ─────────────────────────────────────────────────

function loadTheme(theme) {
	$("link[href='assets/css/light.css']").remove();
	$("link[href='assets/css/dark.css']").remove();
	$('<link>').appendTo('head').attr({
		type: 'text/css', rel: 'stylesheet',
		href: 'assets/css/' + theme + '.css'
	});
}
