$(document).ready(function () {

    /**
     * 1. Section Switching Logic
     * Handles the transition between the full-width Home and the Sidebar layout.
     */
    function switchSection(id) {
        // Validation: If the ID is empty or doesn't exist, default to home
        if (!id || id === '') id = 'home';

        // Update Navbar Active State
        $('.nav-link').removeClass('active');
        // Only highlight navbar items, not action buttons
        $(`.nav-link#${id}`).addClass('active');

        if (id === 'home') {
            // Layout: Show Full-Width Home, Hide Sidebar Row
            $('#homeContent').fadeIn(300).addClass('active');
            $('#section-content').hide();
        } else {
            // Layout: Hide Home, Show Sidebar Row
            $('#homeContent').hide().removeClass('active');
            $('#section-content').fadeIn(300);

            // Sub-content: Hide all and show the specific one
            $('#aboutmeContent, #educationContent, #publicationsContent, #blogContent').hide();
            $(`#${id}Content`).fadeIn(300);
        }

        // UX: Scroll to top and update URL hash without jumping
        window.scrollTo(0, 0);
        if (id !== 'home') {
            history.pushState(null, null, '#' + id);
        } else {
            history.pushState(null, null, window.location.pathname);
        }
    }

    /**
     * 2. Event Handlers for Navigation
     */
    // Handles Navbar links and the "About Me / Publications" buttons on the Home screen
    $('.nav-link, .btn').on('click', function (e) {
        const href = $(this).attr('href');
        const targetId = $(this).attr('id');

        // If it's a real link (like the CV PDF), let it open normally
        if (href && href !== '#' && !href.startsWith('#')) {
            return; 
        }

        if (targetId) {
            e.preventDefault();
            // Remove 'Btn' suffix if clicked from the Home landing page buttons
            const cleanId = targetId.replace('Btn', '');
            switchSection(cleanId);
        }
    });

    /**
     * 3. Theme Toggler
     */
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        $('body').addClass('dark-theme');
        $('#theme i').removeClass('fa-lightbulb').addClass('fa-moon');
    }

    $('#theme').on('click', function() {
        $('body').toggleClass('dark-theme');
        const isDark = $('body').hasClass('dark-theme');
        
        // Toggle Icon
        $(this).find('i').toggleClass('fa-lightbulb fa-moon');
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toastr.info(isDark ? 'Dark Mode Enabled' : 'Light Mode Enabled', '', { timeOut: 1000 });
    });

    /**
     * 4. BibTeX Citation Toggle
     */
    $(document).on('click', '#citation', function(e) {
        e.preventDefault();
        // Finds the next div with the citation text regardless of wrapping
        $(this).closest('.pub-block').find('.d-none, .citation-box').first().slideToggle(200).toggleClass('d-block');
    });

    /**
     * 5. Initial Load Handling
     */
    const currentHash = window.location.hash.replace('#', '');
    const validSections = ['aboutme', 'education', 'publications', 'blog'];
    
    if (validSections.includes(currentHash)) {
        switchSection(currentHash);
    } else {
        switchSection('home');
    }
});