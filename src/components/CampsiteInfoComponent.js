import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        alert(JSON.stringify(values));
    }

    render(){

        return(
            <div>
                <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"/> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment 

                    </ModalHeader>
                    <LocalForm style={{padding:10}} onSubmit={this.handleSubmit}>
                        <div className="form-group" > Rating
                            <Control.select className="form-control" model=".rating" id="rating" name="rating">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">Your Name
                            <Control.text className="form-control" model=".author" id="author" name="author" placeholder="Your Name">

                            </Control.text>
                        </div>
                        <div className="form-group">Comment
                            <Control.textarea className="form-control" rows="6" model=".text" id="text" name="text" >

                            </Control.textarea>
                        </div>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </Modal>
            </div>
        );
    }
}


function RenderCampsite ({campsite}) {
    return(
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}){
    if (comments){
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
                    return(
                        <p key={comment.id}>{comment.text}<br />-- {comment.author}, {date}</p>
                    );
                })}
                <CommentForm />
            </div>
        );
    }
    return(
        <div>

        </div>
    );
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}



export default CampsiteInfo;