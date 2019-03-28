const drawerWidth = 320;

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
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#0b0219"
  },
  list: {
    marginTop: "60px"
  },
  item: {
    borderBottom: "1px solid black", 
    padding: '20px'
  },
  itemSelected: {
    backgroundColor: "black"
  },
  itemText: {
    fontSize: "18px", 
    color: 'white'
  }
});

const styleslesson = theme => ({
  main: {
    marginLeft: drawerWidth,

  },
  lesson: {
    width: 'calc(100% - 200px)',
    margin: "0 auto",
    marginTop: "40px",
    border: "1px solid #DFDFDF",
    backgroundColor: "white"
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
    padding: '10px 20px',
    color: "#0b0219",
    backgroundColor: "#F8F8F8"
  },
  video: {
    width: "calc(100% - 20px)",
    height: "480px",
    border: "none"
  }
});

export default {
  stylesclassroom,
  styleslessonlist,
  styleslesson
};