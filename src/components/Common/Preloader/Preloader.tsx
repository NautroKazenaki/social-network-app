import React from 'react'
import preloader from '../../../assets/images/preloader2.svg.gif'

const Preloader: React.FC = () => {
    return (
        <div>
            <img src={preloader} style={{ backgroundColor: 'white' }} />
        </div>
    )
}

export default Preloader

