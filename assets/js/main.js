$(document).ready(function(){
	// By default, all the divs are hidden, if you were to add a new div, you should hide it here.
	// If you want to show a div, you should clic on the corresponding link on the navbar.
	$('#homeContent').hide();
	$('#aboutmeContent').hide();
	$('#academicContent').hide();
	$('#researchContent').hide();
	// $('#experienceContent').hide();
	// $('#conferencesContent').hide();
	// $('#projectsContent').hide();
	$('#blogContent').hide();
	// $('#academicContent').hide();
	// $('#particularContent').hide();
	// $('#photosContent').hide();

	// Options menu is hidden by default
	$('#theme').hide();
	$('#lan').hide();
	
	// Handle 'Home' content
	$('#home').click(function(e) {
		// e.preventDefault();

		if(!$(e.currentTarget).hasClass('active')) {
			clearActiveLinks();
			activateLink(e);

			clearActiveDivs();

			activateDiv('#homeContent');
		}

	});

	// Handle 'About Me' content
	$('#aboutme').click(function(e) {
		// e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.currentTarget).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#aboutmeContent');
		}

	});

	// Handle 'Academic' content
	$('#academic').click(function(e) {
		// e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.currentTarget).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#academicContent');
		}
	});

	// Handle 'research' content
	$('#research').click(function(e) {
		// e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.currentTarget).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#researchContent');
		}
	});

	// Handle 'Blog' content
	$('#blog').click(function(e) {
		// e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.currentTarget).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#blogContent');
		}
	});

	$('#aboutmeBtn').click(function(e) {
		e.preventDefault();
		$('#aboutme').click();
	});

	// $('#researchBtn').click(function(e) {
	// 	e.preventDefault();
	// 	$('#research').click();
	// });


	// Handle 'Particular' content
	$('#particular').click(function(e) {

		// If the div has already the class active, no need to reload the divs...
		if(!$(e.currentTarget).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			activateLink(e);

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#particularContent');
		}
	});

	// // Handle 'Conferences' content
	// $('#conferences').click(function(e) {

	// 	// If the div has already the class active, no need to reload the divs...
	// 	if(!$(e.currentTarget).hasClass('active')) {
	// 		// Update navbar
	// 		clearActiveLinks();
	// 		activateLink(e);

	// 		// Hide other contents
	// 		clearActiveDivs();

	// 		// Show current content
	// 		activateDiv('#conferencesContent');
	// 	}
	// });

	// // Handle 'Experience' content
	// $('#experience').click(function(e) {

	// 	// If the div has already the class active, no need to reload the divs...
	// 	if(!$(e.currentTarget).hasClass('active')) {
	// 		// Update navbar
	// 		clearActiveLinks();
	// 		activateLink(e);

	// 		// Hide other contents
	// 		clearActiveDivs();

	// 		// Show current content
	// 		activateDiv('#experienceContent');
	// 	}
	// });

	// // Handle 'Projects' content
	// $('#projects').click(function(e) {

	// 	// If the div has already the class active, no need to reload the divs...
	// 	if(!$(e.currentTarget).hasClass('active')) {
	// 		// Update navbar
	// 		clearActiveLinks();
	// 		activateLink(e);

	// 		// Hide other contents
	// 		clearActiveDivs();

	// 		// Show current content
	// 		activateDiv('#projectsContent');
	// 	}
	// });


	// **************************** //
	// Handles the research events
	// **************************** //

	// Copies the citation to the clipboard
	$(document).on("click", ".citation", function(){
		var text = $(this).parent().parent().next()[0].innerHTML;

		navigator.clipboard.writeText(text);

		toastr.success('Citation copied');
	});

	// ******************** //
	// Handles the Blog events
	// ******************** //

	// Opens the blog post in a new tab
	$('.clickable').click(function(e) {
		window.open($(e.currentTarget)[0].childNodes[1].innerText, '_blank').focus();
	});


	// *************************** //
	// Handle the rest of the content
	// Omit this part if you don't have more content
	// *************************** //
	
	// If the user has not selected a theme, then select the default one according to the user's preferences
	if(localStorage.getItem("theme") === null){
		localStorage.theme = "light";
		if (window.matchMedia('(prefers-color-scheme: dark)').matches)
			localStorage.theme = "dark";
	}

	// Always load the light theme
	$('<link>').appendTo('head').attr({
		type: 'text/css', 
		rel: 'stylesheet',
		href: 'assets/css/light.css'
	});

	// If the user has the dark theme, then replace the light theme with the dark one
	if (localStorage.theme == "dark") {
		$("link[href='assets/css/light.css']").remove();
		$('<link>').appendTo('head').attr({
			type: 'text/css', 
			rel: 'stylesheet',
			href: 'assets/css/dark.css'
		});
		$('#theme').empty().append("<i class='fa-duotone fa-lightbulb-slash'></i>");
	}

	// Controls the option menu toggler to show/hide the language and theme selectors
	$('#options-toggler').click(function(e) {
		if(!$(e.currentTarget).hasClass('active')) {
			$(e.currentTarget).addClass('active');
			$('#theme').show("fast");
			$('#lan').show("fast");
		}
		else {
			$(e.currentTarget).removeClass('active');
			$('#theme').hide("fast");
			$('#lan').hide("fast");
		}
	})

	// Alternates between light and dark themes
	$('#theme').click(function(e) {
		if(localStorage.theme != "dark"){
			$('#theme').empty().append("<i class='fa-duotone fa-lightbulb-slash'></i>");

			localStorage.theme = "dark"
			
			$("link[href='assets/css/light.css']").remove();
			$('<link>').appendTo('head').attr({
				type: 'text/css', 
				rel: 'stylesheet',
				href: 'assets/css/dark.css'
			});
		}
		else {
			$('#theme').empty().append("<i class='fa-duotone fa-lightbulb'></i>");

			localStorage.theme = "light"
			
			$("link[href='assets/css/dark.css']").remove();
			$('<link>').appendTo('head').attr({
				type: 'text/css', 
				rel: 'stylesheet',
				href: 'assets/css/light.css'
			});
		}
	})

	
	// Create the language manager
	const langManager = new LanguageManager();
	
	// Alternates between the different available languages
	$('#lan').click(function() {
        const newLang = langManager.getNextLanguage();
        langManager.setLanguage(newLang);
    });

	// Show Home by default
	// activateDiv('#homeContent');
	// $('#home').addClass('active');
	// $('#leftPanel').hide();

	$('#section-content').hide();   // hide all sections initially
	$('#homeContent').show();       // show home
	$('#home').addClass('active');
	$('#leftPanel').hide();
});

