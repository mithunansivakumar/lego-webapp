// @flow

import { connect } from 'react-redux';
import prepare from 'app/utils/prepare';
import { compose } from 'redux';
import { addSubmission } from '../../actions/SurveySubmissionActions';
import { fetchSurvey } from 'app/actions/SurveyActions';
import SubmissionContainer from './components/SubmissionEditor/SubmissionContainer';
import { selectSurveyById } from 'app/reducers/surveys';
import { LoginPage } from 'app/components/LoginForm';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';
import loadingIndicator from 'app/utils/loadingIndicator';
import { push } from 'react-router-redux';

const loadData = ({ params: { surveyId }, currentUser }, dispatch) =>
  dispatch(fetchSurvey(surveyId));
const mapStateToProps = (state, props) => {
  const surveyId = Number(props.params.surveyId);
  const survey = selectSurveyById(state, { surveyId });
  const currentUser = props.currentUser;
  const notFetching = state.surveySubmissions.fetching;
  const hasAlreadyAnswered =
    survey && survey.answeredBy && survey.answeredBy.includes(currentUser.id);

  return {
    survey,
    surveyId,
    hasAlreadyAnswered,
    currentUser,
    notFetching,
    actionGrant: survey.actionGrant,
    initialValues: {
      answers: []
    }
  };
};

const mapDispatchToProps = { submitFunction: addSubmission, push };

export default compose(
  replaceUnlessLoggedIn(LoginPage),
  prepare(loadData, ['params.surveyId', 'currentUser.id', 'notFetching']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  loadingIndicator(['survey.questions', 'survey.event'])
)(SubmissionContainer);
