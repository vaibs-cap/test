import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FILTER_BY_OPTIONS } from '../../organisms/Filter/constants';
import {
  CapButton,
  CapHeading,
  CapInput,
  CapRow,
  CapSelect,
} from '@capillarytech/cap-ui-library';
import withStyles from '../../../utils/withStyles';
import styles from './styles';
import * as actions from '../../pages/ExpenseTrackerHome/actions';
// import { FILTER_BY_OPTIONS } from './constants';
import messages from './messages';
import { bindActionCreators } from 'redux';
import { searchByName } from '../../pages/ExpenseTrackerHome/actions';
import { setSortBy } from '../../pages/ExpenseTrackerHome/actions';

// export function getPlaceHolderValue(selectedFilterBy) {
//   switch (selectedFilterBy) {
//     case 'BY_ID':
//       return 'Search by ID...';
//     case 'BY_NAME':
//       return 'Search by name...';
//     case 'BY_CATEGORY':
//       return 'Search by category...';
//     default:
//       return 'Search by name...';
//   }
// }
const Filter = ({
  className,
  selectedFilterBy,
  filterValue,
  handleFilterByChange,
  handleFilterValueChange,
  searchByName,
  sortBy
}) => (
  <>
  <CapRow className={className}>
    <CapRow className="top-section" type="flex">
      <CapHeading type="h1" className="heading-text">
        <FormattedMessage {...messages.headingText} />
      </CapHeading>
    </CapRow>
    <CapRow className="search-section" type="flex">
      <CapInput
        className="search-field1"
        value={filterValue}
        disabled={selectedFilterBy === 'NO_FILTER'}
        onChange={event => {handleFilterValueChange(event.target.value);
        searchByName(event.target.value);}
        }
        placeholder="Search by Expense Title..."
      />
      <CapSelect
        className="search-field2"
        value={sortBy ? sortBy : "By description"}
        //onChange={(e) => setSortBy(e.target.value)}
        options={[...FILTER_BY_OPTIONS]}
      />
    </CapRow>
    </CapRow>
  </>
);

Filter.propTypes = {
  className: PropTypes.string,
  selectedFilterBy: PropTypes.func,
  filterValue: PropTypes.string,
  handleFilterByChange: PropTypes.func,
  handleFilterValueChange: PropTypes.func,
  sortBy: PropTypes.func,
  //actions: PropTypes.object.isRequired,
};
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch),

// });
const mapStateToProps = state => ({
  sortBy: state.get("sortBy"),
});
const mapDispatchToProps = dispatch => ({
  searchByName : (val) => dispatch(searchByName(val)),
  setSortBy : (sortBy) => dispatch(setSortBy(sortBy)),
})
//console.log("sortBy: ",sortBy);

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(Filter, styles));
