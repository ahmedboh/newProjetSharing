import { useState } from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';



function SearchFiltre(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)

    }

    return (
        <div>

        <FormControl size="small"  variant="outlined">
            <InputLabel htmlFor="outlined-adornment-Search">Chercher Ref</InputLabel>
            <OutlinedInput
                id="outlined-adornment-Search"
                onChange={onChangeSearch}
                endAdornment={<InputAdornment position="end"><SearchSharpIcon /></InputAdornment>}
                size="small"
                labelWidth={70}
            />
            </FormControl>
        </div>
    )
}

export default SearchFiltre