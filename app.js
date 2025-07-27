// Global variable to store medicines data
let medicines = [];

// Get DOM elements
const appContainer = document.getElementById('app-container');
const hamburgerIcon = document.getElementById('hamburger-icon');
const menuOverlay = document.getElementById('menu-overlay');
const menuSidebar = document.getElementById('menu-sidebar');
const menuLinks = document.querySelectorAll('.menu-link');
const searchBar = document.getElementById('search-bar');
// Removed searchButton variable
const medicineListDiv = document.getElementById('medicine-list');
const detailMedicineName = document.getElementById('detail-medicine-name');
const detailMedicineDescription = document.getElementById('detail-medicine-description');
const languageToggle = document.getElementById('language-toggle');
const backButton = document.getElementById('back-button');
const exitAppButton = document.getElementById('exit-app-button');
const exitModalOverlay = document.getElementById('exit-modal-overlay');
const closeExitModalButton = document.getElementById('close-exit-modal');

// Detail page specific elements for new fields
const detailTypeHeading = document.getElementById('detail-type-heading');
const detailType = document.getElementById('detail-type');
const detailDescriptionHeading = document.getElementById('detail-description-heading');
const detailDescription = document.getElementById('detail-description');
const detailIndicationsHeading = document.getElementById('detail-indications-heading');
const detailIndications = document.getElementById('detail-indications');
const detailSymptomsHeading = document.getElementById('detail-symptoms-heading');
const detailSymptoms = document.getElementById('detail-symptoms');
const detailPotencyHeading = document.getElementById('detail-potency-heading');
const detailPotency = document.getElementById('detail-potency');
const detailClinicalCasesHeading = document.getElementById('detail-clinical-cases-heading');
const detailClinicalCases = document.getElementById('detail-clinical-cases');

// Privacy Policy specific element
const privacyPolicyContentDiv = document.getElementById('privacy-policy-content');


// Global state
let currentLanguage = 'english'; // 'english' or 'urdu'

