const days = document.querySelector('#calendarDays');
for (let i = 0; i < 2; i++) days.insertAdjacentHTML('beforeend', '<span class="empty"></span>');
for (let i = 1; i <= 31; i++) days.insertAdjacentHTML('beforeend', `<span class="${i === 5 ? 'wedding-day' : ''}">${i}</span>`);

const wedding = new Date('2026-12-05T18:00:00+09:00');
const diff = Math.ceil((wedding - new Date()) / 86400000);
document.querySelector('#countdown').textContent = diff > 0 ? `재원 ♥ 시은의 결혼식이 ${diff}일 남았습니다.` : '함께 축복해 주셔서 감사합니다.';

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toast = document.querySelector('#toast');
const copy = async text => {
  try { await navigator.clipboard.writeText(text); }
  catch { const el = document.createElement('textarea'); el.value = text; document.body.append(el); el.select(); document.execCommand('copy'); el.remove(); }
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
};
document.querySelector('#shareButton').addEventListener('click', () => copy(location.href));
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => copy(button.dataset.copy)));
