import React from 'react';
import './Button.css';

/**
 * Reusable Button Component for ATM Smart
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label or nested elements
 * @param {Function} [props.onClick] - Click event handler
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} [props.variant='primary'] - Visual style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Button size
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - HTML button type
 * @param {boolean} [props.fullWidth=false] - Whether button spans full width
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className=''] - Additional CSS classes
 */
const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    type = 'button',
    fullWidth = false,
    disabled = false,
    className = '',
    ...rest
}) => {
    const baseClass = 'atm-btn';
    const variantClass = `atm-btn--${variant}`;
    const sizeClass = `atm-btn--${size}`;
    const widthClass = fullWidth ? 'atm-btn--full' : '';

    const combinedClasses = [baseClass, variantClass, sizeClass, widthClass, className]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            onClick={onClick}
            className={combinedClasses}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
