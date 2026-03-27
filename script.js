// ===== CAROUSEL FUNCTIONALITY =====
const carousels = {
    'home-carousel': 0,
    'about-carousel': 0,
    'interests-carousel': 0,
    'websites-carousel': 0,
    'projects-carousel': 0,
    'contact-carousel': 0
};

function changeSlide(carouselId, n) {
    carousels[carouselId] += n;
    showSlide(carouselId);
}

function currentSlide(carouselId, n) {
    carousels[carouselId] = n;
    showSlide(carouselId);
}

function showSlide(carouselId) {
    const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
    let index = carousels[carouselId];

    if (index >= slides.length) {
        carousels[carouselId] = 0;
        index = 0;
    }
    if (index < 0) {
        carousels[carouselId] = slides.length - 1;
        index = slides.length - 1;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// ===== PAGE NAVIGATION FUNCTION =====
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const activeLink = document.querySelector(`a[onclick="showPage('${pageId}')"]`);
    if (activeLink) activeLink.classList.add('active');

    window.scrollTo(0, 0);
}

// ===== SEARCH FUNCTIONALITY =====
const searchableContent = {
    'home': ['Mugisha', 'Abigail', 'Eunice', 'Web Developer', 'Designer', 'portfolio', 'highlights'],
    'about': ['About', 'Skills', 'Coder', 'Swimmer', 'Dancer', 'Problem Solving', 'Critical Thinking', 'Interests', 'Hobbies', 'Reading', 'Learning'],
    'websites': ['Websites', 'Google', 'Wikipedia', 'CodePen', 'Khan Academy', 'GitHub', 'favorite'],
    'projects': ['Projects', 'Critical Thinking', 'Vocabulary', 'Portfolio', 'Web Design', 'Quotes', 'Inspirational'],
    'contact': ['Contact', 'Email', 'School', 'Collaboration', 'Location', 'Rwanda', 'NLS', 'Ntare']
};

function searchPortfolio() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!searchTerm) {
        alert('Please enter a search term!');
        return;
    }

    let results = [];
    for (const [page, keywords] of Object.entries(searchableContent)) {
        const matches = keywords.filter(keyword => keyword.toLowerCase().includes(searchTerm));
        if (matches.length > 0) {
            results.push({
                page: page,
                matches: matches,
                title: page.charAt(0).toUpperCase() + page.slice(1)
            });
        }
    }

    if (results.length > 0) {
        showSearchResults(results);
    } else {
        alert('No results found for "' + searchTerm + '". Try searching for: portfolio, projects, skills, hobbies, contact, etc.');
    }
}

function showSearchResults(results) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    let resultsHTML = '<div class="page-content"><h2>Search Results</h2>';

    results.forEach(result => {
        resultsHTML += `
            <div class="search-result-item">
                <h4>📄 ${result.title}</h4>
                <p>Found: ${result.matches.join(', ')}</p>
                <a href="#" onclick="showPage('${result.page}'); return false;" class="card-link">Go to ${result.title} →</a>
            </div>
        `;
    });

    resultsHTML += '</div>';

    const resultsPage = document.createElement('div');
    resultsPage.id = 'search-results';
    resultsPage.className = 'page active';
    resultsPage.innerHTML = resultsHTML;

    const existingResults = document.getElementById('search-results');
    if (existingResults) existingResults.remove();

    document.body.insertBefore(resultsPage, document.querySelector('footer'));
}

// ===== CUSTOM CURSOR FUNCTIONALITY =====
const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.8) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
            trail.style.transition = 'all 0.6s ease-out';
        }, 10);

        setTimeout(() => trail.remove(), 600);
    }
});

const clickableElements = document.querySelectorAll('a, button, .card-link, nav a, .carousel-button, .carousel-dot, .search-btn, .cta-btn');
clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// ===== SEARCH ON ENTER KEY =====
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchPortfolio();
    }
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('onclick')) {
            e.preventDefault();
        }
    });
});
