import React from 'react';
import UserIndexItem from './user_index_item';

class UserIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.transaction;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.fetchAllUsers()
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createTransaction(this.state);
    }

    update(field){
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    render(){

        let currUser = this.props.currentUser;

        if(!this.props.users) return null
        const users = this.props.users.map((user, i) => {
            if(currUser.id !== user.id){

                return <UserIndexItem user={user} key={i} 
                transaction={this.props.transaction} 
                createTransaction={this.props.createTransaction}
                createRequest={this.props.createRequest} 
                openModal={this.props.openModal} />
            }
        })

        const hideUsers = this.props.hideUsers ? 'hide-users' : '';
        return (
            <div className={`top-level-container ${hideUsers}`}>
                {users}
            </div>
        )
    }
}

export default UserIndex;