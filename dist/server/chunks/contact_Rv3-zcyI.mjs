import { c as createComponent } from './astro-component_CKtM7rSL.mjs';
import 'piccolore';
import { m as maybeRenderHead, f as renderSlot, d as renderTemplate, c as renderComponent, e as addAttribute } from './server__edj_reH.mjs';
import { $ as $$Layout } from './Layout_D4dKH1zz.mjs';
import 'clsx';
import { C as CONTACT } from './_astro_content_BUXSNqzD.mjs';

const $$Container = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto max-w-7xl px-8 sm:px-0"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/Container.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const FORMSPREE_URL = "https://formspree.io/f/mqeneyew";
  return renderTemplate(_a || (_a = __template(["", ` <script>
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const successDiv = document.getElementById('success-message');
    const formEl = document.getElementById('contact-form');

    btn.disabled = true;
    btn.style.opacity = '0.7';
    btnText.innerText = 'Envoi en cours...';

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        formEl.classList.add('hidden');
        successDiv.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Erreur lors de l'envoi.");
        resetButton(btn, btnText);
      }
    } catch (error) {
      alert('Erreur réseau.');
      resetButton(btn, btnText);
    }
  }

  function resetButton(btn, btnText) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btnText.innerText = 'Envoyer ma demande';
  }

  function init() {
    const form = document.getElementById('contact-form');
    if (form) {
      form.removeEventListener('submit', handleSubmit);
      form.addEventListener('submit', handleSubmit);
    }
  }

  const emailInput = document.getElementById('email-address');
  const emailError = document.getElementById('email-error');

  // Expression régulière pour valider l'email
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  emailInput.addEventListener('input', () => {
    const isValid = emailRegex.test(emailInput.value);

    if (emailInput.value === '' || isValid) {
      // Si c'est valide ou vide, on cache l'erreur et on remet la bordure normale
      emailError.style.display = 'none';
      emailInput.style.borderColor = 'rgba(16, 147, 173, 0.2)';
    } else {
      // Si c'est invalide, on affiche l'erreur en rouge
      emailError.style.display = 'block';
      emailInput.style.borderColor = '#ef4444';
    }
  });

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('astro:after-swap', init);
  init();
<\/script>`], ["", ` <script>
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const successDiv = document.getElementById('success-message');
    const formEl = document.getElementById('contact-form');

    btn.disabled = true;
    btn.style.opacity = '0.7';
    btnText.innerText = 'Envoi en cours...';

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        formEl.classList.add('hidden');
        successDiv.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Erreur lors de l'envoi.");
        resetButton(btn, btnText);
      }
    } catch (error) {
      alert('Erreur réseau.');
      resetButton(btn, btnText);
    }
  }

  function resetButton(btn, btnText) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btnText.innerText = 'Envoyer ma demande';
  }

  function init() {
    const form = document.getElementById('contact-form');
    if (form) {
      form.removeEventListener('submit', handleSubmit);
      form.addEventListener('submit', handleSubmit);
    }
  }

  const emailInput = document.getElementById('email-address');
  const emailError = document.getElementById('email-error');

  // Expression régulière pour valider l'email
  const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;

  emailInput.addEventListener('input', () => {
    const isValid = emailRegex.test(emailInput.value);

    if (emailInput.value === '' || isValid) {
      // Si c'est valide ou vide, on cache l'erreur et on remet la bordure normale
      emailError.style.display = 'none';
      emailInput.style.borderColor = 'rgba(16, 147, 173, 0.2)';
    } else {
      // Si c'est invalide, on affiche l'erreur en rouge
      emailError.style.display = 'block';
      emailInput.style.borderColor = '#ef4444';
    }
  });

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('astro:after-swap', init);
  init();
<\/script>`])), renderComponent($$result, "Layout", $$Layout, { "title": CONTACT.TITLE, "metaTitle": CONTACT.METATITLE, "metaDescription": CONTACT.METADESCRIPTION, "data-astro-cid-uw5kdbxl": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "data-astro-cid-uw5kdbxl": true }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="contact-container min-h-[85vh]" data-astro-cid-uw5kdbxl> <div class="contact-header" data-astro-cid-uw5kdbxl> <h1 class="contact-title pt-12! pb-0!" data-astro-cid-uw5kdbxl>Contactez-nous</h1> <p class="contact-subtitle pb-4" data-astro-cid-uw5kdbxl>
Et si nous parlions de performance collective&nbsp;? Notre équipe vous répond avec
          précision.
</p> </div> <div class="contact-wrapper-outer" data-astro-cid-uw5kdbxl> <div class="contact-wrapper" id="contact-wrapper" data-astro-cid-uw5kdbxl> <div class="success-message" id="success-message" data-astro-cid-uw5kdbxl> <div class="success-icon" data-astro-cid-uw5kdbxl> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-uw5kdbxl><polyline points="20 6 9 17 4 12" data-astro-cid-uw5kdbxl></polyline></svg> </div> <h2 class="success-title" data-astro-cid-uw5kdbxl>Message envoyé&nbsp;!</h2> <p class="success-text" data-astro-cid-uw5kdbxl>
Merci de nous avoir contactés. <br data-astro-cid-uw5kdbxl> <strong data-astro-cid-uw5kdbxl>Notre équipe vous répondra sous 24h.</strong> </p> </div> <form id="contact-form"${addAttribute(FORMSPREE_URL, "action")} method="POST" class="contact-form" data-astro-cid-uw5kdbxl> <div class="form-grid" data-astro-cid-uw5kdbxl> <div data-astro-cid-uw5kdbxl> <label for="full-name" class="form-label" data-astro-cid-uw5kdbxl>Nom Complet</label> <input type="text" name="name" id="full-name" required placeholder="Jean Dupont" class="form-input form-input-dark" data-astro-cid-uw5kdbxl> </div> <div data-astro-cid-uw5kdbxl> <label for="email-address" class="form-label" data-astro-cid-uw5kdbxl>Email Professionnel</label> <input type="email" name="_replyto" id="email-address" required placeholder="jean@entreprise.com" class="form-input form-input-dark" data-astro-cid-uw5kdbxl> <p id="email-error" class="form-error" data-astro-cid-uw5kdbxl>
Veuillez entrer une adresse email valide (ex: nom@domaine.com)
</p> </div> </div> <div data-astro-cid-uw5kdbxl> <label for="subject" class="form-label" data-astro-cid-uw5kdbxl>Sujet</label> <div class="select-wrapper" data-astro-cid-uw5kdbxl> <select name="subject" id="subject" class="form-select" data-astro-cid-uw5kdbxl> <option data-astro-cid-uw5kdbxl>Organisation d'une conférence</option> <option data-astro-cid-uw5kdbxl>Demande de renseignement</option> <option data-astro-cid-uw5kdbxl>Autre</option> </select> <div class="select-icon" data-astro-cid-uw5kdbxl> <svg viewBox="0 0 20 20" data-astro-cid-uw5kdbxl><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" data-astro-cid-uw5kdbxl></path></svg> </div> </div> </div> <div data-astro-cid-uw5kdbxl> <label for="message" class="form-label" data-astro-cid-uw5kdbxl>Votre Message</label> <textarea name="message" id="message" required placeholder="Décrivez votre besoin..." class="form-textarea form-input-dark" data-astro-cid-uw5kdbxl></textarea> </div> <div class="form-submit" data-astro-cid-uw5kdbxl> <button type="submit" id="submit-btn" class="submit-button" data-astro-cid-uw5kdbxl> <span id="btn-text" data-astro-cid-uw5kdbxl>Envoyer ma demande</span> </button> <div class="contact-phone" data-astro-cid-uw5kdbxl> <p data-astro-cid-uw5kdbxl>
Une urgence&nbsp;? Appelez-nous au <a href="tel:+33603555452" class="phone-link" data-astro-cid-uw5kdbxl>+33 6 03 55 54 52</a> </p> </div> </div> </form> </div> </div> </div> ` })} ` }));
}, "/Users/bluecells/Websites/all-leaders/src/pages/contact.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
