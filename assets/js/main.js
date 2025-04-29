// Store the current language and translations
let currentLanguage = 'en';
let translations = {};

// Function to load translations from JSON
async function loadTranslations(lang) {
    try {
        const response = await fetch(`languages/${lang}.json`);
        translations = await response.json();
        currentLanguage = lang;
        updatePageContent();
        setLanguageDirection(lang);
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
}

// Set the language direction
function setLanguageDirection(lang) {
    if (lang === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.lang = 'fa';
    } else {
        document.documentElement.removeAttribute('dir');
        document.documentElement.lang = lang;
    }
}

// Update page content with new translations
function updatePageContent() {
    const updateElement = (id, key) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = translations[key] || id;
        }
    };

    // Common elements across pages
    updateElement('pageTitle', 'title');
    updateElement('homeLink', 'home');
    updateElement('portfolioLink', 'portfolio');
    updateElement('ideasLink', 'ideas');
    updateElement('languageDropdown', 'language');
    updateElement('footerAbout', 'footerAbout');
    updateElement('footerAboutText', 'footerAboutText');
    updateElement('footerContact', 'footerContact');
    updateElement('footerContactText', 'footerContactText');
    updateElement('footerBookNow', 'bookNow');
    updateElement('footerFollow', 'footerFollow');
    updateElement('footerInstagram', 'footerInstagram');
    updateElement('footerCopyright', 'footerCopyright');

    // Page-specific elements
    const pagePath = window.location.pathname;
    if (pagePath.includes('index.html') || pagePath === '/' || pagePath === '') {
        updateElement('welcomeText', 'welcome');
        updateElement('descriptionText', 'description');
        updateElement('portfolioHeader', 'portfolioHeader');
        updateElement('portfolioDescription', 'portfolioDescription');
        updateElement('seePortfolioButton', 'seePortfolioButton');
        updateElement('ideasHeader', 'ideasHeader');
        updateElement('ideasDescription', 'ideasDescription');
        updateElement('seeIdeasButton', 'seeIdeasButton');
    } else if (pagePath.includes('portfolio.html')) {
        updateElement('portfolioHeader', 'portfolioHeader');
        updateElement('portfolioDescription', 'portfolioDescription');
        updateElement('portfolioItem1Desc', 'portfolioItem1Desc');
        updateElement('portfolioItem1Button', 'portfolioItem1Button');
        updateElement('portfolioItem2Desc', 'portfolioItem2Desc');
        updateElement('portfolioItem2Button', 'portfolioItem2Button');
    } else if (pagePath.includes('ideas.html')) {
        updateElement('ideasHeader', 'ideasHeader');
        updateElement('ideasDescription', 'ideasDescription');
        updateElement('idea1Desc', 'idea1Desc');
        updateElement('idea1Button', 'idea1Button');
        updateElement('idea2Desc', 'idea2Desc');
        updateElement('idea2Button', 'idea2Button');
    }
}

// Change language handler
function changeLanguage(lang) {
    loadTranslations(lang);
    localStorage.setItem('lang', lang);
}

// Function to open WhatsApp for booking
function openWhatsApp() {
    var msg = encodeURIComponent("Hello, I would like to book a tattoo session.");
    window.open("https://api.whatsapp.com/send?phone=+905527473071&text=" + msg, '_blank');
}

// On page load, check if there's a saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    changeLanguage(savedLang);
});