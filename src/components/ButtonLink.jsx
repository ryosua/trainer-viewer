import React from 'react'
import T from 'prop-types'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const ButtonLink = ({ onClick, text, to }) => (
    <Button
        variant="outlined"
        component={Link}
        underline="none"
        href={to}
        target="_blank"
        rel="noopener"
        onClick={onClick}>
        {text}
    </Button>
)

ButtonLink.propTypes = {
    onClick: T.func,
    text: T.string.isRequired,
    to: T.string.isRequired
}

export default ButtonLink
