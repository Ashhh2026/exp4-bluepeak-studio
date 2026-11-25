// Pure shared validation module (mirrors _lib/validation.ts from Exp. 4)
(function (global) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[+]?[0-9\s().-]{7,20}$/;

  function validateEmail(email) {
    const val = (email || "").trim();
    if (!val) return "Email address is required.";
    if (!EMAIL_RE.test(val)) return "Enter a valid email address (e.g., name@domain.com).";
    return null;
  }

  function validateContact(values) {
    const errors = {};
    const name = (values.name || "").trim();
    const emailErr = validateEmail(values.email);
    const phone = (values.phone || "").trim();
    const subject = (values.subject || "").trim();
    const message = (values.message || "").trim();

    if (!name) {
      errors.name = "Full name is required.";
    } else if (name.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (emailErr) {
      errors.email = emailErr;
    }

    if (phone && !PHONE_RE.test(phone)) {
      errors.phone = "Enter a valid phone number (7–20 digits).";
    }

    if (!subject) {
      errors.subject = "Please choose a project subject.";
    }

    if (!message) {
      errors.message = "Project details are required.";
    } else if (message.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    return errors;
  }

  function hasErrors(errors) {
    return Object.keys(errors).length > 0;
  }

  global.ValidationLib = { validateEmail, validateContact, hasErrors };
})(window);
