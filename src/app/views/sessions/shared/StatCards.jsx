import React, { Component } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Tooltip,
} from "@material-ui/core";

const StatCards = ({theme}) => {
  return (
    <Grid container spacing={3} className="mb-24">

      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <div className="ml-12">
              <h5 className="text-muted inlineblock">Stock&nbsp;&nbsp;<small className="text-muted">NASDAQ</small></h5>
              <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <div className="ml-12">
              <h5 className="text-muted inlineblock">Stock&nbsp;&nbsp;<small className="text-muted">NASDAQ</small></h5>
              <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <div className="ml-12">
              <h5 className="text-muted inlineblock">Stock&nbsp;&nbsp;<small className="text-muted">KOSPI</small></h5>
              <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex flex-middle">
            <div className="ml-12">
              <h5 className="text-muted inlineblock">Stock&nbsp;&nbsp;<small className="text-muted">KOSPI</small></h5>
              <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      
    </Grid>
  );
};

export default StatCards;
