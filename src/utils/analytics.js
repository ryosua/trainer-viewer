const mixpanel = require('mixpanel-browser')
mixpanel.init(process.env.REACT_APP_MIXPANEL)

const analytics = {
    track: (eventName, properties) => mixpanel.track(eventName, properties),
    identify: (userId) => mixpanel.identify(userId),
    setUserProps: (props) => mixpanel.people.set(props)
}

export default analytics
