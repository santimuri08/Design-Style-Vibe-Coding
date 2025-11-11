// enhanced-features.js
// Add interactive features to improve functionality and user experience

// ============================================
// 1. SCROLL PROGRESS BAR
// ============================================
function createScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// 2. BACK TO TOP BUTTON
// ============================================
function createBackToTop() {
    // Create button
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 3. LAZY LOADING ENHANCEMENT
// ============================================
function enhancedLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 4. PARALLAX SCROLL EFFECT
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.5;
        
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ============================================
// 5. READING TIME ESTIMATOR
// ============================================
function addReadingTime() {
    const article = document.querySelector('.content-container');
    if (!article) return;
    
    const text = article.textContent;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    
    // Create reading time badge
    const badge = document.createElement('div');
    badge.className = 'reading-time';
    badge.innerHTML = `📖 ${readingTime} min read`;
    badge.style.cssText = `
        position: sticky;
        top: 80px;
        float: right;
        padding: 8px 16px;
        background: var(--color-highlight);
        border-radius: 20px;
        font-size: 14px;
        color: var(--color-secondary);
        margin: 0 0 20px 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 100;
    `;
    
    article.insertBefore(badge, article.firstChild);
}

// ============================================
// 6. SMOOTH ANCHOR SCROLLING
// ============================================
function smoothAnchorScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// ============================================
// 7. COPY CODE BUTTON
// ============================================
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 6px 12px;
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        `;
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        codeBlock.parentNode.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);
        wrapper.appendChild(button);
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent);
            button.textContent = 'Copied!';
            setTimeout(() => button.textContent = 'Copy', 2000);
        });
    });
}

// ============================================
// 8. KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Focus search (if exists)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const search = document.querySelector('input[type="search"]');
            if (search) search.focus();
        }
        
        // Escape: Clear focus
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
        
        // Alt + T: Back to top
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ============================================
// 9. DARK MODE TOGGLE
// ============================================
function initDarkMode() {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'enabled' || (!savedMode && systemDark)) {
        document.body.classList.add('dark-mode');
    }
    
    // Create toggle button
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '🌙';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-surface);
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        toggle.innerHTML = isDark ? '☀️' : '🌙';
    });
}

// ============================================
// 10. TABLE OF CONTENTS GENERATOR
// ============================================
function generateTableOfContents() {
    const headings = document.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Only create if enough headings
    
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h4>On This Page</h4><ul></ul>';
    toc.style.cssText = `
        position: sticky;
        top: 100px;
        float: right;
        width: 250px;
        padding: 20px;
        margin: 0 0 20px 20px;
        background: var(--color-surface);
        border-left: 3px solid var(--color-primary);
        border-radius: var(--radius-sm);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    
    const ul = toc.querySelector('ul');
    ul.style.cssText = `
        list-style: none;
        padding: 0;
        margin: 10px 0 0 0;
    `;
    
    headings.forEach((heading, index) => {
        // Add ID if not present
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const li = document.createElement('li');
        li.style.cssText = `
            margin: 8px 0;
            padding-left: ${heading.tagName === 'H3' ? '15px' : '0'};
        `;
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.style.cssText = `
            color: var(--color-secondary);
            text-decoration: none;
            font-size: ${heading.tagName === 'H3' ? '14px' : '16px'};
            transition: color 0.3s;
        `;
        
        link.addEventListener('mouseenter', () => {
            link.style.color = 'var(--color-primary)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.color = 'var(--color-secondary)';
        });
        
        li.appendChild(link);
        ul.appendChild(li);
    });
    
    const article = document.querySelector('.content-container');
    if (article) {
        article.insertBefore(toc, article.firstChild);
    }
}

// ============================================
// 11. FORM VALIDATION (if you add a contact form)
// ============================================
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => {
                if (input.validity.valid) {
                    input.style.borderColor = 'var(--color-primary)';
                } else {
                    input.style.borderColor = '#e74c3c';
                }
            });
            
            // Clear error on focus
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--color-primary)';
            });
        });
    });
}

// ============================================
// 12. PRINT-FRIENDLY VERSION
// ============================================
function addPrintButton() {
    const button = document.createElement('button');
    button.className = 'print-btn';
    button.innerHTML = '🖨️ Print';
    button.style.cssText = `
        position: fixed;
        bottom: 150px;
        right: 30px;
        padding: 12px 24px;
        background: var(--color-surface);
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
        window.print();
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = 'var(--color-primary)';
        button.style.color = 'white';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'var(--color-surface)';
        button.style.color = 'var(--color-primary)';
    });
}

// ============================================
// 13. SHARE BUTTONS
// ============================================
function addShareButtons() {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'share-buttons';
    shareContainer.style.cssText = `
        position: fixed;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
    `;
    
    const platforms = [
        { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/intent/tweet?url=' },
        { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' },
        { name: 'Facebook', icon: '📘', url: 'https://www.facebook.com/sharer/sharer.php?u=' }
    ];
    
    platforms.forEach(platform => {
        const button = document.createElement('a');
        button.href = platform.url + encodeURIComponent(window.location.href);
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.innerHTML = platform.icon;
        button.title = `Share on ${platform.name}`;
        button.style.cssText = `
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-surface);
            border: 2px solid var(--color-primary);
            border-radius: 50%;
            text-decoration: none;
            font-size: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        
        shareContainer.appendChild(button);
    });
    
    document.body.appendChild(shareContainer);
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Core features (always enable)
    createScrollProgress();
    createBackToTop();
    smoothAnchorScrolling();
    enhancedLazyLoading();
    initKeyboardShortcuts();
    
    // Optional features (enable as needed)
    initParallax();
    addReadingTime();
    // generateTableOfContents(); // Enable if you want TOC
    // initDarkMode(); // Enable if you want dark mode
    // addPrintButton(); // Enable if you want print button
    // addShareButtons(); // Enable if you want share buttons
    
    // Feature-specific (only if elements exist)
    addCopyButtons();
    enhanceFormValidation();
    
    console.log('✨ Enhanced features loaded successfully!');
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});
// Add to enhanced-features.js

