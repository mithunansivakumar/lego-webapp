// @flow

import React from 'react';
import { Link } from 'react-router';
import LoadingIndicator from 'app/components/LoadingIndicator/';
import Image from 'app/components/Image';
import styles from './JoblistingDetail.css';
import { FlexRow, FlexColumn } from 'app/components/FlexBox';
import Markdown from 'app/components/Markdown';
import { Jobtype, Year, Workplaces } from './Items';
import Time from 'app/components/Time';

type Props = {
  joblisting: Object,
  deleteJoblisting: () => void,
  actionGrant: Array
};

const JoblistingDetail = (
  { joblisting, deleteJoblisting, actionGrant }: Props
) => {
  let contactTitle = '';
  let applicationUrl = '';
  let buttons = '';
  if (!joblisting) {
    return <LoadingIndicator loading />;
  }
  if (joblisting.responsible) {
    contactTitle = (
      <div>
        <li>
          <h3>Kontaktinfo:</h3>
        </li>
        <li>Navn: {joblisting.responsible.name || 'Ikke oppgitt.'}</li>
        <li>Mail: {joblisting.responsible.mail || 'Ikke oppgitt.'}</li>
        <li>Telefon: {joblisting.responsible.phone || 'Ikke oppgitt.'}</li>
      </div>
    );
  }

  if (joblisting.applicationUrl) {
    applicationUrl = (
      <li>
        Søk her:
        {' '}
        <a
          href={`${joblisting.applicationUrl}`}
          className={styles.applicationUrl}
        >
          {joblisting.applicationUrl}
        </a>
      </li>
    );
  }

  if (actionGrant.includes('update')) {
    buttons = (
      <FlexColumn>
        <FlexRow>
          <Link to={`/joblistings/${joblisting.id}/edit`}>
            <button className={styles.editButton}> Rediger </button>
          </Link>
          <Link onClick={() => deleteJoblisting(joblisting.id)}>
            <button className={styles.editButton}> Slett </button>
          </Link>
        </FlexRow>
      </FlexColumn>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.coverImage}>
        <Image src="http://placehold.it/1000x300" />
      </div>
      <FlexRow className={styles.title}>
        {buttons}
        <FlexColumn><h1>{joblisting.title}</h1></FlexColumn>
      </FlexRow>
      <FlexRow className={styles.textbody}>
        <FlexColumn className={styles.meta}>
          <ul>
            <li>
              <h3>Generell info:</h3>
            </li>
            <li>
              Bedrift:
              {' '}
              <Link
                to={`/companies/${joblisting.company.id}`}
                className={styles.company}
              >
                {joblisting.company.name}
              </Link>
            </li>
            <li>
              Søknadsfrist:
              {' '}
              <strong>
                <Time time={joblisting.deadline} format="ll HH:mm" />
              </strong>
            </li>
            {applicationUrl}
            <br />
            <li>{Jobtype(joblisting.jobType)}</li>
            <Year {...joblisting} />
            <Workplaces places={joblisting.workplaces} />
            {contactTitle}
          </ul>
        </FlexColumn>
        <FlexColumn className={styles.description}>
          <div dangerouslySetInnerHTML={{ __html: joblisting.description }} />
          <div dangerouslySetInnerHTML={{ __html: joblisting.text }} />
        </FlexColumn>
      </FlexRow>
    </div>
  );
};

export default JoblistingDetail;
