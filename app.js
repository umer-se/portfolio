document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get('id');
    const container = document.getElementById('app-content-container');

    // Safety check for invalid routes
    if (!appId || !window.portfolioApps) {
        renderError(container);
        return;
    }

    // Find the specific app from our dynamic data array
    const app = window.portfolioApps.find(a => a.name === appId);

    if (!app) {
        renderError(container);
        return;
    }

    // Update Meta Title
    document.title = `${app.name} - Umer Shoukat`;

    // Render Premium App Hero
    const iconHtml = app.iconFile
        ? `<img src="${app.iconFile}" alt="${app.name} icon" class="hero-app-icon" />`
        : `<div class="hero-app-icon-placeholder"><i class='bx bx-mobile-alt'></i></div>`;

    const screenshotsHtml = app.screenshots && app.screenshots.length > 0
        ? app.screenshots.map(s => `<img src="${s}" alt="Screenshot" class="hero-app-screenshot" loading="lazy" />`).join('')
        : `<p style="color:var(--text-secondary)">No screenshots available for this application.</p>`;

    container.innerHTML = `
        <header class="app-detail-header">
            <div class="app-detail-icon-box">
                ${iconHtml}
            </div>
            <div class="app-detail-info">
                <h1 class="highlight app-detail-title">${app.name}</h1>
                <span class="app-platform-modal ${app.platform.toLowerCase()}" style="display:inline-block; margin-bottom: 1.5rem;">${app.platform}</span>
                <div class="app-detail-actions">
                    <a href="${app.link}" target="_blank" class="btn btn-primary btn-get">
                        GET
                    </a>
                    <span class="app-detail-note">In-App Purchases</span>
                </div>
                <p class="app-detail-desc">${app.description.replace(/\n/g, '<br>')}</p>
            </div>
        </header>

        <section class="app-gallery-section" style="margin-top: 4rem;">
            <div class="gallery-scroll-container">
                ${screenshotsHtml}
            </div>
        </section>
    `;

    // Trigger reveal physics
    setTimeout(() => {
        container.classList.add('visible');
    }, 100);

    function renderError(el) {
        el.innerHTML = `
            <div style="text-align: center; margin: 15vh 0;">
                <h1 class="highlight" style="font-size: 3rem;">App Not Found</h1>
                <p style="color: var(--text-secondary); margin: 2rem 0;">The application you are looking for could not be found or the link is invalid.</p>
                <a href="index.html" class="btn btn-secondary">Return Home</a>
            </div>
        `;
        el.classList.add('visible');
    }
});
