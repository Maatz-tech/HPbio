/* ================================
   Contact Form Validation
   ================================ */

// Phone mask - format: (00) 00000-0000
function phoneMask(value) {
    // Remove tudo que não é número
    let numbers = value.replace(/\D/g, '');

    // Limita a 11 dígitos
    numbers = numbers.slice(0, 11);

    // Aplica a máscara
    if (numbers.length <= 2) {
        return numbers.length ? `(${numbers}` : '';
    } else if (numbers.length <= 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
}

// Toaster notification system
function createToaster() {
    let container = document.getElementById('toaster-container');

    if (!container) {
        container = document.createElement('div');
        container.id = 'toaster-container';
        container.className = 'toaster-container';
        document.body.appendChild(container);
    }

    return {
        show(message, type = 'success', duration = 5000) {
            const toast = document.createElement('div');
            toast.className = `toaster toaster--${type}`;

            const icon = type === 'success'
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

            toast.innerHTML = `
                <div class="toaster__icon">${icon}</div>
                <div class="toaster__content">
                    <p class="toaster__message">${message}</p>
                </div>
                <button class="toaster__close" aria-label="Fechar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            `;

            container.appendChild(toast);

            // Trigger animation
            requestAnimationFrame(() => {
                toast.classList.add('toaster--visible');
            });

            // Close button
            const closeBtn = toast.querySelector('.toaster__close');
            closeBtn.addEventListener('click', () => removeToast(toast));

            // Auto remove
            if (duration > 0) {
                setTimeout(() => removeToast(toast), duration);
            }

            return toast;
        }
    };

    function removeToast(toast) {
        toast.classList.remove('toaster--visible');
        toast.classList.add('toaster--hiding');

        setTimeout(() => {
            toast.remove();
        }, 300);
    }
}

export function initContactForm() {
    const form = document.getElementById('contato-form');
    if (!form) return;

    const toaster = createToaster();

    const fields = {
        nome: {
            element: form.querySelector('#nome'),
            validate: (value) => value.trim().length >= 2,
            errorMessage: 'Por favor, informe seu nome'
        },
        email: {
            element: form.querySelector('#email'),
            validate: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value.trim());
            },
            errorMessage: 'Por favor, informe um e-mail válido'
        },
        telefone: {
            element: form.querySelector('#telefone'),
            validate: (value) => {
                // Telefone é opcional, mas se preenchido deve ter formato válido
                if (!value.trim()) return true;
                // Verifica se tem pelo menos 10 dígitos (com DDD)
                const numbers = value.replace(/\D/g, '');
                return numbers.length >= 10;
            },
            errorMessage: 'Por favor, informe um telefone válido'
        },
        mensagem: {
            element: form.querySelector('#mensagem'),
            validate: (value) => value.trim().length > 0,
            errorMessage: 'Por favor, escreva sua mensagem'
        },
        privacidade: {
            element: form.querySelector('#privacidade'),
            validate: (_, element) => element.checked,
            errorMessage: 'Você precisa aceitar a política de privacidade'
        }
    };

    const submitButton = form.querySelector('.contato-form-submit');
    const telefoneInput = fields.telefone.element;

    // Apply phone mask
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            const cursorPosition = e.target.selectionStart;
            const oldValue = e.target.value;
            const newValue = phoneMask(oldValue);

            e.target.value = newValue;

            // Ajusta posição do cursor
            if (cursorPosition < oldValue.length) {
                const diff = newValue.length - oldValue.length;
                e.target.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
            }
        });

        // Previne colar texto não numérico
        telefoneInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text');
            const numbers = pastedText.replace(/\D/g, '');
            telefoneInput.value = phoneMask(numbers);
        });

        // Previne teclas não numéricas (exceto backspace, delete, arrows, tab)
        telefoneInput.addEventListener('keydown', (e) => {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
            const isNumber = /^\d$/.test(e.key);
            const isAllowed = allowedKeys.includes(e.key);
            const isCtrlCmd = e.ctrlKey || e.metaKey;

            if (!isNumber && !isAllowed && !isCtrlCmd) {
                e.preventDefault();
            }
        });
    }

    // Validate single field
    function validateField(fieldName) {
        const field = fields[fieldName];
        if (!field || !field.element) return true;

        const value = field.element.type === 'checkbox' ? '' : field.element.value;
        const isValid = field.validate(value, field.element);

        updateFieldState(field.element, isValid, fieldName === 'privacidade');

        return isValid;
    }

    // Update field visual state
    function updateFieldState(element, isValid, isCheckbox = false) {
        if (isCheckbox) {
            const wrapper = element.closest('.contato-form-checkbox-wrapper');
            const checkbox = element.closest('.contato-form-checkbox');

            if (isValid) {
                wrapper?.classList.remove('has-error');
                checkbox?.classList.remove('error');
            } else {
                wrapper?.classList.add('has-error');
                checkbox?.classList.add('error');
            }
        } else {
            const group = element.closest('.contato-form-group');

            if (isValid) {
                element.classList.remove('error');
                group?.classList.remove('has-error');
            } else {
                element.classList.add('error');
                group?.classList.add('has-error');
            }
        }
    }

    // Clear field state
    function clearFieldState(element, isCheckbox = false) {
        if (isCheckbox) {
            const wrapper = element.closest('.contato-form-checkbox-wrapper');
            const checkbox = element.closest('.contato-form-checkbox');
            wrapper?.classList.remove('has-error');
            checkbox?.classList.remove('error');
        } else {
            const group = element.closest('.contato-form-group');
            element.classList.remove('error');
            group?.classList.remove('has-error');
        }
    }

    // Validate all fields
    function validateForm() {
        let isFormValid = true;

        Object.keys(fields).forEach(fieldName => {
            const isValid = validateField(fieldName);
            if (!isValid) isFormValid = false;
        });

        return isFormValid;
    }

    // Set loading state
    function setLoading(isLoading) {
        if (isLoading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }

    // Reset form
    function resetForm() {
        form.reset();
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (field.element) {
                clearFieldState(field.element, fieldName === 'privacidade');
            }
        });
    }

    // Add blur event listeners for real-time validation
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (!field.element) return;

        if (fieldName === 'privacidade') {
            field.element.addEventListener('change', () => {
                validateField(fieldName);
            });
        } else {
            field.element.addEventListener('blur', () => {
                // Only validate if field has been touched (has value)
                if (field.element.value) {
                    validateField(fieldName);
                }
            });

            // Clear error state when user starts typing (except phone which has its own handler)
            if (fieldName !== 'telefone') {
                field.element.addEventListener('input', () => {
                    if (field.element.classList.contains('error')) {
                        clearFieldState(field.element);
                    }
                });
            }
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            toaster.show('Por favor, corrija os erros no formulário antes de enviar.', 'error');
            return;
        }

        setLoading(true);

        // Simulate form submission (replace with actual API call)
        try {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success (in production, make actual API call here)
            console.log('Form data:', data);

            toaster.show('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            resetForm();
        } catch (error) {
            console.error('Form submission error:', error);
            toaster.show('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.', 'error');
        } finally {
            setLoading(false);
        }
    });
}