// Privacy Policy content (English and Urdu)
const privacyPolicy = {
    english: `
        <h3 class="text-xl font-semibold mb-2">Privacy Policy for Materia Medica of Nosodes</h3>
        <p class="mb-4">This Privacy Policy describes how the "Materia Medica of Nosodes" mobile application (the "App") collects, uses, and protects your information.</p>

        <h4 class="font-semibold text-lg mb-2">1. No Personal Data Collection:</h4>
        <p class="mb-4">The App is designed to be a comprehensive educational and informational resource on homeopathic remedies, including Nosodes, Sarcodes, Biochemic, and Isopathic remedies. We want to assure you that <strong>this App does not collect any personal data</strong> from its users. This includes, but is not limited to, your name, email address, location, device identifiers, or any usage statistics. Your privacy is paramount.</p>

        <h4 class="font-semibold text-lg mb-2">2. No Third-Party Services:</h4>
        <p class="mb-4">The App does not integrate with any third-party analytics, advertising, or tracking services. Your usage of the App remains entirely private and untracked.</p>

        <h4 class="font-semibold text-lg mb-2">3. Information Accuracy and Disclaimer:</h4>
        <p class="mb-4">The content provided in this App is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider for any medical conditions or health concerns. The developers of this App do not guarantee the accuracy or completeness of the information and disclaim all liability for any loss or injury resulting from its use.</p>

        <h4 class="font-semibold text-lg mb-2">4. Changes to This Privacy Policy:</h4>
        <p class="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy within the App. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h4 class="font-semibold text-lg mb-2">5. Contact Us:</h4>
        <p class="mb-4">If you have any questions about this Privacy Policy, please contact us via the "Contact Us" section within the App.</p>
    `,
    urdu: `
        <h3 class="text-xl font-semibold mb-2 text-right-urdu">مادۂ دواۓ نوسوڈز کے لیے پرائیویسی پالیسی</h3>
        <p class="mb-4 text-right-urdu">یہ پرائیویسی پالیسی بیان کرتی ہے کہ "مادۂ دواۓ نوسوڈز" موبائل ایپلیکیشن ("ایپ") آپ کی معلومات کو کیسے جمع، استعمال اور محفوظ کرتی ہے۔</p>

        <h4 class="font-semibold text-lg mb-2 text-right-urdu">1. کوئی ذاتی ڈیٹا جمع نہیں کیا جاتا:</h4>
        <p class="mb-4 text-right-urdu">یہ ایپ ہومیوپیتھک ادویات، بشمول نوسوڈز، سارکوڈز، بائیو کیمک، اور آئسوپیتھک علاج کے بارے میں ایک جامع تعلیمی اور معلوماتی وسیلہ کے طور پر ڈیزائن کی گئی ہے۔ ہم آپ کو یقین دلانا چاہتے ہیں کہ <strong>یہ ایپ اپنے صارفین سے کوئی ذاتی ڈیٹا جمع نہیں کرتی</strong>۔ اس میں آپ کا نام، ای میل ایڈریس، مقام، ڈیوائس شناخت کنندگان، یا کوئی بھی استعمال کے اعداد و شمار شامل نہیں ہیں، لیکن ان تک محدود نہیں ہیں۔ آپ کی پرائیویسی ہماری اولین ترجیح ہے۔</p>

        <h4 class="font-semibold text-lg mb-2 text-right-urdu">2. کوئی تیسری فریق سروسز نہیں:</h4>
        <p class="mb-4 text-right-urdu">یہ ایپ کسی بھی تیسری فریق کی تجزیاتی، اشتہاری، یا ٹریکنگ سروسز کے ساتھ مربوط نہیں ہے۔ ایپ کا آپ کا استعمال مکمل طور پر نجی اور غیر ٹریک شدہ رہتا ہے۔</p>

        <h4 class="font-semibold text-lg mb-2 text-right-urdu">3. معلومات کی درستگی اور دستبرداری:</h4>
        <p class="mb-4 text-right-urdu">اس ایپ میں فراہم کردہ مواد صرف معلوماتی اور تعلیمی مقاصد کے لیے ہے۔ اس کا مقصد پیشہ ورانہ طبی مشورے، تشخیص، یا علاج کا متبادل نہیں ہے۔ ہمیشہ ایک مستند صحت کی دیکھ بھال فراہم کرنے والے سے مشورہ کریں۔ اس ایپ کے ڈویلپرز معلومات کی درستگی یا مکمل ہونے کی ضمانت نہیں دیتے اور اس کے استعمال کے نتیجے میں ہونے والے کسی بھی نقصان یا چوٹ کے لیے تمام ذمہ داری سے دستبردار ہوتے ہیں۔</p>

        <h4 class="font-semibold text-lg mb-2 text-right-urdu">4. اس پرائیویسی پالیسی میں تبدیلیاں:</h4>
        <p class="mb-4 text-right-urdu">ہم وقتاً فوقتاً اپنی پرائیویسی پالیسی کو اپ ڈیٹ کر سکتے ہیں۔ ہم ایپ کے اندر نئی پرائیویسی پالیسی پوسٹ کرکے آپ کو کسی بھی تبدیلی سے مطلع کریں گے۔ آپ کو مشورہ دیا جاتا ہے کہ کسی بھی تبدیلی کے لیے اس پرائیویسی پالیسی کا وقتاً فوقتاً جائزہ لیتے رہیں۔</p>

        <h4 class="font-semibold text-lg mb-2 text-right-urdu">5. Contact Us:</h4>
        <p class="mb-4 text-right-urdu">اگر آپ کو اس پرائیویسی پالیسی کے بارے میں کوئی سوالات ہیں، تو براہ کرم ایپ کے اندر "ہم سے رابطہ کریں" سیکشن کے ذریعے ہم سے رابطہ کریں۔</p>
    `
};

