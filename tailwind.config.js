const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',

    purge: { 
        content: [
            './public/**/*.html', 
            './src/**/*.vue',
            './src/**/*.js',
        ],
    },
    
    darkMode: false, // or 'media' or 'class'
    
    theme: {
        extend: {
            colors: {
                theme: {
                    dark: colors.blue[800],
                    DEFAULT: colors.blue[500],
                    light: colors.blue[100],
                },
            },
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(-10px)',
                    },
                },
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.2s ease-out',
            },
        },
    },
    
    variants: {
        extend: {},
    },
    
    plugins: [],
}
