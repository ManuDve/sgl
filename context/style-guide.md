# Style Guide — SGL
> Usar como referencia en todos los componentes frontend

---

## Identidad
- **Nombre:** SGL
- **Tagline sugerido:** "Asesoría legal a tu alcance"
- **Tono:** Profesional, confiable, accesible

---

## Paleta de colores

### Colores principales
| Token | Hex | Uso |
|---|---|---|
| `sgl-black` | `#0A0A0A` | Fondo principal, textos |
| `sgl-white` | `#F5F5F5` | Fondo secciones claras, textos sobre negro |
| `sgl-gold` | `#C9A84C` | Acentos, CTAs, separadores, hover |
| `sgl-gold-light` | `#E8C97A` | Hover de botones dorados |
| `sgl-gray` | `#1A1A1A` | Fondo de cards, navbar |
| `sgl-gray-mid` | `#6B6B6B` | Textos secundarios |
| `sgl-gray-light` | `#E5E5E5` | Bordes, divisores |

## Configuración (Tailwind v4)
Los colores y fuentes van en `src/styles/global.css`, NO en tailwind.config.mjs

```css
@import "tailwindcss";

@theme {
  --color-sgl-black: #0A0A0A;
  --color-sgl-white: #F5F5F5;
  --color-sgl-gold: #C9A84C;
  --color-sgl-gold-light: #E8C97A;
  --color-sgl-gray: #1A1A1A;
  --color-sgl-gray-mid: #6B6B6B;
  --color-sgl-gray-light: #E5E5E5;
  --font-family-sans: "Inter", sans-serif;
  --font-family-serif: "Playfair Display", serif;
}
```

---

## Tipografía

| Uso | Fuente | Clase Tailwind |
|---|---|---|
| Títulos (H1, H2) | Playfair Display | `font-serif` |
| Cuerpo y UI | Inter | `font-sans` |

### Configurar en tailwind.config.mjs
```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
}
```

### Agregar en BaseLayout.astro (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

---

## Escala tipográfica

| Elemento | Clases Tailwind |
|---|---|
| H1 hero | `font-serif text-4xl md:text-6xl font-bold text-sgl-white` |
| H2 sección | `font-serif text-3xl md:text-4xl font-semibold text-sgl-white` |
| H3 card | `font-serif text-xl font-semibold text-sgl-white` |
| Párrafo | `font-sans text-base text-sgl-gray-mid leading-relaxed` |
| Label / caption | `font-sans text-sm text-sgl-gray-mid` |

---

## Botones

```html
<!-- Primario (dorado) -->
<button class="bg-sgl-gold hover:bg-sgl-gold-light text-sgl-black font-semibold px-6 py-3 rounded transition-colors duration-200">
  Agendar consulta
</button>

<!-- Secundario (outline) -->
<button class="border border-sgl-gold text-sgl-gold hover:bg-sgl-gold hover:text-sgl-black font-semibold px-6 py-3 rounded transition-colors duration-200">
  Ver servicios
</button>
```

---

## Layout y espaciado

| Elemento | Clase |
|---|---|
| Contenedor máximo | `max-w-6xl mx-auto px-4 md:px-8` |
| Sección con padding | `py-16 md:py-24` |
| Gap entre cards | `gap-6 md:gap-8` |
| Separador dorado | `border-t border-sgl-gold/30` |

---

## Cards de servicios

```html
<div class="bg-sgl-gray border border-sgl-gray-light/10 rounded-lg p-6 hover:border-sgl-gold/50 transition-colors duration-200">
  <!-- contenido -->
</div>
```

---

## Navbar

- Fondo: `bg-sgl-black/95 backdrop-blur`
- Logo: `font-serif text-xl text-sgl-white` + acento dorado en una letra o punto
- Links: `text-sgl-gray-mid hover:text-sgl-gold transition-colors`
- CTA navbar: botón primario pequeño

---

## Footer

- Fondo: `bg-sgl-gray`
- Separador superior: `border-t border-sgl-gold/20`
- Textos: `text-sgl-gray-mid`

---

## Reglas generales
- **Mobile-first siempre:** escribe las clases base para móvil, luego `md:` y `lg:`
- **Sin React en páginas estáticas:** usar `.astro` puro
- **React solo para:** formulario de agendamiento, calendario, panel admin
- **Imágenes:** usar `loading="lazy"` y formato webp cuando sea posible
- **Animaciones:** solo `transition` y `duration-200`, nada de librerías externas

---

## Breakpoints de referencia
| Nombre | Tamaño | Uso |
|---|---|---|
| base | < 768px | Móvil (diseñar primero aquí) |
| `md:` | 768px+ | Tablet / desktop pequeño |
| `lg:` | 1024px+ | Desktop |