// Function to fetch medicines data from JSON file
async function fetchMedicines() {
    try {
        const response = await fetch('medicines.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        medicines = await response.json();
        console.log('Medicines loaded:', medicines); // For debugging
        renderMedicineList(medicines); // Render initial list after data is loaded
    } catch (error) {
        console.error('Could not fetch medicines:', error);
        medicineListDiv.innerHTML = '<p class="text-red-500 text-center mt-8">Failed to load medicines data. Please try again later. (Check browser console for details)</p>';
    }
}

// Function to show a specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    // Close menu if open
    if (menuOverlay.classList.contains('open')) {
        toggleMenu();
    }
    // If navigating to home, ensure search bar is visible
    if (pageId === 'home-page') {
        searchBar.style.display = 'block';
        // Only render the list if it's the home page and not a search result
        if (searchBar.value === '') {
            renderMedicineList(medicines);
        } else {
            handleSearch(); // Re-apply search if there's text in the bar
        }
    } else {
        searchBar.style.display = 'none'; // Hide search bar on other pages
    }

    // Load privacy policy content when navigating to its page
    if (pageId === 'privacy-policy-page') {
        updatePrivacyPolicyContent();
    }
}

// Function to toggle hamburger menu
function toggleMenu() {
    hamburgerIcon.classList.toggle('open');
    menuOverlay.classList.toggle('open');
    menuSidebar.classList.toggle('open'); // This class is for sidebar animation
}

