import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './brand.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBrandDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BrandDetail = (props: IBrandDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { brandEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="brandDetailsHeading">
          <Translate contentKey="jhipsterReactApp.brand.detail.title">Brand</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{brandEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhipsterReactApp.brand.name">Name</Translate>
            </span>
          </dt>
          <dd>{brandEntity.name}</dd>
          <dt>
            <span id="label">
              <Translate contentKey="jhipsterReactApp.brand.label">Label</Translate>
            </span>
          </dt>
          <dd>{brandEntity.label}</dd>
        </dl>
        <Button tag={Link} to="/brand" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/brand/${brandEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ brand }: IRootState) => ({
  brandEntity: brand.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail);
