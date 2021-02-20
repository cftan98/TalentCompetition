import React from 'react'

export function NavigationDropdown(props) {

    const classes = props.right ? 'ui dropdown link right item' : 'ui dropdown link item'
    const tags = props.items.map(x => <NavigationLink key={x.label} href={x.href} label={x.label} />)
    return (
        <div className={classes} >
            {props.label}
            <div className="menu">
                {tags}
            </div>
        </div>
    )


}

export function NavigationLink(props) {
    const classes = props.right ? 'right item' : 'item'
    return (
        <a className={classes} href={props.href}>{props.label}</a>
    )
}

export function NavigationPlaceholder(props) {
    const classes = props.right ? 'right item' : 'item'
    return (
        <div className={classes}>
            <span className="button" > <span style={{ visibility: "hidden" }}>#</span></ span>
        </div>
    )
}

export function NavigationButton(props) {

    const classes = props.right ? 'right item' : 'item'
    return (
        <div className={classes}>
            <a className='ui teal button' href={props.href} onClick={props.onClick}>{props.label}</a>
        </div>
    )
}