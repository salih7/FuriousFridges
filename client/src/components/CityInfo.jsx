import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';
import ImageHealing from 'material-ui/svg-icons/image/healing';
import MapsTerrain from 'material-ui/svg-icons/maps/terrain';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import MapsLocalBar from 'material-ui/svg-icons/maps/local-bar';
import MapsDirectionsTransit from 'material-ui/svg-icons/maps/directions-transit';
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import MapsLocalFlorist from 'material-ui/svg-icons/maps/local-florist';
import SocialPublic from 'material-ui/svg-icons/social/public';
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library';
import ActionExplore from 'material-ui/svg-icons/action/explore';
import SocialGroup from 'material-ui/svg-icons/social/group';
import {
  blueGrey500, red500, orange500, amber500, lightGreen500, green500,
} from 'material-ui/styles/colors';


class CityInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      housing: 0,
      col: 0,
      health_care: 0,
      environmental_quality: 0,
      economy: 0,
      leisure: 0,
      commute: 0,
      safety: 0,
      education: 0,
      summary: '',
      travel_connectivity: 0,
      internet_access: 0,
      tolerance: 0,
      outdoors: 0,
    };
    this.calculateColor = this.calculateColor.bind(this);
    this.calculateScoreStatus = this.calculateScoreStatus.bind(this);
  }
  calculateColor (score) {
    if ( score > 8 ) {
      return green500;
    } else if ( score > 6 ) {
      return lightGreen500;
    } else if ( score > 4.5 ) {
      return amber500;
    } else if ( score > 3 ) {
      return orange500;
    } else {
      return red500;
    }
  }
  calculateScoreStatus (score) {
    if ( score > 8 ) {
      return 'Among the best';
    } else if ( score > 6 ) {
      return 'Above Average';
    } else if ( score > 4.5 ) {
      return 'Around Average';
    } else if ( score > 3 ) {
      return 'Below Average';
    } else {
      return 'Among the worst';
    }
  }

  componentWillMount() {
    axios.get('/cityinfo')
      .then(res => {
        var data = JSON.parse(res.data[0].city_stats);
        this.setState({
          housing: data.categories[0].score_out_of_10,
          col: data.categories[1].score_out_of_10,
          health_care: data.categories[8].score_out_of_10,
          environmental_quality: data.categories[10].score_out_of_10,
          economy: data.categories[11].score_out_of_10,
          leisure: data.categories[14].score_out_of_10,
          travel_connectivity: data.categories[4].score_out_of_10,
          internet_access: data.categories[13].score_out_of_10,
          tolerance: data.categories[15].score_out_of_10,
          outdoors: data.categories[16].score_out_of_10,
          commute: data.categories[5].score_out_of_10,
          safety: data.categories[7].score_out_of_10,
          education: data.categories[9].score_out_of_10,
          summary: data.summary.replace(/<\/?[^>]+(>|$)/g, ''),
        });
      });
  }

  render () {
    const styles = {
      cardStyle: {
        margin: '8px',
      },
      divStyle: {
        margin: '8px',
        display: 'flex',
        flexFlow: 'row wrap',
      },
      growStyle: {
        flexGrow: 1,
      },
      emptyStyle: {
        flexGrow: 1000,
      },
      parallax: {
        height: '50vh',
        backgroundImage: 'url(/assets/GoldenGate.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
    };
    const cards = [['Housing Affordability', this.state.housing, <ActionHome/>],
      ['Cost of Living', this.state.col, <EditorAttachMoney/>],
      ['Health Care', this.state.health_care, <ImageHealing/>],
      ['Environment Quality', this.state.environmental_quality, <MapsLocalFlorist/>],
      ['Economy', this.state.economy, <EditorAttachMoney/>],
      ['Leisure and Culture', this.state.leisure, <MapsLocalBar/>],
      ['Commute', this.state.commute, <MapsDirectionsCar/>],
      ['Safety', this.state.safety, <SocialPublic/>],
      ['Education', this.state.education, <MapsLocalLibrary/>],
      ['Tolerance', this.state.tolerance, <SocialGroup/>],
      ['Air and Rail Connectivity', this.state.travel_connectivity, <MapsDirectionsTransit/>],
      ['Outdoors', this.state.outdoors, <MapsTerrain/>],
      ['Internet Access', this.state.internet_access, <ActionExplore/>]];
    const context = this;
    return (
      <div>
        <div
          style={styles.parallax}>
        </div>
        <div
          style={styles.divStyle}>
          {
            cards.map(card =>
            <div
              style={styles.growStyle}>
              <MuiThemeProvider>
                <Card
                  style={styles.cardStyle}>
                  <CardHeader
                    title={card[0]}
                    subtitle={context.calculateScoreStatus(card[1])}
                    avatar={
                    <Avatar
                      icon={card[2]}
                      backgroundColor={context.calculateColor(card[1])}
                    />
                    }
                  />
                  <CardTitle title={card[1].toFixed(2) + '/10'} />
                </Card>
              </MuiThemeProvider>
            </div>)
          }
          <div style={styles.emptyStyle}/>
          <p>{this.state.summary}</p>
        </div>
      </div>
    );
  }
}

export default CityInfo;
