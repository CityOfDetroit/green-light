'use strict';
const moment = require('moment');
export default class Panel {
    constructor(container){
        this.container = container;
    }

    buildPanel(data){
        this.container.innerHTML = this.buildMarkUp(data);
    }

    clearPanel(){
        this.container.innerHTML = '';
    }

    getPopulation(property){
        let population = `
        ${property.Family != 'null' ? `Family `:``}
        ${property.Homeless != 'null' ? `Homeless `:``}
        ${property.Veterans != 'null' ? `Veterans `:``}
        ${property.Elderly != 'null' ? `Elderly`:``}
        `;
        return population;
    }

    buildMarkUp(data){
        let html = `
            <h3>${data.properties.business_name}</h3>
            <p><strong>Address:</strong> ${data.properties.address}</p>
            <p><strong>Member Since:</strong> ${moment(data.properties.live_date).format('MMM DD, YYYY')}</p>
        `;
        
        return html;
    }
}