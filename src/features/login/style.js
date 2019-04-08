const styles = theme => ({
  containerLogin: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxLogin: {
    background: 'white',
    padding: '30px',
    borderRadius: '5px',
    border: "1px solid #F1F1F1",
  },
  boxLogo: {
    textAlign: 'center',
    paddingBottom: '20px'
  },
  logo: {
    borderRadius: '100px',
    height: '100px',
    border: '1px solid #f1f1f1'
  },
  boxInput: {
    paddingTop: '20px',
    paddingBottom: '100px'
  },
  email: {
    width: "350px",
  },
  password: {
    width: "350px",
    paddingTop: '40px'
  },
  button: {
    background: '#470d63',
    color: 'white',
    fontWeight: 'bold',
    width: '100%'
  },
  errorMsg: {
    color: '#ff6363',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '2px solid #ff7575',
    width: '100%',
    display: 'inline-block',
    borderRadius: '5px',
    padding: '5px'
  }
});

export default styles;