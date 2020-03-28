import dayjs from 'dayjs'

const formatDate = date => dayjs(date).format('MM/DD/YYYY hh:mm a')

export default formatDate
