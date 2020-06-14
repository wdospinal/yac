import * as React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { GET_USER, SIGN_IN } from '../../../constants/actions';

class Login extends React.Component {
  componentDidUpdate(prevProps) {
    const { userID, getUser } = this.props;
    if (userID !== prevProps.userID) {
      getUser(userID);
    }
  }

  render() {
    const { signInWithGoogle } = this.props;
    return (
      <div>
        <List>
          <ListItem button onClick={() => signInWithGoogle()}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: '#eee' }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  height="30"
                  alt="G"
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Sign in with Google" />
          </ListItem>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (user) => dispatch({ type: GET_USER, user }),
  signInWithGoogle: () => dispatch({ type: SIGN_IN }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
