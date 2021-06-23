import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";
import * as d3Format from "d3-format";
import { scaleBand } from "@devexpress/dx-chart-core";
import {
  ArgumentScale,
  Stack,
  Animation,
  EventTracker,
  HoverState,
} from "@devexpress/dx-react-chart";
import { withStyles } from "@material-ui/core/styles";

const data = [
    { year: '1950', population: 2.525 },
    { year: '1960', population: 3.018 },
    { year: '1970', population: 3.682 },
    { year: '1980', population: 4.440 },
    { year: '1990', population: 5.310 },
    { year: '2000', population: 6.127 },
    { year: '2010', population: 6.930 },
  ];

const tooltipContentTitleStyle = {
  fontWeight: "bold",
  paddingBottom: 0
};
const tooltipContentBodyStyle = {
  paddingTop: 0
};
const formatTooltip = d3Format.format(",.2r");
const TooltipContent = (props) => {
  const { targetItem, text, ...restProps } = props;
  return (
    <div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentTitleStyle}
          text={targetItem.series}
        />
      </div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentBodyStyle}
          text={formatTooltip(data[targetItem.point][targetItem.series])}
        />
      </div>
    </div>
  );
};
const Root = withStyles({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row"
  }
})(({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
));
const Label = withStyles({
  label: {
    whiteSpace: "nowrap"
  }
})(({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
));

const TitleText = withStyles({
  title: { marginBottom: "30px" }
})(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.title} />
));

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hover: null,
    };
    this.changeHover = (hover) => this.setState({ hover });
  }
  render() {
    const { hover } = this.state;

    return (
      <Paper>
        <Chart data={data}>
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />
          <Title
            text="USA and Chinese annual sales of plug-in electric vehicles"
            textComponent={TitleText}
          />
          <BarSeries name="population" valueField="population" argumentField="year" />
          <Stack />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
          <EventTracker onClick={this.click} />
          <HoverState hover={hover} onHoverChange={this.changeHover} />
          <Tooltip
            contentComponent={TooltipContent}
          />
          <Animation />
        </Chart>
        kkkkkk
      </Paper>
    );
  }
}

export default Demo;
