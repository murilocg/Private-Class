const styles = theme => ({
    root: {
      display: 'flex',
      flexDirection: 'row'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: 'none',
    },
    user:{
      display:"flex"
    },
    avatar:{
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      backgroundColor: "white",
      padding: "0px 10px",
      borderRadius: "15px",
      color: "#470d63",
      fontWeight: "bold"
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#470d63',
    },
    icon:{
      color: "white"
    },
    title: {
      display: 'none',
      marginLeft: "20px",
      color: "white",
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    maincomponent:{
      marginTop: '60px',
      width: '100%',
    }
  });

  export default styles;