// Function to render medicine list for home page
function renderMedicineList(filteredMedicines) {
    medicineListDiv.innerHTML = ''; // Clear previous list
    if (filteredMedicines.length === 0) {
        medicineListDiv.innerHTML = '<p class="text-gray-600 text-center mt-8">No medicines found matching your criteria.</p>';
        return;
    }
    filteredMedicines.forEach(medicine => {
        const medicineItem = document.createElement('div');
        medicineItem.classList.add('medicine-item', 'rounded-lg', 'p-4', 'shadow-sm', 'cursor-pointer', 'hover:bg-gray-100');
        // Use 'description' field for snippet
        const snippet = currentLanguage === 'english' ? medicine.description.english.substring(0, 100) + '...' : medicine.description.urdu.substring(0, 100) + '...';
        medicineItem.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-800">${medicine.name}</h3>
            <p class="text-gray-600 text-sm mt-1">${snippet}</p>
        `;
        medicineItem.addEventListener('click', () => showMedicineDetail(medicine));
        medicineListDiv.appendChild(medicineItem);
    });
}

// Function to show medicine detail
function showMedicineDetail(medicine) {
    detailMedicineName.textContent = medicine.name;
    updateMedicineDetailContent(medicine); // Set initial description based on currentLanguage
    showPage('detail-page');
    languageToggle.onclick = () => toggleLanguage(medicine); // Pass medicine to toggleLanguage
}

// Function to update medicine description based on language
function updateMedicineDetailContent(medicine) {
    const isUrdu = currentLanguage === 'urdu';

    // Set text direction and alignment for the entire detail description div
    detailMedicineDescription.classList.toggle('text-right-urdu', isUrdu);

    // Update headings
    detailTypeHeading.textContent = isUrdu ? 'قسم:' : 'Type:';
    detailDescriptionHeading.textContent = isUrdu ? 'تفصیل:' : 'Description:';
    detailIndicationsHeading.textContent = isUrdu ? 'اشارات:' : 'Indications:';
    detailSymptomsHeading.textContent = isUrdu ? 'علامات:' : 'Symptoms:';
    detailPotencyHeading.textContent = isUrdu ? 'طاقت:' : 'Potency:';
    detailClinicalCasesHeading.textContent = isUrdu ? 'کلینیکل کیسز:' : 'Clinical Cases:';

    // Update content fields
    detailType.textContent = isUrdu ? medicine.type.urdu : medicine.type.english;
    detailDescription.textContent = isUrdu ? medicine.description.urdu : medicine.description.english;
    detailPotency.textContent = isUrdu ? medicine.potency.urdu : medicine.potency.english;
    detailClinicalCases.textContent = isUrdu ? medicine.clinical_cases.urdu : medicine.clinical_cases.english;

    // Update lists (Indications and Symptoms)
    detailIndications.innerHTML = '';
    (isUrdu ? medicine.indications.urdu : medicine.indications.english).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        detailIndications.appendChild(li);
    });

    detailSymptoms.innerHTML = '';
    (isUrdu ? medicine.symptoms.urdu : medicine.symptoms.english).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        detailSymptoms.appendChild(li);
    });
}

// Function to toggle language in detail view
function toggleLanguage(medicine) {
    currentLanguage = currentLanguage === 'english' ? 'urdu' : 'english';
    updateMedicineDetailContent(medicine);
}

// Function to handle search
function handleSearch() {
    const searchTerm = searchBar.value.toLowerCase().trim(); // Trim whitespace from search term
    console.log("Search Term:", searchTerm);
    console.log("Total medicines:", medicines.length);

    if (!medicines || medicines.length === 0) {
        console.warn("Medicines data is not loaded or is empty. Cannot perform search.");
        medicineListDiv.innerHTML = '<p class="text-red-500 text-center mt-8">Medicines data not available for search. Please ensure the data loads correctly.</p>';
        return;
    }

    const filteredMedicines = medicines.filter(medicine => {
        // Ensure fields exist before calling methods on them, default to empty string/array
        const name = medicine.name ? medicine.name.toLowerCase() : '';
        const englishDesc = (medicine.description && medicine.description.english) ? medicine.description.english.toLowerCase() : '';
        const urduDesc = (medicine.description && medicine.description.urdu) ? medicine.description.urdu.toLowerCase() : '';
        const englishIndications = (medicine.indications && medicine.indications.english) ? medicine.indications.english.map(ind => ind.toLowerCase()) : [];
        const urduIndications = (medicine.indications && medicine.indications.urdu) ? medicine.indications.urdu.map(ind => ind.toLowerCase()) : [];
        const englishSymptoms = (medicine.symptoms && medicine.symptoms.english) ? medicine.symptoms.english.map(sym => sym.toLowerCase()) : [];
        const urduSymptoms = (medicine.symptoms && medicine.symptoms.urdu) ? medicine.symptoms.urdu.map(sym => sym.toLowerCase()) : [];

        const nameMatch = name.includes(searchTerm);
        const englishDescMatch = englishDesc.includes(searchTerm);
        const urduDescMatch = urduDesc.includes(searchTerm);
        const englishIndicationsMatch = englishIndications.some(ind => ind.includes(searchTerm));
        const urduIndicationsMatch = urduIndications.some(ind => ind.includes(searchTerm));
        const englishSymptomsMatch = englishSymptoms.some(sym => sym.includes(searchTerm));
        const urduSymptomsMatch = urduSymptoms.some(sym => sym.includes(searchTerm));

        const match = nameMatch || englishDescMatch || urduDescMatch || englishIndicationsMatch || urduIndicationsMatch || englishSymptomsMatch || urduSymptomsMatch;
        // console.log(`Medicine: ${medicine.name}, Match: ${match}`); // Uncomment for detailed debugging per medicine
        return match;
    });
    console.log("Filtered medicines count:", filteredMedicines.length);
    renderMedicineList(filteredMedicines);
}

// Function to show exit modal
function showExitModal() {
    exitModalOverlay.classList.add('open');
    toggleMenu(); // Close the menu when modal opens
}

// Function to close exit modal
function closeExitModal() {
    exitModalOverlay.classList.remove('open');
}

// Function to update Privacy Policy content based on current language
function updatePrivacyPolicyContent() {
    privacyPolicyContentDiv.innerHTML = currentLanguage === 'english' ? privacyPolicy.english : privacyPolicy.urdu;
    privacyPolicyContentDiv.classList.toggle('text-right-urdu', currentLanguage === 'urdu');
}


// Event Listeners
hamburgerIcon.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', (event) => {
    // Close menu only if clicking on the overlay itself, not the sidebar
    if (event.target === menuOverlay) {
        toggleMenu();
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.dataset.page;
        if (pageId) {
            showPage(pageId);
        }
    });
});

searchBar.addEventListener('keyup', handleSearch);
// Removed searchButton.addEventListener('click', handleSearch);
backButton.addEventListener('click', () => showPage('home-page'));
exitAppButton.addEventListener('click', showExitModal);
closeExitModalButton.addEventListener('click', closeExitModal);

// Initial render - Fetch data and then initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchMedicines().then(() => {
        showPage('home-page'); // Show home page after medicines are loaded
    });
});
