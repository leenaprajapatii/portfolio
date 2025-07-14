document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggling Logic ---
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    const sunIcon = document.querySelector('.theme-icon.sun-icon');
    const moonIcon = document.querySelector('.theme-icon.moon-icon');

    // Function to apply the theme and update icons
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (sunIcon && moonIcon) {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        } else {
            document.documentElement.classList.remove('dark');
            if (sunIcon && moonIcon) {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        }
    };

    // Initialize theme on page load based on localStorage
    const storedTheme = localStorage.getItem('vite-ui-theme');
    // If no theme is stored, default to 'light' or your preferred default
    applyTheme(storedTheme || 'light');

    // Function to toggle theme
    const toggleTheme = () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('vite-ui-theme', newTheme);
        applyTheme(newTheme);

        // Trigger body animation for day/night transition
        document.body.classList.remove('animation-ready');
        // Force reflow to restart CSS animations
        void document.body.offsetWidth;
        document.body.classList.add('animation-ready');
    };

    // Add event listeners for theme toggle buttons
    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // --- Mobile Menu Toggling Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuItems = document.getElementById('mobile-menu-items');

    if (mobileMenuButton && mobileMenuItems) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuItems.classList.toggle('hidden');
        });
    }

    // --- Active Navigation Link Highlighting Logic ---
    const highlightNavLink = () => {
        const path = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a'); // Get all links in nav

        navLinks.forEach(link => {
            // Remove previous active classes and reset to default inactive
            link.classList.remove(
                'text-blue-600', 'dark:text-blue-400',
                'text-purple-600', 'dark:text-purple-400',
                'text-pink-600', 'dark:text-pink-400',
                'text-cyan-600', 'dark:text-cyan-400'
            );
            link.classList.add('text-gray-700', 'dark:text-gray-300'); // Set default inactive color

            // Determine if the link is active
            let isActive = false;
            const linkPath = link.getAttribute('href');

            // Normalize linkPath to ensure it ends with a slash for consistent comparison
            const normalizedLinkPath = linkPath.endsWith('/') ? linkPath : linkPath + '/';
            const normalizedCurrentPath = path.endsWith('/') ? path : path + '/';

            if (normalizedLinkPath === normalizedCurrentPath) {
                isActive = true;
            } else if (normalizedCurrentPath.startsWith('/competition/') && normalizedLinkPath === '/portfolio/') {
                // Special case: Highlight portfolio when on a competition detail page
                isActive = true;
            } else if (normalizedCurrentPath.startsWith('/blog/') && normalizedLinkPath === '/blog/') {
                // Special case: Highlight blog when on a blog post detail page
                isActive = true;
            }

            if (isActive) {
                let activeClass = '';
                if (normalizedLinkPath === '/' || normalizedLinkPath === '/home/') activeClass = 'text-blue-600 dark:text-blue-400';
                else if (normalizedLinkPath === '/portfolio/') activeClass = 'text-purple-600 dark:text-purple-400';
                else if (normalizedLinkPath === '/blog/') activeClass = 'text-pink-600 dark:text-pink-400';
                else if (normalizedLinkPath === '/contact/') activeClass = 'text-cyan-600 dark:text-cyan-400';

                if (activeClass) {
                    link.classList.remove('text-gray-700', 'dark:text-gray-300');
                    link.classList.add(activeClass);
                }
            }
        });
    };

    highlightNavLink(); // Call on page load to set initial active link

    // --- Body Animation Class (from App.tsx useEffect) ---
    // This class triggers the day/night background animations.
    document.body.classList.add('animation-ready');
});

// The original toggle.js functionality for spacebar/click is now integrated into the theme toggle.
// If you specifically want to keep the spacebar/click to toggle theme anywhere on the page,
// you can add these back, but they might conflict with other interactive elements.
/*
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') { // event.keyCode is deprecated, use event.code
    toggleTheme(); // Call the unified toggleTheme function
  }
});

document.addEventListener('click', function() {
  // Be careful with this, it will toggle theme on any click on the page.
  // Consider if this is the desired UX.
  toggleTheme(); // Call the unified toggleTheme function
});
*/
