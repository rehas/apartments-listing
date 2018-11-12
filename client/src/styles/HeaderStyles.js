const HeaderStyles = theme =>({
  root: {
    backgroundColor: theme.palette.primary.dark,
    height: '100px',
    padding: '0 10px 20px 10px',
    color: 'white'
  },
  button:{
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  header:{
    color: theme.palette.primary.contrastText
  },
  headerText:{
    color: theme.palette.primary.contrastText,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit* 2,
    fontSize: '0.8em',
    backgroundColor: theme.palette.secondary.dark,
  }
})

export default HeaderStyles