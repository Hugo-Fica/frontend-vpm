import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const SelectOption = ({
  value,
  onInputChange,
  title,
  name,
  size,
  s,
  data = [],
}) => {
  return (
    <div>
      <FormControl sx={{ width: `${size}px` }} size={s}>
        <InputLabel>{title}</InputLabel>
        <Select
          value={value}
          onChange={onInputChange}
          name={name}
          label={title}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 250,
              },
            },
          }}
        >
          {Array.isArray(data) ? (
            data.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem>No data</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  )
}
