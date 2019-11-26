import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LoginButtonComponent } from './components/login-button/login-button.component'
import { InvestmentsTableComponent } from './components/investments-table/investments-table.component'

const componentsRegistry = {
    'LoginButton': LoginButtonComponent,
    'InvestmentsTable': InvestmentsTableComponent,
};

const nodes = document.querySelectorAll('[data-react-component]');

Array.prototype.slice.call(nodes).forEach((element) => {
    const data = element.dataset;
    const componentName = data.reactComponent;
    const component = componentsRegistry[componentName];

    let props;
    let error;

    try {
        props = (new Function(`return ${data.componentProps};`)).call(null);
    } catch (e) {
        console.error(e);
    }

    if (!component) {
        error = `Component "${componentName}" was not found`;
    } else if (data.reactProps && (!props || props.constructor !== Object)) {
        error = `Props for "${componentName}" should be Object`;
    } else {
        ReactDOM.render(
            React.createElement(component, props),
            element,
        );
    }

    if (error) {
        console.error(error);
    }
});
