const Notification = ({ alertMessage, errorMessage }) => {
  const baseStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (errorMessage) {
    return (
      <div className="error" style={{ ...baseStyle, color: 'red' }}>
        {errorMessage}
      </div>
    )
  }
  if (alertMessage) {
    return (
      <div className="alert" style={{ ...baseStyle, color: 'green' }}>
        {alertMessage}
      </div>
    )
  }


  return null
}

export default Notification