import React from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const Question = (props) => {
  const answerQuestion = () => {
    props.handleQuestionClick(props.question);
  };
  return (
    <MuiThemeProvider>
      <ListItem
        primaryText={<span style={{'font-size': '20px'}}>{props.question.body}<br /></span>}
        secondaryText={`${props.question.author} · ${props.question.location} · 4 minutes ago`}
        leftAvatar={<Avatar src={props.photoUrl} />}
        onTouchTap={answerQuestion}
        rightIconButton={
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText="Delete"
              onTouchTap={() => { props.deleteQuestion(props.question.id); }}
            />
          </IconMenu>
        }
      />
    </MuiThemeProvider>
  );
};

export default Question;
