// @flow
import { Component } from 'react';
import { Helmet } from 'react-helmet';
import GroupForm from 'app/components/GroupForm';
import { Content } from 'app/components/Content';
import NavigationTab, { NavigationLink } from 'app/components/NavigationTab';

export default class InterestGroupEdit extends Component<{
  interestGroup: Object,
  initialValues: Object,
  uploadFile: (string) => Promise<*>,
  handleSubmitCallback: (Object) => Promise<*>,
}> {
  render() {
    const {
      interestGroup,
      initialValues,
      uploadFile,
      handleSubmitCallback,
    } = this.props;

    return (
      <Content>
        <Helmet title={`Redigerer: ${interestGroup.name}`} />
        <NavigationTab title={`Redigerer: ${interestGroup.name}`}>
          <NavigationLink to={`/interestGroups/${interestGroup.id}`}>
            <i className="fa fa-angle-left" /> Tilbake
          </NavigationLink>
        </NavigationTab>
        <GroupForm
          handleSubmitCallback={handleSubmitCallback}
          group={interestGroup}
          uploadFile={uploadFile}
          initialValues={initialValues}
        />
      </Content>
    );
  }
}
