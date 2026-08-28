const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  const language = document.documentElement.lang || 'en';
  menuButton.querySelector('.menu-toggle__label').textContent = open ? translations[language].close : translations[language].menu;
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();

const galleryButtons = [...document.querySelectorAll('[data-gallery-index]')];
const galleryToggle = document.querySelector('.gallery__toggle');
const galleryPreviewCount = 8;
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('[data-lightbox-caption]');
const lightboxCount = lightbox.querySelector('[data-lightbox-count]');
let activeImageIndex = 0;

function showGalleryImage(index) {
  activeImageIndex = (index + galleryButtons.length) % galleryButtons.length;
  const sourceImage = galleryButtons[activeImageIndex].querySelector('img');
  lightboxImage.src = sourceImage.src;
  lightboxImage.alt = sourceImage.alt;
  lightboxCaption.textContent = sourceImage.alt;
  lightboxCount.textContent = `${activeImageIndex + 1} / ${galleryButtons.length}`;
}

galleryButtons.forEach((button, index) => {
  if (index >= galleryPreviewCount) button.hidden = true;
  button.addEventListener('click', () => {
    showGalleryImage(index);
    lightbox.showModal();
  });
});

galleryToggle.addEventListener('click', () => {
  const expanded = galleryToggle.getAttribute('aria-expanded') === 'true';
  galleryToggle.setAttribute('aria-expanded', String(!expanded));
  galleryToggle.dataset.i18n = expanded ? 'showAllPhotos' : 'showFewerPhotos';
  galleryButtons.slice(galleryPreviewCount).forEach((button) => {
    button.hidden = expanded;
  });
  const language = document.documentElement.lang || 'en';
  galleryToggle.textContent = translations?.[language]?.[galleryToggle.dataset.i18n] || galleryToggle.textContent;
  if (expanded) document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lightbox__previous').addEventListener('click', () => showGalleryImage(activeImageIndex - 1));
lightbox.querySelector('.lightbox__next').addEventListener('click', () => showGalleryImage(activeImageIndex + 1));
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showGalleryImage(activeImageIndex - 1);
  if (event.key === 'ArrowRight') showGalleryImage(activeImageIndex + 1);
});

