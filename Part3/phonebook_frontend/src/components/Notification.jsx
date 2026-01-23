const Notification = ({ alertMessage, errorMessage }) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (alertMessage !== null) {
        return (
            <div style={notificationStyle}>
                {alertMessage}
            </div>
        )
    }
    if (errorMessage !== null) {
        return (
            <div style={errorStyle}>
                {errorMessage}
            </div>
        )
    }
    if (alertMessage && errorMessage === null) {
        return null
    }
}

export default Notification