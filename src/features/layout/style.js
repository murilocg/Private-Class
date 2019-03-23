const styles = theme => ({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    user:{
      display:"flex"
    },
    avatar:{
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      backgroundColor: "#2c1596",
      padding: "0px 10px",
      borderRadius: "15px"
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'white'
    },
    icon:{
      color: "#040016"
    },
    title: {
      display: 'none',
      marginLeft: "20px",
      color: "#040016",
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    }
  });

  export default styles;