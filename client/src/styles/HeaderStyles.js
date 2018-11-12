const HeaderStyles = theme =>({
  root: {
    backgroundColor: theme.palette.primary.dark,
    height: '100px',
    padding: '20px',
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
  }
})

export default HeaderStyles