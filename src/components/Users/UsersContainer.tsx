import React from 'react'
import {  useSelector } from 'react-redux';
import {Users} from './Users'
import Preloader from '../Common/Preloader/Preloader';
import {  getIsFetching,  } from '../../Redux/users-selectors';


type UsersPagePropsType = {
    pageTitle: string
}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}

// class UsersContainer extends React.Component<PropsType> {

//     componentDidMount() {
//         let { page, pageSize, filter } = this.props
//         this.props.requestUsers(page, pageSize, filter);
//     }

//     // onPageChanged = (pageNumber: number) => {
//     //     let { pageSize, filter } = this.props
//     //     this.props.requestUsers(pageNumber, pageSize, filter);
//     // }

//     // onFilterChanged = (filter: FilterType) => {
//     //     let { pageSize, } = this.props

//     //     this.props.requestUsers(1, pageSize, filter)
//     // }

//     render() {
//         return <>
//             <h2>{this.props.pageTitle}</h2>
//             {this.props.isFetching ? <Preloader /> : null}
//             <Users
//                 // totalItemsCount={this.props.totalItemsCount}
//                 // pageSize={this.props.pageSize}
//                 // page={this.props.page}
//                 // onPageChanged={this.onPageChanged}
//                 // onFilterChanged={this.onFilterChanged}
//                 // users={this.props.users}
//                 follow={this.props.follow}
//                 unfollow={this.props.unfollow}
//                 // followingInProgress={this.props.followingInProgress}
//             />
//         </>
//     }
// }

// let mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {
//         users: getUsers(state),
//         pageSize: getPageSize(state),
//         totalItemsCount: getTotalUsersCount(state),
//         page: getPage(state),
//         isFetching: getIsFetching(state),
//         followingInProgress: getFollowingInProgress(state),
//         filter: getUsersFilter(state)
//     }
// }

// export default compose(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
//         mapStateToProps, { follow, unfollow, requestUsers }),
//     //withAuthRedirect,
// )(UsersContainer)

//toggleFollowingInProgress - если что, запихнуть в connect