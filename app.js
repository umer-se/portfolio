document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const params = new URLSearchParams(window.location.search);
    const appId = params.get('id');
    const container = document.getElementById('app-content-container');

    const escAttr = s => String(s).replace(/"/g, '&quot;');

    if (!appId || !window.portfolioApps) { renderError(); return; }

    const app = window.portfolioApps.find(a => a.name === appId);
    if (!app) { renderError(); return; }

    document.title = `${app.name} — Umer Shoukat`;

    const iconHtml = app.iconFile
        ? `<div class="detail-icon"><img src="${escAttr(app.iconFile)}" alt="${escAttr(app.name)} icon" /></div>`
        : `<div class="detail-icon-fallback"><i class='bx bx-mobile-alt'></i></div>`;

    const shotsHtml = (app.screenshots && app.screenshots.length)
        ? app.screenshots.map(s => `<img src="${escAttr(s)}" alt="Screenshot of ${escAttr(app.name)}" loading="lazy" />`).join('')
        : `<p class="gallery-empty">No screenshots available for this app.</p>`;

    container.innerHTML = `
        <header class="detail-header">
            ${iconHtml}
            <div class="detail-info">
                <h1 class="detail-title">${escAttr(app.name)}</h1>
                <span class="platform-badge ${app.platform.toLowerCase()}">${escAttr(app.platform)}</span>
                <div class="detail-actions">
                    <a href="${escAttr(app.link)}" target="_blank" rel="noopener" class="btn btn-primary">
                        <i class='bx bxl-apple'></i> View on the App Store
                    </a>
                    <span class="detail-note">Free · In-App Purchases</span>
                </div>
                <p class="detail-desc">${app.description.replace(/\n/g, '<br>')}</p>
            </div>
        </header>
        <section class="detail-gallery">${shotsHtml}</section>
    `;

    requestAnimationFrame(() => container.classList.add('visible'));

    function renderError() {
        container.innerHTML = `
            <div style="text-align:center; padding: 14vh 0;">
                <h1 class="detail-title" style="font-size: clamp(2rem,6vw,3.4rem);">App not found</h1>
                <p style="color: var(--ink-soft); margin: 1.5rem 0 2rem;">
                    The app you're looking for could not be found, or the link is invalid.
                </p>
                <a href="index.html#work" class="btn btn-ghost">Return to portfolio</a>
            </div>`;
        container.classList.add('visible');
    }
});
