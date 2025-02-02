// @flow

import Paginator from 'app/components/Paginator';
import SurveyList from './SurveyList';
import type { SurveyEntity } from 'app/reducers/surveys';
import { ListNavigation } from '../../utils';

import { Content } from 'app/components/Content';
import { Helmet } from 'react-helmet';

type Props = {
  surveys: Array<SurveyEntity>,
  fetching: boolean,
  push: (string) => void,
  hasMore: boolean,
  fetchAll: (Object) => Promise<*>,
};

const SurveyPage = ({ surveys, fetching, push, hasMore, fetchAll }: Props) => {
  return (
    <Content>
      <Helmet title="Spørreundersøkelser" />
      <ListNavigation title="Spørreundersøkelser" />

      {fetchAll && (
        <Paginator
          infiniteScroll={true}
          hasMore={hasMore}
          fetching={fetching}
          fetchNext={() => {
            fetchAll({
              next: true,
            });
          }}
        >
          <SurveyList surveys={surveys} fetching={fetching} />
        </Paginator>
      )}
      {!fetchAll && <SurveyList surveys={surveys} fetching={fetching} />}
    </Content>
  );
};
export default SurveyPage;
