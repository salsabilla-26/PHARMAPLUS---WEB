document.addEventListener("DOMContentLoaded", function() {
            checkUserAuth();
            setupActiveNavHighlight();
        });

        // Highlighting current navigation section based on user viewport scroll position
        function setupActiveNavHighlight() {
            const sections = document.querySelectorAll("section, .product-section-wrapper");
            const navLinks = document.querySelectorAll("nav ul li a");

            window.addEventListener("scroll", () => {
                let currentId = "";
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 120) {
                        currentId = section.getAttribute("id");
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            });
        }

        function checkUserAuth() {
            const authGroup = document.getElementById("authGroup");
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

            if (loggedInUser) {
                authGroup.innerHTML = `
                    <span style="font-size: 15px; font-weight: 600; color: #1e293b; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Halo, ${loggedInUser.name}!</span>
                    <a href="dashboard.html" class="btn-login" style="color: var(--primary); font-weight: 600;">Dashboard</a>
                    <a href="#" id="headerLogoutBtn" class="btn-signup" style="background-color: #dc2626;">Logout</a>
                `;

                document.getElementById("headerLogoutBtn").addEventListener("click", function(e) {
                    e.preventDefault();
                    localStorage.removeItem("loggedInUser");
                    window.location.reload();
                });
            }
        }

        function closeAnnouncement() {
            document.getElementById('topBar').style.display = 'none';
        }

        // Carousel Slider logic
        let currentSlideIndex = 0;
        let slides = document.querySelectorAll('.carousel-slide');
        let autoSlideInterval;

        // tampilkan slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));

            if (index >= slides.length) {
                currentSlideIndex = 0;
            } else if (index < 0) {
                currentSlideIndex = slides.length - 1;
            } else {
                currentSlideIndex = index;
            }

            slides[currentSlideIndex].classList.add('active');
        }

        // arrow control
        function changeSlide(direction) {
            showSlide(currentSlideIndex + direction);
            resetAutoSlide(); // penting: reset timer kalau user klik
        }

        // auto slide setiap 5 detik
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                showSlide(currentSlideIndex + 1);
            }, 5000);
        }

        // reset timer kalau user interaksi
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // init saat halaman load
        document.addEventListener("DOMContentLoaded", function () {
            slides = document.querySelectorAll('.carousel-slide');
            showSlide(0);
            startAutoSlide();
        });

        window.addEventListener("scroll", function () {
            const header = document.querySelector("header");
            if (window.scrollY > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });

        // ==============================
// LOGIN MODAL
// ==============================

function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginModal(event) {
    const overlay = document.getElementById('loginModal');
    // Tutup hanya jika klik di luar modal-card
    if (event.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function togglePassword() {
    const input = document.getElementById('modalPassword');
    const icon = document.getElementById('eyeIcon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function handleModalLogin() {
    const email = document.getElementById('modalEmail').value.trim();
    const password = document.getElementById('modalPassword').value.trim();

    if (!email || !password) {
        alert('Harap isi email dan password terlebih dahulu.');
        return;
    }

    // Sesuaikan dengan logika auth Anda yang sudah ada
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        document.getElementById('loginModal').classList.remove('active');
        document.body.style.overflow = '';
        window.location.reload();
    } else {
        alert('Email atau password salah. Silakan coba lagi.');
    }
}

function closeModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('loginModal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==============================
// REGISTER MODAL
// ==============================

function openRegisterModal() {
    document.getElementById('registerModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal(event) {
    const overlay = document.getElementById('registerModal');
    if (event.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeRegisterModalBtn() {
    document.getElementById('registerModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Beralih dari popup register ke popup login
function switchToLogin() {
    closeRegisterModalBtn();
    openLoginModal();
}

// Toggle show/hide password register
function toggleRegPassword() {
    const input = document.getElementById('regPassword');
    const icon = document.getElementById('regEyeIcon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function toggleRegConfirmPassword() {
    const input = document.getElementById('regConfirmPassword');
    const icon = document.getElementById('regEyeIconConfirm');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Password strength checker
document.addEventListener('DOMContentLoaded', function () {
    const regPasswordInput = document.getElementById('regPassword');
    if (regPasswordInput) {
        regPasswordInput.addEventListener('input', function () {
            const val = this.value;
            const fill = document.getElementById('strengthFill');
            const label = document.getElementById('strengthLabel');

            let strength = 0;
            if (val.length >= 8) strength++;
            if (/[A-Z]/.test(val)) strength++;
            if (/[0-9]/.test(val)) strength++;
            if (/[^A-Za-z0-9]/.test(val)) strength++;

            const levels = [
                { width: '0%',   color: '#e2e8f0', text: '',         textColor: '' },
                { width: '25%',  color: '#ef4444', text: 'Lemah',    textColor: '#ef4444' },
                { width: '50%',  color: '#f97316', text: 'Sedang',   textColor: '#f97316' },
                { width: '75%',  color: '#eab308', text: 'Kuat',     textColor: '#eab308' },
                { width: '100%', color: '#22c55e', text: 'Sangat Kuat', textColor: '#22c55e' },
            ];

            const level = levels[strength];
            fill.style.width = level.width;
            fill.style.backgroundColor = level.color;
            label.textContent = level.text;
            label.style.color = level.textColor;
        });
    }
});

// Handle register submit
function handleRegister() {
    const name     = document.getElementById('regName').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const phone    = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm  = document.getElementById('regConfirmPassword').value;
    const agreed   = document.getElementById('agreeTerms').checked;

    if (!name || !email || !phone || !password || !confirm) {
        alert('Harap lengkapi semua kolom terlebih dahulu.');
        return;
    }
    if (password.length < 8) {
        alert('Password minimal 8 karakter.');
        return;
    }
    if (password !== confirm) {
        alert('Konfirmasi password tidak cocok.');
        return;
    }
    if (!agreed) {
        alert('Anda harus menyetujui Syarat & Ketentuan terlebih dahulu.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(u => u.email === email);
    if (exists) {
        alert('Email ini sudah terdaftar. Silakan gunakan email lain.');
        return;
    }

    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));

    closeRegisterModalBtn();
    document.body.style.overflow = '';
    window.location.reload();
}

// Tutup register modal dengan Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const regModal = document.getElementById('registerModal');
        if (regModal && regModal.classList.contains('active')) {
            regModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});