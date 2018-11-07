import React, {PureComponent} from 'react'

class ListItem extends PureComponent{
  render(){
    console.log(this.props)
    return (
      <div>
        ListItem
        {
          this.props.data
        }
      </div>
    )
  }
}

export default ListItem