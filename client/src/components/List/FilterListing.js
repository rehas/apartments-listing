import React, {PureComponent} from 'react'
import { FormControl, NativeSelect, Input } from '@material-ui/core';

const size  = ["0 - 50","51 - 100", "101 - 150", "151+"] 
const price = ["0 - 500","501 - 1000","1000 - 1500","1501+"]
const nor   = ["0-1","2-3","4+"]

class FilterListing extends PureComponent{

  handleChange = (e) =>{
    this.props.onSelect({[e.target.name]:e.target.value})
  }

  render(){
    const renderFilter = (whichFilter) =>{
      switch (whichFilter) {
        case "size":
          return size
        case "price":
          return price
        case "rooms":
          return nor
        default:
          return ["Filter Not Working"];
      }
    }
    const {filterType} = this.props
    return (
      <FormControl margin="normal" required fullWidth>
        <NativeSelect
            defaultValue={null}
            input={<Input name={filterType} id={filterType} />}
            onChange={this.handleChange}
            key={filterType}
          >
          <option value={'none'}> {filterType[0].toUpperCase() + filterType.slice(1)} </option>
          {renderFilter(filterType).map((item, i)=>{
            return (
                <option key={filterType+i} value={i}>{item}</option>
              )}
            )
          }
        </NativeSelect>
      </FormControl>
    )
  }
}

export default FilterListing
