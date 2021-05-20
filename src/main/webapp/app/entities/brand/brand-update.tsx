import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './brand.reducer';
import { IBrand } from 'app/shared/model/brand.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBrandUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BrandUpdate = (props: IBrandUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { brandEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/brand' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...brandEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterReactApp.brand.home.createOrEditLabel" data-cy="BrandCreateUpdateHeading">
            <Translate contentKey="jhipsterReactApp.brand.home.createOrEditLabel">Create or edit a Brand</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : brandEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="brand-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="brand-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="brand-name">
                  <Translate contentKey="jhipsterReactApp.brand.name">Name</Translate>
                </Label>
                <AvField id="brand-name" data-cy="name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="labelLabel" for="brand-label">
                  <Translate contentKey="jhipsterReactApp.brand.label">Label</Translate>
                </Label>
                <AvField id="brand-label" data-cy="label" type="text" name="label" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/brand" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  brandEntity: storeState.brand.entity,
  loading: storeState.brand.loading,
  updating: storeState.brand.updating,
  updateSuccess: storeState.brand.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BrandUpdate);
