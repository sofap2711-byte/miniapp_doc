// Particles
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 100 + 50;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(p);
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-category, .feature-card, .review-card, .about-card, .section-header').forEach(el => {
    observer.observe(el);
});

// Sticky CTA
const stickyCta = document.getElementById('stickyCta');
if (stickyCta) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 600 && currentScroll > lastScroll) {
            stickyCta.classList.add('visible');
        } else if (currentScroll < 300 || currentScroll < lastScroll) {
            stickyCta.classList.remove('visible');
        }
        lastScroll = currentScroll;
    });
}

// Before/After Slider
const baContainer = document.getElementById('baContainer');
const baHandle = document.getElementById('baHandle');
const baAfter = document.getElementById('baAfter');

if (baContainer && baHandle) {
    let isDragging = false;

    function updateSlider(x) {
        const rect = baContainer.getBoundingClientRect();
        let percent = ((x - rect.left) / rect.width) * 100;
        percent = Math.max(5, Math.min(95, percent));
        baHandle.style.left = percent + '%';
        if (baAfter) baAfter.style.width = percent + '%';
    }

    baHandle.addEventListener('mousedown', () => isDragging = true);
    baHandle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('mousemove', (e) => isDragging && updateSlider(e.clientX));
    window.addEventListener('touchmove', (e) => isDragging && updateSlider(e.touches[0].clientX));
    baContainer.addEventListener('click', (e) => updateSlider(e.clientX));
}

