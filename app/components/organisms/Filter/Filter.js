import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  CapButton,
  CapHeading,
  CapInput,
  CapRow,
  CapSelect,
} from '@capillarytech/cap-ui-library';
import withStyles from '../../../utils/withStyles';
import style from './styles';
import * as actions from '../../pages/ExpenseTrackerHome/actions';
import { FILTER_BY_OPTIONS } from './constants';
import messages from './messages';
import { bindActionCreators } from 'redux';
import { searchByName } from '../../pages/ExpenseTrackerHome/actions';

export function getPlaceHolderValue(selectedFilterBy) {
  switch (selectedFilterBy) {
    case 'BY_ID':
      return 'Search by ID...';
    case 'BY_NAME':
      return 'Search by name...';
    case 'BY_CATEGORY':
      return 'Search by category...';
    default:
      return 'Search by name...';
  }
}

const Filter = ({
  className,
  selectedFilterBy,
  filterValue,
  handleFilterByChange,
  handleFilterValueChange,
  searchByName,
}) => (
  <>
    <CapRow className="top-section" type="flex">
      <CapHeading type="h1" className="heading-text">
        <FormattedMessage {...messages.headingText} />
      </CapHeading>
    </CapRow>
    <CapRow className="search-section" type="flex">
      <CapInput
        className="search-field"
        value={filterValue}
        disabled={selectedFilterBy === 'NO_FILTER'}
        onChange={event => {handleFilterValueChange(event.target.value);
        searchByName(event.target.value);}
        }
        placeholder={getPlaceHolderValue(selectedFilterBy)}
      />
      <CapSelect
        className="search-field"
        value={selectedFilterBy ? selectedFilterBy : 'By Name'}
        onChange={val => handleFilterByChange(val)}
        options={[...FILTER_BY_OPTIONS]}
      />
    </CapRow>
  </>
);

Filter.propTypes = {
  className: PropTypes.string,
  selectedFilterBy: PropTypes.func,
  filterValue: PropTypes.string,
  handleFilterByChange: PropTypes.func,
  handleFilterValueChange: PropTypes.func,
  //actions: PropTypes.object.isRequired,
};
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch),

// });
const mapDispatchToProps = dispatch => ({
  searchByName : (val) => dispatch(searchByName(val)),
})

export default connect(null, mapDispatchToProps)( withStyles(Filter, style));
