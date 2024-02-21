import React,{useState} from 'react';
import {
  CapTable,
  CapRow,
  CapHeading,
  CapButton,
} from '@capillarytech/cap-ui-library';
import bookData from '../../pages/ProfilePage/bookData';
import withStyles from '../../../utils/withStyles';
import styles from './styles';
import { connect } from 'react-redux';
import { cancelUserRequestedBooks } from './actions';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import {profilePageRequestReducer} from './reducer';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserBookRequestsData } from './selectors';
import * as actions from './actions';
import { useEffect } from 'react';
import saga from './saga';
import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';

const ProfilePageRequestTable = ({ bookRequestsData, className, actions }) => {
  const [toggle,setToggle] = useState(0);

  useEffect(() => {
    actions.fetchUserRequestedBooks({userId:"uaGK2b7z84vUQXlH"});
  }, [toggle]);

  const requestBooks= bookRequestsData.getBookRequests; 

  const dataSource = [];
  requestBooks.forEach(book=>{
    dataSource.push({
      _id:book?._id,
      book_id:book?.book_id,
      book_name:book?.book_name,
      book_author:book?.book_author,
      book_genre:book?.book_genre,
      request_date: book?.requests.find((requester)=>requester.userId==="uaGK2b7z84vUQXlH").requestDate,
      waitlist_no: book?.current_count,
    })
  })

  const handleCancel=(userId,bookId)=>{
    setToggle(prev=>(1-prev));
    actions.cancelUserRequestedBooks({userId:userId, bookId:bookId});
  }

  const columns = [
    {
      title: <CapHeading type="h3">Book Title</CapHeading>,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Book Author</CapHeading>,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Book Genre</CapHeading>,
      dataIndex: 'book_genre',
      key: 'book_genre',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Request Date</CapHeading>,
      dataIndex: 'request_date',
      key: 'request_date',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Waitlist</CapHeading>,
      dataIndex: 'waitlist_no',
      key: 'waitlist_no',
      width: '15%',
    },

    {
      render: (text, record) => (
        <CapButton
          type="secondary"
          size="small"
          variant="contained"
          className="request-cancel-btn"
          onClick={()=>handleCancel("uaGK2b7z84vUQXlH",record._id)}
        >
          Cancel
        </CapButton>
      ),
    },
  ];

  return (
    <CapRow className={className}>
      <CapTable dataSource={dataSource} columns={columns} className="m-30" />
    </CapRow>
  );
};

const mapStateToProps = state =>
  createStructuredSelector({
    bookRequestsData: makeSelectUserBookRequestsData(state),
  });

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'userRequest', saga });

const withReducer = injectReducer({
  key: 'userRequest',
  reducer: profilePageRequestReducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withStyles(ProfilePageRequestTable, styles));