// ===== ДАННЫЕ УСЛУГ =====
const servicesData = {
    lips: {
        title: 'Увеличение губ',
        image: 'images/services/lips.jpg',
        description: 'Деликатное увеличение губ с сохранением естественной формы и объёма. Используются препараты на основе гиалуроновой кислоты последнего поколения. Натуральный результат без «утиного» эффекта. Эффект сохраняется от 6 до 12 месяцев.',
        prices: [
            { name: 'Juvederm Volbella', detail: '1 мл, мягкий объём', price: '18 000 ₽' },
            { name: 'Restylane Kysse', detail: '1 мл, естественный результат', price: '20 000 ₽' },
            { name: 'Belotero Balance', detail: '1 мл, деликатная коррекция', price: '15 000 ₽' },
            { name: 'Stylage M', detail: '1 мл, лип-флип эффект', price: '16 000 ₽' },
            { name: 'Revanesse Ultra', detail: '1 мл, плотный филлер', price: '17 000 ₽' },
            { name: 'Teosyal RHA 2', detail: '1 мл, адаптивный филлер', price: '19 000 ₽' }
        ]
    },
    botox: {
        title: 'Ботокс',
        image: 'images/services/botox.jpg',
        description: 'Коррекция мимических морщин с использованием ботулотоксина типа А. Сохраняем естественную мимику, убираем следы усталости. Процедура занимает 15-20 минут, результат виден через 3-7 дней.',
        prices: [
            { name: 'Botox (Allergan)', detail: '1 зона (лоб/межбровье/глаза)', price: '12 000 ₽' },
            { name: 'Dysport (Ipsen)', detail: '1 зона, мягкое действие', price: '10 000 ₽' },
            { name: 'Xeomin (Merz)', detail: '1 зона, без иммунности', price: '11 000 ₽' },
            { name: 'Комплекс 3 зоны', detail: 'Лоб + межбровье + глаза', price: '28 000 ₽' }
        ]
    },
    vivace: {
        title: 'RF-лифтинг Vivace',
        image: 'images/services/vivace.jpg',
        description: 'Игольчатый RF-лифтинг нового поколения с микроиглами и радиочастотной энергией. Стимуляция коллагена без длительной реабилитации. Рекомендуется курс из 3-4 процедур.',
        prices: [
            { name: 'Vivace лицо', detail: '1 процедура', price: '25 000 ₽' },
            { name: 'Vivace лицо + шея', detail: '1 процедура', price: '32 000 ₽' },
            { name: 'Курс 3 процедуры', detail: 'Лицо, со скидкой 15%', price: '63 750 ₽' }
        ]
    },
    meso: {
        title: 'Мезотерапия',
        image: 'images/services/meso.jpg',
        description: 'Витаминные коктейли для увлажнения, питания и омоложения кожи. Индивидуальные смеси под ваши задачи. Микроинъекции или безынъекционный метод.',
        prices: [
            { name: 'Mesoestetic', detail: 'Коктейль anti-age, 1 процедура', price: '8 000 ₽' },
            { name: 'Filorga NCTF 135HA', detail: 'Витаминный комплекс', price: '10 000 ₽' },
            { name: 'Placentex', detail: 'Восстановление и регенерация', price: '9 000 ₽' },
            { name: 'Hyalual Rederma', detail: 'Увлажнение + антиоксиданты', price: '8 500 ₽' },
            { name: 'Курс 5 процедур', detail: 'Любой препарат, скидка 20%', price: 'от 32 000 ₽' }
        ]
    },
    bio: {
        title: 'Биоревитализация',
        image: 'images/services/bio.jpg',
        description: 'Глубокое увлажнение и восстановление на клеточном уровне. Препараты гиалуроновой кислоты низкой плотности для естественного сияния кожи.',
        prices: [
            { name: 'Restylane Vital', detail: '1 мл, глубокое увлажнение', price: '14 000 ₽' },
            { name: 'Juvederm Hydrate', detail: '1 мл, антиоксидантный эффект', price: '13 000 ₽' },
            { name: 'Teosyal Redensity I', detail: '1 мл, восстановление', price: '15 000 ₽' },
            { name: 'Profhilo', detail: '2 мл, 5 точек биоармирования', price: '22 000 ₽' }
        ]
    },
    contour: {
        title: 'Контурная пластика',
        image: 'images/services/contour.jpg',
        description: 'Коррекция скул, подбородка, носослезной борозды и других зон. Восстановление утраченных объёмов лица с использованием плотных филлеров.',
        prices: [
            { name: 'Скулы (Juvederm Voluma)', detail: '2 мл, объём и подтяжка', price: '35 000 ₽' },
            { name: 'Подбородок (Restylane Defyne)', detail: '1 мл, коррекция овала', price: '22 000 ₽' },
            { name: 'Носослезная борозда', detail: '1 мл, устранение следов усталости', price: '18 000 ₽' },
            { name: 'Нос (Radiesse)', detail: '0,8 мл, безоперационная ринопластика', price: '25 000 ₽' },
            { name: 'Виски (Sculptra)', detail: '1 флакон, восстановление объёма', price: '30 000 ₽' },
            { name: 'Комплексное омоложение', detail: '3 зоны, индивидуальный расчёт', price: 'от 50 000 ₽' }
        ]
    },
    smas: {
        title: 'SMAS-лифтинг',
        image: 'images/services/smas.jpg',
        description: 'Ультразвуковой лифтинг для подтяжки овала лица и шеи. Альтернатива хирургической подтяжке без реабилитации. Результат через 2-3 месяца, держится до 1,5 лет.',
        prices: [
            { name: 'SMAS лицо', detail: '1 процедура, полный овал', price: '45 000 ₽' },
            { name: 'SMAS лицо + шея', detail: '1 процедура, комплекс', price: '55 000 ₽' },
            { name: 'SMAS подбородок', detail: '1 процедура, субментальная зона', price: '25 000 ₽' }
        ]
    },
    cleaning: {
        title: 'Чистка лица',
        image: 'images/services/cleaning.jpg',
        description: 'Атравматичная чистка с ультразвуком и кислотами. Чистые поры без покраснений и следов. Подходит для чувствительной кожи.',
        prices: [
            { name: 'Ультразвуковая чистка', detail: '45 минут, базовый уход', price: '4 500 ₽' },
            { name: 'Комбинированная чистка', detail: '75 минут, ультразвук + кислоты', price: '6 500 ₽' },
            { name: 'HydraFacial', detail: '60 минут, гидродермабразия', price: '8 000 ₽' },
            { name: 'Пилинг + чистка', detail: '90 минут, комплексное очищение', price: '9 000 ₽' }
        ]
    }
};