// Clears the active links
function clearActiveLinks() {
	$('#navbarList .nav-item .nav-link').each(function() {
		$(this).removeClass('active');
	});
}

// Clears the active divs
// function clearActiveDivs() {
// 	$('.container .content .active').each(function() {
// 		$(this).removeClass('active');
// 		$(this).hide();
// 	});
// }
function clearActiveDivs() {
	$('#aboutmeContent').hide().removeClass('active');
	$('#academicContent').hide().removeClass('active');
	$('#researchContent').hide().removeClass('active');
	$('#blogContent').hide().removeClass('active');
}

// Activates the link
// function activateLink(e) {
// 	$(e.target).addClass('active');
	
// 	// Hide left panel
// 	if(e.target.id == "home"){
// 		$('#leftPanel').hide();
// 		// $('#section-content').hide();
// 		$('#homeContent').show();
// 	}
// 	else {
// 		$('#leftPanel').show();
// 		// $('#section-content').show();
// 		$('#homeContent').hide();
// 	}
// }

function activateLink(e) {
	$(e.target).addClass('active');

	const id = e.target.id;

	if (id === "home") {
		$('#homeContent').show();
		$('#section-content').hide();
		return;
	}

	// show main section
	$('#homeContent').hide();
	$('#section-content').show();

	// LEFT PANEL LOGIC
	if (id === "aboutme") {
		$('#leftPanel').show();

		// shrink main content
		$('#mainPanel')
			.removeClass('col-md-12')
			.addClass('col-md-8 offset-md-1');
	} else {
		$('#leftPanel').hide();

		// expand main content FULL WIDTH
		$('#mainPanel')
			.removeClass('col-md-8 offset-md-1')
			.addClass('col-md-12');
	}
}

// Activates the div
// function activateDiv(divId) {
// 	$(divId).addClass('active');
// 	$(divId).show();

// 	// Scrolls to the content
// 	scrollToContent(divId);
// }
function activateDiv(divId) {
	$('#section-content').show();   // make sure container is visible
	$(divId).addClass('active').show();

	scrollToContent(divId);
}

// Scrolls to the content
function scrollToContent(divId) {
	if ($(window).width() < 751) {
		$('html, body').animate({
			scrollTop: $(divId).offset().top
		}, 1);
	}
}