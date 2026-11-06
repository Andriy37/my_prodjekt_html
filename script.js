document.addEventListener('DOMContentLoaded', () => {

  const availableTours = ["Говерла", "Туркул", "Шпиці", "Кукул"];
  console.log("Доступні тури в Карпатах:", availableTours);

  const tourCards = document.querySelectorAll('.card');
  console.log(`Кількість карток на сторінці: ${tourCards.length}`);

  const copyElement = document.querySelector('.footer__copy');
  if (copyElement) {
    const currentYear = new Date().getFullYear();
    copyElement.textContent = `© ${currentYear} Carpathian Trails. Усі права захищено.`;
  }




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


  const contactForm = document.querySelector('.form');
  const messageBox = document.getElementById('form-message');

  if (contactForm && messageBox) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');

      const nameValue = nameInput ? nameInput.value.trim() : '';
      const emailValue = emailInput ? emailInput.value.trim() : '';

      if (!nameValue) {
        messageBox.textContent = 'Будь ласка, введіть ваше ім\'я.';
        messageBox.style.color = 'var(--primary-color)';
        return;
      }

      if (!emailValue || !emailValue.includes('@')) {
        messageBox.textContent = 'Помилка! Вкажіть коректний email з символом @.';
        messageBox.style.color = 'var(--primary-color)';
        return;
      }

      messageBox.textContent = 'Дякуємо! Вашу заявку успішно надіслано.';
      messageBox.style.color = '#4ade80';
      contactForm.reset();
    });
  }
});