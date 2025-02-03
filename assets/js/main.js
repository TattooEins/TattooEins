// Store the current language and translations
let currentLanguage = 'en';
let translations = {};

// Function to load translations from JSON
async function loadTranslations(lang) {
    try {
        console.log("loadTranslations");
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

    updateElement('pageTitle', 'title');
    updateElement('homeLink', 'home');
    updateElement('ideasLabLink', 'ideasLab'); // New link for Ideas Lab
    updateElement('contactLink', 'contact');
    updateElement('languageDropdown', 'language');
    updateElement('welcomeText', 'welcome');
    updateElement('descriptionText', 'description');
    updateElement('seeIdeasButton', 'seeIdeas'); // Updated from seeWork
    updateElement('ideasLabHeader', 'ideasLabHeader');
    updateElement('ideasLabDescription', 'ideasLabDescription');
    updateElement('bookSessionHeader', 'bookSession');
    updateElement('bookNowButton', 'bookNow');
    
    // Update footer elements
    updateElement('footerAbout', 'footerAbout');
    updateElement('footerAboutText', 'footerAboutText');
    updateElement('footerContact', 'footerContact');
    updateElement('footerContactText', 'footerContactText');
    updateElement('footerBookNow', 'bookNow'); // Use same translation as bookNowButton
    updateElement('footerFollow', 'footerFollow');
    updateElement('footerInstagram', 'footerInstagram');
    updateElement('footerCopyright', 'footerCopyright');
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