window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

function setupResultReferenceSwitcher() {
    const buttons = Array.from(document.querySelectorAll('[data-result-case]'));
    const panels = Array.from(document.querySelectorAll('.dance-results-grid[role="tabpanel"]'));

    if (buttons.length === 0 || panels.length === 0) return;

    function selectCase(button) {
        const selectedCase = button.dataset.resultCase;

        buttons.forEach(option => {
            const isSelected = option === button;
            option.classList.toggle('is-active', isSelected);
            option.setAttribute('aria-selected', String(isSelected));
            option.tabIndex = isSelected ? 0 : -1;
        });

        panels.forEach(panel => {
            const isSelected = panel.id === `result-case-${selectedCase}`;
            panel.hidden = !isSelected;

            panel.querySelectorAll('video').forEach(video => {
                video.pause();
                if (isSelected) {
                    video.currentTime = 0;
                }
            });
        });
    }

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => selectCase(button));
        button.addEventListener('keydown', event => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 1 : -1;
            const nextButton = buttons[(index + direction + buttons.length) % buttons.length];
            nextButton.focus();
            selectCase(nextButton);
        });
    });
}

setupResultReferenceSwitcher();

var carouselOptions = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: false,
};

if (typeof bulmaCarousel !== 'undefined') {
    bulmaCarousel.attach('.carousel', carouselOptions);
}