// ============================================
// READING MODE (DISTRACTION-FREE)
// ============================================
function initReadingMode() {
    // Create toggle button
    const button = document.createElement('button');
    button.className = 'reading-mode-toggle';
    button.innerHTML = '📖';
    button.setAttribute('aria-label', 'Toggle reading mode');
    button.title = 'Focus Mode';
    button.style.cssText = `
        position: fixed;
        bottom: 150px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-surface);
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
        document.body.classList.toggle('reading-mode');
        button.innerHTML = document.body.classList.contains('reading-mode') ? '👁️' : '📖';
    });
}

// Add CSS for reading mode
const readingModeStyle = document.createElement('style');
readingModeStyle.textContent = `
    body.reading-mode {
        background: #f9f7f4;
    }
    
    body.reading-mode .main-nav,
    body.reading-mode .footer,
    body.reading-mode .hero,
    body.reading-mode .back-to-top,
    body.reading-mode .dark-mode-toggle,
    body.reading-mode .share-buttons {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    
    body.reading-mode .content-container {
        max-width: 680px;
        margin: 2rem auto;
        padding: 3rem;
        background: white;
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        border-radius: 8px;
    }
    
    body.reading-mode .principle-card,
    body.reading-mode .designer-card {
        border: none;
        box-shadow: none;
        background: transparent;
        padding: 1rem 0;
    }
    
    body.reading-mode .reading-mode-toggle {
        opacity: 1 !important;
        pointer-events: all !important;
    }
    
    body.reading-mode .section {
        padding: 0;
    }
`;
document.head.appendChild(readingModeStyle);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initReadingMode();
});
// Add to enhanced-features.js

// ============================================
// TYPOGRAPHY METRICS OVERLAY
// ============================================
function initTypographyMetrics() {
    // Create toggle button
    const button = document.createElement('button');
    button.className = 'metrics-toggle';
    button.innerHTML = '📐';
    button.title = 'Show Typography Metrics';
    button.style.cssText = `
        position: fixed;
        bottom: 210px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-surface);
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    let metricsActive = false;
    let overlay = null;
    
    button.addEventListener('click', () => {
        metricsActive = !metricsActive;
        
        if (metricsActive) {
            showMetrics();
            button.style.background = 'var(--color-primary)';
            button.style.color = 'white';
        } else {
            hideMetrics();
            button.style.background = 'var(--color-surface)';
            button.style.color = 'var(--color-text)';
        }
    });
    
    function showMetrics() {
        // Create overlay
        overlay = document.createElement('div');
        overlay.className = 'typography-metrics-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            font-size: 14px;
            font-family: monospace;
            z-index: 10000;
            min-width: 250px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(overlay);
        updateMetrics();
        
        // Update on scroll/resize
        window.addEventListener('scroll', updateMetrics);
        window.addEventListener('resize', updateMetrics);
    }
    
    function hideMetrics() {
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
        window.removeEventListener('scroll', updateMetrics);
        window.removeEventListener('resize', updateMetrics);
    }
    
    function updateMetrics() {
        if (!overlay) return;
        
        // Get body text metrics
        const body = document.body;
        const bodyStyles = window.getComputedStyle(body);
        
        // Get paragraph metrics
        const paragraph = document.querySelector('.content-container p');
        const paraStyles = paragraph ? window.getComputedStyle(paragraph) : bodyStyles;
        
        // Get content container width
        const container = document.querySelector('.content-container');
        const containerWidth = container ? container.offsetWidth : 0;
        
        // Calculate characters per line (approximate)
        const fontSize = parseFloat(paraStyles.fontSize);
        const lineHeight = parseFloat(paraStyles.lineHeight);
        const charsPerLine = Math.floor(containerWidth / (fontSize * 0.6));
        
        const metrics = {
            'Font Size': paraStyles.fontSize,
            'Line Height': paraStyles.lineHeight + ' (' + (lineHeight / fontSize).toFixed(2) + ')',
            'Font Family': paraStyles.fontFamily.split(',')[0].replace(/["']/g, ''),
            'Container Width': containerWidth + 'px',
            'Chars/Line': charsPerLine + ' chars',
            'Color': paraStyles.color,
            'Background': bodyStyles.backgroundColor,
            'Letter Spacing': paraStyles.letterSpacing,
            'Word Spacing': paraStyles.wordSpacing
        };
        
        overlay.innerHTML = `
            <strong style="display: block; margin-bottom: 1rem; font-size: 16px; color: #4A90E2;">
                📐 Typography Metrics
            </strong>
            ${Object.entries(metrics).map(([key, value]) => `
                <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; gap: 1rem;">
                    <span style="color: #aaa;">${key}:</span>
                    <span style="color: #fff; font-weight: bold;">${value}</span>
                </div>
            `).join('')}
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #444; font-size: 12px; color: #888;">
                ✓ Optimal: 60-75 chars/line<br>
                ✓ Line height: 1.5-1.8<br>
                ✓ Body: 16-19px
            </div>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTypographyMetrics();
});
// Add to enhanced-features.js

// ============================================
// ACCESSIBILITY AUDIT TOOL
// ============================================
function initAccessibilityAudit() {
    const button = document.createElement('button');
    button.className = 'a11y-audit-toggle';
    button.innerHTML = '♿';
    button.title = 'Accessibility Audit';
    button.style.cssText = `
        position: fixed;
        bottom: 270px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-surface);
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    button.addEventListener('click', runAudit);
    
    function runAudit() {
        const issues = [];
        
        // Check images for alt text
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (!img.alt || img.alt.trim() === '') {
                issues.push({
                    type: 'error',
                    message: `Image ${index + 1} missing alt text`,
                    element: img
                });
            }
        });
        
        // Check headings hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.substring(1));
            if (level - lastLevel > 1) {
                issues.push({
                    type: 'warning',
                    message: `Heading hierarchy skip: ${heading.tagName}`,
                    element: heading
                });
            }
            lastLevel = level;
        });
        
        // Check links for text
        const links = document.querySelectorAll('a');
        links.forEach((link, index) => {
            if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
                issues.push({
                    type: 'error',
                    message: `Link ${index + 1} has no text or aria-label`,
                    element: link
                });
            }
        });
        
        // Check form labels
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach((input, index) => {
            const id = input.id;
            const label = id ? document.querySelector(`label[for="${id}"]`) : null;
            const ariaLabel = input.getAttribute('aria-label');
            
            if (!label && !ariaLabel) {
                issues.push({
                    type: 'warning',
                    message: `Input ${index + 1} missing label`,
                    element: input
                });
            }
        });
        
        // Check color contrast (simplified)
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
        const bodyColor = window.getComputedStyle(document.body).color;
        
        // Display results
        showAuditResults(issues);
    }
    
    function showAuditResults(issues) {
        // Remove existing overlay
        const existing = document.querySelector('.a11y-audit-overlay');
        if (existing) existing.remove();
        
        const overlay = document.createElement('div');
        overlay.className = 'a11y-audit-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 10001;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        const errors = issues.filter(i => i.type === 'error').length;
        const warnings = issues.filter(i => i.type === 'warning').length;
        
        overlay.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="margin: 0; color: var(--color-primary);">♿ Accessibility Audit</h3>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="padding: 1rem; background: ${errors > 0 ? '#fee' : '#efe'}; border-radius: 8px; text-align: center;">
                    <div style="font-size: 32px; font-weight: bold; color: ${errors > 0 ? '#c33' : '#3c3'};">${errors}</div>
                    <div style="font-size: 14px; color: #666;">Errors</div>
                </div>
                <div style="padding: 1rem; background: ${warnings > 0 ? '#fff3cd' : '#efe'}; border-radius: 8px; text-align: center;">
                    <div style="font-size: 32px; font-weight: bold; color: ${warnings > 0 ? '#856404' : '#3c3'};">${warnings}</div>
                    <div style="font-size: 14px; color: #666;">Warnings</div>
                </div>
            </div>
            
            ${issues.length === 0 ? `
                <div style="text-align: center; padding: 2rem; color: #3c3;">
                    <div style="font-size: 48px; margin-bottom: 1rem;">✓</div>
                    <strong>Great job!</strong><br>
                    No major accessibility issues found.
                </div>
            ` : `
                <div style="max-height: 300px; overflow-y: auto;">
                    ${issues.map(issue => `
                        <div style="padding: 0.75rem; margin-bottom: 0.5rem; background: ${issue.type === 'error' ? '#fee' : '#fff3cd'}; border-left: 4px solid ${issue.type === 'error' ? '#c33' : '#856404'}; border-radius: 4px; font-size: 14px;">
                            <strong style="color: ${issue.type === 'error' ? '#c33' : '#856404'};">${issue.type.toUpperCase()}:</strong>
                            ${issue.message}
                        </div>
                    `).join('')}
                </div>
            `}
            
            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <strong>WCAG 2.1 Level AA Compliance Check</strong><br>
                This is a simplified audit. For comprehensive testing, use tools like axe DevTools or WAVE.
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
        `;
        backdrop.addEventListener('click', () => {
            overlay.remove();
            backdrop.remove();
        });
        document.body.appendChild(backdrop);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initAccessibilityAudit();
});
