require('../sass/translation-window.scss');

import React from 'react';

class Translation extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <h1 id="translation-phrase">Beach</h1>
                    <button className="boxclose">X</button>
                </div>
                <div className="main">
                    <p id="translated-phrase">Пляж</p>
                </div>
            </div>
        );
    }
}

export default Translation;