const translations = {
  en: {
    skip: 'Skip to content', menu: 'Menu', close: 'Close', navApartment: 'The apartment', navGallery: 'Gallery', navAmenities: 'Amenities', navLocation: 'Location', availability: 'Check availability', heroTitle: 'A slower<br>kind of stay.', heroText: 'A characterful apartment in Bale, Istria, made for quiet mornings and unhurried evenings.', explore: 'Explore the apartment', bookBooking: 'Book on Booking.com', heroPhoto: 'Hero photograph', heroPhotoNote: 'Apartment exterior or best wide view', introTitle: 'Room to relax.<br><em>Istria to explore.</em>', introLead: 'An 83 m², two-bedroom apartment in the historic Istrian town of Bale.', introBody: 'Apartment Vecchio Mulino by Rent Istria has an air-conditioned living room, a fully equipped private kitchen with a refrigerator and coffee machine, and two private bathrooms with a shower and bidet. Towels and bed linen are provided, while the private terrace offers extra room to slow down and enjoy your stay.', factApartment: 'Entire apartment', factBedrooms: 'Bedrooms', factBathrooms: 'Private bathrooms', factBeds: 'Beds + sofa bed', galleryTitle: 'A glimpse<br>inside.', galleryText: 'The original apartment photographs will be added here soon.', photoInterior: 'Interior', photoLiving: 'Living space', photoDetails: 'Details', amenitiesTitle: 'Everything you need,<br><em>thoughtfully placed.</em>', amenitiesPending: 'Comfort, practical details and space for an easy Istrian stay.', amenitySleeping: 'Sleeping arrangements', amenitySleepingDetail: '1 extra-large double bed, 2 single beds and 1 sofa bed', amenityKitchen: 'Private kitchen', amenityKitchenDetail: 'Dishwasher, oven, stovetop, microwave, refrigerator, coffee machine, kettle and toaster', amenityComfort: 'Comfort', amenityComfortDetail: 'Air conditioning, washing machine, seating and dining areas', amenityBathrooms: 'Two bathrooms', amenityBathroomsDetail: 'Shower, bidet, hairdryer, towels and essentials', amenityOutdoor: 'Terrace & access', amenityOutdoorDetail: 'Outdoor furniture, private entrance and free private parking', amenityEntertainment: 'Connected & equipped', amenityEntertainmentDetail: 'Free Wi-Fi, flat-screen satellite TV, safe, desk and mosquito net', locationLabel: 'Location', locationTitle: 'In the heart of Bale.<br><em>Made for exploring.</em>', locationText: 'Stay among Bale’s characterful streets, with western Istria ready to discover beyond the front door.', nearCastle: 'Morosini-Grimani Castle', nearArch: 'Balbi Arch', nearRovinj: 'Cathedral of St. Euphemia, Rovinj', nearPula: 'Pula Arena', directions: 'Open directions ↗', ctaTitle: 'Ready for your stay?', whatsapp: 'Enquire on WhatsApp'
  },
  hr: {
    skip: 'Prijeđi na sadržaj', menu: 'Izbornik', close: 'Zatvori', navApartment: 'Apartman', navGallery: 'Galerija', navAmenities: 'Sadržaji', navLocation: 'Lokacija', availability: 'Provjeri dostupnost', heroTitle: 'Odmor u<br>sporijem ritmu.', heroText: 'Apartman s karakterom u Balama, u Istri, stvoren za mirna jutra i opuštene večeri.', explore: 'Istražite apartman', bookBooking: 'Rezervirajte na Booking.com', heroPhoto: 'Naslovna fotografija', heroPhotoNote: 'Eksterijer apartmana ili najbolji široki kadar', introTitle: 'Prostor za odmor.<br><em>Istra za istraživanje.</em>', introLead: 'Apartman s dvije spavaće sobe i 83 m² u povijesnom istarskom gradiću Bale.', introBody: 'Apartment Vecchio Mulino by Rent Istria ima klimatizirani dnevni boravak, potpuno opremljenu vlastitu kuhinju s hladnjakom i aparatom za kavu te dvije vlastite kupaonice s tušem i bideom. Ručnici i posteljina su osigurani, a privatna terasa pruža dodatni prostor za opušten boravak.', factApartment: 'Cijeli apartman', factBedrooms: 'Spavaće sobe', factBathrooms: 'Vlastite kupaonice', factBeds: 'Kreveti + kauč', galleryTitle: 'Zavirite<br>unutra.', galleryText: 'Originalne fotografije apartmana uskoro će biti dodane ovdje.', photoInterior: 'Interijer', photoLiving: 'Dnevni prostor', photoDetails: 'Detalji', amenitiesTitle: 'Sve što trebate,<br><em>pažljivo pripremljeno.</em>', amenitiesPending: 'Udobnost, praktični detalji i prostor za bezbrižan istarski odmor.', amenitySleeping: 'Raspored spavanja', amenitySleepingDetail: '1 iznimno veliki bračni krevet, 2 kreveta za jednu osobu i 1 kauč na rasklapanje', amenityKitchen: 'Vlastita kuhinja', amenityKitchenDetail: 'Perilica posuđa, pećnica, ploča za kuhanje, mikrovalna, hladnjak, aparat za kavu, kuhalo i toster', amenityComfort: 'Udobnost', amenityComfortDetail: 'Klima-uređaj, perilica rublja, prostor za sjedenje i blagovaonica', amenityBathrooms: 'Dvije kupaonice', amenityBathroomsDetail: 'Tuš, bide, sušilo za kosu, ručnici i osnovne potrepštine', amenityOutdoor: 'Terasa i pristup', amenityOutdoorDetail: 'Vanjski namještaj, privatni ulaz i besplatno privatno parkiralište', amenityEntertainment: 'Povezanost i oprema', amenityEntertainmentDetail: 'Besplatni Wi-Fi, TV ravnog ekrana sa satelitskim programima, sef, radni stol i mreža protiv komaraca', locationLabel: 'Lokacija', locationTitle: 'U srcu Bala.<br><em>Stvoreno za istraživanje.</em>', locationText: 'Boravite među slikovitim ulicama Bala, dok vas zapadna Istra čeka odmah iza praga.', nearCastle: 'Kaštel Morosini-Grimani', nearArch: 'Balbijev luk', nearRovinj: 'Katedrala sv. Eufemije u Rovinju', nearPula: 'Amfiteatar u Puli', directions: 'Otvori upute ↗', ctaTitle: 'Spremni za svoj odmor?', whatsapp: 'Pošaljite WhatsApp upit'
  },
  it: {
    skip: 'Vai al contenuto', menu: 'Menu', close: 'Chiudi', navApartment: 'L’appartamento', navGallery: 'Galleria', navAmenities: 'Servizi', navLocation: 'Posizione', availability: 'Verifica disponibilità', heroTitle: 'Un soggiorno<br>dal ritmo lento.', heroText: 'Un appartamento di carattere a Valle, in Istria, pensato per mattine tranquille e serate senza fretta.', explore: 'Scopri l’appartamento', bookBooking: 'Prenota su Booking.com', heroPhoto: 'Foto principale', heroPhotoNote: 'Esterno dell’appartamento o migliore vista panoramica', introTitle: 'Spazio per rilassarsi.<br><em>L’Istria da esplorare.</em>', introLead: 'Un appartamento di 83 m² con due camere da letto nello storico borgo istriano di Valle.', introBody: 'Apartment Vecchio Mulino by Rent Istria dispone di soggiorno climatizzato, cucina privata completamente attrezzata con frigorifero e macchina da caffè e due bagni privati con doccia e bidet. Asciugamani e biancheria da letto sono inclusi, mentre la terrazza privata offre ancora più spazio per rilassarsi.', factApartment: 'Intero appartamento', factBedrooms: 'Camere da letto', factBathrooms: 'Bagni privati', factBeds: 'Letti + divano letto', galleryTitle: 'Uno sguardo<br>all’interno.', galleryText: 'Le fotografie originali dell’appartamento saranno aggiunte presto.', photoInterior: 'Interni', photoLiving: 'Zona giorno', photoDetails: 'Dettagli', amenitiesTitle: 'Tutto ciò che serve,<br><em>pensato con cura.</em>', amenitiesPending: 'Comfort, dettagli pratici e spazio per un piacevole soggiorno istriano.', amenitySleeping: 'Posti letto', amenitySleepingDetail: '1 letto matrimoniale extra-large, 2 letti singoli e 1 divano letto', amenityKitchen: 'Cucina privata', amenityKitchenDetail: 'Lavastoviglie, forno, piano cottura, microonde, frigorifero, macchina da caffè, bollitore e tostapane', amenityComfort: 'Comfort', amenityComfortDetail: 'Aria condizionata, lavatrice, zona soggiorno e zona pranzo', amenityBathrooms: 'Due bagni', amenityBathroomsDetail: 'Doccia, bidet, asciugacapelli, asciugamani e prodotti essenziali', amenityOutdoor: 'Terrazza e accesso', amenityOutdoorDetail: 'Mobili da esterno, ingresso privato e parcheggio privato gratuito', amenityEntertainment: 'Connessione e dotazioni', amenityEntertainmentDetail: 'Wi-Fi gratuito, TV satellitare a schermo piatto, cassaforte, scrivania e zanzariera', locationLabel: 'Posizione', locationTitle: 'Nel cuore di Valle.<br><em>Perfetto per esplorare.</em>', locationText: 'Soggiornate tra le caratteristiche vie di Valle, con l’Istria occidentale tutta da scoprire appena fuori dalla porta.', nearCastle: 'Castello Morosini-Grimani', nearArch: 'Arco dei Balbi', nearRovinj: 'Cattedrale di Sant’Eufemia, Rovigno', nearPula: 'Arena di Pola', directions: 'Apri indicazioni ↗', ctaTitle: 'Pronti per il soggiorno?', whatsapp: 'Richiedi su WhatsApp'
  }
};

