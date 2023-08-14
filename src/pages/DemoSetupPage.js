import _ from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import {useFocusEffect} from '@react-navigation/native';
import ONYXKEYS from '../ONYXKEYS';
import FullScreenLoadingIndicator from '../components/FullscreenLoadingIndicator';
import CONST from '../CONST';
import {createSaastrDemoWorkspaceAndNavigate} from '../libs/actions/DemoActions';

const propTypes = {
    /** Navigation route context info provided by react navigation */
    route: PropTypes.shape({
        /** The exact route name used to get to this screen */
        name: PropTypes.string.isRequired,
    }).isRequired,
};

/*
 * This is a "utility page", that does this:
 *     - Looks at the current route
 *     - Determines if there's a demo command we need to call
 *     - If not, routes back to home
 */
function DemoSetupPage(props) {
    useFocusEffect(() => {
        // Depending on the route that the user hit to get here, run a specific demo flow
        if (props.route.name === CONST.DEMO_PAGES.SAASTR) {
            createSaastrDemoWorkspaceAndNavigate();
        }
    });

    return <FullScreenLoadingIndicator />;
}

DemoSetupPage.propTypes = propTypes;
DemoSetupPage.displayName = 'DemoSetupPage';

export default withOnyx({
    session: {
        key: ONYXKEYS.SESSION,
    },
})(DemoSetupPage);
