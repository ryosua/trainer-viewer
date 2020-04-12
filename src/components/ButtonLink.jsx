import React from 'react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const ButtonLink = ({ to, text }) => (
    <Button variant="outlined" component={Link} underline="none" href={to} target="_blank" rel="noopener">
        {text}
    </Button>
)

export default ButtonLink
