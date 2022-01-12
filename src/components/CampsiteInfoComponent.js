import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,        
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render(){

        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg"/> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <LocalForm style={{padding:10}} onSubmit={this.handleSubmit}>
                        <div className="form-group" > 
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select 
                                className="form-control" 
                                model=".rating" 
                                id="rating" 
                                name="rating">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text 
                                className="form-control" 
                                required 
                                model=".author" 
                                id="author" 
                                name="author" 
                                placeholder="Your Name" 
                                validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
                                component="div"
                                show="touched"
                                messages={{
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'  
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="text">Comments</Label>
                            <Control.textarea 
                                className="form-control" 
                                rows="6" 
                                model=".text" 
                                id="text" 
                                name="text" 
                            />
                        </div>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </Modal>
            </React.Fragment> 
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

function RenderComments({comments, addComment, campsiteId}){
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
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
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
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}    
                    />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;