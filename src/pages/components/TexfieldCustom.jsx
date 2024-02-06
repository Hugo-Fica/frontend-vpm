import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

export const TextFieldCustom = ({
  size,
  disable,
  title,
  type,
  symbol,
  min,
  max,
  name,
  value,
  onInputChange,
}) => {
  return (
    <div>
      <FormControl sx={{ width: `${size}px` }} variant='outlined'>
        <InputLabel>{title}</InputLabel>
        <OutlinedInput
          type={`${type}`}
          endAdornment={
            <InputAdornment position='end'>{symbol}</InputAdornment>
          }
          name={`${name}`}
          label={title}
          value={value}
          disabled={disable}
          onChange={onInputChange}
          inputProps={{
            min: `${min}`,
            max: `${max}`,
          }}
        />
      </FormControl>
    </div>
  );
};
