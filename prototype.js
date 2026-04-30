$(function () {
  if (!$('body').hasClass('home-page')) return;
  const regions = [
    'Москва', 'Санкт-Петербург', 'Московская область', 'Ленинградская область',
    'Краснодарский край', 'Татарстан', 'Свердловская область', 'Новосибирская область',
    'Нижегородская область', 'Самарская область', 'Ростовская область', 'Пермский край',
    'Башкортостан', 'Красноярский край', 'Вологодская область', 'Калининградская область',
    'Карелия', 'Алтайский край'
  ];

  const events = [
    {
      id: 'run-10k',
      title: 'Городской марафон 2026',
      sport: 'run',
      sportName: 'Бег',
      region: 'Москва',
      date: '2026-05-15T09:00:00',
      place: 'Центральный парк',
      participants: '5000+',
      seats: 42,
      status: 'upcoming',
      price: 2600,
      image: 'src/imports/1440WLight/031d70ce4026a68e34bc8924b7b577f61fbe6ee4.png'
    },
    {
      id: 'bike-premium',
      title: 'Велогонка Премиум',
      sport: 'bike',
      sportName: 'Велоспорт',
      region: 'Санкт-Петербург',
      date: '2026-06-22T08:00:00',
      place: 'Приморская набережная',
      participants: '2500+',
      seats: 126,
      status: 'upcoming',
      price: 3900,
      image: 'src/imports/1440WLight/20d6faaf14e1d2458642b2028593187587031c0c.png'
    },
    {
      id: 'ski-classic',
      title: 'Лыжная классика Вологда',
      sport: 'ski',
      sportName: 'Лыжи',
      region: 'Вологодская область',
      date: '2026-05-24T10:30:00',
      place: 'Кирики-Улита',
      participants: '1200+',
      seats: 8,
      status: 'upcoming',
      price: 2100,
      image: 'src/imports/1440WLight/6ffce6e4ee8939e1a96f476ecf2fdf47352d257d.png'
    },
    {
      id: 'kazan-half',
      title: 'Kazan Night Half Marathon',
      sport: 'run',
      sportName: 'Бег',
      region: 'Татарстан',
      date: '2026-06-20T21:00:00',
      place: 'Кремлевская набережная',
      participants: '3000+',
      seats: 310,
      status: 'upcoming',
      price: 3200,
      image: 'src/imports/1440WLight/453815ae6aaca94cfa7ba9935a5657c4abddffea.png'
    },
    {
      id: 'karelia-ski',
      title: 'Karelia Ski Sprint',
      sport: 'ski',
      sportName: 'Лыжи',
      region: 'Карелия',
      date: '2026-02-15T11:00:00',
      place: 'Петрозаводск',
      participants: '900+',
      seats: 0,
      status: 'past',
      price: 1800,
      image: 'src/imports/1440WLight/04d0e49637dd3340ccec361b074a85de3c5bff80.png'
    },
    {
      id: 'siberian-run',
      title: 'Siberian Frost Run',
      sport: 'run',
      sportName: 'Бег',
      region: 'Новосибирская область',
      date: '2026-03-01T10:00:00',
      place: 'Михайловская набережная',
      participants: '1800+',
      seats: 0,
      status: 'past',
      price: 2400,
      image: 'src/imports/1440WLight/70709b4fe4f01449ab339feb2339804b4a1bdff2.png'
    }
  ];

  const children = [
    { id: 'child-1', name: 'Анна Васильева', age: 12 },
    { id: 'child-2', name: 'Егор Васильев', age: 9 }
  ];

  function formatDate(value) {
    return new Date(value).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function countdown(value) {
    const diff = new Date(value).getTime() - Date.now();
    if (diff <= 0) return 'старт прошел';
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${days} дн ${hours} ч ${minutes} мин`;
  }

  function rub(value) {
    return `${Math.max(0, value).toLocaleString('ru-RU')} ₽`;
  }

  function showToast(message) {
    $('#toast').stop(true, true).text(message).fadeIn(160).delay(2300).fadeOut(220);
  }

  function filteredEvents() {
    const sport = $('#sportFilter').val();
    const region = $('#regionFilter').val();
    const status = $('#statusFilter').val();

    return events.filter((event) => {
      return (sport === 'all' || event.sport === sport)
        && (region === 'all' || event.region === region)
        && (status === 'all' || event.status === status);
    });
  }

  function eventCard(event) {
    const seatsClass = event.seats <= 20 && event.status === 'upcoming' ? 'low' : '';
    const action = event.status === 'past'
      ? '<button class="primary-btn" type="button" data-open-modal="result">Смотреть результат</button>'
      : `<button class="primary-btn js-register" type="button" data-event="${event.id}">Регистрация</button>`;

    return `
      <article class="event-card">
        <img class="event-image" src="${event.image}" alt="${event.title}">
        <div class="event-body">
          <span class="event-badge">${event.sportName}</span>
          <h3>${event.title}</h3>
          <div class="event-meta">
            <span>Дата: ${formatDate(event.date)}</span>
            <span>Место: ${event.region}, ${event.place}</span>
            <span>Участников: ${event.participants}</span>
          </div>
          <div class="event-footer">
            <div class="timer">До старта: <strong data-countdown="${event.date}">${countdown(event.date)}</strong></div>
            <div class="seats ${seatsClass}">${event.status === 'past' ? 'Регистрация закрыта' : `Осталось мест: ${event.seats}`}</div>
            ${action}
          </div>
        </div>
      </article>
    `;
  }

  function renderEvents() {
    const html = filteredEvents().map(eventCard).join('');
    $('#eventGrid').html(html || '<div class="empty">По выбранным фильтрам событий нет.</div>');
  }

  function updateHeader() {
    $('.site-header').toggleClass('is-scrolled', window.scrollY > 30);
  }

  function registrationModal(eventId) {
    const event = events.find((item) => item.id === eventId) || events[0];
    $('#modalTitle').text('Регистрация на старт');
    $('#modalBody').html(`
      <form class="registration-form" id="registrationForm">
        <label>Событие
          <select id="modalEvent">
            ${events.filter((item) => item.status === 'upcoming').map((item) => `<option value="${item.id}" ${item.id === event.id ? 'selected' : ''}>${item.title}</option>`).join('')}
          </select>
        </label>
        <label>Участник
          <select id="modalPerson">
            <option value="self" data-age="49">Себя: Васильев Дмитрий</option>
            ${children.map((child) => `<option value="${child.id}" data-age="${child.age}">Ребенка: ${child.name}, ${child.age} лет</option>`).join('')}
          </select>
        </label>
        <label>Промокод
          <input id="promoCode" type="text" placeholder="ARTA10">
        </label>
        <div class="modal-list">
          <div>Базовая цена: <strong id="basePrice"></strong></div>
          <div>Возрастной тариф: <strong id="agePrice"></strong></div>
          <div>Дата оплаты: <strong id="datePrice"></strong></div>
          <div>Итого: <strong id="totalPrice"></strong></div>
        </div>
        <div class="checks">
          <label><input id="offerAgree" type="checkbox"> Согласен с Офертой</label>
          <label><input id="policyAgree" type="checkbox"> Согласен с Политикой персональных данных</label>
        </div>
        <button class="primary-btn" id="payBtn" type="submit" disabled>Оплатить</button>
      </form>
    `);
    openModal();
    updatePrice();
  }

  function updatePrice() {
    const event = events.find((item) => item.id === $('#modalEvent').val());
    if (!event) return;
    const age = Number($('#modalPerson option:checked').data('age'));
    const daysToStart = Math.ceil((new Date(event.date) - Date.now()) / 86400000);
    const ageModifier = age < 14 ? -700 : age >= 60 ? -500 : 0;
    const dateModifier = daysToStart < 14 ? 900 : daysToStart < 30 ? 400 : 0;
    const promoModifier = $('#promoCode').val().trim().toUpperCase() === 'ARTA10' ? -Math.round(event.price * .1) : 0;
    const total = event.price + ageModifier + dateModifier + promoModifier;

    $('#basePrice').text(rub(event.price));
    $('#agePrice').text(`${ageModifier < 0 ? '-' : ''}${rub(Math.abs(ageModifier))}`);
    $('#datePrice').text(`${dateModifier > 0 ? '+' : ''}${rub(dateModifier)}`);
    $('#totalPrice').text(rub(total));
    $('#payBtn').text(`Оплатить ${rub(total)}`);
  }

  function openModal() {
    $('#modal').addClass('is-open').attr('aria-hidden', 'false');
  }

  function closeModal() {
    $('#modal').removeClass('is-open').attr('aria-hidden', 'true');
  }

  regions.forEach((region) => $('#regionFilter').append(`<option value="${region}">${region}</option>`));
  renderEvents();
  updateHeader();

  $(window).on('scroll', updateHeader);

  $('.menu-toggle').on('click', function () {
    $('.mobile-menu').toggleClass('is-open');
    $('.account-dropdown').removeClass('is-open');
    $('.account-icon').attr('aria-expanded', 'false');
  });

  $('.mobile-menu a').on('click', function () {
    $('.mobile-menu').removeClass('is-open');
  });

  $('.account-icon').on('click', function (event) {
    event.stopPropagation();
    const isOpen = $('.account-dropdown').nodes
      ? $('.account-dropdown').nodes[0].classList.contains('is-open')
      : $('.account-dropdown').hasClass('is-open');
    $('.account-dropdown').toggleClass('is-open', !isOpen);
    $(this).attr('aria-expanded', String(!isOpen));
    $('.mobile-menu').removeClass('is-open');
  });

  $('.account-dropdown').on('click', function (event) {
    event.stopPropagation();
  });

  $(document).on('click', function () {
    $('.account-dropdown').removeClass('is-open');
    $('.account-icon').attr('aria-expanded', 'false');
  });

  $('[data-scroll]').on('click', function () {
    document.querySelector($(this).data('scroll')).scrollIntoView({ behavior: 'smooth' });
  });

  $('#eventFilters select').on('change', renderEvents);

  $('.sport-card').on('click', function () {
    $('#sportFilter').val($(this).data('sport'));
    $('#statusFilter').val('upcoming');
    renderEvents();
    document.querySelector('#events').scrollIntoView({ behavior: 'smooth' });
  });

  $(document).on('click', '.js-register', function () {
    registrationModal($(this).data('event'));
  });

  $('[data-open-modal="video"]').on('click', function () {
    $('#modalTitle').text('Обзор платформы');
    $('#modalBody').html('<p>Здесь может быть промо-видео или короткая инструкция: календарь стартов, регистрация в 2 клика, документы и передача слота.</p>');
    openModal();
  });

  $('[data-open-modal="account"]').on('click', function () {
    $('#modalTitle').text('Демо личного кабинета');
    $('#modalBody').html(`
      <div class="modal-list">
        <div><strong>Профиль:</strong> Васильев Дмитрий, 49 лет</div>
        <div><strong>Документы:</strong> страховка прикрепляется к заявкам автоматически</div>
        <div><strong>Семья:</strong> 2 зависимых профиля для регистрации детей</div>
        <div><strong>Слот:</strong> оплаченный старт можно передать по email</div>
      </div>
    `);
    openModal();
  });

  $(document).on('click', '[data-open-modal="result"]', function () {
    $('#modalTitle').text('Результат старта');
    $('#modalBody').html('<p>Протокол участника: место в категории, итоговое время и ссылка на сертификат финишера.</p>');
    openModal();
  });

  $(document).on('click', '[data-close-modal]', closeModal);

  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
      $('.mobile-menu').removeClass('is-open');
      $('.account-dropdown').removeClass('is-open');
      $('.account-icon').attr('aria-expanded', 'false');
    }
  });

  $(document).on('change', '#offerAgree, #policyAgree', function () {
    $('#payBtn').prop('disabled', !($('#offerAgree').is(':checked') && $('#policyAgree').is(':checked')));
  });

  $(document).on('change input', '#modalEvent, #modalPerson, #promoCode', updatePrice);

  $(document).on('submit', '#registrationForm', function (event) {
    event.preventDefault();
    closeModal();
    showToast('Заявка создана. Переход к оплате');
  });

  setInterval(function () {
    $('[data-countdown]').each(function () {
      $(this).text(countdown($(this).data('countdown')));
    });
  }, 60000);
});

/* Personal cabinet shared page scripts */
$(function () {
  if (!$('body').hasClass('lk-page')) return;
  const regions = [
    'Москва', 'Санкт-Петербург', 'Московская область', 'Ленинградская область',
    'Краснодарский край', 'Татарстан', 'Свердловская область', 'Новосибирская область',
    'Нижегородская область', 'Самарская область', 'Ростовская область', 'Пермский край',
    'Башкортостан', 'Красноярский край', 'Вологодская область', 'Калининградская область',
    'Карелия', 'Алтайский край'
  ];

  const athlete = {
    name: 'Васильев Дмитрий',
    age: 49
  };

  const children = [
    { id: 'child-1', name: 'Васильева Анна', age: 12, birth: '18.08.2014' },
    { id: 'child-2', name: 'Васильев Егор', age: 9, birth: '03.02.2017' }
  ];

  const events = [
    { id: 'e1', title: 'ARTA City Run 10K', sport: 'run', sportName: 'Бег', region: 'Москва', place: 'Лужники', date: '2026-05-17T09:00:00', month: 'Май 2026', status: 'upcoming', seats: 42, price: 2600, paid: true },
    { id: 'e2', title: 'Vologda Ski Classic', sport: 'ski', sportName: 'Лыжи', region: 'Вологодская область', place: 'Кирики-Улита', date: '2026-05-24T10:30:00', month: 'Май 2026', status: 'upcoming', seats: 8, price: 2100, paid: false },
    { id: 'e3', title: 'Northern Bike Gran Fondo', sport: 'bike', sportName: 'Велоспорт', region: 'Санкт-Петербург', place: 'Приморский маршрут', date: '2026-06-07T08:00:00', month: 'Июнь 2026', status: 'upcoming', seats: 126, price: 3900, paid: true },
    { id: 'e4', title: 'Kazan Night Half Marathon', sport: 'run', sportName: 'Бег', region: 'Татарстан', place: 'Кремлевская набережная', date: '2026-06-20T21:00:00', month: 'Июнь 2026', status: 'upcoming', seats: 310, price: 3200, paid: false },
    { id: 'e5', title: 'Karelia Ski Sprint', sport: 'ski', sportName: 'Лыжи', region: 'Карелия', place: 'Петрозаводск', date: '2026-02-15T11:00:00', month: 'Февраль 2026', status: 'past', seats: 0, price: 1800, paid: true, result: '00:54:18' },
    { id: 'e6', title: 'Siberian Frost Run', sport: 'run', sportName: 'Бег', region: 'Новосибирская область', place: 'Михайловская набережная', date: '2026-03-01T10:00:00', month: 'Март 2026', status: 'past', seats: 0, price: 2400, paid: true, result: '01:48:34' }
  ];

  const sportLabel = { run: 'RUN', ski: 'SKI', bike: 'BIKE' };

  function rub(value) {
    return `${Math.max(0, value).toLocaleString('ru-RU')} ₽`;
  }

  function eventDate(date) {
    return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function countdown(date) {
    const diff = new Date(date).getTime() - Date.now();
    if (diff <= 0) return 'старт прошел';
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${days} дн ${hours} ч ${minutes} мин`;
  }

  function toast(message) {
    $('#toast').stop(true, true).text(message).fadeIn(160).delay(2300).fadeOut(220);
  }

  function setView(view) {
    $('.side-link').removeClass('is-active');
    $(`.side-link[data-view="${view}"]`).addClass('is-active');
    $('.view').removeClass('is-visible');
    $(`.view[data-view-panel="${view}"]`).addClass('is-visible');
    $('body').removeClass('menu-open');
    if (window.location.hash !== `#${view}`) {
      history.replaceState(null, '', `#${view}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function filteredEvents() {
    const sport = $('#sportFilter').val();
    const region = $('#regionFilter').val();
    const status = $('#statusFilter').val();
    return events.filter((item) => {
      return (sport === 'all' || item.sport === sport)
        && (region === 'all' || item.region === region)
        && (status === 'all' || item.status === status);
    });
  }

  function seatsPill(item) {
    if (item.status === 'past') return '<span class="pill">Регистрация закрыта</span>';
    const className = item.seats <= 20 ? 'hot' : 'ok';
    return `<span class="pill ${className}">Осталось мест: ${item.seats}</span>`;
  }

  function renderEvent(item) {
    const action = item.status === 'past'
      ? '<button class="ghost-btn" type="button" data-view-target="ratings">Результат</button>'
      : item.paid
        ? `<button class="ghost-btn js-transfer" type="button" data-event="${item.id}">Передать слот</button>`
        : `<button class="primary-btn js-register" type="button" data-event="${item.id}">Зарегистрироваться</button>`;

    return `
      <article class="event-row">
        <div class="event-main">
          <span class="sport-icon ${item.sport}">${sportLabel[item.sport]}</span>
          <div>
            <h3 class="event-title">${item.title}</h3>
            <p class="event-subtitle">${eventDate(item.date)} · ${item.region}, ${item.place}</p>
            <div class="meta-row">
              <span class="pill">${item.sportName}</span>
              ${seatsPill(item)}
            </div>
          </div>
        </div>
        <div class="event-actions">
          <div class="timer"><small>До старта</small><strong data-countdown="${item.date}">${countdown(item.date)}</strong></div>
          ${action}
        </div>
      </article>
    `;
  }

  function renderCalendar() {
    const groups = filteredEvents().reduce((acc, item) => {
      acc[item.month] = acc[item.month] || [];
      acc[item.month].push(item);
      return acc;
    }, {});

    const html = Object.keys(groups).map((month) => `
      <section class="month-group">
        <div class="month-title">${month}</div>
        ${groups[month].map(renderEvent).join('')}
      </section>
    `).join('');

    $('#calendarList').html(html || '<div class="empty-state">По выбранным фильтрам событий нет.</div>');
  }

  function renderProfileBlocks() {
    const future = events.filter((item) => item.paid && item.status === 'upcoming');
    const past = events.filter((item) => item.paid && item.status === 'past');

    $('#futureStarts').html(future.map((item) => `
      <div class="start-item">
        <strong>${item.title}</strong>
        <p>${eventDate(item.date)} · ${item.region}, ${item.place}</p>
        <button class="ghost-btn js-transfer" type="button" data-event="${item.id}">Передать слот</button>
      </div>
    `).join(''));

    $('#pastStarts').html(past.map((item) => `
      <div class="start-item">
        <strong>${item.title}</strong>
        <p>${eventDate(item.date)} · результат ${item.result}</p>
        <a href="#">Смотреть протокол</a>
      </div>
    `).join(''));

    $('#ordersList').html(events.filter((item) => item.paid).map((item) => `
      <article class="order-item">
        <div>
          <h3>${item.title}</h3>
          <p class="event-subtitle">${eventDate(item.date)} · оплачено ${rub(item.price)}</p>
        </div>
        <div class="event-actions">
          ${item.status === 'upcoming' ? `<button class="ghost-btn js-transfer" type="button" data-event="${item.id}">Передать слот</button>` : '<span class="pill">Завершен</span>'}
        </div>
      </article>
    `).join(''));

    $('#resultList').html(past.map((item) => `
      <article class="result-item">
        <div>
          <h3>${item.title}</h3>
          <p class="event-subtitle">${item.sportName} · ${item.region}</p>
        </div>
        <a href="#">${item.result}</a>
      </article>
    `).join(''));

    renderFamily();
  }

  function renderFamily() {
    $('#dependentList').html(children.map((child) => `
      <article class="family-item">
        <h3>${child.name}</h3>
        <p>${child.age} лет · ${child.birth}</p>
        <button class="ghost-btn js-register-child" type="button" data-child="${child.id}">Зарегистрировать на старт</button>
      </article>
    `).join(''));
  }

  function priceFor(eventItem, personAge, promo) {
    const daysToStart = Math.ceil((new Date(eventItem.date) - Date.now()) / 86400000);
    const ageModifier = personAge < 14 ? -700 : personAge >= 60 ? -500 : 0;
    const dateModifier = daysToStart < 14 ? 900 : daysToStart < 30 ? 400 : 0;
    const promoModifier = promo === 'ARTA10' ? -Math.round(eventItem.price * .1) : 0;
    return { ageModifier, dateModifier, promoModifier, total: eventItem.price + ageModifier + dateModifier + promoModifier };
  }

  function registrationDrawer(eventId, childId) {
    const eventItem = events.find((item) => item.id === eventId) || events.find((item) => item.status === 'upcoming');
    const selectedChild = children.find((child) => child.id === childId);
    const childOptions = children.map((child) => `<option value="${child.id}" ${child.id === childId ? 'selected' : ''}>${child.name}, ${child.age} лет</option>`).join('');
    openDrawer('Регистрация на старт', `
      <form class="registration-form" id="registrationForm">
        <label>Событие
          <select id="regEvent">
            ${events.filter((item) => item.status === 'upcoming').map((item) => `<option value="${item.id}" ${item.id === eventItem.id ? 'selected' : ''}>${item.title}</option>`).join('')}
          </select>
        </label>
        <label>Участник
          <select id="regPerson">
            <option value="self">Себя: ${athlete.name}</option>
            ${childOptions}
          </select>
        </label>
        <label>Промокод<input type="text" id="regPromo" placeholder="ARTA10"></label>
        <div class="price-box">
          <div class="price-row"><span>Базовая цена</span><strong id="regBase"></strong></div>
          <div class="price-row"><span>Возрастной тариф</span><strong id="regAge"></strong></div>
          <div class="price-row"><span>Дата оплаты</span><strong id="regDate"></strong></div>
          <div class="price-row"><span>Промокод</span><strong id="regPromoValue"></strong></div>
          <div class="price-row price-total"><span>К оплате</span><strong id="regTotal"></strong></div>
        </div>
        <label class="agree"><input type="checkbox" id="offerAgree"> Согласен с Офертой</label>
        <label class="agree"><input type="checkbox" id="policyAgree"> Согласен с Политикой персональных данных</label>
        <button class="primary-btn" id="payBtn" type="submit" disabled>Оплатить</button>
      </form>
    `);
    if (selectedChild) $('#regPerson').val(selectedChild.id);
    updateRegistrationPrice();
  }

  function updateRegistrationPrice() {
    const eventItem = events.find((item) => item.id === $('#regEvent').val());
    if (!eventItem) return;
    const personId = $('#regPerson').val();
    const person = personId === 'self' ? athlete : children.find((child) => child.id === personId);
    const price = priceFor(eventItem, person.age, $('#regPromo').val().trim().toUpperCase());
    $('#regBase').text(rub(eventItem.price));
    $('#regAge').text(`${price.ageModifier < 0 ? '-' : ''}${rub(Math.abs(price.ageModifier))}`);
    $('#regDate').text(`${price.dateModifier > 0 ? '+' : ''}${rub(price.dateModifier)}`);
    $('#regPromoValue').text(`${price.promoModifier < 0 ? '-' : ''}${rub(Math.abs(price.promoModifier))}`);
    $('#regTotal').text(rub(price.total));
    $('#payBtn').text(`Оплатить ${rub(price.total)}`);
  }

  function updatePayState() {
    $('#payBtn').prop('disabled', !($('#offerAgree').is(':checked') && $('#policyAgree').is(':checked')));
  }

  function transferDrawer(eventId) {
    const eventItem = events.find((item) => item.id === eventId);
    openDrawer('Передать слот', `
      <p class="helper-text">Оплаченный слот на "${eventItem.title}" будет передан новому участнику после подтверждения по email.</p>
      <form class="drawer-form" id="transferForm">
        <label>Email нового участника<input type="email" required placeholder="athlete@example.com"></label>
        <button class="primary-btn" type="submit">Отправить приглашение</button>
      </form>
    `);
  }

  function openDrawer(title, body) {
    $('#drawerTitle').text(title);
    $('#drawerBody').html(body);
    $('#drawer').addClass('is-open').attr('aria-hidden', 'false');
  }

  function closeDrawer() {
    $('#drawer').removeClass('is-open').attr('aria-hidden', 'true');
  }

  $('#regionFilter').append(regions.map((region) => `<option value="${region}">${region}</option>`).join(''));
  renderCalendar();
  renderProfileBlocks();

  const initialView = window.location.hash.replace('#', '');
  if ($(`[data-view-panel="${initialView}"]`).length) {
    setView(initialView);
  }

  $('.menu-btn').on('click', function () {
    $('body').toggleClass('menu-open');
  });

  $('.side-link[data-view], [data-view-target]').on('click', function () {
    setView($(this).data('view') || $(this).data('view-target'));
  });

  $('#eventFilters select').on('change', renderCalendar);

  $('[data-open-drawer="dependent"]').on('click', function () {
    openDrawer('Добавить ребенка', `
      <form class="drawer-form" id="dependentForm">
        <label>Имя и фамилия<input type="text" required placeholder="Например: Васильев Артем"></label>
        <label>Возраст<input type="number" required min="1" max="17" placeholder="12"></label>
        <button class="primary-btn" type="submit">Добавить</button>
      </form>
    `);
  });

  $('[data-open-drawer="registration"]').on('click', function () {
    registrationDrawer();
  });

  $(document).on('click', '[data-close-drawer]', closeDrawer);

  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      closeDrawer();
      $('body').removeClass('menu-open');
    }
  });

  $('.choice-card').on('click', function () {
    $('.choice-card').removeClass('is-selected');
    $(this).addClass('is-selected');
    toast(`Выбрано: ${$(this).data('insurance')}`);
  });

  $('#insuranceUpload').on('change', function () {
    const fileName = this.files[0] ? this.files[0].name : 'Файл не выбран';
    $('#insuranceFile').text(`${fileName} · будет прикрепляться к заявкам автоматически`);
    toast('Документ загружен');
  });

  $(document).on('click', '.js-register', function () {
    registrationDrawer($(this).data('event'));
  });

  $(document).on('click', '.js-register-child', function () {
    registrationDrawer(undefined, $(this).data('child'));
  });

  $(document).on('click', '.js-transfer', function () {
    transferDrawer($(this).data('event'));
  });

  $(document).on('input change', '#regEvent, #regPerson, #regPromo', updateRegistrationPrice);
  $(document).on('change', '#offerAgree, #policyAgree', updatePayState);

  $(document).on('submit', '#registrationForm', function (event) {
    event.preventDefault();
    closeDrawer();
    toast('Заявка создана. Переход к оплате');
  });

  $(document).on('submit', '#dependentForm', function (event) {
    event.preventDefault();
    const name = $(this).find('input[type="text"]').val();
    const age = Number($(this).find('input[type="number"]').val());
    children.push({ id: `child-${Date.now()}`, name, age, birth: 'дата не указана' });
    renderFamily();
    closeDrawer();
    toast('Зависимый профиль добавлен');
  });

  $(document).on('submit', '#transferForm', function (event) {
    event.preventDefault();
    closeDrawer();
    toast('Приглашение на передачу слота отправлено');
  });

  $('#profileForm').on('submit', function (event) {
    event.preventDefault();
    toast('Профиль сохранен');
  });

  setInterval(function () {
    $('[data-countdown]').each(function () {
      $(this).text(countdown($(this).data('countdown')));
    });
  }, 60000);
});

