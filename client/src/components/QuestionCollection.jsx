import React from 'react';
import { connect } from 'react-redux';
import Question from './Question.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import CityOptions from '../CityOptions.json';
import { blueGrey700 } from 'material-ui/styles/colors';

const QuestionCollection = (props) => (
  <div>
    {/*<CardTitle title={objectKeyByValue(CityOptions, props.destinationCity)[0] + ' Q&A'} />*/}
    <CardTitle
      title='Have a question?'
      subtitle="Ask locals"/>
    {
      props.questionsInView.map(question =>
        <Question question={question}
                  handleQuestionClick={props.handleQuestionClick}
                  key={question.id}
                  deleteQuestion={props.deleteQuestion}
        />
      )
    }
  </div>
);

const objectKeyByValue = (obj, val) => {
  if ( typeof val === 'undefined' ) {
    return [''];
  }
  return Object.entries(obj).find(i => i[1] === val);
};

const mapStateToProps = (state) => ({
  questions: state.questionBoard.questions,
  questionsInView: state.questionBoard.questionsInView
});

export default connect(mapStateToProps)(QuestionCollection);
