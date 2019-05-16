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

class UserTable extends Component {

    render() {
        const { classes, users } = this.props;
        return (
            <Table className={classes.tableusers}>
                <TableHead className={classes.tablehead}>
                    <TableRow>
                        <TableCell className={classes.titlecolumn}>Name</TableCell>
                        <TableCell className={classes.titlecolumn}>Email</TableCell>
                        <TableCell className={classes.titlecolumn}>Type</TableCell>
                        <TableCell className={classes.titlecolumn} style={{ textAlign: 'center', width: '100px' }}>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((l, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{l.name}</TableCell>
                                    <TableCell>{l.email}</TableCell>
                                    <TableCell>{l.type}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => this.props.onEdit(l)}>
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

export default withStyles(styles)(UserTable);