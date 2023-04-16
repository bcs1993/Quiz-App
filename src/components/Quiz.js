import React, { useEffect, useState } from "react";
import Questions from './Questions';


import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from "../hooks/setResult";

/** redux store import */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Quiz() {

    const [check, setChecked] = useState(undefined)

    // get questions from redux store
    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch();


    //Next button event handler
    function onNext() {
        //console.log('On Next Click');
        if(trace < queue.length) {
            /** update trace value by one using MoveNextAction */

        dispatch(MoveNextQuestion());

        /** insert new result in array */
        if(result.length <= trace) {
            dispatch(PushAnswer(check));
        }
        }

        /** reset valie of checked variable */
        setChecked(undefined);
        
    }

    //Previous button event handler
    function onPrev() {
        console.log('On Prev Click');
        if(trace > 0) {
            /** update trace value by one using MovePrevAction */
            dispatch(MovePrevQuestion());
        }
        
        
        
    }

    function onChecked(check) {
        console.log(check);
        setChecked(check);
    }

    /** finished exam after last question */
    if(result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

    return (
        <div className='container'>
            <h1 className="title text-light">Quiz Application</h1>

            {/* display questions */}
            <Questions onChecked={onChecked}/>

            <div className="grid">
                { trace > 0 ? <button className='btn prev'onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>

            </div>
         </div>
    );
}
