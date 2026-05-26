$(document).ready(function () {

	// ─── Options menu hidden by default ──────────────────────
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
			}, 420);
		}
	});

	// ─── Smooth scroll for hero "About Me" button ────────────
	$('a[href="#aboutmeContent"]').on('click', function (e) {
		e.preventDefault();
		const navHeight = $('#top-nav').outerHeight() || 70;
		$('html, body').animate({
			scrollTop: $('#aboutmeContent').offset().top - navHeight - 16
		}, 420);
	});

	// ─── Highlight active nav link on scroll ─────────────────
	const sectionIds = ['homeContent', 'aboutmeContent', 'academicContent', 'researchContent', 'blogContent'];
	const navIds     = ['nav-home', 'nav-aboutme', 'nav-academic', 'nav-research', 'nav-blog'];

	function updateActiveNav() {
		const navHeight = $('#top-nav').outerHeight() || 70;
		const scrollY   = $(window).scrollTop() + navHeight + 24;
		let active = 0;

		sectionIds.forEach(function (id, i) {
			const el = $('#' + id);
			if (el.length && el.offset().top <= scrollY) active = i;
		});

		$('#navbarList .nav-link').removeClass('active');
		$('#' + navIds[active]).addClass('active');
	}

	$(window).on('scroll', updateActiveNav);
	updateActiveNav(); // run once on load

	// ─── BibTeX copy ─────────────────────────────────────────
	$(document).on('click', '.citation', function (e) {
		e.preventDefault();
		const bibtex = $(this).closest('.pub-links').next('.d-none')[0];
		if (bibtex) {
			navigator.clipboard.writeText(bibtex.innerText.trim())
				.then(() => toastr.success('BibTeX copied to clipboard'))
				.catch(() => toastr.error('Could not copy — please try manually'));
		}
	});

	// ─── Theme: load saved preference ────────────────────────
	if (localStorage.getItem('theme') === null) {
		localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	applyTheme(localStorage.theme);

	// ─── Options toggler ──────────────────────────────────────
	$('#options-toggler').on('click', function () {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$('#theme, #lan').show('fast');
		} else {
			$(this).removeClass('active');
			$('#theme, #lan').hide('fast');
		}
	});

	// ─── Toggle light / dark ──────────────────────────────────
	$('#theme').on('click', function () {
		const next = localStorage.theme === 'dark' ? 'light' : 'dark';
		localStorage.theme = next;
		applyTheme(next);
	});

	// ─── Language switcher ───────────────────────────────────
	const langManager = new LanguageManager();
	$('#lan').on('click', function () {
		langManager.setLanguage(langManager.getNextLanguage());
	});

});

// ─── Helpers ─────────────────────────────────────────────────

function applyTheme(theme) {
	$('#theme-stylesheet').attr('href', 'assets/css/' + theme + '.css');
	$('#theme').empty().append(
		theme === 'dark'
			? "<i class='fa-solid fa-sun'></i>"
			: "<i class='fa-solid fa-moon'></i>"
	);
}