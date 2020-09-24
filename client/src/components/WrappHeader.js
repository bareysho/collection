import React from 'react';
import { connect } from 'react-redux';
import Header from './header';

function HeaderContainer(props) {
    //console.log("HeaderContainer ", props.user);
    return(
        <Header user={props.user} />
    )
}

const mapStateToProps = function (state) {
    //console.log("mapStateToProps state  ", state);

    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(HeaderContainer);