/**
 * Multi Purpose Engineering School, Gaudgaon
 * Main JavaScript file - Form validation and UI enhancements
 */

(function () {
    "use strict";

    // DOM Elements
    const registrationForm = document.getElementById("registrationForm");
    const navLinks = document.querySelectorAll(".nav-link");

    // =====================================================
    // Navigation: Highlight active link
    // =====================================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    }

    // =====================================================
    // Form Validation
    // =====================================================
    const ValidationPatterns = {
        mobile: /^[6-9]\d{9}$/, // Indian mobile numbers start with 6-9
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        aadhaar: /^\d{12}$/,
        digitsMarathi: /^[०-९]{12}$/, // Marathi digits 0-9, 12 chars
    };

    function validateMobile(mobile) {
        if (!mobile) return true; // Optional field
        return ValidationPatterns.mobile.test(mobile);
    }

    function validateEmail(email) {
        if (!email) return true; // Optional field
        return ValidationPatterns.email.test(email);
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const existingError = formGroup.querySelector(".error-message");
        if (existingError) existingError.remove();

        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.color = "#e53935";
        errorDiv.style.fontSize = "0.85rem";
        errorDiv.style.marginTop = "0.25rem";
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        input.style.borderColor = "#e53935";
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const existingError = formGroup.querySelector(".error-message");
        if (existingError) existingError.remove();
        input.style.borderColor = "#e0e0e0";
    }

    function clearAllErrors(form) {
        const errors = form.querySelectorAll(".error-message");
        errors.forEach((e) => e.remove());
        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach((input) => {
            input.style.borderColor = "#e0e0e0";
        });
    }

    function validateForm(formData) {
        const errors = [];

        // Student name (required)
        if (!formData.student_name || formData.student_name.trim() === "") {
            errors.push({ field: "student_name", message: "विद्यार्थ्याचे नाव आवश्यक आहे" });
        }

        // Class (required)
        if (!formData.class_applied) {
            errors.push({ field: "class_applied", message: "कक्षा निवडणे आवश्यक आहे" });
        }

        // Parent name (required)
        if (!formData.parent_name || formData.parent_name.trim() === "") {
            errors.push({ field: "parent_name", message: "वडीलांचे/आईचे नाव आवश्यक आहे" });
        }

        // Parent mobile (required, must be valid)
        if (!formData.parent_mobile || formData.parent_mobile.trim() === "") {
            errors.push({ field: "parent_mobile", message: "मोबाईल नंबर आवश्यक आहे" });
        } else if (!validateMobile(formData.parent_mobile)) {
            errors.push({ field: "parent_mobile", message: "वैध मोबाईल नंबर द्या" });
        }

        // Address (required)
        if (!formData.address || formData.address.trim() === "") {
            errors.push({ field: "address", message: "पत्ता आवश्यक आहे" });
        }

        // Student mobile (optional, but if provided must be valid)
        if (formData.student_mobile && formData.student_mobile.trim() !== "") {
            if (!validateMobile(formData.student_mobile)) {
                errors.push({ field: "student_mobile", message: "वैध मोबाईल नंबर द्या" });
            }
        }

        // Student email (optional, but if provided must be valid)
        if (formData.student_email && formData.student_email.trim() !== "") {
            if (!validateEmail(formData.student_email)) {
                errors.push({ field: "student_email", message: "वैध ईमेल पत्ता द्या" });
            }
        }

        // Parent email (optional, but if provided must be valid)
        if (formData.parent_email && formData.parent_email.trim() !== "") {
            if (!validateEmail(formData.parent_email)) {
                errors.push({ field: "parent_email", message: "वैध ईमेल पत्ता द्या" });
            }
        }

        // Aadhaar (optional, but if provided must be 12 digits)
        if (formData.aadhaar && formData.aadhaar.replace(/\D/g, "").length > 0) {
            const digitsOnly = formData.aadhaar.replace(/\D/g, "");
            if (digitsOnly.length !== 12) {
                errors.push({ field: "aadhaar", message: "आधार क्रमांक १२ अंकी असावा" });
            }
        }

        return errors;
    }

    function displayErrors(errors) {
        errors.forEach((error) => {
            const input = document.getElementById(error.field);
            if (input) {
                showError(input, error.message);
            }
        });
    }

    function displaySuccessMessage(form) {
        const successDiv = document.createElement("div");
        successDiv.className = "success-message";
        successDiv.style.backgroundColor = "#c8e6c9";
        successDiv.style.color = "#1b5e20";
        successDiv.style.padding = "1rem";
        successDiv.style.borderRadius = "4px";
        successDiv.style.marginBottom = "1rem";
        successDiv.style.border = "1px solid #4caf50";
        successDiv.innerHTML =
            "<p style='margin: 0; font-weight: 500;'>" +
            "आपली नोंदणी यशस्वीरित्या पाठवली गेली!" +
            "</p>" +
            "<p style='margin: 0.25rem 0 0; font-size: 0.875rem;'>" +
            "आम्ही लवकरात लवकर पांढणाऱ्यांशी संपर्क करू." +
            "</p>";

        form.insertBefore(successDiv, form.firstChild);

        // Scroll to top of form to see the message
        window.scrollTo({ top: form.offsetTop - 50, behavior: "smooth" });

        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 5000);
    }

    function showSubmittingMessage(button) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span> पाठवित आहे...';
        button.style.opacity = "0.7";
    }

    function restoreButton(button, originalText) {
        button.disabled = false;
        button.innerHTML = originalText;
        button.style.opacity = "1";
    }

    // =====================================================
    // Form Submission Handler
    // =====================================================
    function handleFormSubmit(event) {
        event.preventDefault();

        clearAllErrors(registrationForm);

        const formData = new FormData(registrationForm);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        const errors = validateForm(data);

        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }

        // Show submitting state
        const submitButton = registrationForm.querySelector("button[type='submit']");
        const originalText = submitButton.innerHTML;
        showSubmittingMessage(submitButton);

        // Submit to Formspree
        fetch(registrationForm.action, {
            method: "POST",
            body: new FormData(registrationForm),
            headers: {
                Accept: "application/json",
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    let message = `Submission failed (HTTP ${response.status}). Please try again.`;
                    try {
                        const result = await response.json();
                        if (result.errors && result.errors.length > 0) {
                            message = result.errors.map((error) => error.message).join(" ");
                        }
                    } catch (_) {
                        // Use the HTTP status fallback when no JSON response is available.
                    }
                    throw new Error(message);
                }

                registrationForm.reset();
                displaySuccessMessage(registrationForm);
            })
            .catch((error) => {
                const errorDiv = document.createElement("div");
                errorDiv.className = "error-message";
                errorDiv.style.backgroundColor = "#ffcdd2";
                errorDiv.style.color = "#c62828";
                errorDiv.style.padding = "0.75rem";
                errorDiv.style.borderRadius = "4px";
                errorDiv.style.marginBottom = "1rem";
                errorDiv.style.border = "1px solid #ef9a9a";
                errorDiv.textContent = error instanceof TypeError
                    ? "Could not reach Formspree. Check your internet connection and try again."
                    : error.message;
                registrationForm.insertBefore(errorDiv, registrationForm.firstChild);
            })
            .finally(() => {
                restoreButton(submitButton, originalText);
            });
    }

    // =====================================================
    // Input Event Listeners for Real-time Validation
    // =====================================================
    function setupInputValidation() {
        if (!registrationForm) return;

        const mobileInputs = registrationForm.querySelectorAll('input[type="tel"]');
        mobileInputs.forEach((input) => {
            input.addEventListener("blur", function () {
                if (this.value && !validateMobile(this.value)) {
                    showError(this, "वैध मोबाईल नंबर द्या (उदा.: ९८७६५४३२१०)");
                } else {
                    clearError(this);
                }
            });
        });

        const emailInputs = registrationForm.querySelectorAll('input[type="email"]');
        emailInputs.forEach((input) => {
            input.addEventListener("blur", function () {
                if (this.value && !validateEmail(this.value)) {
                    showError(this, "वैध ईमेल पत्ता द्या (उदा.: name@example.com)");
                } else {
                    clearError(this);
                }
            });
        });

        const aadhaarInput = document.getElementById("aadhaar");
        if (aadhaarInput) {
            aadhaarInput.addEventListener("blur", function () {
                const digits = this.value.replace(/\D/g, "");
                if (digits && digits.length !== 12) {
                    showError(this, "आधार क्रमांक १२ अंकी असावा");
                } else {
                    clearError(this);
                }
            });
        }
    }

    // =====================================================
    // Smooth Scrolling for Anchor Links
    // =====================================================
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    }

    // =====================================================
    // Initialize
    // =====================================================
    document.addEventListener("DOMContentLoaded", function () {
        setActiveNavLink();
        setupInputValidation();
        setupSmoothScroll();

        if (registrationForm) {
            registrationForm.addEventListener("submit", handleFormSubmit);
        }

        // Add spinner CSS if form exists
        if (registrationForm) {
            const style = document.createElement("style");
            style.textContent = `
                .spinner {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.5);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.6s linear infinite;
                    margin-right: 6px;
                    vertical-align: middle;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    });
})();
