import React from "react";
import Modal from "react-modal";
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const URL = "https://zomato-project-dulo.onrender.com"

class Header extends React.Component{
    constructor(){
        super();
        
            this.state ={
                loginModal:false
            }
    }

    
    handleModal = (state, value) => {

        this.setState({ [state]: value });

    }
    
    google=()=>{
        window.open(`${URL}/auth/google","_self`)
    }
     logout=()=>{
        window.open(`${URL}/auth/logout","_self`)
     }
 
    render(){

      const {loginModal} = this.state
      const {user} =this.props
        return(
            <div>
                         {/* <div class="row">
                            <div class="col text-end">
                                <button type="button" class="btn btn-outline-light">Login</button>
                                <button type="button" class="btn btn-outline-light">Create an account</button>
                            </div>
                        </div> */}
                        {/* <!--Navbar--> */}
                <nav class="navbar bg-danger" data-bs-theme="">
                    <div class="container">
                        <div class="navbar-brand text-danger circle">
                            <h2 class="logo">e!</h2>
                        </div>
                        {console.log(user)}
                        {
                        !user?(
                        <form class="d-flex nav-form">
                        <button type="button" class="btn btn-danger" onClick={() => { this.handleModal('loginModal', true);}}>Login</button>
                        <button type="button" class="btn btn-outline-light">Create an account</button>
                    </form>):(
                            <div >
                                <img src={user.picture} className="rounded-circle" height='50px'/>
                                <button type="button" class="btn btn-danger" onClick={this.logout}>Logout</button>
                            </div>

                    )

                        }
                        
                    </div>
                </nav>
                <Modal
                    isOpen={loginModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('loginModal', false)} className="close"><i class="bi bi-x-lg"></i></div>
                    <div onClick={this.google}>
                        <input type="button" className="btn btn-outline-success px-4 " value="GOOGLE" /> 
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Header;