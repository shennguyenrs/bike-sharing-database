import React from 'react';

import { Button, Grid } from '@mui/material';
import { Save } from '@mui/icons-material';

type Props = {
  clickButton: () => void;
};

const NavBar: React.FC<Props> = ({ clickButton }: Props) => {
  return (
    <Grid container>
      <Grid item xs={9}>
        <h2>SAP database viewer - Project bike sharing in Boston</h2>
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={clickButton}
          variant="contained"
          color="primary"
          startIcon={<Save />}
        >
          Save CSV
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavBar;
