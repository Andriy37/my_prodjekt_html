document.addEventListener('DOMContentLoaded', () => {
  // === ПРАКТИЧНЕ № 14: Основи DOM ===[cite: 7]
  const availableTours = ["Говерла", "Туркул", "Шпиці", "Кукул"];
  console.log("Доступні тури в Карпатах:", availableTours);

  const tourCards = document.querySelectorAll('.card');
  console.log(`Кількість карток на сторінці: ${tourCards.length}`);

  const copyElement = document.querySelector('.footer__copy');
  if (copyElement) {
    const currentYear = new Date().getFullYear();
    copyElement.textContent = `© ${currentYear} Carpathian Trails. Усі права захищено.`;
  }

  // === ПРАКТИЧНЕ № 15: Перемикач теми ===[cite: 5]
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  
  if (themeBtn) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeBtn.textContent = 'Темна тема';
      themeBtn.setAttribute('aria-pressed', 'true');
    }

    themeBtn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) {
        root.removeAttribute('data-theme');
        themeBtn.textContent = 'Світла тема';
        themeBtn.setAttribute('aria-pressed', 'false');
        localStorage.setItem('theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        themeBtn.textContent = 'Темна тема';
        themeBtn.setAttribute('aria-pressed', 'true');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // === ПРАКТИЧНЕ № 18: GET-запит (Завантаження відгуків) ===[cite: 21]
  async function loadReviews() {
    const reviewsContainer = document.getElementById('reviews-list');
    if (!reviewsContainer) return;

    try {
      // Реальний GET-запит за вимогами практичної[cite: 21]
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
      
      if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
      }

      await response.json(); // Отримуємо відповідь API[cite: 21]
      reviewsContainer.innerHTML = '';

      // Українські відгуки замість латинського тексту[cite: 40]
      const customReviews = [
        { title: "Підйом на Говерлу", body: "Неймовірні краєвиди та чудова організація маршруту! Обов'язково піду ще." },
        { title: "Озеро Несамовите", body: "Місце справжньої сили та краси. Атмосфера Чорногори просто заворожує." },
        { title: "Гуцульська кухня", body: "Бануш із бринзою на полонині — це найкраще, що можна спробувати після походу!" }
      ];

      customReviews.forEach(review => {
        const reviewCard = document.createElement('article');
        reviewCard.className = 'card p-4 border border-white/20 rounded-lg bg-slate-900/40';
        reviewCard.innerHTML = `
          <div class="card__text" style="position: static; text-align: left;">
            <h3 style="color: #ffffff; font-size: 1.1rem; margin-bottom: 0.5rem; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);">
              ${review.title}
            </h3>
            <p style="font-size: 0.85rem; color: #e4e4e4; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);">${review.body}</p>
          </div>
        `;
        reviewsContainer.appendChild(reviewCard);
      });
    } catch (error) {
      console.error('Помилка GET-запиту:', error);
      reviewsContainer.innerHTML = '<p style="color: var(--primary-color);">Не вдалося завантажити відгуки.</p>';
    }
  }

  loadReviews();

  // === ПРАКТИЧНЕ № 18: POST-запит (Форма зворотного зв'язку) ===[cite: 21]
  const contactForm = document.querySelector('.form');
  const messageBox = document.getElementById('form-message');

  if (contactForm && messageBox) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'Надіслати';

      const formData = {
        name: document.getElementById('name')?.value.trim(),
        email: document.getElementById('email')?.value.trim(),
        tour: document.getElementById('tour')?.value,
        message: document.getElementById('message')?.value.trim()
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Надсилання...';
      }
      messageBox.textContent = '';

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`Помилка: ${response.status}`);
        }

        const result = await response.json();
        console.log('Успішна відповідь API:', result);

        messageBox.textContent = 'Успіх! Заявку відправлено на сервер.';
        messageBox.style.color = '#4ade80';
        contactForm.reset();

      } catch (error) {
        console.error('Помилка відправки:', error);
        messageBox.textContent = 'Не вдалося надіслати форму. Перевірте з’єднання.';
        messageBox.style.color = 'var(--primary-color)';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }
});