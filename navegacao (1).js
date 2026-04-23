document.addEventListener("DOMContentLoaded", function () {

    // Não duplica se já existir a barra
    if (document.getElementById('nav-professor')) return;

    // ── Detecta volume pelo nome do ficheiro ──────────────────────────────────
    const url      = window.location.pathname;
    const arquivo  = url.split('/').pop() || '';
    const isV1     = arquivo.startsWith('v1-');
    const isV2     = arquivo.startsWith('v2-');
    const isV3     = arquivo.startsWith('v3-');
    const isHub    = arquivo === 'index.html' || arquivo === '' || arquivo === '/';

    // ── Paleta por volume ─────────────────────────────────────────────────────
    const TEMAS = {
        v1: {
            bg:      'linear-gradient(90deg, #04080f, #0d1020)',
            borda:   'rgba(58, 120, 201, 0.4)',
            acento:  '#3a78c9',
            label:   'Vol. I · Fundamentos'
        },
        v2: {
            bg:      'linear-gradient(90deg, #110806, #1a0d05)',
            borda:   'rgba(192, 57, 43, 0.4)',
            acento:  '#c0392b',
            label:   'Vol. II · A Palavra'
        },
        v3: {
            bg:      'linear-gradient(90deg, #050f07, #0a2a1a)',
            borda:   'rgba(39, 174, 96, 0.4)',
            acento:  '#27ae60',
            label:   'Vol. III · Apocalipse'
        },
        hub: {
            bg:      'linear-gradient(90deg, #050f07, #0a2a1a)',
            borda:   'rgba(201, 168, 76, 0.35)',
            acento:  '#c9a84c',
            label:   'Super Hub · 39 Lições'
        }
    };

    const chave = isV1 ? 'v1' : isV2 ? 'v2' : isV3 ? 'v3' : 'hub';
    const tema  = TEMAS[chave];

    // ── Estrutura da barra ────────────────────────────────────────────────────
    const nav = document.createElement('nav');
    nav.id = 'nav-professor';
    nav.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
        background: ${tema.bg};
        border-bottom: 1px solid ${tema.borda};
        display: flex; align-items: stretch;
        box-shadow: 0 2px 20px rgba(0,0,0,0.65);
        font-family: 'Oswald', sans-serif;
    `;

    // — Marca ESCHATON (clicável → volta ao Hub) ——————————————————————————————
    const marca = document.createElement('a');
    marca.href  = 'index.html';
    marca.title = 'Voltar ao Hub principal';
    marca.style.cssText = `
        font-family: 'Cinzel', serif; font-size: 9pt; color: #c9a84c;
        letter-spacing: 3px; padding: 0 18px;
        display: flex; flex-direction: column;
        align-items: flex-start; justify-content: center;
        border-right: 1px solid ${tema.borda};
        white-space: nowrap; text-decoration: none; cursor: pointer;
        transition: opacity 0.2s;
    `;
    marca.innerHTML = `
        ESCHATON
        <span style="
            font-family: 'Oswald', sans-serif;
            font-size: 6.5pt;
            color: ${tema.acento};
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-top: 2px;
            opacity: 0.85;
        ">← Hub</span>
    `;
    marca.addEventListener('mouseover', () => marca.style.opacity = '0.75');
    marca.addEventListener('mouseout',  () => marca.style.opacity = '1');

    // — Espaço central flexível ———————————————————————————————————————————————
    const espaco = document.createElement('div');
    espaco.style.cssText = 'display: flex; align-items: stretch; flex: 1;';

    // — Badge de volume / professor ———————————————————————————————————————————
    const badge = document.createElement('div');
    badge.style.cssText = `
        font-family: 'Oswald', sans-serif;
        font-size: 7pt; letter-spacing: 2px; text-transform: uppercase;
        color: ${tema.acento};
        padding: 0 16px;
        display: flex; align-items: center; gap: 7px;
        border-left: 1px solid ${tema.borda};
        margin-left: auto; white-space: nowrap;
    `;
    badge.innerHTML = `<span style="font-size:9pt;">✦</span> ${tema.label} · Professor`;

    nav.appendChild(marca);
    nav.appendChild(espaco);
    nav.appendChild(badge);
    document.body.prepend(nav);

    // ── Compensa a altura da barra no body ────────────────────────────────────
    const navH = nav.offsetHeight || 46;
    document.body.style.paddingTop = navH + 'px';

    // ── Responsividade ────────────────────────────────────────────────────────
    function ajustarMobile() {
        const w = window.innerWidth;
        if (w <= 480) {
            marca.style.display = 'none';
            badge.style.display = 'none';
        } else if (w <= 768) {
            marca.style.display = 'none';
            badge.style.display = 'flex';
        } else {
            marca.style.display = 'flex';
            badge.style.display = 'flex';
        }
    }

    ajustarMobile();
    window.addEventListener('resize', ajustarMobile);
});
