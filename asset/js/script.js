const header = document.querySelector('[data-header]')
const navToggle = document.querySelector('[data-nav-toggle]')
const themeToggle = document.querySelector('[data-theme-toggle]')
const themeLabel = document.querySelector('[data-theme-label]')
const primaryNav = document.querySelector('[data-primary-nav]')
const yearNode = document.querySelector('[data-year]')
const revealTargets = document.querySelectorAll('[data-reveal]')
const sectionLinks = document.querySelectorAll('.site-nav a[href^="#"]')
const sectionNodes = Array.from(document.querySelectorAll('main section[id]'))

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const themeColorMeta = document.querySelector('meta[name="theme-color"]')
const storedTheme = localStorage.getItem('portfolio-theme')
const defaultTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark'

document.documentElement.dataset.theme = defaultTheme

const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)

    if (themeLabel) {
        themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark'
    }

    if (themeToggle) {
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`)
    }

    if (themeColorMeta) {
        themeColorMeta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#f8fafc')
    }
}

applyTheme(defaultTheme)

if (yearNode) {
    yearNode.textContent = new Date().getFullYear()
}

const syncNavVisibility = () => {
    if (!primaryNav || !navToggle) {
        return
    }

    if (window.innerWidth >= 768) {
        primaryNav.classList.remove('hidden')
        navToggle.setAttribute('aria-expanded', 'false')
    } else if (!primaryNav.classList.contains('hidden')) {
        primaryNav.classList.add('hidden')
        navToggle.setAttribute('aria-expanded', 'false')
    }
}

const toggleNav = () => {
    if (!primaryNav || !navToggle) {
        return
    }

    primaryNav.classList.toggle('hidden')
    navToggle.setAttribute('aria-expanded', String(!primaryNav.classList.contains('hidden')))
}

if (navToggle && primaryNav) {
    syncNavVisibility()
    navToggle.addEventListener('click', toggleNav)

    sectionLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                primaryNav.classList.add('hidden')
                navToggle.setAttribute('aria-expanded', 'false')
            }
        })
    })

    document.addEventListener('click', (event) => {
        if (window.innerWidth >= 768) {
            return
        }

        const target = event.target

        if (target instanceof Node && (primaryNav.contains(target) || navToggle.contains(target))) {
            return
        }

        primaryNav.classList.add('hidden')
        navToggle.setAttribute('aria-expanded', 'false')
    })

    window.addEventListener('resize', syncNavVisibility)
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
        applyTheme(nextTheme)
    })
}

const updateHeaderState = () => {
    if (!header) {
        return
    }

    const isScrolled = window.scrollY > 12
    header.style.backgroundColor = isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.85)'
    header.style.boxShadow = isScrolled ? '0 18px 40px rgba(2, 6, 23, 0.28)' : 'none'
}

updateHeaderState()
window.addEventListener('scroll', updateHeaderState, { passive: true })

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1'
                    entry.target.style.transform = 'translateY(0)'
                    observer.unobserve(entry.target)
                }
            })
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -6% 0px',
        }
    )

    revealTargets.forEach((element) => revealObserver.observe(element))
} else {
    revealTargets.forEach((element) => {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
    })
}

if ('IntersectionObserver' in window) {
    const activeMap = new Map()

    sectionLinks.forEach((link) => {
        const sectionId = link.getAttribute('href')?.slice(1)

        if (sectionId) {
            activeMap.set(sectionId, link)
        }
    })

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return
                }

                const sectionId = entry.target.getAttribute('id')
                sectionLinks.forEach((link) => {
                    link.style.color = ''
                })

                if (sectionId) {
                    const activeLink = activeMap.get(sectionId)
                    if (activeLink) {
                        activeLink.style.color = '#7dd3fc'
                    }
                }
            })
        },
        {
            threshold: 0.4,
            rootMargin: '-18% 0px -55% 0px',
        }
    )

    sectionNodes.forEach((section) => sectionObserver.observe(section))
}