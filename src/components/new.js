import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import '../css/new.css';
const percentage = 66;

export default class New extends React.Component {

    render() {
        return(
            <div>

            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
        )
        }
    }