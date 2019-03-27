const drawerWidth = 240;

const stylesclassroom = theme => ({
  classroom: {
    marginTop: "60px",
    width: "100%",
    height: "calc(100vh - 60px)",
    maxHeight: "calc(100vh - 60px)",
    overflowY: "scroll"
  }
});

const styleslessonlist = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
});

const styleslesson = theme => ({
  main: {
    marginLeft: drawerWidth,
    paddingTop: "60px",

  },
  lesson: {
    width: 'calc(100% - 200px)',
    paddingTop: "40px",
    margin: "0 auto",
  },
  videoContaner: {
    backgroundColor: "white",
    textAlign: 'center',
    width: "100%",
  },
  videoTitle: {
    fontSize: "24px",
    textAlign: "left",
    fontWeight: 'bold',
    padding: '10px 20px'
  },
  video: {
    width: "calc(100% - 20px)",
    height: "400px",
    border: "none"
  }
});

export default {
  stylesclassroom,
  styleslessonlist,
  styleslesson
};