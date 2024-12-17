const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-theme')) {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carrossel = document.querySelector('.carrossel');

let scrollPosition = 0;

nextButton.addEventListener('click', () => {
    const carrosselWidth = carrossel.scrollWidth / carrossel.children.length;
    scrollPosition += carrosselWidth;
    if (scrollPosition >= carrossel.scrollWidth) {
        scrollPosition = 0;
    }
    carrossel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
});

prevButton.addEventListener('click', () => {
    const carrosselWidth = carrossel.scrollWidth / carrossel.children.length;
    scrollPosition -= carrosselWidth;
    if (scrollPosition < 0) {
        scrollPosition = carrossel.scrollWidth - carrosselWidth;
    }
    carrossel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.form-group');
    const telefoneInput = document.getElementById('telefone');
    let formVisible = false;

    // Função para verificar se o formulário está visível na viewport
    function isFormInView() {
        const formPosition = form.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        return formPosition - screenHeight <= 0;
    }

    // Função para animar os inputs quando o formulário estiver visível
    function animateFormFields() {
        if (!formVisible && isFormInView()) {
            formVisible = true;
            inputs.forEach((input, index) => {
                setTimeout(() => {
                    input.style.opacity = 1;
                    input.style.transform = 'translateY(0)';
                    input.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }, index * 200); // Cada caixa aparece com um intervalo de 200ms
            });
        }
    }

    // Evento de rolagem para verificar a visibilidade do formulário
    window.addEventListener('scroll', animateFormFields);

    // Formatação automática do campo de telefone
    telefoneInput.addEventListener('input', (e) => {
        let input = e.target.value;
        input = input.replace(/\D/g, ''); // Remove qualquer caractere não numérico

        if (input.length <= 10) {
            input = input.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            input = input.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }

        e.target.value = input;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !telefone || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        alert('Mensagem enviada com sucesso!');
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
