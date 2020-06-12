import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../constants/actions';

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
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
              <div className="card shadow-lg o-hidden border-0 my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-flex">
                      <div className="flex-grow-1 bg-login-image" />
                    </div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h4 className="text-dark mb-4">Bienvenido</h4>
                        </div>
                        <form className="user">
                          <div onClick={() => signInWithGoogle()} role="button">
                            <div className="btn btn-primary btn-block text-white btn-google btn-user" role="button">
                              <i className="fab fa-google" />
&nbsp; Login with Google
                            </div>
                          </div>
                        </form>
                        <div className="text-center" />
                        <div className="text-center" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (user) => dispatch({ type: actions.GET_USER, user }),
  signInWithGoogle: () => dispatch({ type: actions.SIGN_IN }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
