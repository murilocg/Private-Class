import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {
    state = {
        open: true,
    };

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
            >
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.clickNo} color="primary">
                        NO
            </Button>
                    <Button onClick={this.props.clickYes} color="primary" autoFocus>
                        YES
            </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ConfirmDialog;