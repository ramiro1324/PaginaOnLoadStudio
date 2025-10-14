const circles = document.querySelectorAll('.circle');
const sections = document.querySelectorAll('article');
let isScrollingByClick = false;

// Función para activar un círculo y desactivar los demás
function activateCircle(index) {
    circles.forEach((c, i) => {
        if (i !== 0) c.classList.remove('active');
    });
    if (index !== 0 && circles[index]) {
        circles[index].classList.add('active');
    }
}

// Manejo de clicks
circles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        if (index === 0) {
            // Primer círculo: quitar active de todos los demás
            activateCircle(0);
            return;
        }

        // Marcamos que estamos haciendo scroll por click
        isScrollingByClick = true;
        activateCircle(index);

        // Scroll suave a la sección correspondiente
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth' });

            // Desactivamos la bandera después de un tiempo aproximado del scroll
            setTimeout(() => {
                isScrollingByClick = false;
            }, 500); // 500ms suele cubrir la duración del scroll smooth
        }
    });
});

// Manejo de scroll
window.addEventListener('scroll', () => {
    if (isScrollingByClick) return; // ignorar scroll generado por click

    let scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            if (index === 0) {
                activateCircle(0); // desactiva todos
            } else {
                activateCircle(index);
            }
        }
    });
});

// Cerrar nav de header2 al hacer click en un enlace del menú desplegable
const menuBoton = document.getElementById('menuBoton');
document.querySelectorAll('.menuDesplegable a').forEach(a => {
    a.addEventListener('click', () => {
        if (menuBoton) menuBoton.checked = false;
        if (menuLabelIcon) {
            menuLabelIcon.classList.remove('fa-xmark');
            menuLabelIcon.classList.add('fa-bars');
        }
    });
});

// Cambiar icono del label según el estado del checkbox
const menuLabelIcon = document.querySelector('label[for="menuBoton"] i');
if (menuBoton && menuLabelIcon) {
    menuBoton.addEventListener('change', () => {
        if (menuBoton.checked) {
            menuLabelIcon.classList.remove('fa-bars');
            menuLabelIcon.classList.add('fa-xmark');
        } else {
            menuLabelIcon.classList.remove('fa-xmark');
            menuLabelIcon.classList.add('fa-bars');
        }
    });
}