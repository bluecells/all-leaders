import { c as createComponent } from './astro-component_BSMsVI9A.mjs';
import 'piccolore';
import { d as renderTemplate, c as renderComponent, m as maybeRenderHead, e as addAttribute } from './server_9mu4lEgk.mjs';
import { $ as $$Layout } from './Layout_BzCycEC5.mjs';
import { $ as $$Container } from './Container_CDti1JF7.mjs';

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
    btnText.innerText = 'Sending...';

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
        alert(errorData.error || "Error sending message.");
        resetButton(btn, btnText);
      }
    } catch (error) {
      alert('Network error.');
      resetButton(btn, btnText);
    }
  }

  function resetButton(btn, btnText) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btnText.innerText = 'Send my request';
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

  // Email validation regex
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  emailInput.addEventListener('input', () => {
    const isValid = emailRegex.test(emailInput.value);

    if (emailInput.value === '' || isValid) {
      // If valid or empty, hide error and reset border
      emailError.style.display = 'none';
      emailInput.style.borderColor = 'rgba(16, 147, 173, 0.2)';
    } else {
      // If invalid, show error in red
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
    btnText.innerText = 'Sending...';

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
        alert(errorData.error || "Error sending message.");
        resetButton(btn, btnText);
      }
    } catch (error) {
      alert('Network error.');
      resetButton(btn, btnText);
    }
  }

  function resetButton(btn, btnText) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btnText.innerText = 'Send my request';
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

  // Email validation regex
  const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;

  emailInput.addEventListener('input', () => {
    const isValid = emailRegex.test(emailInput.value);

    if (emailInput.value === '' || isValid) {
      // If valid or empty, hide error and reset border
      emailError.style.display = 'none';
      emailInput.style.borderColor = 'rgba(16, 147, 173, 0.2)';
    } else {
      // If invalid, show error in red
      emailError.style.display = 'block';
      emailInput.style.borderColor = '#ef4444';
    }
  });

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('astro:after-swap', init);
  init();
<\/script>`])), renderComponent($$result, "Layout", $$Layout, { "title": "Contact", "metaTitle": "Contact All Leaders Initiative", "metaDescription": "Please feel free to contact us for any questions regarding our services and their logistics.", "lang": "en", "data-astro-cid-v7lftu2i": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, { "data-astro-cid-v7lftu2i": true }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="contact-container min-h-[90vh]" data-astro-cid-v7lftu2i> <div class="contact-layout" data-astro-cid-v7lftu2i> <div class="contact-left" data-astro-cid-v7lftu2i> <img class="ali-logo-watercolour" src="/images/pages/logo-ali-aquarelle.webp" alt="Logo All Leaders Initiative" data-astro-cid-v7lftu2i> <h1 class="contact-title" data-astro-cid-v7lftu2i>Contact Us</h1> <p class="contact-subtitle md:pb-20" data-astro-cid-v7lftu2i>
What if we talked about collective performance?<br data-astro-cid-v7lftu2i> Our team will respond with precision.
</p> </div> <div class="contact-right" data-astro-cid-v7lftu2i> <div class="contact-wrapper" id="contact-wrapper" data-astro-cid-v7lftu2i> <div class="success-message" id="success-message" data-astro-cid-v7lftu2i> <div class="success-icon" data-astro-cid-v7lftu2i> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-v7lftu2i><polyline points="20 6 9 17 4 12" data-astro-cid-v7lftu2i></polyline></svg> </div> <h2 class="success-title" data-astro-cid-v7lftu2i>Message sent!</h2> <p class="success-text" data-astro-cid-v7lftu2i>
Thank you for contacting us. <br data-astro-cid-v7lftu2i> <strong data-astro-cid-v7lftu2i>Our team will respond within 24 hours.</strong> </p> </div> <form id="contact-form"${addAttribute(FORMSPREE_URL, "action")} method="POST" class="contact-form" data-astro-cid-v7lftu2i> <div class="form-grid" data-astro-cid-v7lftu2i> <div data-astro-cid-v7lftu2i> <label for="full-name" class="form-label" data-astro-cid-v7lftu2i>Full Name</label> <input type="text" name="name" id="full-name" required placeholder="John Smith" class="form-input form-input-dark" data-astro-cid-v7lftu2i> </div> <div data-astro-cid-v7lftu2i> <label for="email-address" class="form-label" data-astro-cid-v7lftu2i>Professional Email</label> <input type="email" name="_replyto" id="email-address" required placeholder="john@company.com" class="form-input form-input-dark" data-astro-cid-v7lftu2i> <p id="email-error" class="form-error" data-astro-cid-v7lftu2i>
Please enter a valid email address (e.g. name@domain.com)
</p> </div> </div> <div data-astro-cid-v7lftu2i> <label for="subject" class="form-label" data-astro-cid-v7lftu2i>Subject</label> <div class="select-wrapper" data-astro-cid-v7lftu2i> <select name="subject" id="subject" class="form-select" data-astro-cid-v7lftu2i> <option data-astro-cid-v7lftu2i>Team Coaching</option> <option data-astro-cid-v7lftu2i>Performance Diagnosis</option> <option data-astro-cid-v7lftu2i>Executive Coaching</option> <option data-astro-cid-v7lftu2i>Conflict Management</option> <option data-astro-cid-v7lftu2i>Leadership Development</option> <option data-astro-cid-v7lftu2i>Conference Organisation</option> <option data-astro-cid-v7lftu2i>Mental Health and Sustainable Performance</option> <option data-astro-cid-v7lftu2i>Other</option> </select> <div class="select-icon" data-astro-cid-v7lftu2i> <svg viewBox="0 0 20 20" data-astro-cid-v7lftu2i><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" data-astro-cid-v7lftu2i></path></svg> </div> </div> </div> <div data-astro-cid-v7lftu2i> <label for="message" class="form-label" data-astro-cid-v7lftu2i>Your Message</label> <textarea name="message" id="message" required placeholder="Describe your needs..." class="form-textarea form-input-dark" data-astro-cid-v7lftu2i></textarea> </div> <div class="form-submit" data-astro-cid-v7lftu2i> <button type="submit" id="submit-btn" class="submit-button" data-astro-cid-v7lftu2i> <span id="btn-text" data-astro-cid-v7lftu2i>Send my request</span> </button> </div> </form> </div> </div> </div> </div> ` })} ` }));
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/contact.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/contact.astro";
const $$url = "/en/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
