import React from 'react'
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, toggleFollowingInProgress, requestUsers } from './../../Redux/users-reducer'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { getPageSize, getTotalUsersCount, getUsers, getPage, getIsFetching, getFollowingInProgress, } from '../../Redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        let {page, pageSize} = this.props
        this.props.requestUsers(page, pageSize);
    }

    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                page={this.props.page}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        page: getPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, { follow, unfollow, setCurrentPage, toggleFollowingInProgress, requestUsers }),
    //withAuthRedirect,
)(UsersContainer)