import React from 'react'
import NavigationDropdown from './NavigationDropdown.jsx'
import { NavigationLink, NavigationButton, NavigationPlaceholder } from './NavigationDropdown.jsx'

export default class NavigationBar extends React.Component {
    componentDidMount() {
        $('.nav-secondary .ui.dropdown').dropdown({ on: 'hover' })
    }

    buildNavElement(def) {
        switch (def.type) {
            case "link":
                return <NavigationLink key={def.label} right={def.right} href={def.href} label={def.label} />
            case 'button':
                return <NavigationButton key={def.label} label={def.label} right={def.right} href={def.href} onClick={def.onClick} />
            case 'menu':
                return <NavigationDropdown key={def.label} right={def.right} items={def.items} label={def.label} />
            case 'placeholder':
                return <NavigationPlaceholder key={def.label} right={def.right} />
            default:
                return <NavigationPlaceholder key={def.label} right={def.right} />
        }
    }

    render() {
        const leftTags = this.props.data.map(x => this.buildNavElement(x))
        //const rightTags = this.props.rightData == null ? [] : this.props.rightData.map(x => this.buildNavElement(x) )
        return (
            <section className="nav-secondary">
                <div className="ui eight item menu">
                    {leftTags}
                </div>
            </section>
        )
    }
}