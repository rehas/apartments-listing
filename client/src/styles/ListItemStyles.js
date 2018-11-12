const ListItemStyles = theme=>  ({
  cardActive: {
    minWidth: '100%',
    backgroundColor : theme.palette.primary.light,
    marginBottom: '10px',
    height: '110px',
  },
  cardPassive: {
    minWidth: '100%',
    backgroundColor : theme.palette.secondary.light,
    marginBottom: '10px',
    height: '90px',
  },
  title: {
    fontSize: 18,
    color: theme.palette.primary.dark,
    margin: '1px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
  },
  content: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  editIcon: {
    height: 28,
    width: 28,
  },
  vertical:{
    writingMode: 'vertical-rl',
    textOrientation: 'upright'
  }
});

  export default ListItemStyles