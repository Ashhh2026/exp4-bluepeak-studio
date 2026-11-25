// Shared Navigation & Form Wiring for Bluepeak Studio (Exp. 4)
(function () {
  // Mobile hamburger toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  // Footer Newsletter Form (shared on all 4 pages)
  const nlForm = document.getElementById("newsletterForm");
  const nlEmail = document.getElementById("nlEmail");
  const nlError = document.getElementById("nlError");
  const nlSuccess = document.getElementById("nlSuccess");

  nlForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = window.ValidationLib.validateEmail(nlEmail.value);
    if (err) {
      nlError.textContent = err;
      nlSuccess.textContent = "";
      nlEmail.setAttribute("aria-invalid", "true");
      nlEmail.focus();
      return;
    }
    nlError.textContent = "";
    nlEmail.removeAttribute("aria-invalid");
    nlSuccess.textContent = `Subscribed ${nlEmail.value.trim()} — Bluepeak Studio (Ashwarya Agrawal · 23BCON1659).`;
    nlForm.reset();
  });

  // Contact Page Form (contact.html)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const fields = {
      name: document.getElementById("cName"),
      email: document.getElementById("cEmail"),
      phone: document.getElementById("cPhone"),
      subject: document.getElementById("cSubject"),
      message: document.getElementById("cMessage"),
    };
    const errorEls = {
      name: document.getElementById("errName"),
      email: document.getElementById("errEmail"),
      phone: document.getElementById("errPhone"),
      subject: document.getElementById("errSubject"),
      message: document.getElementById("errMessage"),
    };
    const contactSuccess = document.getElementById("contactSuccess");
    const msgCounter = document.getElementById("msgCounter");

    fields.message?.addEventListener("input", () => {
      if (msgCounter) {
        msgCounter.textContent = `(${fields.message.value.trim().length}/10 min)`;
      }
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const values = {
        name: fields.name.value,
        email: fields.email.value,
        phone: fields.phone.value,
        subject: fields.subject.value,
        message: fields.message.value,
      };
      const errors = window.ValidationLib.validateContact(values);

      Object.keys(fields).forEach((key) => {
        const msg = errors[key] || "";
        if (errorEls[key]) errorEls[key].textContent = msg;
        if (msg) {
          fields[key].setAttribute("aria-invalid", "true");
        } else {
          fields[key].removeAttribute("aria-invalid");
        }
      });

      if (window.ValidationLib.hasErrors(errors)) {
        contactSuccess.textContent = "";
        const firstInvalidKey = Object.keys(fields).find((k) => errors[k]);
        if (firstInvalidKey) fields[firstInvalidKey].focus();
        return;
      }

      contactSuccess.textContent = `Thank you, ${values.name.trim()}! Your inquiry has been validated and logged for Ashwarya Agrawal (Roll No: 23BCON1659).`;
      contactForm.reset();
      if (msgCounter) msgCounter.textContent = "(0/10 min)";
    });
  }
})();
