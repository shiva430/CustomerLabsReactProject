import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const App = () => {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState([]);
  const [newSchema, setNewSchema] = useState('');
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewSchema = () => {
    if (newSchema) {
      setSelectedSchema((prevSchema) => [
        ...prevSchema,
        { [newSchema]: schemaOptions.find((option) => option.value === newSchema).label },
      ]);
      setAvailableOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== newSchema)
      );
      setNewSchema('');
    }
  };

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchema,
    };
    console.log("SegmentData",data);
    setSegmentName('');
    setSelectedSchema([]);
    setAvailableOptions(schemaOptions);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}style={{ display: 'block', margin: 'auto' }}>
        Save Segment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Segment</DialogTitle>
        <DialogContent>
          <TextField
            label="Segment Name"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Add Schema to Segment</InputLabel>
            <Select
              value={newSchema}
              onChange={(e) => setNewSchema(e.target.value)}
            >
              {availableOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleAddNewSchema}>
            + Add New Schema
          </Button>
          {selectedSchema.map((item, index) => (
            <div key={index}>{Object.values(item)[0]}</div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveSegment} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
