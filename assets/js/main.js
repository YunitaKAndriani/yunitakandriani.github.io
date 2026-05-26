$(document).ready(function () {

	// ─────────────────────────────────────────────
	// Hide floating buttons initially
	// ─────────────────────────────────────────────

	$('#theme').hide();
	$('#lan').hide();


	// ─────────────────────────────────────────────
	// Smooth scrolling
	// ─────────────────────────────────────────────

	$('#navbarList .nav-link').on('click', function (e) {

		const href = $(this).attr('href');

		if (!href || href === '#') return;

		const target = $(href);

		if (target.length) {

			e.preventDefault();

			const navHeight = $('#top-nav').outerHeight() || 70;

			$('html, body').animate({
				scrollTop: target.offset().top - navHeight - 12
			}, 500);

		}

	});


	// Hero button scroll

	$('a[href="#aboutmeContent"]').on('click', function (e) {

		e.preventDefault();

		const navHeight = $('#top-nav').outerHeight() || 70;

		$('html, body').animate({
			scrollTop: $('#aboutmeContent').offset().top - navHeight - 12
		}, 500);

	});


	// ─────────────────────────────────────────────
	// Active navbar highlight
	// ─────────────────────────────────────────────

	const sections = [
		'homeContent',
		'aboutmeContent',
		'academicContent',
		'researchContent',
		'blogContent'
	];

	function updateActiveNav() {

		const scrollPos =
			$(window).scrollTop() +
			($('#top-nav').outerHeight() || 70) +
			60;

		let current = sections[0];

		sections.forEach(function (id) {

			const section = $('#' + id);

			if (
				section.length &&
				section.offset().top <= scrollPos
			) {
				current = id;
			}

		});

		$('#navbarList .nav-link').removeClass('active');

		$('#navbarList .nav-link').each(function () {

			const href = $(this).attr('href');

			if (href === '#' + current) {
				$(this).addClass('active');
			}

		});

	}


	// Navbar shadow on scroll

	function updateNavbarState() {

		if ($(window).scrollTop() > 30) {
			$('#top-nav').addClass('scrolled');
		} else {
			$('#top-nav').removeClass('scrolled');
		}

	}


	$(window).on('scroll', function () {

		updateActiveNav();
		updateNavbarState();

	});


	updateActiveNav();
	updateNavbarState();


	// ─────────────────────────────────────────────
	// BibTeX copy
	// ─────────────────────────────────────────────

	$(document).on('click', '.citation', function (e) {

		e.preventDefault();

		const bibtex =
			$(this)
			.closest('.pub-links')
			.next('.d-none')[0];

		if (bibtex) {

			navigator.clipboard.writeText(
				bibtex.innerText.trim()
			)

			.then(() => {
				toastr.success('BibTeX copied to clipboard');
			})

			.catch(() => {
				toastr.error('Could not copy BibTeX');
			});

		}

	});


	// ─────────────────────────────────────────────
	// Theme initialization
	// ─────────────────────────────────────────────

	initializeTheme();


	// ─────────────────────────────────────────────
	// Theme toggle
	// ─────────────────────────────────────────────

	$('#theme').on('click', function () {

		const current =
			localStorage.getItem('theme') || 'light';

		const next =
			current === 'dark'
				? 'light'
				: 'dark';

		setTheme(next);

	});


	// ─────────────────────────────────────────────
	// Options toggler
	// ─────────────────────────────────────────────

	$('#options-toggler').on('click', function () {

		$(this).toggleClass('active');

		$('#theme').fadeToggle(140);
		$('#lan').fadeToggle(140);

	});


	// ─────────────────────────────────────────────
	// Language switcher
	// ─────────────────────────────────────────────

	const langManager = new LanguageManager();

	$('#lan').on('click', function () {

		langManager.setLanguage(
			langManager.getNextLanguage()
		);

	});

});


// ─────────────────────────────────────────────
// THEME FUNCTIONS
// ─────────────────────────────────────────────

function initializeTheme() {

	let savedTheme =
		localStorage.getItem('theme');

	if (!savedTheme) {

		savedTheme =
			window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
				? 'dark'
				: 'light';

		localStorage.setItem(
			'theme',
			savedTheme
		);

	}

	setTheme(savedTheme);

}


function setTheme(theme) {

	const themeLink =
		document.getElementById(
			'theme-stylesheet'
		);

	if (!themeLink) return;

	// Prevent flash glitch
	document.body.style.visibility = 'hidden';

	themeLink.setAttribute(
		'href',
		'assets/css/' + theme + '.css'
	);

	themeLink.onload = function () {

		document.body.style.visibility = 'visible';

		updateThemeIcon(theme);

	};

	localStorage.setItem(
		'theme',
		theme
	);

}


function updateThemeIcon(theme) {

	$('#theme').html(

		theme === 'dark'

			? "<i class='fa-solid fa-sun'></i>"

			: "<i class='fa-solid fa-moon'></i>"

	);

}
