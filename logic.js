const rules = [
    { name: 'fullName', err: 'test-contact-error-name', test: v => v.trim().length > 0, msg: 'Full Name is required.' },
    { name: 'email', err: 'test-contact-error-email', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'A valid email is required (name@example.com).' },
    { name: 'subject', err: 'test-contact-error-subject', test: v => v.trim().length > 0, msg: 'Subject is required.' },
    { name: 'message', err: 'test-contact-error-message', test: v => v.trim().length >= 10, msg: 'Message must be at least 10 characters long.' }
];

function showError(input, rule) {
    const el = document.querySelector(`[data-testid="${rule.err}"]`);
    if (el) {
        el.textContent = rule.msg;
        el.style.display = 'block';
    }
    input && input.setAttribute('aria-invalid', 'true');
}

function clearMessages(form) {
    form.querySelectorAll('.error-message').forEach(e => e.style.display = 'none');
    form.querySelectorAll('[aria-invalid]').forEach(e => e.removeAttribute('aria-invalid'));
    const ok = form.querySelector('[data-testid="test-contact-success"]');
    if (ok) ok.style.display = 'none';
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    clearMessages(form);

    for (const r of rules) {
        const input = form.elements[r.name];
        const val = input ? (input.value || '') : '';
        if (!r.test(val)) {
            showError(input, r);
            input && input.focus();
            return;
        }
    }

    const success = form.querySelector('[data-testid="test-contact-success"]');
    if (success) {
        success.style.display = 'block';
        setTimeout(() => success.style.display = 'none', 5000);
    }
    form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) form.addEventListener('submit', handleFormSubmit);
});

