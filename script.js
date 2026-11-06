
const availableTours = ["Говерла", "Туркул", "Шпиці", "Кукул"];
console.log("Доступні тури в Карпатах:", availableTours);

const tourCards = document.querySelectorAll('.card');
console.log(`Усього карток із турами та місцями на сторінці: ${tourCards.length}`);

const copyElement = document.querySelector('.footer__copy');
if (copyElement) {
  const currentYear = new Date().getFullYear();
  copyElement.textContent = `© ${currentYear} Carpathian Trails. Усі права захищено.`;
}

const firstCard = document.querySelector('.card');
if (firstCard) {
  firstCard.classList.add('featured-card');
}


