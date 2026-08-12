/**
 * Shared Tailwind CSS Configuration
 * Loaded after the Tailwind CDN script on every page to avoid
 * duplicating ~90 lines of config across 5 HTML files.
 */
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "secondary-container": "#ffd398",
                "secondary": "#785929",
                "surface-tint": "#5f5e5e",
                "on-secondary-container": "#795929",
                "surface-container-low": "#f7f3f2",
                "on-tertiary-fixed": "#1c1b1a",
                "on-error-container": "#93000a",
                "on-secondary": "#ffffff",
                "on-tertiary": "#ffffff",
                "on-secondary-fixed": "#291800",
                "tertiary-container": "#1c1b1a",
                "primary": "#000000",
                "surface-container": "#f1edec",
                "on-tertiary-container": "#868382",
                "on-surface-variant": "#444748",
                "on-surface": "#1c1b1b",
                "secondary-fixed-dim": "#eabf86",
                "primary-container": "#1c1b1b",
                "tertiary-fixed-dim": "#cac6c4",
                "outline": "#747878",
                "background": "#fdf8f8",
                "secondary-fixed": "#ffddb2",
                "on-primary": "#ffffff",
                "surface-variant": "#e5e2e1",
                "on-error": "#ffffff",
                "outline-variant": "#c4c7c7",
                "on-primary-container": "#858383",
                "on-primary-fixed-variant": "#474746",
                "on-primary-fixed": "#1c1b1b",
                "on-secondary-fixed-variant": "#5e4113",
                "primary-fixed-dim": "#c8c6c5",
                "on-tertiary-fixed-variant": "#484645",
                "surface-container-highest": "#e5e2e1",
                "surface-container-lowest": "#ffffff",
                "inverse-primary": "#c8c6c5",
                "primary-fixed": "#e5e2e1",
                "error": "#ba1a1a",
                "on-background": "#1c1b1b",
                "tertiary-fixed": "#e6e2df",
                "tertiary": "#000000",
                "surface": "#fdf8f8",
                "surface-dim": "#ddd9d8",
                "surface-bright": "#fdf8f8",
                "inverse-on-surface": "#f4f0ef",
                "error-container": "#ffdad6",
                "surface-container-high": "#ebe7e6",
                "inverse-surface": "#313030"
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            spacing: {
                "unit": "8px",
                "section-gap": "160px",
                "container-max": "1440px",
                "gutter": "32px",
                "margin-mobile": "24px",
                "margin-desktop": "64px"
            },
            fontFamily: {
                "headline-lg-mobile": ["Libre Caslon Text"],
                "stat-number": ["Hanken Grotesk"],
                "display-xl": ["Libre Caslon Text"],
                "body-lg": ["Hanken Grotesk"],
                "headline-lg": ["Libre Caslon Text"],
                "body-md": ["Hanken Grotesk"],
                "label-caps": ["Hanken Grotesk"]
            },
            fontSize: {
                "headline-lg-mobile": ["36px", { "lineHeight": "42px", "fontWeight": "400" }],
                "stat-number": ["40px", { "lineHeight": "1", "letterSpacing": "-0.01em", "fontWeight": "300" }],
                "display-xl": ["84px", { "lineHeight": "92px", "letterSpacing": "-0.02em", "fontWeight": "400" }],
                "body-lg": ["20px", { "lineHeight": "30px", "fontWeight": "400" }],
                "headline-lg": ["48px", { "lineHeight": "56px", "fontWeight": "400" }],
                "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "600" }]
            }
        }
    }
};