// ===== МОДАЛКА УСЛУГ =====
const serviceModal = document.getElementById('serviceModal');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalImage = document.getElementById('serviceModalImage');
const serviceModalDesc = document.getElementById('serviceModalDesc');
const servicePricelist = document.getElementById('servicePricelist');
const serviceModalBook = document.getElementById('serviceModalBook');
const serviceDescToggle = document.getElementById('serviceDescToggle');
const serviceDescContent = document.getElementById('serviceDescContent');
const serviceModalClose = document.getElementById('serviceModalClose');

let currentService = null;

function openServiceModal(category) {
    const data = servicesData[category];
    if (!data) return;

    currentService = category;

    serviceModalTitle.textContent = data.title;
    serviceModalImage.src = data.image;
    serviceModalImage.alt = data.title;
    serviceModalDesc.textContent = data.description;

    servicePricelist.innerHTML = data.prices.map(item => `
        <div class="price-item" data-procedure="${item.name}">
            <div class="price-item-info">
                <span class="price-item-name">${item.name}</span>
                <span class="price-item-detail">${item.detail}</span>
            </div>
            <span class="price-item-cost">${item.price}</span>
        </div>
    `).join('');

    servicePricelist.querySelectorAll('.price-item').forEach(item => {
        item.addEventListener('click', () => {
            const procedure = item.dataset.procedure;
            const bookingSelect = document.getElementById('bookingProcedure');
            if (bookingSelect) {
                bookingSelect.value = data.title + ' — ' + procedure;
            }
            closeServiceModal();
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        });
    });

    serviceDescContent.classList.remove('open');
    serviceDescToggle.classList.remove('open');

    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (serviceModal) {
    document.querySelectorAll('.service-category').forEach(cat => {
        cat.addEventListener('click', () => {
            const category = cat.dataset.category;
            openServiceModal(category);
        });
    });

    serviceModalClose.addEventListener('click', closeServiceModal);
    serviceModal.querySelector('.service-modal-overlay').addEventListener('click', closeServiceModal);

    let touchStartY = 0;
    const modalContent = serviceModal.querySelector('.service-modal-content');

    modalContent.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    modalContent.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchEndY - touchStartY > 100) {
            closeServiceModal();
        }
    });
}

if (serviceDescToggle && serviceDescContent) {
    serviceDescToggle.addEventListener('click', () => {
        serviceDescContent.classList.toggle('open');
        serviceDescToggle.classList.toggle('open');
    });
}

// ===== ФОРМА ЗАПИСИ =====
const bookingForm = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (successModal) successModal.classList.add('active');
        bookingForm.reset();
    });
}

function closeModal() {
    if (successModal) successModal.classList.remove('active');
}

const consultBtn = document.getElementById('consultBtn');
if (consultBtn && successModal) {
    consultBtn.addEventListener('click', () => {
        successModal.classList.add('active');
    });
}

if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeModal();
    });
}

// ===== КАСТОМНЫЙ SELECT =====
const customSelectWrapper = document.getElementById('bookingProcedureWrapper');
if (customSelectWrapper) {
    const customTrigger = customSelectWrapper.querySelector('.custom-select-trigger');
    const customTriggerText = customTrigger.querySelector('span');
    const customOptions = customSelectWrapper.querySelectorAll('.custom-option');
    const realSelect = document.getElementById('bookingProcedure');

    customTrigger.addEventListener('click', () => {
        customSelectWrapper.classList.toggle('open');
    });

    customOptions.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.dataset.value;
            if (realSelect) realSelect.value = value;
            customTriggerText.textContent = option.textContent;
            customOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            customSelectWrapper.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!customSelectWrapper.contains(e.target)) {
            customSelectWrapper.classList.remove('open');
        }
    });

    // Синхронизация при изменении оригинального select из других частей кода
    if (realSelect) {
        realSelect.addEventListener('change', () => {
            const selectedOption = realSelect.options[realSelect.selectedIndex];
            if (selectedOption) {
                customTriggerText.textContent = selectedOption.text;
                customOptions.forEach(o => {
                    o.classList.toggle('selected', o.dataset.value === realSelect.value);
                });
            }
        });
    }

    // Сброс текста при очистке формы
    if (bookingForm) {
        bookingForm.addEventListener('reset', () => {
            customTriggerText.textContent = 'Выберите процедуру';
            customOptions.forEach(o => o.classList.remove('selected'));
        });
    }
}