const ListItemStyles = theme=>  ({
  cardActive: {
    minWidth: '100%',
    backgroundColor : theme.palette.primary.light,
    marginBottom: '10px',
    height: '100px',
  },
  cardPassive: {
    minWidth: '100%',
    backgroundColor : theme.palette.secondary.light,
    marginBottom: '10px',
    height: '100px',
  },
  title: {
    fontSize: 16,
    color: theme.palette.primary.dark,
    margin: '1px',
    textOverflow : '',
    whiteSpace: 'nowrap'
  },
  description: {
    fontSize: 14,
    color: theme.palette.primary.dark,
    margin: '1px',
    textOverflow : '',
    whiteSpace: 'nowrap'
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
    textOrientation: 'upright',
    fontSize : 13,
    verticalAlign: 'top',
  }
});

  export default ListItemStyles