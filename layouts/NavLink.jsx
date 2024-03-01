import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import style from '/styles/SideBar.module.css';

import {Link} from './index';




function NavLink({children, href, exact, ...props}) {
    const {pathname} = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className = ` ${style.active}`;
    }

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool,
};

NavLink.defaultProps = {
    exact: false,
};

export {NavLink};