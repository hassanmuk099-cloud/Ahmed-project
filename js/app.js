document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible') === 'true';
            primaryNav.setAttribute('data-visible', !isVisible);
            navToggle.setAttribute('aria-expanded', !isVisible);
        });
    }

    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const statusMessage = document.querySelector('#form-status-message');
            if (validateForm(this)) {
                statusMessage.textContent = 'تم إرسال رسالتك بنجاح! شكراً لتواصلك.';
                statusMessage.className = 'success';
                this.reset();
            } else {
                statusMessage.textContent = 'الرجاء إصلاح الأخطاء في النموذج.';
                statusMessage.className = 'error';
            }
        });
    }
    
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const statusMessage = document.querySelector('#login-status-message');
            if(validateForm(this)) {
                 statusMessage.textContent = 'تم تسجيل الدخول بنجاح. (محاكاة)';
                 statusMessage.className = 'success';
                 this.reset();
            } else {
                statusMessage.textContent = 'بيانات الدخول غير صحيحة.';
                statusMessage.className = 'error';
            }
        });
    }

    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const statusMessage = document.querySelector('#signup-status-message');
            if(validateForm(this)) {
                 statusMessage.textContent = 'تم إنشاء الحساب بنجاح. (محاكاة)';
                 statusMessage.className = 'success';
                 this.reset();
            } else {
                statusMessage.textContent = 'الرجاء التحقق من المدخلات.';
                statusMessage.className = 'error';
            }
        });
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            const formGroup = input.parentElement;
            const errorContainer = formGroup.querySelector('.error-message');
            formGroup.classList.remove('error');
            errorContainer.textContent = '';

            if (!input.value.trim()) {
                isValid = false;
                showError(formGroup, errorContainer, 'هذا الحقل مطلوب.');
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                showError(formGroup, errorContainer, 'الرجاء إدخال بريد إلكتروني صحيح.');
            } else if (input.minLength > 0 && input.value.length < input.minLength) {
                isValid = false;
                showError(formGroup, errorContainer, `يجب أن يكون ${input.minLength} حروف على الأقل.`);
            }
        });
        return isValid;
    }
    
    function showError(formGroup, errorContainer, message) {
        formGroup.classList.add('error');
        errorContainer.textContent = message;
    }

    function isValidEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
});