translations.en.galleryText = 'Explore every room, detail and outdoor space.';
translations.en.photographs = 'photographs';
translations.hr.galleryText = 'Istražite svaku prostoriju, detalj i vanjski prostor.';
translations.hr.photographs = 'fotografija';
translations.it.galleryText = 'Scoprite ogni ambiente, dettaglio e spazio esterno.';
translations.it.photographs = 'fotografie';
translations.en.showAllPhotos = 'See all 40 photos';
translations.en.showFewerPhotos = 'Show fewer photos';
translations.hr.showAllPhotos = 'Pogledajte svih 40 fotografija';
translations.hr.showFewerPhotos = 'Prikaži manje fotografija';
translations.it.showAllPhotos = 'Vedi tutte le 40 fotografie';
translations.it.showFewerPhotos = 'Mostra meno fotografie';
translations.en.navContact = 'Contact';
translations.en.emailOwner = 'Send an email';
translations.hr.navContact = 'Kontakt';
translations.hr.emailOwner = 'Pošaljite e-mail';
translations.it.navContact = 'Contatti';
translations.it.emailOwner = 'Invia un’e-mail';

function setLanguage(language) {
  const dictionary = translations[language] || translations.en;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const key = element.dataset.i18nHtml;
    if (dictionary[key]) element.innerHTML = dictionary[key];
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  localStorage.setItem('vecchio-language', language);
}

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem('vecchio-language') || 'en');
