import React, { Component } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    withStyles,
} from '@material-ui/core';
import { Create, Delete } from '@material-ui/icons';
import styles from './styles';

class LessonsTable extends Component {

    render() {
        const { classes, lessons } = this.props;
        return (
            <Table className={classes.tablelessons}>
                <TableHead className={classes.tablehead}>
                    <TableRow>
                        <TableCell className={classes.titlecolumn}>Title</TableCell>
                        <TableCell className={classes.titlecolumn}>Video</TableCell>
                        <TableCell className={classes.titlecolumn}>Material</TableCell>
                        <TableCell className={classes.titlecolumn} style={{ textAlign: 'center' }}>Satisfaction</TableCell>
                        <TableCell className={classes.titlecolumn} style={{ textAlign: 'center', width: '100px' }}>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        lessons.map((l, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{l.title}</TableCell>
                                    <TableCell>{l.video}</TableCell>
                                    <TableCell>{l.pdfName}</TableCell>
                                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>{formattAvaliation(l.avaliation)}</TableCell>
                                    <TableCell>
                                        <IconButton disabled>
                                            <Create style={{ color: '#4a4a86' }} />
                                        </IconButton>
                                        <IconButton onClick={() => this.props.onRemove(l)}>
                                            <Delete style={{ color: '#f36464' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>);
                        })
                    }
                </TableBody>
            </Table>
        );
    }
}

const formattAvaliation = (avaliation) => {
    if (!avaliation) return '-';
    avaliation = avaliation * 100;
    return avaliation.toFixed(0) + '%';
}

export default withStyles(styles)(LessonsTable);