const colors = require('tailwindcss/colors');
// const daisyui = require('daisyui');
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem'
            }
        },
        fontFamily: {
            inter: ['InterTight', 'sans-serif'],
            futura: ['Futura', 'sans-serif']
        },
        colors: {
            black: colors.black,
            background: {
                DEFAULT: 'rgb(var(--background))',
                social: 'rgb(var(--social-background))'
            },
            foreground: 'rgb(var(--foreground))',
            section: 'rgb(var(--section))',
            card: colors.white,

            'card-5': 'rgba(255, 255, 255, 0.05)',
            'card-15': 'rgba(255, 255, 255, 0.15)',
            primary: {
                blue: 'rgb(var(--primary-blue))',
                green: 'rgb(var(--primary-green))',
                yellow: 'rgb(var(--primary-yellow))',
                orange: 'rgb(var(--primary-orange))',
                red: 'rgb(var(--red-tag))',
                navhover: 'rgb(var(--nav-hover))',
                'navhover-2': 'rgba(109,109,117, 0.20)'

            },
            secondarygreen:'rgb(var(--secondary-green))',
            skin:'rgb(var(--skin-shad))',
            blue: {
                light: 'rgb(var(--blue-light))',
                dark: 'rgb(var(--blue-dark))'
            }
        },
        fontSize: {
            h1: ['74px', '64px'],
            h2: ['48px', '48px'],
            h3: ['37px', '50px'],
            h4: ['31px', '36px'],
            h5: ['24px', '28px'],
            h6: ['21px', '24px'],
            h_1: ['76px', '72px'],
            h_2: ['60px', '56px'],
            h_3: ['39px', '48px'],
            h_4: ['31px', '36px'],
            h_5: ['27px', '32px'],
            h_6: ['20px', '24px'],
            xxs: ['15px', '18px'],
            xs: ['14px', '20px'],
            sm: ['16px', '20px'],
            md: ['17px', '24px'],
            lg: ['20px', '28px'],
            tag: ['14px', '18px'],
            btn: ['18px', '20px'],
            shopcard: ['17px', '22px'],
            blog: ['17px', '26px']
        },
        fontWeight: {
            light: '400',
            normal: '500',
            semibold: '600',
            bold: '700',
            'extra-bold': '800'
        },
        extend: {
            backgroundImage: {
                'hero-header': 'url(/images/hero.webp)',
                'product-header': 'url(/images/product-headimage.svg)'
            },
            boxShadow: {
                section: '0px 8px 4px 0px rgba(0, 0, 0, 0.25)'
            }
        }
    },
    plugins: []
};
