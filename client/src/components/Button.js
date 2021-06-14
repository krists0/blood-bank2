import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({
                    children,
                    primary,
                    secondary,
                    bordered,
                    tertiary,
                    warning,
                    ghost,
                    link,
                    borderedGhost,
                    onClick,
                    style,
                    className,
                    loading = false,
                    type = 'button',
                    href = '#',
                    title = '',
                    disabled = false,
                    marginTop,
                    marginBottom,
                    t
                }) => {
    let classes = ['button'];

    if (primary) classes = [...classes, 'button_primary'];

    if (secondary) classes = [...classes, 'button_secondary'];

    if (bordered) classes = [...classes, 'button_bordered'];

    if (borderedGhost) classes = [...classes, 'button_bordered-ghost'];

    if (tertiary) classes = [...classes, 'button_tertiary'];

    if (warning) classes = [...classes, 'button_warning'];

    if (ghost) classes = [...classes, 'button_ghost'];

    if (link) classes = [...classes, 'button_link'];

    if (className) classes = [...classes, className];

    return (
        <>
            {(type === 'button' || type === 'submit') && (
                <button
                    className={classes.join(' ')}
                    type={type}
                    onClick={onClick}
                    disabled={disabled || loading}
                    title={title}
                    style={{
                        ...style,
                        marginTop: marginTop && '15px',
                        marginBottom: marginBottom && '15px'
                    }}
                >
                    {loading ? 'Submitting...' : children}
                </button>
            )}

            {type === 'link' && (
                <Link className={classes.join(' ')} to={href} onClick={onClick} style={style}>
                    {children}
                </Link>
            )}
        </>
    )
};

export default Button;